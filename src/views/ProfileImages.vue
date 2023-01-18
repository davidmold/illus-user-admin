<template>
  <div>
    <p>
      Please only upload JPEG images in the RGB color space, and with the file extension .jpg.
    </p>
    <p>
      The files should be at least 700 pixels wide. It will work best if your profile image
      is square, as it will be shown in a rounded mask as shown below.
    </p>
    <h2>Replace Profile Image</h2>
    <div class="roundel">
      <img :src="profile">
    </div>
    <div>
      Alt text: <input type="text" v-model="profileAlt" size="80" placeholder="Alt text for profile image" >
    </div>
    <one-image-uploader fileurl="ProfileUploader.ashx" filekind="profile" prompt="Drag profile image here or use the Browse button below to select." @uploaded="reloadImages"></one-image-uploader>
    <h2>Replace Studio Image</h2>

    <div class="squarel">
      <img :src="studio">
    </div>
    <div>
      Alt text: <input type="text" v-model="studioAlt" size="80" placeholder="Alt text for studio image">
    </div>
    <one-image-uploader fileurl="ProfileUploader.ashx" filekind="studio" prompt="Drag profile image here or use the Browse button below to select." @uploaded="reloadImages"></one-image-uploader>
  </div>
</template>

<script>

import OneImageUploader from '../components/OneImageUploader.vue'
export default {
  components: {
    OneImageUploader
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Profile images')
  },
  data () {
    return {
      profile: null,
      studio: null,
      profileAlt: '',
      studioAlt: ''
    }
  },
  created () {
    this.reloadImages()
  },
  methods: {
    async reloadImages () {
      const res = await this.$post('GetArtistProfileImages')
      this.profile = res.profile
      this.studio = res.studio
      this.profileAlt = res.profileAlt
      this.studioAlt = res.studioAlt
    }
  }
}
</script>

<style>
.roundel {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  overflow: hidden;
  transition: all .2s ease;
  margin: 0;
  margin-bottom:10px;
}

.roundel img {
  object-fit: cover;
  height:100%;
  width:100%;
}

.squarel {
  width:200px;
}

.squarel img {
  width:100%;
  margin-bottom:10px;
}
</style>
