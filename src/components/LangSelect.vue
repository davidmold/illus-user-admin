<template>
  <select v-model="mlang" v-on:change="$emit('input', mlang)">
    <option value="UK">UK English</option>
    <option value="US">US English</option>
    <option value="FR">France</option>
    <option value="CN">China</option>
    <option value="AU">Australia</option>
    <option value="BR">Brazil</option>
    <option value="SX">South America</option>
    <option value="IN">India</option>
    <option value="DE">Germany</option>
    <option value="SG">SE Asia</option>
  </select>
</template>

<script>
export default {
  props: {
    value: String
  },
  data () {
    return {
      mlang: 'UK'
    }
  },
  created () {
    if (this.value) {
      this.mlang = this.value
    }
  },
  watch: {
    value () {
      this.mlang = this.value
    }
  }
}
</script>

<style>

</style>
