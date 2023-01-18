<template>
  <div class="reimwin">
    <div class="closebox" v-on:click="$emit('close')"></div>
    <h2>{{  heading }}</h2>
    <div class="rep-flex">
      <div class="upload-area">
        <div class="upload-pegs" v-on:drop="handleDrop($event)" @dragover="dragOverHandler($event)">
          <div v-if="images.length < 1" class="advice">Drag image here or use the Browse button below to select.</div>
          <div class="upload-peg" v-for="(img, index) in images" :key="index">
            <div class="up-close" @click="removeImage(index)" title="remove">X</div>
            <img :src="img" >
          </div>
        </div>
        <div class="bottom-bar">
          <input type="file" accept="image/jpeg" multiple @change="handleUpload" ref="uploadbox">
          <div class="progress-area">
            <div>{{ message }} &nbsp; {{ fileprogress }}</div>
            <progress :max="filemax" :value="fileval" id="pbar" class="pbar">{{ fileprogress }}</progress>
          </div>
          <div class="flexb">
            <input type="button" @click.stop.prevent="handleCancel" value="Cancel" :disabled="!uploading" >
            <input type="button" @click.stop.prevent="handleUploadFiles" value="Replace" :disabled="files.length < 1">
          </div>
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
    image: Object,
    anim: Boolean
  },
  computed: {
    loc () {
      if (!this.image) {
        return ''
      }
      return this.image.Location
    },
    heading () {
      if (this.anim) {
        return 'Replace preview image ' + this.loc
      }
      return 'Replace image ' + this.loc
    }
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
      galleries: [],
      selectedGalleries: [],
      description: ''
    }
  },
  methods: {
    async handleDrop (e) {
      e.preventDefault()
      if (e.dataTransfer.files) {
        let files = [...(e.dataTransfer.files)]

        files = files.filter(el => /image/.test(el.type))
        for (let file of files) {
          console.log('processing a file')
          let src = await this.loadImageFromFile(file)
          if (this.files.length > 0) {
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
        let src = await this.loadImageFromFile(file)
        if (this.files.length > 0) {
          this.removeImage(0)
        }
        this.files.push(file)
        this.images.push(src)
      }
    },
    async handleUploadFiles () {
      this.uploading = true
      this.fileval = 0
      this.filemax = this.files.length
      for (let i = 0; i < this.files.length; i++) {
        await this.handleUploadFile(this.files[i])
        if (this.canceled) {
          this.uploading = false
          this.canceled = false
          return
        }
        this.fileval++
      }
      this.files = []
      this.images = []
      this.uploading = false
      this.message = this.fileval + ' file successfully uploaded'
      this.fileprogress = ''
      this.fileval = 0
      this.$emit('replaced')
    },
    async handleUploadFile (file) {
      const fsize = file.size
      const fsmessage = prettyBytes(fsize)
      const uuid = uuidv4()
      this.message = 'Uploading ' + file.name
      if (fsize < MB) {
        this.fileprogress = '0 of ' + fsmessage
        await this.sendChunk(uuid, file.name, file, 0, 0)
        this.fileprogress = prettyBytes(file.size) + ' of ' + fsmessage
        return
      }
      const chunks = Math.ceil(fsize / MB)
      let current = 0
      this.filemax = chunks
      this.fileval = 0

      for (let i = 0; i < fsize - 1; i += MB) {
        const mblob = file.slice(i, i + MB)
        await this.sendChunk(uuid, file.name, mblob, current, chunks)
        current++
        this.fileval++
        this.fileprogress = prettyBytes(i + mblob.size) + ' of ' + fsmessage
        console.log('fileprogress', this.fileprogress)
        if (this.canceled) {
          return
        }
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
      let gs = []
      for (let gal of this.selectedGalleries) {
        gs.push(gal)
      }
      console.log('gs', gs)
      const fd = new FormData()
      fd.append('file', blob)
      fd.append('filename', filename)
      fd.append('chunk', chunk)
      fd.append('chunks', chunks)
      fd.append('replace', this.image.Id + '')
      let res = await axios.post(`/admin/user_admin/BulkUploader.ashx?uid=${uuid}`, fd)
      if (res.data.message !== 'ok') {
        throw res.data.message
      }
    }
  }
}
</script>

<style>
.r-user-img {
  position:relative;
  width:100px;
  height:100px;
  border:1px solid #ccc;
  display:flex;
  align-items:center;
  justify-content:center;
  margin:5px;
  border-radius:5px;
  background-color:#eee;
}

.r-user-img img {
  max-width:100px;
  max-height:100px;
  display:block;
}

.reimwin {
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

.rep-flex {
  display:flex;
}

</style>
