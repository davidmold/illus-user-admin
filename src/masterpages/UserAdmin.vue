<template>
  <div v-on:click="closeAllMenus">
    <div class="helpwallhugger"><div class="helprot270">Help</div><div class="rhPlus hlp">?</div></div>
    <div class="agentpopup useradmin">
        <div class="cbox"></div>
        Hi, just a quick message of support. If you are having any problems at all getting the
        admin site to behave as you would wish, or you’d like to change your lead image,
        please drop me a line and I will do my best to help.
        <div class="ap-signoff">
          <div class="agent-name">Jac Lott<br />
              <a href="mailto:jac@illustrationweb.com">jac@illustrationweb.com</a>
          </div>
          <div class="agent-image"><img src="/ImageScaler.aspx?src=admin&name=26-635018271369810000.jpg&sz=50" /></div>
        </div>
    </div>
    <div class="header-holder">
        <div class="snav-holder">
          <div  class="supernav" id="left" style="position:absolute">
            <div class="linkbit" style="width:150px" id="as4">
              <h2 v-on:click.stop="openMenu('portfolio')">portfolio</h2>
              <ul v-show="menu.portfolio">
                <li class="home"><router-link to="/admin/user_admin/vue/edit-text">portfolio details</router-link></li>
                <li class="home"><a href="/admin/user_admin/ProfileImages.aspx">profile images</a></li>
                <li class="animation"><a href="/admin/user_admin/Videos.aspx">portfolio TV</a></li>
                <li class="photos"><a href="/admin/user_admin/OrderImages.aspx?anim=N">illustration portfolio</a></li>
                <li class="photos"><a href="/admin/user_admin/SortImages.aspx"> - sort portfolio</a></li>
                <li class="photos"><a href="/admin/user_admin/HeroImageCrop.aspx"> - hero image crop</a></li>
                <li class="animation"><a href="/admin/user_admin/OrderImages.aspx?anim=Y">animation portfolio</a></li>
                <li class="photos"><a href="/admin/user_admin/EditStyleGallery.aspx">style galleries</a></li>
                <li class="user"><router-link to="/admin/user_admin/Logout.aspx">log out</router-link></li>
              </ul>
            </div>
            <div class="linkbit" style="width:150px"
                id="as0" >
              <h2 v-on:click.stop="openMenu('manage')">manage:</h2>
              <ul v-show="menu.manage">
                <li class="email"><router-link to="/admin/user_admin/vue/edit-profile">email preferences
                    and contact details</router-link></li>
                <li class="photos"><router-link to="/admin/user_admin/vue/commissions">commissions</router-link></li>
                <li class="comments"><router-link to="/admin/user_admin/vue/review-history">review history</router-link></li>
              </ul>
            </div>
            <div class="linkbit" style="width:150px"
                id="as1" >
              <h2 v-on:click.stop="openMenu('upload')">upload</h2>
              <ul v-show="menu.upload">
                <li class="image"><a href="/admin/user_admin/UploadPortfolioImage.aspx">image</a></li>
                <li class="image"><a href="/admin/user_admin/MultipleDrag.aspx">multiple images</a></li>
                <li class="animation"><a href="/admin/user_admin/UploadAnimation.aspx">animation</a></li>
                <li class="key"><a href="/admin/user_admin/DefaultKeywordsEdit.aspx">default keywords</a></li>
              </ul>
            </div>
            <div class="linkbit" style="width:150px"
                id="as2" >
              <h2 v-on:click.stop="openMenu('statistics')">statistics:</h2>
              <ul v-show="menu.statistics">
                <li onclick="window.location='/admin/user_admin/ListImages.aspx'"><b><a href="/admin/user_admin/ListImages.aspx">image popularity</a></b>
                  online portfolio and hi res images in order of popularity</li>

                <li onclick="window.location='/admin/user_admin/ListAnimations.aspx'"><b><a href="/admin/user_admin/ListAnimations.aspx">animation popularity</a></b>
                  your animations in order of popularity</li>
                <li onclick="window.location='/admin/user_admin/HomepageVisits.aspx'"><b><a href="/admin/user_admin/HomepageVisits.aspx">homepage</a></b>
                  number of recent views of your home page</li>

                <li class="user">
                  <b><router-link to="/admin/user-admin/vue/feedback">my feedback</router-link></b>
                    see the feedback your clients have left about your work
                </li>
                <li onclick="window.location='/admin/user_admin/ArtistGalleryStats.aspx'"><b><a href="/admin/user_admin/ArtistGalleryStats.aspx">style gallery stats</a></b>
                  measures clicks on your style gallery images</li>
                        <li onclick="window.location='/admin/user_admin/PortfolioStats.aspx'"><b><a href="/admin/user_admin/PortfolioStats.aspx">portfolio stats</a></b>
                  measures clicks on your portfolio images</li>
                        <li onclick="window.location='/admin/user_admin/AllPageStats.aspx'"><b><a href="/admin/user_admin/AllPageStats.aspx">A-Z page stats</a></b>
                  measures clicks on your images on the <a href="https://www.illustrationx.com/artists" target="_blank">All Artists</a> page</li>
              </ul>
            </div>

          </div>
        </div>

        <div class="header" id="header">
            <div class="logo">
                <a href="https://www.illustrationx.com/" target="_blank"><img src="/admin/img/illustrationx.svg" style="width:285px" alt="Illustration POMS" /></a>
            </div>
          <h2>Portfolio On-Line Management System</h2>
        </div>
    </div>
    <div id="content">
      <div style="height:50px;clear:both;">&nbsp;</div>
      <div id="right">
        <div class="loggedArtist">{{ artistName }}</div>
        <router-view />
      </div>
    </div>

  </div>
</template>
<script>

import '@/css/useradmin.css'

export default {
  data () {
    return {
      menu: {
        portfolio: false,
        manage: false,
        upload: false,
        statistics: false
      },
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
    openMenu (menuName) {
      this.menu[menuName] = !this.menu[menuName]
      this.closeAllMenus(menuName)
    },
    closeAllMenus (def) {
      let keys = Object.keys(this.menu)
      for (let key of keys) {
        if (key !== def) {
          this.menu[key] = false
        }
      }
    }
  }
}
</script>
<style>
.message-lightbox{
  position:fixed;
  z-index:500;
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
  z-index:510;
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
</style>
