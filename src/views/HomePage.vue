<template>
  <div class="user-home-text">
    <p class="large-type">
      <router-link to="/admin/user_admin/vue/faqs">Frequently Asked Questions</router-link>
      regarding payments, self-bills, invoicing, banking, AP, tax and immediate payment options.<br />
      Please <router-link to="/admin/user_admin/vue/faqs">click here</router-link> and we will
      hopefully answer 95% of the questions we are most asked.
    </p>
    <ul>
      <li>The portfolio management area enables control of your web presence on illustrationx.com and animationx.com.</li>
      <li> It has been designed to make it easy to do, whilst giving the flexibility to show you off individually within the context of the site. </li>
      <li>Updating your portfolio is very important. Regular visitors/commissioners can quickly become blind to unchanged work, so let’s keep them on their visual toes.</li>
      <li>You can get a broad feeling for which are your more popular images, by way of a counter that will rank them by the number of times the larger image is shown by the user clicks.
        his will vary depending on the complexity of your style.</li>
    </ul>
    <p>
      From your <a :href="pflink" target="_blank">Home page</a> users of the site will be able to:
    </p>
    <ul>
      <li> see up to 50 of your images on the Web portfolio.</li>
      <li>have a resource that enables them to print top quality encapsulated documents of between 20 and 40 selected works for presentations, meetings and reference.</li>
      <li>show your animation reels</li>
    </ul>
    <p>
      Once you have made changes to your portfolio it will go live within 24 hours.

    </p>
  </div>
</template>

<script>
export default {
  computed: {
    pflink () {
      if (this.artist === null) {
        return ''
      }
      if (this.anim) {
        return 'https://www.illustrationx.com/artists/' + this.artist.PortfolioName
      }
      return 'https://www.illustrationx.com/animators/' + this.artist.PortfolioName
    }
  },
  data () {
    return {
      subtitle: 'Frequently Asked Questions regarding Artist payments',
      artist: null
    }
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Your Portfolio, Commissions and Admin')
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.artist = await this.$post('GetLoggedArtistObject')
    }
  }
}
</script>

<style>
.user-home-text a {
  font-weight: bold;
}

.user-home-text li{
  margin:6px 0;
  font-size: 16px;
  line-height: auto;
}

.user-home-text p{
  font-size: 16px;
  line-height: auto;
}
.user-home-text p.large-type {
  font-size: 18px;
  line-height: 23px;
}
</style>
