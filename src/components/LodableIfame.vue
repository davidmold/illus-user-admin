<template>
  <iframe ref="wbframe" :src="src" class="workbench-iframe" @load="resizeIframe" scrolling="no"></iframe>
</template>

<script>
export default {
  props: {
    src: String
  },
  methods: {
    resizeIframe () {
      const f = this.$refs.wbframe
      f.style.height = f.contentWindow.document.documentElement.scrollHeight + 'px'
    }
  }
}
</script>

<style>
.workbench-iframe {
  width:100%;
  box-sizing:border-box;
  border:0;
  height:100vh;
}
</style>
