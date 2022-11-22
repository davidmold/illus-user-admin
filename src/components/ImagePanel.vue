<template>
 <div class="image-holder">
    <img :src="thumbnail" class="fitter" />
  </div>
</template>

<script>
export default {
  props: {
    image: {},
    cropimages: Boolean
  },
  computed:
  {
    thumbnail () {
      if (this.cropimages) {
        return `/ImageScaler.jpg?sz=170&src=fi&name=${this.image.ImageUrl}&crop=y&image_id=${this.image.Id}`
      }
      return `/ImageScaler.jpg?sz=170&src=fi&name=${this.image.ImageUrl}&image_id=${this.image.Id}`
    }
  }
}
</script>

<style>
.image-holder{
  width:172px;
  height:172px;
  margin:0;
  position:relative;
  box-sizing: border-box;
  border:1px solid #ccc;
  background-image: linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.image-holder .fitter{
  max-width:170px;
  max-height:170px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  display:block;
}
</style>
