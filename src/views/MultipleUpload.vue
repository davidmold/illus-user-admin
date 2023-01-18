<template>
  <div class="multi-upload">
    <p>
      You can upload multiple images at one time, either by using the "Browse..." button below to select files from your drive, or by dragging and dropping the images onto the box below.
    </p>
    <p>
      Each image must be a JPEG. All images should be at least 2000 pixels wide. The file name must end with ".jpg", and must
      actually be a JPEG with RGB color space. Do NOT upload progressive or CMYK jpegs, they won't work on the site.
    </p>
    <p>
      Please note that the images should be less than 5MB (five megabytes, or 5,000KB) file size. In Photoshop, the "Save for Web..."
      option is recommended. For the settings, choose "JPEG High" option.
    </p>
    <p>
      Default keywords shown below will be applied to all of the images you upload. Use the link to edit them.
    </p>
    <div class="upload-area">
      <div class="upload-pegs" v-on:drop="handleDrop($event)" @dragover="dragOverHandler($event)">
        <div v-if="images.length < 1" class="advice">Drag images here or use the Browse button below to select.</div>
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
          <input type="button" @click.stop.prevent="handleCancel" value="Cancel upload" v-show="uploading">
          <input type="button" @click.stop.prevent="handleUploadFiles" value="Upload files" :disabled="files.length < 1">
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
      dragging: false
    }
  },

  mounted () {
    this.$store.commit('setPageTitle', 'Upload multiple images')
  },
  methods: {
    async handleDrop (e) {
      e.preventDefault()
      console.log('got a drop')
      if (e.dataTransfer.files) {
        console.log('got some files')
        let files = [...(e.dataTransfer.files)]

        files = files.filter(el => /image/.test(el.type))
        for (let file of files) {
          console.log('processing a file')
          let src = await this.loadImageFromFile(file)
          this.files.push(file)
          this.images.push(src)
        }
      }
    },
    dragOverHandler (ev) {
      ev.preventDefault()
      this.dragging = true
    },
    async handleUpload (e) {
      let files = e.target.files || e.dataTransfer.files
      for (let file of files) {
        let src = await this.loadImageFromFile(file)
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
      const fd = new FormData()
      fd.append('file', blob)
      fd.append('filename', filename)
      fd.append('chunk', chunk)
      fd.append('chunks', chunks)

      let res = await axios.post(`/admin/user_admin/BulkUploader.ashx?uid=${uuid}`, fd)
      if (res.data.message !== 'ok') {
        throw res.data.message
      }
    }

  }
}
</script>

<style>

</style>
