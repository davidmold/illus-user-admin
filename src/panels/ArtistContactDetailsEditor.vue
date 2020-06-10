<template>
  <div>
    <table>
      <tr>
        <td>Email Address</td>
        <td><input type="text" v-model="contact.Email" size="50" /></td>
      </tr>
      <tr>
        <td>Alternate Email</td>
        <td><input type="text" v-model="contact.Email2" size="50" /></td>
      </tr>
      <tr>
        <td>Telephone</td>
        <td><input type="text" v-model="contact.Tel" /></td>
      </tr>
      <tr>
        <td>Cell/Mobile</td>
        <td><input type="text" v-model="contact.Mobile" /></td>
      </tr>
      <tr>
        <td>Alternate Telephone</td>
        <td><input type="text" v-model="contact.Tel2" /></td>
      </tr>
      <tr>
        <td>Emergency Telephone</td>
        <td><input type="text" v-model="contact.Emergency" /></td>
      </tr>
      <tr>
        <td>Fax</td>
        <td><input type="text" v-model="contact.Fax" /></td>
      </tr>
      <tr>
        <td colspan="2"> &nbsp; </td>
      </tr>
      <tr>
        <td>First name</td>
        <td><input type="text" v-model="contact.Fname" /></td>
      </tr>
      <tr>
        <td>Last name</td>
        <td><input type="text" v-model="contact.Lname" /></td>
      </tr>
      <tr>
        <td colspan="2"> &nbsp; </td>
      </tr>
      <tr>
        <td rowspan="3">Address</td>
        <td><input type="text" v-model="contact.Address1" size="60" /></td>
      </tr>
      <tr>
        <td><input type="text" v-model="contact.Address2" size="60"  /></td>
      </tr>
      <tr>
        <td><input type="text" v-model="contact.Address3" /></td>
      </tr>
      <tr>
        <td>Zip/Postcode</td>
        <td><input type="text" v-model="contact.Zip" /></td>
      </tr>
      <tr>
        <td>Country</td>
        <td><country-select v-model="contact.Country" /></td>
      </tr>
      <tr>
        <td colspan="2"> &nbsp; </td>
      </tr>
      <tr>
        <td rowspan="3">Alternate Address</td>
        <td><input type="text" v-model="contact.Baddress1" size="60"  /></td>
      </tr>
      <tr>
        <td><input type="text" v-model="contact.Baddress2" size="60"  /></td>
      </tr>
      <tr>
        <td><input type="text" v-model="contact.Baddress3" /></td>
      </tr>
      <tr>
        <td>Zip/Postcode</td>
        <td><input type="text" v-model="contact.Bzip" /></td>
      </tr>
      <tr>
        <td>Country</td>
        <td><country-select v-model="contact.Bcountry" /></td>
      </tr>
    </table>
    <div style="margin-top:40px">
      <small-button v-on:click="saveDetails" :loading="loading">Save</small-button>
    </div>
  </div>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
export default {
  props: {
    artistId: Number,
    admin: Boolean
  },
  components: {
    CountrySelect
  },
  data () {
    return {
      contact: {},
      loading: false
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      if (this.admin) {
        this.adminLoadData()
      } else {
        this.artistLoadData()
      }
    },
    async adminLoadData () {
      try {
        let res = await this.$apix.post('AdminGetArtistContact', { artistId: this.artistId })
        if (res) {
          this.contact = res.data.d
        }
      } catch (err) {
        console.log(err)
      }
    },
    async artistLoadData () {
      try {
        let res = await this.$apix.post('GetArtistContact', {})
        if (res) {
          this.contact = res.data.d
        }
      } catch (err) {
        console.log(err)
      }
    },
    async saveDetails () {
      let res = null
      try {
        this.loading = true
        if (this.admin) {
          res = await this.$apix.post('AdminSaveArtistContact', { contact: this.contact })
        } else {
          res = await this.$apix.post('SaveArtistContact', { contact: this.contact })
        }
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
    artistId () {
      this.adminLoadData()
    }
  }
}
</script>

<style>

</style>
