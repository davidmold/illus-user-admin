<template>
  <div class="image-gallery-window">
    <div class="closebox" v-on:click="$emit('close')"></div>
    <div v-if="image">
      <on-off-button v-for="gallery in galleries" :key="gallery.gallery_id" @input="toggle(gallery.gallery_id)" :value="isSelected(gallery.gallery_id)">{{  gallery.name }}</on-off-button>
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
    image: Object,
    anim: Boolean,
    illus: Boolean
  },
  data () {
    return {
      galleries: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const all = await this.$post('GetUserStyleGalleries')
      if (this.illus) {
        this.galleries = all.filter(el => !el.anim)
      } else if (this.anim) {
        this.galleries = all.filter(el => el.anim)
      } else {
        this.galleries = all
      }
    },
    isSelected (galid) {
      return this.image.Galleries.includes(galid)
    },
    async toggle (galid) {
      let wh = this.image.Galleries.indexOf(galid)
      if (wh >= 0) {
        this.image.Galleries.splice(wh, 1)
      } else {
        this.image.Galleries.push(galid)
      }
      const res = await this.$post('UpdateImageStyleGalleries', { imageId: this.image.Id, galleries: this.image.Galleries })
      if (res !== 'OK') {
        this.$showMessage(res)
      }
    }
  }

}
</script>

<style>
.image-gallery-window {
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
