<template>
  <div>
    <p>
      This is for editorial videos for the section you can find on the main website
      <a href="https://www.illustrationx.com/videos" target="_blank">here</a>,
      and NOT for your main portfolio area. The most recent video in this section will
      also be shown on your profile.
    </p>
    <p>
      <small-button @click="handleShowUpload">Upload new video</small-button>
    </p>
    <draggable v-model="videos" @change="saveOrder" class="flex-order" handle=".video-handle">
      <video-editor v-for="video in videos" :video="video" :key="video.Id" @delete="handleDelete" :alltags="alltags"></video-editor>
    </draggable>
    <video-upload :alltags="alltags" @uploaded="handleUploaded" v-show="showupload" @close="showupload=false"></video-upload>
  </div>
</template>

<script>
import VideoEditor from '../components/VideoEditor.vue'
import draggable from 'vuedraggable'
import VideoUpload from '../components/VideoUpload.vue'

export default {
  components: {
    VideoEditor,
    draggable,
    VideoUpload
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Videos')
  },
  created () {
    this.loadTags()
    this.reloadVideos()
  },
  data () {
    return {
      videos: [],
      alltags: [],
      showupload: false
    }
  },
  methods: {
    handleShowUpload () {
      this.showupload = true
    },
    async loadTags () {
      this.alltags = await this.$post('GetVideoBlogTags')
    },
    async handleUploaded () {
      this.reloadVideos()
      this.showupload = false
    },
    async reloadVideos () {
      this.videos = await this.$post('GetUserVideos')
    },
    async handleDelete () {
      this.reloadVideos()
    },
    async saveOrder () {
      const arr = []
      for (let i = 0; i < this.videos.length; i++) {
        arr.push(this.videos[i].Id)
      }
      await this.$post('UserSortVideos', { ids: arr })
    }
  }
}
</script>

<style>

</style>
