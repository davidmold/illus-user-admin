<template>
  <div>
    <modal-dialog v-model="show">
      <div class="wide-berth">
        <p>
          Note: the first five images (outlined in red) will be shown in the gallery.
        </p>
        <div class="image-grid">
          <drag-dropper v-for="image in images" :key="image.gallery_image_id" :id="'' + image.gallery_image_id" v-on:drop="handleDrop">
            <image-panel :image="image.image" ></image-panel>
            <div class="greybar">

              <small-button v-on:click="remove(image)">X</small-button>
              <small-button v-on:click="moveup(image)">&lt;</small-button>
              <small-button v-on:click="movedown(image)">&gt;</small-button>
              <div class="rating">{{ image.rating }}</div>
            </div>
          </drag-dropper>
        </div>
      </div>
    </modal-dialog>
  </div>
</template>

<script>
import ImagePanel from '../components/ImagePanel.vue'
import DragDropper from '../components/DragDropper.vue'
import ModalDialog from '../components/ModalDialog.vue'

export default {
  props: {
    galid: Number
  },
  components: {
    ImagePanel,
    DragDropper,
    ModalDialog
  },

  data () {
    return {
      id: Number,
      artistName: '',
      galleries: [],
      galleryId: 0,
      images: [],
      show: false
    }
  },
  computed: {
    gallery () {
      return this.galleries.find(el => { return el.gallery_id == this.id })
    }
  },
  created () {
    console.log('path', this.$route.path)
    this.init()
    window.selectGallery = this.setGallery
  },
  methods: {
    async setGallery (id) {
      this.id = id
      this.show = true
    },
    async remove (image) {
      if (!confirm('remove this image from gallery')) {
        return
      }
      await this.$apix.post('RemoveArtistGalleryImage', { id: image.gallery_image_id })
      let ind = this.images.findIndex(el => el.gallery_image_id == image.gallery_image_id)
      if (ind <= 0) return
      this.images.splice(ind, 1)
      this.orderImages()
      this.reorderImages()
    },
    async moveup (image) {
      let ind = this.images.findIndex(el => el.gallery_image_id == image.gallery_image_id)
      if (ind <= 0) return
      this.images.splice(ind, 1)
      ind--
      this.images.splice(ind, 0, image)
      // then we would reorder and upload them
      this.orderImages()
      this.reorderImages()
    },
    orderImages () {
      let rating = 0
      for (let im of this.images) {
        im.rating = rating++
      }
    },
    sortimages () {
      this.images.sort((el, el1) => { return el.rating - el1.rating })
    },
    async reorderImages () {
      let nums = []
      for (let item of this.images) {
        nums.push(item.gallery_image_id)
      }
      let res = await this.$apix.post('SortArtistGallery', { ids: nums })
      console.log(res.data.d)
    },
    async handleDrop (data) {
      if (data.src == data.dest) {
        return
      }
      let srcIndex = this.images.findIndex(el => el.gallery_image_id == data.src)
      let destIndex = this.images.findIndex(el => el.gallery_image_id == data.dest)
      console.log('handling drop', srcIndex, 'to', destIndex)
      let [removed] = this.images.splice(srcIndex, 1)
      this.images.splice(destIndex, 0, removed)
      this.orderImages()
      this.reorderImages()
    },
    async movedown (image) {
      let ind = this.images.findIndex(el => el.gallery_image_id == image.gallery_image_id)
      if (ind < 0) return
      if (ind >= this.images.length - 1) {
        return
      }
      this.images.splice(ind, 1)
      ind++
      this.images.splice(ind, 0, image)
      this.orderImages()
      this.reorderImages()
    },
    async init () {
      let res = await this.$apix.post('GetStyleGalleries')
      this.galleries = res.data.d
      this.galleries = this.galleries.filter(el => !el.anim)
    },
    async loadData () {
      try {
        let res = await this.$apix.post('GetLoggedArtist')
        this.artistName = res.data.d
        this.galleryId = this.id
        res = await this.$apix.post('GetUserNewGalleryImages', { galleryId: this.id })
        this.images = res.data.d
        this.sortimages()
      } catch (ex) {
        console.log('error getting data', ex)
      }
    }
  },
  watch: {
    id () {
      this.loadData()
    },
    galid () {
      if (this.galid) {
        this.setGallery(this.galid)
      }
    }
  }
}
</script>

<style>
.image-grid{
  display:flex;
  flex-wrap: wrap;
  margin:10px -5px;
}

.image-grid > div{
  margin:5px;
  border:2px solid #fff;
  cursor:pointer;
}

.image-grid > div:hover{
  box-shadow:0 0 3px rgba(0,0,0,0.5);
}

.greybar{
  background-color:#ddd;
  padding:4px;
  display:flex;
  opacity:0.3;
  transition:opacity 0.1s linear;
}

.image-grid > div:hover .greybar{
  opacity:1;
}

.greybar .rating{
  flex-grow:1;
  text-align:right;
}

.image-grid > div:nth-child(-n+5){
  border:2px solid red;
}

.wide-berth{
  max-width:80vw;
}
</style>
