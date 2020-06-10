<template>
  <div>
    <h2>Artist Review {{ $du.formatCsDate(item.ReportDate )}}</h2>
    <table class="padded">
      <tr class="dark">
        <td>Review by:</td>
        <td>{{ item.Agent.FirstName + ' ' + item.Agent.LastName }}</td>
      </tr>
      <tr>
        <td>Notes:</td>
        <td>
          {{ item.Notes }}
        </td>
      </tr>
      <tr v-for="note in siteNotes" :key="note.Id">
        <td><strong>{{ note.SiteName }}</strong></td>
        <td>{{ note.Note }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data () {
    return {
      item: { Agent: {} },
      siteNotes: []
    }
  },
  created () {
    this.loadReviews()
  },
  methods: {
    async loadReviews () {
      if (this.item.Id) {
        const res = await this.$apix.post('GetReviewNotes', { reviewId: this.item.Id })
        this.siteNotes = res.data.d
      }
    }
  },
  watch: {
    value () {
      if (this.value) {
        this.item = this.value
        this.loadReviews()
      }
    }
  }
}
</script>

<style>

</style>
