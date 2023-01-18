<template>
  <div class="userImageBlock" :class="{ notliveY: !live, loading: loading }">
    <div class="dual-block">
      <div class="user-img">
        <img :src="thumbsrc">
      </div>
      <div class="user-data" v-if="image">
        <div style="margin-bottom:4px;word-break: break-all;"><b>{{  image.Location }}</b> <span v-html="animfile"></span></div>
        <div>
          <textarea class="user-desc" cols="20" rows="3" placeholder="Description" v-model="image.Description"
            @blur="saveDesc"
            autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
        </div>
        <div>
          <small-button small @click="handleCrop">Crop</small-button>
          <small-button small @click="handleKeys">Keywords</small-button>
          <small-button small @click="handleGals">Galleries</small-button>
          <small-button small @click="handleReplace">Replace</small-button>
          <small-button small @click="handleDelete">Delete</small-button>
          <on-off-button v-model="live" @input="handleLive">Live</on-off-button>
        </div>
        <div style="margin-top:6px">
          <b>{{ showDate(image.UploadDate)  }}</b>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import OnOffButton from './buttons/OnOffButton.vue'
export default {
  components: {
    OnOffButton
  },
  props: {
    image: Object
  },
  data () {
    return {
      live: false,
      loading: false
    }
  },
  computed: {
    thumbsrc () {
      if (!this.image) {
        return ''
      }
      return this.$k.getBestUnmarkedThumbnail(this.image, 400, false)
    },
    animfile () {
      if (!this.image) {
        return ''
      }
      if (!this.image.Animation) {
        return ''
      }
      if (this.image.VideoUrl) {
        let ms = 'Youtube'
        if (this.image.VideoUrl.includes('vimeo')) {
          ms = 'Vimeo'
        }
        return '<a href="' + this.image.VideoUrl + '" target="_blank" class="' + ms + '">' + ms + '</a>'
      }
      let fp = this.image.Swf.split('/')
      fp = fp[fp.length - 1]
      return `<a href="${this.image.Swf}" target="_blank">${fp}</a>`
    }
  },
  created () {
    if (this.image) {
      this.live = this.image.IllusWeb && this.image.Live
    }
  },
  methods: {
    showDate (adate) {
      let d = this.$du.parseCsDate(adate)
      return d.toLocaleDateString()
    },
    handleCrop () {
      this.$emit('crop', this.image)
    },
    handleKeys () {
      this.$emit('keys', this.image)
    },
    async handleLive () {
      this.loading = true
      await this.$post('UserLiveImage', { imageId: this.image.Id, live: this.live })
      this.image.Live = this.live
      this.image.IllusWeb = this.live
      this.loading = false
    },
    async handleDelete () {
      if (!confirm('Really delete this item?')) {
        return
      }
      this.$emit('delete', this.image)
    },
    handleGals () {
      this.$emit('gals', this.image)
    },
    handleReplace () {
      this.$emit('replace', this.image)
    },
    async saveDesc () {
      const res = await this.$post('UserSaveImageDescription', { imageId: this.image.Id, description: this.image.Description })
      if (res !== 'OK') {
        this.$showMessage(res)
      }
    }
  },
  watch: {
    image () {
      if (this.image) {
        this.live = this.image.IllusWeb && this.image.Live
      }
    }
  }
}
</script>

<style>
.user-img {
  position:relative;
  width:160px;
  height:160px;
  border:1px solid #ccc;
  display:flex;
  align-items:center;
  justify-content:center;
  margin:5px;
  border-radius:5px;
  background-color:#eee;
  flex-shrink:0;
  overflow:hidden;
}

.user-img:hover img {
  transform: scale(1.5);
}

.user-img img {
  max-width:160px;
  max-height:160px;
  display:block;
  transition:all 0.1s ease-in-out;
}

.dual-block {
  display:flex;
}

.user-data {
  margin:5px;
  flex-grow:1;
}

textarea.user-desc{
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  font-size:12px;
  line-height:14px;
  margin-bottom:8px;
  resize:none;
  border:1px solid rgba(0,0,0,0.1);
  background-color: transparent;
  padding:2px 6px;
}

textarea.user-desc:focus {
  outline: none !important;
  border:1px solid rgba(0,0,0,0.5);
  background-color:#fff;
}

.userImageBlock.loading{
  cursor:wait;
}

.Vimeo {
  color:rgba(16, 82, 168, 0.867);
  font-weight: bold;
}

.Youtube {
  color:red;
  font-weight: bold;
}
</style>
