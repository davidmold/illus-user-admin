<template>
  <div>
    <p>
      Want to appear in different galleries? Select your <router-link to="/admin/user_admin/vue/selected-galleries">style galleries</router-link>.
    </p>
    <P>
      The Style Galleries are the most popular search area on the site and take the shape of a hybrid search facility that offers the following general areas:
    </p>
    <div class="minigallery">
      <gallery-row v-for="gal in gals" :key="gal.gallery_id" :gallery="gal" @select="updateSelectedGallery">
      </gallery-row>
    </div>
    <artist-galleries :galid="selectedGallery"></artist-galleries>
  </div>
</template>

<script>
import GalleryRow from '../components/GalleryRow.vue'
import ArtistGalleries from './ArtistGalleries.vue'
export default {
  components: {
    GalleryRow,
    ArtistGalleries
  },
  created () {
    this.loadData()
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Change the order or remove images from your Style Gallery')
  },
  data () {
    return {
      gals: [],
      selectedGallery: 0
    }
  },
  methods: {
    async loadData () {
      const res = await this.$apix.post('GetUserStyleGalleries')
      this.gals = res.data.d
    },
    updateSelectedGallery (gid) {
      console.log('selected gallery', gid)
      this.selectedGallery = gid
    }
  }
}
</script>

<style>

</style>
