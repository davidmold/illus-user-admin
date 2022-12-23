<template>
  <lodable-ifame-vue :src="src"></lodable-ifame-vue>
</template>

<script>
import LodableIfameVue from '../components/LodableIfame.vue'

export default {
  components: {
    LodableIfameVue
  },
  props: {
    src: String
  }
}
</script>

<style>

</style>
