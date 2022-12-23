<template>
  <div class="linkbit" style="width:100px" @click.stop="openMenu" @mouseleave="closeMenu">
    <h2>{{ menutitle }}</h2>
    <ul v-show="open">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menutitle: String,
    selectedMenu: String
  },
  computed: {
    open () {
      return this.selectedMenu === this.menutitle
    }
  },
  methods: {
    openMenu () {
      this.$emit('select', this.menutitle)
      document.body.addEventListener('click', this.closeMenu)
    },
    closeMenu () {
      this.$emit('select', '')
      document.body.removeEventListener('click', this.closeMenu)
    }
  }
}
</script>

<style>

</style>
