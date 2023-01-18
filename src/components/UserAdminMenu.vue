<template>
  <div class="linkbit" style="width:100px" @click.stop="openMenu" @mouseleave="closeMenu">
    <div class="arrow-down"></div>
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
.linkbit {
  transition:all 0.1s linear;
  background-color:#e74d58;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #fff;
  position:absolute;
  top:14px;
  right:8px;
  z-index:10;
  opacity:0.4;
  transition:all 0.1s linear;
}

.linkbit:hover {
  transform: scale(1.1);
  box-shadow:2px 2px 4px rgba(0,0,0,0.5);
  z-index:10;
  border-left:1px solid #e74d58;
}

.linkbit:hover .arrow-down{
  opacity:1;
}

</style>
