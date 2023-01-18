<template>
  <div class="video-upload-window">
    <div class="closebox" v-on:click="$emit('close')"></div>
    <table class="ttable">
      <tr>
        <td><b>Title</b></td>
        <td><input type="text" size="40" v-model="mtitle"></td>
      </tr>
      <tr>
        <td><b>Description</b></td>
        <td><textarea v-model="description" rows="2" columns="60" class="wtext"></textarea></td>
      </tr>
      <tr>
        <td>Tags</td>
        <td class="flex-td">
          <div class="checkbox-item" v-for="tag in alltags" :key="tag.Id">
            <input type="checkbox" :value="tag" v-model="selectedTags">
            <label>{{  tag.Text }}</label>
          </div>
        </td>
      </tr>
      <tr>
        <td><b>YouTube/Vimeo URL</b></td>
        <td><input type="text" size="80" v-model="externalUrl"></td>
      </tr>
    </table>
    <div class="upload-area">
      <div class="upload-pegs" v-on:drop="handleDrop($event)" @dragover="dragOverHandler($event)">
        <div v-if="images.length < 1" class="advice">{{  uploadMessage }}</div>
        <div class="upload-peg" v-for="(img, index) in images" :key="index">
          <div class="up-close" @click="removeImage(index)" title="remove">X</div>
          <img :src="img" >
        </div>
      </div>
      <div class="bottom-bar">
        <input type="file" accept="image/jpeg, video/*" multiple @change="handleUpload" ref="uploadbox">
        <div class="progress-area">
          <div>{{ message }} &nbsp; {{ fileprogress }}</div>
          <progress :max="filemax" :value="fileval" id="pbar" class="pbar">{{ fileprogress }}</progress>
        </div>
        <div class="flexb">
          <input type="button" @click.stop.prevent="handleCancel" value="Cancel upload" v-show="uploading">
          <input type="button" @click.stop.prevent="handleUploadFiles" :value="buttonMsg" :disabled="!canUpload">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import prettyBytes from 'pretty-bytes'
import { v4 as uuidv4 } from 'uuid'
import '@/css/upload.css'
const MB = 1000000

export default {
  props: {
    alltags: Array
  },
  data () {
    return {
      fileval: 0,
      filemax: 0,
      files: [],
      uploading: false,
      message: '',
      canceled: false,
      fileprogress: 'Progress',
      images: [],
      dragging: false,
      video: null,
      description: '',
      mtitle: '',
      externalUrl: '',
      selectedTags: []

    }
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Upload an animation and preview image for your portfolio')
  },
  computed: {
    canUpload () {
      return (this.images.length == 2) || (this.images.length === 1 && this.externalUrl.length > 2)
    },
    uploadMessage () {
      if (this.externalUrl.length > 2) {
        return 'Drag preview image here or use the Browse button below to select.'
      }
      return 'Drag preview image and movie file here or use the Browse button below to select.'
    },
    buttonMsg () {
      if (this.externalUrl.length > 2) {
        return 'Upload preview image'
      }
      return 'Upload image and movie'
    }
  },
  methods: {
    resetFields () {
      this.fileval = 0
      this.filemax = 0
      this.files = []
      this.uploading = false
      this.message = ''
      this.canceled = false
      this.fileprogress = 'Progress'
      this.images = []
      this.dragging = false
      this.video = null
      this.description = ''
      this.mtitle = ''
      this.externalUrl = ''
      this.selectedTags = []
    },
    async handleDrop (e) {
      e.preventDefault()
      if (e.dataTransfer.files) {
        let files = [...(e.dataTransfer.files)]

        for (let file of files) {
          let src = '/admin/img/movie.png'

          if (file.type.includes('image')) {
            src = await this.loadImageFromFile(file)
          }
          if (this.files.length > 1) {
            this.removeImage(0)
          }
          this.files.push(file)
          this.images.push(src)
        }
      }
      this.message = this.files.length + ' files to upload'
    },
    dragOverHandler (ev) {
      ev.preventDefault()
      this.dragging = true
    },
    async handleUpload (e) {
      let files = e.target.files || e.dataTransfer.files
      for (let file of files) {
        let src = '/admin/img/movie.png'
        if (file.type.includes('image')) {
          src = await this.loadImageFromFile(file)
        }
        if (this.files.length > 1) {
          this.removeImage(0)
        }
        this.files.push(file)
        this.images.push(src)
      }
    },
    async handleUploadFiles () {
      // first create the web image to associate with
      this.video = await this.$post('UserCreateVideo', {
        description: this.description,
        title: this.mtitle,
        externalUrl: this.externalUrl,
        tags: this.selectedTags
      })
      this.uploading = true
      this.fileval = 0
      this.filemax = this.files.length
      for (let i = 0; i < this.files.length; i++) {
        console.log('uploading', this.files[i].name)
        await this.handleUploadFile(this.files[i])
        if (this.canceled) {
          this.uploading = false
          this.canceled = false
          return
        }
        this.fileval++
        console.log('uploaded', this.files[i])
      }
      this.uploading = false
      this.message = this.fileval + ' successfully uploaded'
      this.$emit('uploaded')
      this.resetFields()
    },
    async handleUploadFile (file) {
      const fsize = file.size
      const fsmessage = prettyBytes(fsize)
      const uuid = uuidv4()
      this.message = 'Uploading ' + file.name
      if (fsize < MB) {
        console.log('uploading', file.name, 'in one chunk')
        this.fileprogress = '0 of ' + fsmessage
        await this.sendChunk(uuid, file.name, file, 0, 0)
        this.fileprogress = prettyBytes(file.size) + ' of ' + fsmessage
        return
      }
      const chunks = Math.ceil(fsize / MB)
      let current = 0
      try {
        for (let i = 0; i < fsize - 1; i += MB) {
          const mblob = file.slice(i, i + MB)
          await this.sendChunk(uuid, file.name, mblob, current, chunks)
          current++
          this.fileprogress = prettyBytes(i + mblob.size) + ' of ' + fsmessage
          if (this.canceled) {
            return
          }
        }
      } catch (err) {
        console.log(err)
        this.$showMessage('Unable to complete upload')
      }
    },
    async loadImageFromFile (file) {
      return new Promise((resolve, reject) => {
        try {
          let reader = new FileReader()
          reader.onload = (e) => {
            resolve(e.target.result)
          }
          reader.readAsDataURL(file)
        } catch (err) {
          reject(err)
        }
      })
    },
    handleCancel () {
      if (this.uploading) {
        this.canceled = true
      }
    },
    removeImage (index) {
      this.images.splice(index, 1)
      this.files.splice(index, 1)
    },
    async sendChunk (uuid, filename, blob, chunk, chunks) {
      console.log('doing send chunk ' + filename + ' with uid ' + uuid)
      const fd = new FormData()
      fd.append('file', blob)
      fd.append('filename', filename)
      fd.append('chunk', chunk)
      fd.append('chunks', chunks)
      fd.append('type', blob.type)
      fd.append('videoid', this.video.Id)
      let res = await axios.post(`/admin/user_admin/VideoUploader.ashx?uid=${uuid}`, fd)
      if (res.data.message !== 'ok') {
        throw res.data.message
      }
    }
  }
}
</script>

<style>
.checkbox-group {
  display:flex;
  flex-wrap:wrap;
}

.checkbox-group > div {
  width: 200px;
}

.wtext {
  width:600px;
}

.ttable{
  margin-bottom:16px;
}

.ttable td{
  padding-bottom:11px;
  padding-right:8px;
}

.video-upload-window {
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  z-index:1020;
  min-width:800px;
  max-height:95%;
  box-sizing:border-box;
  overflow-y:auto;
}
</style>
