<template>
  <div>
    <h1>Review History</h1>
    <page-numbers v-model="page" :pagecount="maxlines" />
    <table class="padded">
      <tr class="dark">
        <td>Report Date</td>
        <td>By</td>
        <td>View</td>
      </tr>
      <tr v-for="item in items" :key="item.Id" >
        <td>{{ $du.formatCsDate(item.ReportDate )}}</td>
        <td>{{ item.Agent.FormattedName }}</td>
        <td>
          <a href="#" v-on:click.prevent="handleShowDetail(item)"><img src="/admin/img/page_go.png" class="icon" alt="View"></a>
        </td>
      </tr>
    </table>
    <div class="message-lightbox" v-show="showDetail" v-on:click="showDetail = false">
      <div class="detail-message" v-on:click.stop>
        <review-panel :value="selectedItem" />
        <div style="margin-top:20px">
          <small-button v-on:click="showDetail = false">Close</small-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageNumbers from '@/components/PageNumbers.vue'
import ReviewPanel from '@/panels/ReviewPanel.vue'

export default {
  components: {
    PageNumbers,
    ReviewPanel
  },
  data () {
    return {
      maxlines: 1,
      page: 1,
      items: [],
      showDetail: false,
      selectedItem: null
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async handleShowDetail (item) {
      console.log('showing detail')
      this.selectedItem = item
      this.showDetail = true
    },
    async loadData () {
      const res = await this.$apix.post('GetReviewsMaxPages')
      this.maxlines = res.data.d
      this.loadPage()
    },
    async loadPage () {
      const res = await this.$apix.post('GetReviewsPaged', { page: this.page - 1 })
      this.items = res.data.d
    }

  },
  watch: {
    page () {
      this.loadPage()
    }
  }
}
</script>

<style>
.detail-message{
  z-index:1020;
  background-color:#fff;
  padding:40px;
  border-radius:8px;
  max-height:calc(100vh - 100px);
  max-width:1000px;
  box-sizing: border-box;
  overflow-y:auto;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
}
</style>
