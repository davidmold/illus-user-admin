<template>
  <div class="crop-window">
    <div class="closebox" v-on:click="$emit('close')"></div>
    <div
      style="float:left;margin-right:20px;padding-right:20px;padding-left:10px;border-right:1px solid #cccccc"
    >
      <div id="placer" style="position:relative;height:400px;">
        <div id="cropArea" ref="thumbElement"
          style="visibility:hidden;position:absolute;top:0px;left:0px;width:200px;height:200px;cursor:pointer;"
          v-on:mousedown.prevent="thumbDown($event)"
          v-on:mouseup.prevent="thumbUp($event)"
        >
          <img id="whiteBox" ref="wbox" style="width:200px;height:200px;" src="/ximg/cropsquare.png" />
        </div>
        <div id="cropApplet">
          <img id="dragImage" ref="dgim" :src="thumbSrc" v-on:load="setCropArea();"  />
        </div>
      </div>
    </div>
    <div style="float:left;">
      <div
        id="debug"
        style="height:30px;width:200px;padding:4px;border:1px solid #666666"
      >{{ debug}}</div>
      <br />
      <small-button v-on:click="submitData">Set Crop</small-button>
      <br />
      <br />
      <div id="croppedImage">
        <img :src="cropImageUrl" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageid: Number
  },
  data () {
    return {
      debug: '',
      thumbSrc: null,
      cropImageUrl: null,
      landscape: false,
      imageHeight: 0,
      imageWidth: 0,
      webimage: null,
      mouseState: 0,
      mouseXRel: 0,
      mouseYRel: 0,
      downInThumb: false,
      oldRect: {
        x: 0,
        y: 0
      },
      downInBox: false
    }
  },
  mounted () {
    document.onmousemove = this.thumbMove
    document.onmouseup = this.thumbUp
  },
  methods: {
    thumbMove (evt) {
      if (this.downInThumb) {
        this.moveThumb(evt.clientX, evt.clientY)
        return false
      }
    },
    thumbDown (event) {
      console.log('thumbDown')
      this.mouseState = 1
      this.mouseXRel = event.clientX
      this.mouseYRel = event.clientY
      this.downInThumb = true
      this.oldRect.x = this.$refs.thumbElement.offsetLeft
      this.oldRect.y = this.$refs.thumbElement.offsetTop
      let rect = this.$refs.thumbElement.getBoundingClientRect()
      this.oldRect.width = rect.width
      this.oldRect.height = rect.height

      let right = rect.x + rect.width - 20
      let bottom = rect.y + rect.height - 20
      if ((event.clientX > right) && (event.clientY > bottom)) {
        this.downInBox = true
      }
      return false
    },
    thumbUp (evt) {
      if (this.downInThumb) {
        this.mouseXRel = evt.clientX
        this.mouseYRel = evt.clientY
      }
      this.downInThumb = false
      this.downInBox = false
    },
    updateValues () {
      let r = this.$refs.thumbElement
      this.debug = `left: ${r.offsetLeft}, top: ${r.offsetTop}, sz: ${r.offsetWidth}`
    },
    moveThumb (x, y) {
      let rect = this.$refs.thumbElement.getBoundingClientRect()
      let dgim = this.$refs.dgim.getBoundingClientRect()
      let movex = x - this.mouseXRel
      let movey = y - this.mouseYRel
      if (this.downInBox) {
        let newh = this.oldRect.height + movey
        if (newh < 175) {
          newh = 175
        }
        let min = Math.min(dgim.width, dgim.height)
        if (newh > min) {
          newh = min
        }
        this.debug = `newh: ${newh}, x: ${x}`
        this.$refs.thumbElement.style.width = newh + 'px'
        this.$refs.thumbElement.style.height = newh + 'px'
        let whiteBox = document.getElementById('whiteBox')
        if (whiteBox) {
          whiteBox.style.width = newh + 'px'
          whiteBox.style.height = newh + 'px'
        }
        this.updateValues()
        return
      }
      let newx = this.oldRect.x + movex
      let newy = this.oldRect.y + movey

      if (newx < 0) {
        newx = 0
      }
      if (newx + rect.width > dgim.width) {
        newx = dgim.width - rect.width
      }
      if (newy < 0) {
        newy = 0
      }
      if (newy + rect.height > dgim.height) {
        newy = dgim.height - rect.height
      }
      this.$refs.thumbElement.style.left = newx + 'px'
      this.$refs.thumbElement.style.top = newy + 'px'
      this.updateValues()
    },
    setCropArea () {
      let img = this.$refs.dgim
      console.log('loaded image', img)
      this.imageWidth = img.width
      this.imageHeight = img.height
      this.landscape = img.width >= img.height
      let thumbElement = document.getElementById('cropArea')
      var myx = 0
      var myy = 0
      var sz = 0
      if (this.webimage.CropW == 0) {
        sz = img.width
        if (img.width > img.height) {
          sz = img.height
        }
        myy = (img.height / 2) - (sz / 2)
        myx = (img.width / 2) - (sz / 2)
      } else {
        myx = this.webimage.CropX
        myy = this.webimage.CropY
        sz = this.webimage.CropW
      }
      this.setCropSize(sz)
      this.positionCropAreaAbsolute(myx, myy)
      thumbElement.style.visibility = 'visible'
      this.updateValues()
    },
    async submitData () {
      let r = this.$refs.thumbElement
      let res = await this.$apix.post('SetCrop', { imageId: this.imageid, left: r.offsetLeft, top: r.offsetTop, sz: r.offsetWidth })
      if (res.data.d === 'ok') {
        this.cropImageUrl = this.$k.getBestUnmarkedThumbnail(this.webimage, 175, true) + '&t=' + new Date().getTime()
      }
    },
    positionCropAreaAbsolute (left, top) {
      let thumbElement = document.getElementById('cropArea')
      thumbElement.style.left = left + 'px'
      thumbElement.style.top = top + 'px'
    },
    setCropSize (sz) {
      let thumbElement = this.$refs.thumbElement
      thumbElement.style.width = sz + 'px'
      thumbElement.style.height = sz + 'px'
      let whiteBox = document.getElementById('whiteBox')
      if (whiteBox) {
        whiteBox.style.width = sz + 'px'
        whiteBox.style.height = sz + 'px'
      }
    },
    async loadData () {
      if (this.imageid) {
        let res = await this.$apix.post('GetWebImage', { id: this.imageid })
        this.webimage = res.data.d
        this.thumbSrc = this.$k.getBestUnmarkedThumbnail(this.webimage, 400, false)
        this.cropImageUrl = this.$k.getBestUnmarkedThumbnail(this.webimage, 175, true)
      }
    }
  },
  watch: {
    imageid: {
      immediate: true,
      handler: function () {
        this.loadData()
      }
    }
  }
}
</script>

<style scoped>
.crop-window {
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  z-index:1010;
  min-width:800px;
}

#cropapplet {
  position: absolute;
  width: 410px;
  height: 446px;
}

#loa dmessage {
  position: absolute;
  width: 410px;
  height: 446px;
}

.dragHandle {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid #888888;
  background-color: Black;
  z-index: 100;
}
</style>
