<template>
  <div class="upload-area one-image">
    <div class="upload-pegs" v-on:drop="handleDrop($event)" @dragover="dragOverHandler($event)">
      <div v-if="images.length < 1" class="advice">{{  prompt }}</div>
      <div class="upload-peg" v-for="(img, index) in images" :key="index">
        <div class="up-close" @click="removeImage(index)" title="remove">X</div>
        <img :src="img" >
      </div>
    </div>
    <div class="bottom-bar">
      <input type="file" accept="image/jpeg" @change="handleUpload" ref="uploadbox">
      <div class="progress-area">
        <div>{{ message }} &nbsp; {{ fileprogress }}</div>
        <progress :max="filemax" :value="fileval" id="pbar" class="pbar">{{ fileprogress }}</progress>
      </div>
      <div class="flexb">
        <input type="button" @click.stop.prevent="handleCancel" value="Cancel upload" v-show="uploading">
        <input type="button" @click.stop.prevent="handleUploadFiles" value="Upload image" :disabled="files.length < 1">
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
    filekind: String,
    fileurl: String,
    prompt: String
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
      this.message = this.fileval + ' successfully uploaded'
      this.fileprogress = ''
      this.fileval = 0
      this.$emit('uploaded')
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
      fd.append('filekind', this.filekind)
      let res = await axios.post(`/admin/user_admin/${this.fileurl}?uid=${uuid}`, fd)
      if (res.data.message !== 'ok') {
        throw res.data.message
      }
    }
  }
}
</script>

<style>
.one-image {
  margin-bottom:30px;
  margin-top:10px;
}
</style>
