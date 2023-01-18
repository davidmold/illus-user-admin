<template>
  <div>
    <div class="flex-button">
      <div id="publish" class="publish-button" onclick="publishChanges()">
        <div class="publish-text">Publish to IllustrationX</div>
        <div class="loader-icon"></div>
      </div>
      <div style="margin-left:10px;padding:8px 0">Publish status: {{ publishStatus }}</div>
    </div>

    <div class="twocol">
      <p>
        Press the big red "Publish to IllustrationX" button above to push your updated images to the live website once you have finished
        editing.
      </p>
      <p>
        Number the illustrations as you would like them to appear, and then press Save Changes. Press the AutoNumber button to space
        the image ratings in their CURRENT order in increments of the specified value.
      </p>
      <p>
        Please note that illustrations that are not live are shown in red boxes, and are shown at the bottom of the listing unless you check the
        "Live" switch, regardless of their display order setting.
      </p>

    </div>
    <p v-if="anim">
      <a :href="pflink" target="_blank">Public Portfolio View</a> |
      <router-link to="/admin/user_admin/vue/sort-animations">Sort animation portfolio</router-link> |
      <router-link to="/admin/user_admin/vue/upload-animation">Upload animation</router-link>
    </p>
    <p v-if="!anim">
      <a :href="pflink" target="_blank">Public Portfolio View</a> |
      <router-link to="/admin/user_admin/vue/sort-images">Sort illustration portfolio</router-link> |
      <router-link to="/admin/user_admin/vue/upload-image">Upload image</router-link> |
      <router-link to="/admin/user_admin/vue/upload-multiple">Upload multiple images</router-link>
    </p>
    <div class="flex-order">
      <portfolio-image-editor v-for="image in images" :image="image" :key="image.Id" @crop="crop" @keys="editKeywords" @gals="editGalleries" @replace="handleReplace" @delete="handleDelete"></portfolio-image-editor>
    </div>
    <replace-image-vue :image="selectedImage" v-show="showreplace" @close="closeReplace" @replaced="handleReplaced" :anim="anim"></replace-image-vue>
    <crop-editor :imageid="cropimageid" v-show="showcrop" @close="closeCropEditor"></crop-editor>
    <image-keywords :image="selectedImage" v-show="showkeys" @close="closeImageKeywords"></image-keywords>
    <image-style-galleries :image="selectedImage" v-show="showgals" @close="closeGalleries" :anim="anim" :illus="!anim"></image-style-galleries>
  </div>
</template>

<script>
import PortfolioImageEditor from '../components/PortfolioImageEditor.vue'
import CropEditor from '../components/CropEditor.vue'
import ImageKeywords from '../components/ImageKeywords.vue'
import ImageStyleGalleries from '../components/ImageStyleGalleries.vue'
import ReplaceImageVue from '../components/ReplaceImage.vue'
export default {
  props: {
    anim: Boolean
  },
  components: {
    PortfolioImageEditor,
    CropEditor,
    ImageKeywords,
    ImageStyleGalleries,
    ReplaceImageVue
  },
  mounted () {
    this.setHeadline()
    this.loadData()
  },
  data () {
    return {
      artist: null,
      loading: false,
      publishStatus: '...',
      images: [],
      startedFetching: false,
      showcrop: false,
      cropimageid: 0,
      selectedImage: null,
      showkeys: false,
      showgals: false,
      showreplace: false
    }
  },
  computed: {
    pflink () {
      if (this.artist === null) {
        return ''
      }
      if (this.anim) {
        return 'https://www.illustrationx.com/artists/' + this.artist.PortfolioName
      }
      return 'https://www.illustrationx.com/animators/' + this.artist.PortfolioName
    }
  },
  methods: {
    setHeadline () {
      if (this.anim) {
        this.$store.commit('setPageTitle', 'Edit your animation portfolio')
      } else {
        this.$store.commit('setPageTitle', 'Edit your illustration portfolio')
      }
    },
    async loadData () {
      this.artist = await this.$post('GetLoggedArtistObject')
      await this.reloadImages()
      if (!this.startedFetching) {
        window.setInterval(this.checkProgress, 15000)
        this.startedFetching = true
      }
    },
    async handleReplaced () {
      await this.reloadImages()
      this.closeReplace()
    },
    async handleDelete (image) {
      await this.$post('UserDeleteImage', { imageId: image.Id })
      await this.reloadImages()
    },
    async publishChanges () {
      this.loading = true
      await this.$post('IllusxCliUser', { args: 'upload ' + this.artist.PortfolioName })
      this.loading = false
      this.$showMessage('Your changes will be live when the publish status changes to "complete". You will need to reload the illustrationx web site to view them.')
    },
    async checkProgress () {
      const res = await this.$post('GetPortfolioUpdateStatus', { artistId: this.artist.Id })
      let d = new Date(0)
      d.setUTCSeconds(res.last_update)
      let txt = res.status
      if (txt === 'complete') {
        txt += ', last updated: ' + d.toLocaleString()
      }
      this.publishStatus = txt
    },
    closeCropEditor () {
      this.showcrop = false
    },
    closeImageKeywords () {
      this.showkeys = false
    },
    closeGalleries () {
      this.showgals = false
    },
    closeReplace () {
      this.showreplace = false
    },
    crop (image) {
      this.cropimageid = image.Id
      this.showcrop = true
    },
    editKeywords (image) {
      this.selectedImage = image
      this.showkeys = true
    },
    editGalleries (image) {
      this.selectedImage = image
      this.showgals = true
    },
    handleReplace (image) {
      console.log('handleReplace called')
      this.selectedImage = image
      this.showreplace = true
    },
    async reloadImages () {
      this.images = await this.$post('GetUserPortfolioImages', { anim: this.anim })
    }
  },
  watch: {
    anim () {
      this.setHeadline()
      this.images = []
      this.reloadImages()
    }
  }
}
</script>

<style>
.twocol {
  columns: 2;
  margin-bottom:16px;
}

.twocol p{
  margin-top:0;
}

.flex-button {
  display:flex;
  margin-bottom:12px;
}
</style>
