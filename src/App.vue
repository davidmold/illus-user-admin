<template>
  <div id="app">
    <div>
      <user-admin></user-admin>
      <main-menu></main-menu>
      <div class="artist-view">
        <router-view />
      </div>
    </div>
    <div class="message-lightbox" v-show="$store.state.messagebox.show" v-on:click="$hideMessage">
      <div class="messagebox" v-on:click.stop>
        <div class="message-pad">
          <div><img src="/admin/img/illustrationx.svg" style="width:200px" /></div>
          <div>
            {{ $store.state.messagebox.message }}
          </div>
          <div>
            <small-button v-on:click="$hideMessage">OK</small-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/css/x.css'
import '@/css/video.css'
import '@/css/admin.css'
import UserAdmin from './masterpages/UserAdmin.vue'
import MainMenu from './components/MainMenu.vue'

// we check the user is logged in in the main menu

export default {
  components: {
    UserAdmin,
    MainMenu
  },
  data () {
    return {
      version: process.env.VUE_APP_VERSION
    }
  },
  created () {
    console.log('route', this.$route.path)
  }
}
</script>
<style>

#app {
  max-width:100%;
  box-sizing: border-box;
}

.message-lightbox{
  position:fixed;
  z-index:1020;
  width:100vw;
  height:100vh;
  top:0;
  left:0;
  background-color:rgba(0,0,0,0.4);
  cursor:pointer;
}
.messagebox{
  position:fixed;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index:1030;
  background-color:#fff;
  cursor:auto;
}
.message-pad{
  padding:20px;
}

.message-pad div{
  padding:12px;
}

.loggedArtist{
  background-color:#ce0e2d;
  padding:3px 8px;
  color:#fff;
  display:inline-block;
}

.padded{
  font-size:14px;
  line-height:19px;
}

.artist-view {
  max-width:1200px;
  width:100%;
  margin-top:40px;
  margin-left:auto;
  margin-right:auto;
  padding:0 20px;
  padding-bottom:100px;
  box-sizing: border-box;
}
</style>
