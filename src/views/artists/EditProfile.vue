<template>
  <div>
    <p>
      Please note: this information is not published on the web site,
      it is only used by IllustrationX to help us keep in touch with you.
    </p>
    <artist-contact-details-editor />
  </div>
</template>

<script>
import ArtistContactDetailsEditor from '@/panels/ArtistContactDetailsEditor.vue'
export default {
  components: {
    ArtistContactDetailsEditor
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Your contact details')
  }
}
</script>

<style>

</style>
