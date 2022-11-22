<template>
  <div class="header-holder">
    <div class="snav-holder">
      <div class="supernav" id="left" style="position:absolute">
        <div class="linkbit" id="as0" style="width:270px;">
          <base-chooser :options="artists" v-model="selectedArtist"></base-chooser>
          <div class="openarrow" id="dropper" v-on:click.stop="openMenu('artist')"></div>
          <ul class="dropdown" v-show="menus.artist">
            <li class="email">
              <a v-on:click.prevent="jump('/admin/vue/contact-details')">contact details</a>
            </li>
            <li class="image">
              <a v-on:click.prevent="jump('/admin/UploadImage.aspx')">upload image</a>
            </li>
            <li class="image">
              <a v-on:click.prevent="jump('/admin/UploadMultipleDrag.aspx')">upload multiple</a>
            </li>
            <li class="animation">
              <a v-on:click.prevent="jump('/admin/UploadAnimation.aspx')">upload animation</a>
            </li>
            <li class="note">
              <a v-on:click.prevent="jump('/admin/ArtistEdit.aspx')">artist details</a>
            </li>
            <li class="user">
              <a v-on:click.prevent="jump('/admin/ArtistProfileEdit.aspx')">artist profile</a>
            </li>
            <li class="note">
              <a v-on:click.prevent="jump('/admin/Meetings.aspx')">artist meetings</a>
            </li>
            <li class="photos">
              <a v-on:click.prevent="jump('/admin/OrderImages.aspx')">web portfolio</a>
            </li>
            <li class="photos">
              <a v-on:click.prevent="jump('/admin/HeroImageCropNew.aspx')">hero image crop new</a>
            </li>
            <li class="photos">
              <a v-on:click.prevent="jump('/admin/SortImages.aspx')">sort web portfolio</a>
            </li>
            <li class="photos">
              <a v-on:click.prevent="jump('/admin/OrderImages.aspx','lib_only=Y')">library portfolio</a>
            </li>
            <li class="photos">
              <a v-on:click.prevent="jump('/admin/manage_hires.asp')">hi-res portfolio</a>
            </li>
            <li class="photos">
              <a v-on:click.prevent="jump('/admin/SortTradfolio.aspx')">sort traditional portfolio</a>
            </li>
            <li class="animation">
              <a v-on:click.prevent="jump('/admin/AnimationPortfolio.aspx')">animation portfolio</a>
            </li>
            <li class="photos">
              <a v-on:click.prevent="jump('/admin/ArtistStyleGalleries.aspx')">style gallery</a>
            </li>
            <li class="photos">
              <a v-on:click.prevent="jump('/admin/JmsJobList.aspx')">jms jobs</a>
            </li>

            <li class="user">
              <a
                v-on:click.prevent="jump('/admin/EditArtist.aspx','command=Edit+Home+Page')"
              >user admin</a>
            </li>
            <li class="comments">
              <a v-on:click.prevent="jump('/admin/user_comments.asp')">user comments</a>
            </li>
            <li class="comments">
              <a v-on:click.prevent="jump('/admin/QuotesList.aspx')">testimonials</a>
            </li>

            <li class="delete">
              <a v-on:click.prevent="jump('/admin/Deletion.aspx')">deletion options</a>
            </li>

            <li class="photos">
              <a v-on:click.prevent="jump('/admin/AltWorkflow.aspx')">alt tags</a>
            </li>
            <li class="key">
              <a v-on:click.prevent="jump('/admin/ArtistPortfolioImageStats.aspx')">web portfolio stats</a>
            </li>
            <li class="key">
              <a v-on:click.prevent="jump('/admin/ArtistGalleryStats.aspx')">style gallery stats</a>
            </li>
          </ul>
        </div>
        <div class="linkbit" id="as1">
          <h2 v-on:click.stop="openMenu('special')">special</h2>
          <ul class="dropdown" v-show="menus.special">
            <li class="keydelete">
              <a href="/admin/MigrateImages.aspx">transfer images</a>
            </li>
            <li class="animation">
              <a href="/admin/VideoList.aspx">tv videos</a>
            </li>
            <li class="user">
              <a href="/admin/LogOut.aspx">log out</a>
            </li>
          </ul>
        </div>
        <div class="linkbit" id="as2">
          <h2 v-on:click.stop="openMenu('artists')">artists</h2>
          <ul class="dropdown" v-show="menus.artists">
            <li class="useradd">
              <a href="/admin/new_artist.asp">add artist</a>
            </li>
            <li class="user">
              <a href="/admin/ArtistHomePageVisits.aspx">homepage visits</a>
            </li>
            <li class="photos">
              <a href="/admin/list_updated_artists.asp">updated portfolios</a>
            </li>
            <li class="home">
              <a href="/admin/list_updated_homepages.asp?live=false">updated content</a>
            </li>
            <li class="photos">
              <a href="/admin/list_hires_artists.asp">hires portfolios</a>
            </li>
            <li class="photos">
              <a href="/admin/list_tradfolios.asp">traditional portfolios</a>
            </li>
            <li>
              <a href="/admin/list_homeless_artists.asp">no homepage</a>
            </li>
            <li>
              <a href="/admin/list_nokeyword_artists.asp">missing_keywords</a>
            </li>
            <li class="animation">
              <a href="/admin/list_hp_anim_artists.asp">animation home items</a>
            </li>
            <li class="user">
              <a href="/admin/ArtistGalleryMappings.aspx">style gallery mappings</a>
            </li>
            <li class="user">
              <a href="/admin/ArtistsExcludeAz.aspx">exclude from local az pages</a>
            </li>
            <li>
              <a href="/admin/artist_report_list.asp">artist reviews</a>
            </li>
            <li>
              <a href="/admin/artist_report_sites.asp">artist review sites</a>
            </li>
            <li>
              <a href="/admin/ArtistAlsoList.aspx">you may also like</a>
            </li>
          </ul>
        </div>
        <div class="linkbit" id="as3">
          <h2 v-on:click.stop="openMenu('stats')">stats</h2>
          <ul class="dropdown" v-show="menus.stats">
            <li class="key">
              <a href="/admin/StatsHome.aspx">weekly statistics</a>
            </li>
            <li class="user">
              <a href="/admin/list_popular_artists.asp">artist popularity</a>
            </li>
            <li class="download">
              <a href="/admin/list_downloads.asp">hi-res downloads</a>
            </li>
            <li class="key">
              <a href="/admin/list_artists_keywords.asp">download keywords</a>
            </li>
            <li class="key">
              <a href="/admin/list_popular_keywords.asp">popular keywords</a>
            </li>
            <li class="download">
              <a href="/admin/artists_download.asp">download artist details</a>
            </li>
            <li class="user">
              <a href="/admin/list_artist_fans.asp">fans and favorites</a>
            </li>
            <li class="key">
              <a href="/admin/VisitorList.aspx">visitor tracking</a>
            </li>
            <li class="user">
              <a href="/admin/ArtistMonthlyEmails.aspx">artist monthly emails</a>
            </li>
            <li class="user">
              <a href="/admin/ArtistWebClickList.aspx">website link clicks</a>
            </li>

            <li class="key">
              <a href="/admin/Logs.aspx">error logs</a>
            </li>
            <li class="key">
              <a href="/admin/ListActivities.aspx">activities</a>
            </li>
            <li class="user">
              <a href="/admin/EnquiryList.aspx">enquiries</a>
            </li>
          </ul>
        </div>

        <div class="linkbit" id="as4">
          <h2 v-on:click.stop="openMenu('content')">content</h2>
          <ul class="dropdown" v-show="menus.content">
            <li class="news">
              <a href="/admin/Translations.aspx">translations</a>
            </li>
            <li class="news">
              <a href="/admin/ArticleList.aspx">articles</a>
            </li>
            <li class="news">
              <a href="/admin/BlogEntryList.aspx">news blog posts</a>
            </li>
            <li class="user">
              <a href="/admin/BlogArtistList.aspx">news featured artists</a>
            </li>
            <li class="user">
              <a href="/admin/FeaturedBlogtagList.aspx">news featured tags</a>
            </li>
            <li>
              <a href="/admin/MetatagList.aspx">metatags &amp; titles</a>
            </li>
            <li>
              <a href="/admin/ContactLocationList.aspx">contact section</a>
            </li>
            <li>
              <a href="/admin/ContentList.aspx">localised content</a>
            </li>
            <li>
              <a href="/admin/FormtransList.aspx">localised words</a>
            </li>

            <li class="comments">
              <a href="/admin/QuotesList.aspx">testimonials</a>
            </li>
            <li class="photos">
              <a href="/admin/StyleGalleryList.aspx">style galleries</a>
            </li>
            <li class="animation">
              <a href="/admin/category_list.asp">animation categories</a>
            </li>
            <li class="photos">
              <a href="/admin/HomePageImages.aspx">homepage images</a>
            </li>
            <li class="photos">
              <a href="/admin/HomeItemList.aspx">homepage items</a>
            </li>
          </ul>
        </div>
        <div class="linkbit" id="as7">
          <h2 v-on:click.stop="openMenu('admins')">admins</h2>
          <ul class="dropdown" v-show="menus.admins">
            <li class="user">
              <a href="/admin/AdminList.aspx">site administrators</a>
            </li>
            <li class="email">
              <a href="https://www.illustrationx.com/newtalent/email-signatures">email sig uploads</a>
            </li>
            <li class="email">
              <a
                href="https://www.illustrationx.com/newtalent/email-signatures"
              >email sig images &amp; urls</a>
            </li>
            <li class="email">
              <a href="/admin/email_list.asp">admin emails</a>
            </li>
          </ul>
        </div>
        <div class="linkbit" id="as6">
          <h2 v-on:click.stop="openMenu('mailers')">mailers</h2>
          <ul class="dropdown" v-show="menus.mailers">
            <li class="news">
              <a href="/admin/news_edition.asp">insight edition</a>
            </li>
            <li class="news">
              <a href="/admin/ScrapmailList.aspx">scrapbook email</a>
            </li>
            <li class="news">
              <a href="/admin/framexframe_list.asp">framexframe email</a>
            </li>
            <li class="news">
              <a href="/admin/NewTalentList.aspx">new talent email</a>
            </li>
            <li class="news">
              <a href="/admin/NewTalentList.aspx?category=projects">inspiring projects email</a>
            </li>
            <li class="news">
              <a href="/admin/NewTalentList.aspx?category=specialists">specialists email</a>
            </li>
            <li class="news">
              <a href="/admin/StopPressList.aspx">stop press email</a>
            </li>
            <li class="news">
              <a href="/admin/StopPressMultiList.aspx">stop press multi email</a>
            </li>
          </ul>
        </div>
        <div class="linkbit" id="as5">
          <h2 v-on:click.stop="openMenu('msb')">msb users:</h2>
          <ul class="dropdown" v-show="menus.msb">
            <li class="user">
              <a href="/admin/MsbUserList.aspx">search</a>
            </li>
            <li class="user">
              <a href="/admin/msb_feedback.asp">feedback</a>
            </li>
            <li class="user">
              <a href="/admin/msbStats.aspx">daily visits</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header" id="header">
      <div class="logo">
        <a href="/">
          <img
            src="/admin/img/illustrationx.svg"
            alt="Illustration POMS"
            style="width:285px;padding-top:8px"
          />
        </a>
      </div>
      <h2>Portfolio On-Line Management System why</h2>
      <div id="ctl00_MyIllustrationArea" class="myillustration nomobile" style="line-height:25px">
        <a href="/admin/LogOut.aspx">Log Out</a>
        <br />
        <a href="https://teamup.com/ks935b8913c1fbbaab" target="_blank">Team Diary</a>
      </div>
    </div>
  </div>
</template>

<script>
import BaseChooser from '../components/dropdowns/BaseChooser.vue'
export default {
  components: {
    BaseChooser
  },

  data () {
    return {
      artists: [],
      menus: {
        artist: false,
        special: false,
        artists: false,
        stats: false,
        content: false,
        admins: false,
        mailers: false,
        mbs: false
      }
    }
  },
  created () {
    this.loadArtists()
  },
  mounted () {
    document.addEventListener('click', this.handleBodyClick)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleBodyClick)
  },
  computed: {
    selectedArtist: {
      get: function () {
        if (!this.$store.state.poms.selectedArtist) {
          return { Name: '', Id: 0 }
        }
        return this.$store.state.poms.selectedArtist
      },
      set: function (val) {
        this.$store.commit('setSelectedArtist', val)
      }

    }
  },
  methods: {
    handleInput (val) {
      this.selectedArtist = val
    },
    jump (url, extras) {
      if (extras) {
        extras = '&' + extras
      } else {
        extras = ''
      }
      if (this.selectedArtist) {
        window.location = `${url}?artist_id=${this.selectedArtist.Id}${extras}`
      }
    },
    handleBodyClick () {
      this.closeAllMenus()
    },
    async loadArtists () {
      let res = await this.$apix.post('AdminGetAllArtists')
      this.artists = res.data.d
    },
    openMenu (menuName) {
      this.menus[menuName] = !this.menus[menuName]
      this.closeAllMenus(menuName)
    },
    closeAllMenus (def) {
      let keys = Object.keys(this.menus)
      for (let key of keys) {
        if (key !== def) {
          this.menus[key] = false
        }
      }
    }
  }
}
</script>

<style>
</style>
