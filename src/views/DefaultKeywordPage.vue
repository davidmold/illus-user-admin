<template>
  <div>
    <p>
      <router-link to="/admin/user_admin/vue/upload-multiple">Upload Multiple Images</router-link> |
      <router-link to="/admin/user_admin/vue/upload-image">Upload One Image</router-link>
    </p>
    <p>
      Set up or edit the default keywords used applied to new uploads here:
    </p>

    <default-keywords></default-keywords>
  </div>
</template>

<script>
import DefaultKeywords from '../components/DefaultKeywords.vue'
export default {
  components: {
    DefaultKeywords
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Default keywords for uploaded files')
  }
}
</script>

<style>

</style>
