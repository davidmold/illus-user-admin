<template>
  <div style="max-width:700px">
    <table class="padded">
      <tr>
        <td>First name</td>
        <td><input type="text" v-model="contact.Fname" /></td>
      </tr>
      <tr>
        <td>Last name</td>
        <td><input type="text" v-model="contact.Lname" /></td>
      </tr>
      <tr>
        <td colspan="2"> <b>Main Address</b> </td>
      </tr>
      <tr>
        <td>Email Address</td>
        <td><input type="text" v-model="contact.Email" size="60" /></td>
      </tr>
      <tr>
        <td>Telephone</td>
        <td><input type="text" v-model="contact.Tel"  size="60" /></td>
      </tr>
      <tr>
        <td>Cell/Mobile</td>
        <td><input type="text" v-model="contact.Mobile" size="60" /></td>
      </tr>
      <tr>
        <td>SMS</td>
        <td><input type="checkbox" v-model="sms"> I agree to receive SMS messages from IllustrationX on this number</td>
      </tr>
      <tr>
        <td>Emergency Telephone</td>
        <td><input type="text" v-model="contact.Emergency" size="60" /></td>
      </tr>
      <tr>
        <td>Fax</td>
        <td><input type="text" v-model="contact.Fax" /></td>
      </tr>
      <tr>
        <td rowspan="3">Address</td>
        <td><input type="text" v-model="contact.Address1" size="60" /></td>
      </tr>
      <tr>
        <td><input type="text" v-model="contact.Address2" size="60"  /></td>
      </tr>
      <tr>
        <td><input type="text" v-model="contact.Address3" size="60" /></td>
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
        <td colspan="2"> <b>Alternate Address</b> </td>
      </tr>
      <tr>
        <td>Email</td>
        <td><input type="text" v-model="contact.Email2" size="60" /></td>
      </tr>
      <tr>
        <td>Telephone</td>
        <td><input type="text" v-model="contact.Tel2" size="60" /></td>
      </tr>
      <tr>
        <td rowspan="3">Address</td>
        <td><input type="text" v-model="contact.Baddress1" size="60"  /></td>
      </tr>
      <tr>
        <td><input type="text" v-model="contact.Baddress2" size="60"  /></td>
      </tr>
      <tr>
        <td><input type="text" v-model="contact.Baddress3"  size="60" /></td>
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
      loading: false,
      orig: {},
      sms: true
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
          this.orig = { ...this.contact }
        }
      } catch (err) {
        console.log(err)
      }
    },
    changedDetails () {
      const keys = Object.keys(this.orig)
      const changed = []
      for (const key of keys) {
        if (this.orig[key] !== this.contact[key]) {
          changed.push(`<b>${this.fixName(key)}</b> changed from <b>${this.getBlank(this.orig[key])}</b> to <b>${this.getBlank(this.contact[key])}</b>`)
        }
      }
      return changed
    },
    getBlank (aword) {
      if (!aword) {
        return '[blank]'
      }
      return aword
    },
    fixName (aname) {
      if (aname.startsWith('B')) {
        aname = aname.replace('B', 'Alternate ')
      }
      return aname
    },
    async saveDetails () {
      let res = null
      try {
        this.loading = true
        if (this.admin) {
          res = await this.$apix.post('AdminSaveArtistContact', { contact: this.contact })
          this.orig = { ...this.contact }
        } else {
          const changed = this.changedDetails()
          res = await this.$apix.post('SaveArtistContact', { contact: this.contact, changed: changed })
          this.orig = { ...this.contact }
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
