<template>
  <div>
    <poms-header />
    <div id="content" class="v-content">
      <div id="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

import PomsHeader from './PomsHeader.vue'
export default {
  components: {
    PomsHeader
  }
}
</script>

<style>
#content.v-content{
  margin-top:130px;
}
</style>
