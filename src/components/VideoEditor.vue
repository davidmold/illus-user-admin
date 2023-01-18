<template>
  <div class="video-editor">
    <div class="video-handle">
      <img :src="previewSrc">
    </div>
    <div class="video-detail">
      <div>
        <table class="mega-table">
          <tr>
            <td>Title:</td>
            <td><input type="text" size="80" v-model="video.Title" @blur="saveDetail"></td>
          </tr>
          <tr>
            <td>Description:</td>
            <td><input type="text" size="80" v-model="video.Description" @blur="saveDetail"></td>
          </tr>
          <tr v-if="filelink">
            <td>Video File:</td>
            <td v-html="filelink"></td>
          </tr>
          <tr v-if="!filelink">
            <td>External URL:</td>
            <td><input type="text" size="80" v-model="video.ExternalUrl" @blur="saveDetail"></td>
          </tr>
          <tr>
            <td>Tags</td>
            <td class="flex-td">
              <div class="checkbox-item" v-for="tag in alltags" :key="tag.Id">
                <input type="checkbox" :value="tag" v-model="video.Tags">
                <label>{{  tag.Text }}</label>
              </div>
            </td>
          </tr>
          <tr>
            <td>Uploaded:</td>
            <td>{{  formatDate(video.PostedDate) }}</td>
          </tr>
        </table>
      </div>
      <div class="wide-fit">
        <div>
          <on-off-button v-model="video.Live" @input="saveDetail">Live</on-off-button>
        </div>
        <div><small-button small @click="handleDelete">Delete</small-button></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    video: Object,
    alltags: Array
  },
  components: {
    OnOffButton: () => import('./buttons/OnOffButton.vue')
  },
  computed: {
    previewSrc () {
      if (!this.video) {
        return ''
      }
      return `/ImageScaler.aspx?src=video&name=${this.video.PreviewImage}&sz=200`
    },
    filelink () {
      if (!this.video) {
        return ''
      }
      if (!this.video.Filename) {
        return ''
      }
      return `<a href="/imagebase/video/${this.video.Filename}" target="_blank"}>${this.video.Filename}</a>`
    }
  },
  methods: {
    formatDate (adate) {
      let d = this.$du.parseCsDate(adate)
      return d.toLocaleDateString()
    },
    async handleDelete () {
      if (!confirm('Really delete this video?')) {
        return
      }
      const res = await this.$post('UserDeleteVideo', { videoId: this.video.Id })
      if (res !== 'OK') {
        this.$showMessage(res)
      } else {
        this.$emit('delete')
      }
    },
    async saveDetail () {
      const res = await this.$post('UserSaveVideo', { video: this.video })
      if (res !== 'OK') {
        this.$showMessage(res)
      }
    }
  }
}
</script>

<style>
.video-editor {
  display:flex;
  padding:10px 0;
  border-bottom:1px solid rgba(0,0,0,0.5);
  width:100%;
}

.video-handle{
  cursor:move;
}

.video-detail {
  margin-left:16px;
  flex-grow:1;
}

.video-detail > div {
  margin-bottom:6px;
}

.flex-td {
  display:flex;
  flex-wrap: wrap;
}

.flex-td > div {
  margin-right:10px;
}

.wide-fit{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mega-table {
  width:100%;
}
</style>
