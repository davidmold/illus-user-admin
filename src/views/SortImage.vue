<template>
  <div>
    <p>Sort the items by dragging and dropping them into the correct order.</p>
    <p>
      <router-link v-if="anim" to="/admin/user_admin/vue/sort-images">Image Portfolio</router-link>
      <span v-if="!anim">Image Portfolio</span> |
      <router-link v-if="!anim" to="/admin/user_admin/vue/sort-animations">Animation Portfolio</router-link>
      <span v-if="anim">Animation Portfolio</span>
    </p>
    <draggable v-model="images" @change="saveOrder" class="sortable-area">
      <div class="sort-img" v-for="(image, index) in images" :key="image.Id">
        <img :src="getThumbnail(image)" :alt="image.Alt">
        <div class="index">{{  (index+1) }}</div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    anim: Boolean
  },
  components: {
    draggable
  },
  data () {
    return {
      images: []
    }
  },
  created () {
    this.reloadImages()
  },
  methods: {
    async reloadImages () {
      const ims = await this.$post('GetUserPortfolioImages', { anim: this.anim })
      this.images = ims.filter(el => el.Live && el.IllusWeb)
    },
    getThumbnail (image) {
      if (!image) {
        return ''
      }
      return this.$k.getBestUnmarkedThumbnail(image, 400, false)
    },
    setPageHeader () {
      if (this.anim) {
        this.$store.commit('setPageTitle', 'Sort Portfolio Animations')
        return
      }
      this.$store.commit('setPageTitle', 'Sort Portfolio Images')
    },
    async saveOrder () {
      const arr = []
      for (let i = 0; i < this.images.length; i++) {
        arr.push(this.images[i].Id)
      }
      await this.$post('SortIntImages', { ids: arr })
    }
  },
  watch: {
    anim () {
      this.reloadImages()
    }
  }
}
</script>

<style>
.sort-img {
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
  cursor:pointer;
}

.sort-img img {
  max-width:160px;
  max-height:160px;
  display:block;
}

.sort-img .index {
  position:absolute;
  text-align:center;
  top:5px;
  right:5px;
  background-color:rgba(255,255,255,0.5);
  color:#000;
  padding:4px;
  border-radius:4px;
}

.sortable-area {
  display:flex;
  flex-wrap: wrap;
}
</style>
