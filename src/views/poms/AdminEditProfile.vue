<template>
  <div>
    <h1>Edit Artist Contact Details for {{ artist.FormattedName }}</h1>
    <artist-contact-details-editor admin :artistId="artist.Id" />
  </div>
</template>

<script>
import ArtistContactDetailsEditor from '@/panels/ArtistContactDetailsEditor.vue'
export default {
  components: {
    ArtistContactDetailsEditor
  },
  computed: {
    artist () {
      return this.$store.state.poms.selectedArtist
    }
  }
}
</script>

<style>

</style>
