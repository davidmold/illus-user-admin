<template>
  <div>
    <div v-show="value">
      <div class="blackout" :class="{visible: showme}" v-on:click="closeDown" >
        <div class="panel-holder" v-on:click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data () {
    return {
      showme: false
    }
  },
  methods: {
    async openUp () {
      await this.$k.waitfor(200)
      this.showme = true
    },
    async closeDown () {
      this.showme = false
      await this.$k.waitfor(300)
      this.$emit('input', false)
    }
  },
  watch: {
    value () {
      if (this.value) {
        this.openUp()
      } else {
        this.closeDown()
      }
    }
  }
}
</script>

<style>
.blackout{
  position:fixed;
  background-color:rgba(0,0,0,0.5);
  z-index:5000;
  opacity:0;
  transition:opacity 0.3s ease;
  cursor:pointer;
  width: 100vw;
  height:100vh;
  top:0;
  left:0;
  display:flex;
  justify-content:center;
  align-items:center;
}

.blackout.visible{
  opacity:1;
}

.panel-holder{
  background-color:#fff;
  max-width:95vw;
  max-height:95vh;
  z-index:5010;
  cursor:default;
  padding:45px;
  overflow-y:auto;
  box-sizing:border-box;
}
</style>
