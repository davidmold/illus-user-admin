<template>
  <div class="galleryRow" @click="handleClick">
    <div style="margin:2px" v-if="gallery">
      <div>
        <strong>{{  prefix  }}
          {{ gallery.name }}
        </strong><br>
        <span style="color:#666">{{ count }} items.</span>
      </div>
    </div>
    <div class="imagerow">
      <div class="minigalpic" v-for="image in images" :key="image.Id">
        <img :src="image.AdminThumbnail">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gallery: Object
  },
  data () {
    return {
      images: [],
      count: 0
    }
  },
  created () {
    this.loadData()
  },
  computed: {
    prefix () {
      if (this.gallery && this.gallery.Animation) {
        return 'Animation &gt; '
      }
      return ''
    }
  },
  methods: {
    handleClick () {
      this.$emit('select', this.gallery.gallery_id)
    },
    async loadData () {
      if (this.gallery.gallery_id) {
        const res = await this.$apix.post('GetUserGalleryImages', { galid: this.gallery.gallery_id })
        this.images = res.data.d.images
        this.count = res.data.d.count
      }
    }
  },
  watch: {
    gallery () {
      if (this.gallery) {
        this.loadData()
      }
    }
  }
}
</script>

<style>
.minigalpic img {
  width: 50px;
}

.galleryRow {
  cursor:pointer;
}

.galleryRow:hover {
  background-color:#fff;
}
</style>
