<template>
  <div>
    <p>Sort the items by dragging and dropping them into the correct order.</p>

    <div style="display:flex" v-if="artist">
      <div v-if="!artist.VideoInPortfolio">
        <router-link v-if="anim" to="/admin/user_admin/vue/sort-images">Image Portfolio</router-link>
        <span v-if="!anim">Image Portfolio</span> |
        <router-link v-if="!anim" to="/admin/user_admin/vue/sort-animations">Animation Portfolio</router-link>
        <span v-if="anim">Animation Portfolio</span>
      </div>
      <div v-if="artist.VideoInPortfolio">
        <span>Combined Portfolio</span>
      </div>
    </div>
    <div class="flex-buttons-si">
      <div class="grid-buttons">
        <div class="grid-button one" title="Single column" @click="changeColumns(1)" :class="{sel: numColumns === 1}"></div>
        <div class="grid-button two" title="Two columns" @click="changeColumns(2)" :class="{sel: numColumns === 2}"></div>
        <div class="grid-button three" title="Three columns" @click="changeColumns(3)" :class="{sel: numColumns === 3}"></div>
        <div class="grid-button four" title="Four columns" @click="changeColumns(4)" :class="{sel: numColumns === 4}"></div>
      </div>
    </div>
    <draggable v-model="images" @change="saveOrder" class="sortable-area" :class="widthClass">
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
    anim: Boolean,
    combined: Boolean
  },
  components: {
    draggable
  },
  data () {
    return {
      images: [],
      artist: {},
      numColumns: 4
    }
  },
  computed: {
    combi () {
      if (!this.artist) {
        return this.combined
      }
      return this.combined || this.artist.VideoInPortfolio
    },
    widthClass () {
      return 'w' + this.numColumns
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.setPageHeader()
  },
  methods: {
    async init () {
      this.artist = await this.$store.dispatch('fetchLoggedArtist')
      if (this.artist === null) {
        window.location = '/admin/user_admin/login'
        return
      }
      this.reloadImages()
    },
    async reloadImages () {
      const ims = await this.$post('GetUserPortfolioImages', { anim: this.anim, combined: this.combi })
      this.images = ims.filter(el => el.Live && el.IllusWeb)
    },
    changeColumns (val) {
      this.numColumns = val
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
  width:200px;
  height:200px;
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
  max-width:100%;
  max-height:100%;
  display:block;
}

.w3 .sort-img{
  width: 266px;
  height:266px;
}

.w2 .sort-img {
  width: 400px;
  height:400px;
}

.w1 .sort-img {
  width:400px;
  height:400px;
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
  width:850px;
}

.sortable-area.w4 {
  width:850px;
}

.sortable-area.w3 {
  width:850px;
}

.sortable-area.w1{
  width:450px;
}

.flex-buttons-si{
    display:flex;
    margin-bottom:16px;
    max-width:1750px;
    margin-left:auto;
    margin-right:auto;
    margin-top:20px;
  }

.grid-buttons{
  flex-grow:1;
  display:flex;
}

.grid-button{
    width:30px;
    height:30px;
    cursor:pointer;
    background-image:url('../assets/img/grid-1.svg');
    background-size:contain;
    margin-right:8px;
  }

  .grid-button.two {
    background-image:url('../assets/img/grid-2.svg');
  }
  .grid-button.three {
    background-image:url('../assets/img/grid-3.svg');
  }
  .grid-button.four {
    background-image:url('../assets/img/grid-4.svg');
  }

  .grid-button:hover, .grid-button.sel{
    background-image:url('../assets/img/grid-1-sel.svg');
  }

  .grid-button.two:hover, .grid-button.two.sel{
    background-image:url('../assets/img/grid-2-sel.svg');
  }

  .grid-button.three:hover, .grid-button.three.sel{
    background-image:url('../assets/img/grid-3-sel.svg');
  }

  .grid-button.four:hover, .grid-button.four.sel{
    background-image:url('../assets/img/grid-4-sel.svg');
  }
</style>
