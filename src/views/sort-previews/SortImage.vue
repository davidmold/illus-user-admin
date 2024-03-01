<template>
  <div ref="thediv" class="image-div">
    <img :src="imageUrl" :alt="alt" class="im-fill-w" draggable="false" @load="handleLoaded" ref="tim"/>
    <div class="rating-box" ref="rbox">{{ image.Rating }}</div>
  </div>
</template>

<script>

export default {

  props: {
    artist: Object,
    image: Object
  },
  data: function () {
    return {
      mwidth: 1024,
      readygif: false,
      beingDropped: false,
      beingDragged: false
    }
  },
  mounted () {
    this.mwidth = window.innerWidth
  },
  computed: {
    imageUrl () {
      if (this.readygif) {
        return this.gifUrl
      }
      return `/ImageScaler.jpg?sz=500&src=fi&name=${this.image.ImageUrl}&image_id=${this.image.Id}&fitw=y`
    },
    gifUrl () {
      if (this.image.Swf) {
        if (this.isGif) {
          return this.image.Swf
        }
      }
      return null
    },
    alt: function () {
      return this.image.Alt
    },
    isGif () {
      if (this.image) {
        if (this.image.Swf) {
          return this.image.Swf.toLowerCase().endsWith('.gif')
        }
      }
      return false
    }
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
    handleLoaded () {
      this.loaded = true
      if (this.$refs.tim) {
        let bb = this.$refs.tim.getBoundingClientRect()
        this.$emit('loaded', { width: bb.width, height: bb.height })
      } else {
        this.$emit('loaded')
      }

      if (this.isGif) {
        this.readygif = true
      }
    },
    getDragData (evt) {
      let data = evt.dataTransfer.getData('text/json')
      try {
        let ret = JSON.parse(data)
        return ret
      } catch (err) {
        console.log('unable to parse', data)
      }
      return null
    },
    handleDragStart (evt) {
      evt.dataTransfer.effectAllowed = 'copy'
      evt.dataTransfer.dropEffect = 'copy'
      let mdata = JSON.stringify(this.image)
      evt.dataTransfer.setData('text/json', mdata)
      this.enableNav(true)
      this.beingDragged = true
    },
    handleDrop (evt) {
      this.beingDropped = false
      let org = this.getDragData(evt)
      if (org) {
        this.$emit('drop', { src: org, dest: this.image })
        this.beingDragged = false
      }
    },
    handleDragEnter (evt) {
      let org = this.getDragData(evt)
      if (!org) {
        this.beingDropped = true
        return false
      }

      if (org.Id !== this.image.Id) {
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
      if (org.Id !== this.image.Id) {
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
.a-name{
  margin-bottom:6px;
  padding-right:20px;
}

.image-div{
  position:relative;
  min-height:110px;
  overflow:hidden;
  background-color:#fff;
  opacity:1;
}

.col .image-div:last-child{
  margin-bottom:0;
}

.image-div.unseen{
  min-height:250px;
}

img.im-fill-w{
  width:100%;
  height:auto;
  display:block;
  min-height:100px;
  cursor:pointer;
  transition:all 0.4s ease;
  pointer-events:none;
}

.image-div:hover img.im-fill-w{
  transform:scale(1.04);
}

img.im-fill-w.loaded{
  opacity:1;
}

.rating-box{
  background-color:red;
  color:#fff;
  position: absolute;
  bottom:0;
  right:0;
  padding:6px;
}

</style>
