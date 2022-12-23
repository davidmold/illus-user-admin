<template>
  <div class="snav-holder">
      <div  class="supernav" id="left">
        <user-admin-menu menutitle="portfolio" :selectedMenu="selectedMenu" @select="handleSelectMenu">
          <li class="home"><router-link to="/admin/user_admin/vue/edit-text">portfolio details</router-link></li>
          <li class="home"><router-link to="/admin/user_admin/vue/profile-images">profile images</router-link></li>
          <li class="animation"><router-link to="/admin/user_admin/vue/videos">portfolio TV</router-link></li>
          <li class="photos"><router-link to="/admin/user_admin/vue/order-images">illustration portfolio</router-link></li>
          <li class="photos"><router-link to="/admin/user_admin/vue/sort-images"> - sort portfolio</router-link></li>
          <li class="animation"><router-link to="/admin/user_admin/vue/order-animation">animation portfolio</router-link></li>
          <li class="photos"><router-link to="/admin/user_admin/vue/style-gallery">style galleries</router-link></li>
          <li class="user"><a href="/admin/user_admin/Logout.aspx">log out</a></li>
        </user-admin-menu>
        <user-admin-menu menutitle="manage" :selectedMenu="selectedMenu" @select="handleSelectMenu">
          <li class="email"><router-link to="/admin/user_admin/vue/edit-profile">contact details</router-link></li>
          <li class="photos"><router-link to="/admin/user_admin/vue/commissions">commissions</router-link></li>
          <li class="comments"><router-link to="/admin/user_admin/vue/review-history">review history</router-link></li>
        </user-admin-menu>
        <user-admin-menu menutitle="upload" :selectedMenu="selectedMenu" @select="handleSelectMenu">
          <li class="image"><router-link to="/admin/user_admin/vue/upload-image">image</router-link></li>
          <li class="image"><router-link to="/admin/user_admin/vue/upload-multiple">multiple images</router-link></li>
          <li class="animation"><router-link to="/admin/user_admin/vue/upload-animation">animation</router-link></li>
          <li class="key"><router-link to="/admin/user_admin/vue/default-keywords">default keywords</router-link></li>
        </user-admin-menu>
        <user-admin-menu menutitle="statistics" :selectedMenu="selectedMenu" @select="handleSelectMenu">
          <li><b><router-link to="/admin/user_admin/vue/list-images">image popularity</router-link></b>
            online portfolio and hi res images in order of popularity</li>
          <li><b><router-link to="/admin/user_admin/vue/list-animations">animation popularity</router-link></b>
            your animations in order of popularity</li>
          <li><b><router-link to="/admin/user_admin/vue/homepage-visits">homepage</router-link></b>
            number of recent views of your home page</li>

          <li class="user">
            <b><router-link to="/admin/user-admin/vue/feedback">my feedback</router-link></b>
              see the feedback your clients have left about your work
          </li>
          <li><b><router-link to="/admin/user_admin/vue/artist-gallery-stats">style gallery stats</router-link></b>
            measures clicks on your style gallery images</li>
                  <li><b><router-link to="/admin/user_admin/vue/portfolio-stats">portfolio stats</router-link></b>
            measures clicks on your portfolio images</li>
                  <li><b><router-link to="/admin/user_admin/vue/all-page-stats">A-Z page stats</router-link></b>
            measures clicks on your images on the <a href="https://www.illustrationx.com/artists" target="_blank">All Artists</a> page</li>
        </user-admin-menu>
        <user-admin-menu menutitle="help" :selectedMenu="selectedMenu" @select="handleSelectMenu">
          <li class="email"><router-link to="/admin/user_admin/vue/faqs">faqs</router-link></li>
          <div class="agent-menu-jac">
            <p>
              Hi, just a quick message of support. If you are having any problems at all getting the
              admin site to behave as you would wish, or you'd like to change your lead image,
              please drop me a line and I will do my best to help.
            </p>

            <div class="ap-signoff">
              <div class="agent-name">Jac Lott<br />
                  <a href="mailto:jac@illustrationweb.com">jac@illustrationweb.com</a>
              </div>
              <div class="agent-image"><img src="/ImageScaler.aspx?src=admin&name=26-635018271369810000.jpg&sz=50" /></div>
            </div>
          </div>
        </user-admin-menu>
        <div class="linkbit" @click="goHome">
            <h2>{{ artistName }}</h2>
        </div>
      </div>
    </div>
</template>

<script>
import UserAdminMenu from '../components/UserAdminMenu.vue'
export default {
  components: {
    UserAdminMenu
  },
  data () {
    return {
      selectedMenu: '',
      artistName: ''
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      let res = await this.$apix.post('GetLoggedArtist')
      this.artistName = res.data.d
    },
    handleSelectMenu (menuname) {
      this.selectedMenu = menuname
    },
    hideAgentPopup () {
      this.showAgentPopup = false
    },
    goHome () {
      this.$router.push('/admin/user_admin/vue/').catch(() => {})
    }
  }
}
</script>

<style>
.agent-menu-jac {
  padding:20px;
  width:300px;
}

.agent-menu-jac a{
  color:#fff;
}
</style>
