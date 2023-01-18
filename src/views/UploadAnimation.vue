<template>
  <div>
    <p>
      Preferred video formats: H.264 (<b>.mp4</b>, <b>.mov</b>)<br>
      The ideal movie proportion is 16:9 horizontal<br>
      <br>
      Please use short clips as opposed to full length versions wherever you can.<br />
      <br>
      <b>GIF files</b><br />
      Animated GIF files can be any pixel size, but MUST have a file size less than 2MB (2 Megabytes).
      Oversized GIF files slow down website page loads and will be removed. Ideally, GIFs should be less than 100K file size.
    </p>
    <p>
      Please upload a preview image along with your movie.
      The preview image should be a JPEG, and should be the same proportions as the image where possible, ideally at least 1500 pixels on the long side.
    </p>
    <p>
      The title should be as brief as possible - 40 characters or fewer.
    </p>
    <p>
      Instead of uploading a movie, you can provide a link to its URL if it is on Vimeo or Youtube. It must be public for our website to
      be able to display it.
    </p>
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
        <td><b>Style galleries</b></td>
        <td>
          <div class="checkbox-group">
            <div v-for="gallery in galleries" :key="gallery.gallery_id">
              <input type="checkbox" :value="gallery.gallery_id" v-model="selectedGalleries"> {{  gallery.name }}
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td><b>YouTube/Vimeo URL</b></td>
        <td><input type="text" size="80" v-model="videoUrl"></td>
      </tr>
      <tr valign="top">
        <td><b>Who animated this?</b></td>
        <td>
          <select v-model="animatedBy">
            <option value="N">Me</option>
            <option value="Y">Someone else</option>
          </select>
          <p>If animated by someone else, please enter their name (individual or company) below:</p>
          <input type="text" size="60" v-model="animator">
        </td>
      </tr>
    </table>
    <div class="upload-area">
      <div class="upload-pegs" v-on:drop="handleDrop($event)" @dragover="dragOverHandler($event)">
        <div v-if="images.length < 1" class="advice">Drag preview image and movie file here or use the Browse button below to select.</div>
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
          <input type="button" @click.stop.prevent="handleUploadFiles" value="Upload image" :disabled="!canUpload">
        </div>
      </div>
    </div>
    <div>
      <default-keywords-vue></default-keywords-vue>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import prettyBytes from 'pretty-bytes'
import { v4 as uuidv4 } from 'uuid'
import DefaultKeywordsVue from '../components/DefaultKeywords.vue'
import '@/css/upload.css'
const MB = 1000000

export default {
  components: {
    DefaultKeywordsVue
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
      description: '',
      mtitle: '',
      videoUrl: '',
      webImage: null,
      animatedBy: 'N',
      animator: ''
    }
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Upload an animation and preview image for your portfolio')
  },
  created () {
    this.loadData()
  },
  computed: {
    canUpload () {
      return (this.images.length == 2) || (this.images.length === 1 && this.videoUrl)
    }
  },
  methods: {
    async loadData () {
      const res = await this.$apix.post('GetUserStyleGalleries')
      this.galleries = res.data.d.filter(el => !el.anim)
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
      this.webImage = await this.$post('UserCreateAnimation', {
        description: this.description,
        title: this.mtitle || '',
        url: this.videoUrl,
        animatedBy: this.animatedBy,
        animator: this.animator
      })
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
      this.message = this.fileval + ' successfully uploaded'
      this.fileprogress = ''
      this.fileval = 0
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
      for (let i = 0; i < fsize - 1; i += MB) {
        const mblob = file.slice(i, i + MB)
        await this.sendChunk(uuid, file.name, mblob, current, chunks)
        current++
        this.fileprogress = prettyBytes(i + mblob.size) + ' of ' + fsmessage
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
      console.log('doing send chunk ' + filename + ' with uid ' + uuid)
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
      fd.append('description', this.description)
      fd.append('galleries', JSON.stringify(gs))
      fd.append('type', blob.type)
      fd.append('animation', 'true')
      fd.append('imageid', this.webImage.Id)
      let res = await axios.post(`/admin/user_admin/BulkUploader.ashx?uid=${uuid}`, fd)
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
</style>
