<template>
  <div>
    <div class="header-holder">
      <div class="header" id="header">
        <div class="logo">
            <a href="https://www.illustrationx.com/" target="_blank"><img src="/admin/img/illustrationx.svg" style="width:285px" alt="Illustration POMS" /></a>
        </div>
        <h2>Portfolio On-Line Management System</h2>
      </div>
      <div id="titleArea" class="title-area">
        <h1>{{ $store.state.pageTitle }}</h1>
      </div>
    </div>
    <div class="agentpopup useradmin" v-show="showAgentPopup">
        <div class="cbox" @click="hideAgentPopup"></div>
        Hi, just a quick message of support. If you are having any problems at all getting the
        admin site to behave as you would wish, or you'd like to change your lead image,
        please drop me a line and I will do my best to help.
        <div class="ap-signoff">
          <div class="agent-name">Jac Lott<br />
              <a href="mailto:jac@illustrationweb.com">jac@illustrationweb.com</a>
          </div>
          <div class="agent-image"><img src="/ImageScaler.aspx?src=admin&name=26-635018271369810000.jpg&sz=50" /></div>
        </div>
    </div>
  </div>
</template>
<script>

import '@/css/useradmin.css'

export default {
  components: {

  },
  data () {
    return {
      showAgentPopup: false
    }
  },
  methods: {
    showHelp () {
      this.showAgentPopup = true
    },
    hideAgentPopup () {
      this.showAgentPopup = false
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

.header-holder .title-area {
  padding:20px 0;
  background-color:#f8f5eb;
}

.header-holder .title-area h1{
  display:block;
  max-width:1200px;
  width:100%;
  box-sizing:border-box;
  margin-left:auto;
  margin-right:auto;
  margin-bottom:0;
  padding:0 20px;
}

</style>
