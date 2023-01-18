<template>
  <div>
    <user-admin></user-admin>
    <main-menu></main-menu>
    <div class="artist-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import UserAdmin from './UserAdmin.vue'
import MainMenu from '../components/MainMenu.vue'

export default {
  components: {
    UserAdmin,
    MainMenu
  }
}
</script>

<style>
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
