<template>
  <div ref="thediv" class="dropbox" draggable="true" v-on:dragstart="handleDragStart($event)" v-on:dragover.prevent="handleDragover($event)"
    v-on:drop.prevent="handleDrop($event)"
    v-on:dragenter.prevent="handleDragEnter($event)"
    v-on:dragexit.prevent="handleDragExit($event)"
    v-on:dragleave="handleDragExit($event)"
    v-on:dragend="handleDragEnd($event)"
    :class="{ beingDropped: beingDropped}"
    >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data: function () {
    return {
      mwidth: 1024,
      beingDropped: false,
      beingDragged: false
    }
  },
  mounted () {
    this.mwidth = window.innerWidth
  },
  methods: {
    enableNav (val) {
      let nav = document.querySelector('.header-holder')
      if (nav) {
        if (val) {
          nav.style.display = 'none'
        } else {
          nav.style.display = 'block'
        }
      }
    },
    getDragData (evt) {
      let data = evt.dataTransfer.getData('text/json')
      try {
        let ret = JSON.parse(data)
        return ret
      } catch (err) {
        // console.log('unable to parse', data)
      }
      return null
    },
    handleDragStart (evt) {
      evt.dataTransfer.effectAllowed = 'copy'
      evt.dataTransfer.dropEffect = 'copy'
      let mdata = JSON.stringify({ id: this.id })
      evt.dataTransfer.setData('text/json', mdata)
      this.enableNav(true)
      this.beingDragged = true
    },
    handleDrop (evt) {
      this.beingDropped = false
      let org = this.getDragData(evt)
      if (org) {
        this.$emit('drop', { src: org.id, dest: this.id })
        this.beingDragged = false
      }
    },
    handleDragEnter (evt) {
      let org = this.getDragData(evt)
      if (!org) {
        this.beingDropped = true
        return false
      }

      if (org.id !== this.id) {
        this.beingDropped = true
        return false
      }
      this.beingDropped = false
      return true
    },
    handleDragExit () {
      this.beingDropped = false
      return false
    },

    handleDragover (evt) {
      let org = this.getDragData(evt)
      if (!org) {
        return false
      }
      if (org.id !== this.id) {
        this.beingDropped = true
        return false
      }
      this.beingDropped = false
      return true
    },
    handleDragEnd () {
      this.beingDragged = false
      this.enableNav(false)
    }
  }
}
</script>

<style scoped>

.dropbox{
  position:relative;

}

.dropbox.beingDropped{
  box-shadow:0 0 5px rgb(0,0,0);
}

</style>
