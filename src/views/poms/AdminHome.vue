<template>
  <div>
    <h1>This is the Vue admin home page</h1>
    <p>Hello World</p>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log('route', this.$route.path)
  }
}
</script>

<style>

</style>
