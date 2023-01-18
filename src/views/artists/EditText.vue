<template>
  <div>
    <div>
      Language / Region
      <lang-select v-model="lang"></lang-select>
    </div>
    <div>
      <table>
        <tr>
          <td>Page title</td>
          <td><input type="text" v-model="details.meta_title" size="80"></td>
        </tr>
        <tr>
          <td colspan="2"><strong>Metatags</strong></td>
        </tr>
        <tr>
          <td>Description</td>
          <td><textarea type="text" v-model="details.meta_description" cols="80" rows="3"></textarea></td>
        </tr>
        <tr>
          <td>Keywords</td>
          <td><input type="text" v-model="details.meta_keywords" size="80"></td>
        </tr>
      </table>
      <div class="flexton">
        <div class="flexton-chunk">
          <p>Overview</p>
          <div>
            <textarea v-model="details.overview" cols="40" rows="16" />
          </div>
        </div>
        <div class="flexton-chunk">
          <p>Profile</p>
          <div>
            <textarea v-model="details.text" cols="60" rows="16" />
          </div>
        </div>
        <div class="flexton-chunk">
          <p>Client List</p>
          <div>
            <textarea v-model="details.client_list" cols="40" rows="16" />
          </div>
        </div>
      </div>
      <div style="margin-top:40px">
        <small-button v-on:click="saveDetails" :loading="loading">Save</small-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lang: 'UK',
      details: {},
      loading: false
    }
  },
  mounted () {
    this.$store.commit('setPageTitle', 'Portfolio details')
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      try {
        const res = await this.$apix.post('GetArtistProfile', { lang: this.lang })
        if (res) {
          this.details = res.data.d
        }
      } catch (err) {
        console.log(err)
      }
    },
    async saveDetails () {
      try {
        this.loading = true
        let res = await this.$apix.post('SaveArtistProfile', { lang: this.lang, details: this.details })
        this.loading = false
        if (res) {
          if (res.data.d === 'ok') {
            this.$showMessage('Your updates have been saved.')
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    lang () {
      this.loadData()
    }
  }
}
</script>

<style>
.flexton{
  display:flex;
  flex-wrap: wrap;
}

.flexton-chunk{
  margin-right:30px;
}
</style>
