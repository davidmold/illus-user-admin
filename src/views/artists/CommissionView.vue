<template>
  <div>
    <div class="explain">
      <div>
        <h1>Your commissions</h1>
        <p>Please see the <router-link to="faqs">Frequently Asked Questions regarding Artist payments</router-link></p>
      </div>
      <div v-show="mode === k.SELFBILLS" class="flexplain">
        <div class="asterisk">*</div>
        <div class="exp-text">
          <p>
            If the amount owing to you is under &pound;1,000/$1,500 per job, you will receive your whole fee around this date.
            If it is more than that, and the client has not paid us yet, we will advance the first &pound;1,000/$1,500 to you
            on this date with the balance to follow when we receive it.
          </p>
          <p>
            If you would like to receive these fees before the date shown, please send a request to
            <a href="mailto:sarah@illustrationx.com">sarah@illustrationx.com</a>,
            and subject to available funds, we will forward to you for an additional 3% (gross fee)
            commission on the closest Friday.
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="line-bottom">
        <div class="mtab" :class="{sel: mode === 'ACTIVE'}" v-on:click.stop="changeMode('ACTIVE')">Active</div>
        <div class="mtab" :class="{sel: mode === 'CLOSED'}" v-on:click.stop="changeMode('CLOSED')">Closed</div>
        <div class="mtab" :class="{sel: mode === k.SELFBILLS}" v-on:click.stop="changeMode(k.SELFBILLS)">Selfbills</div>
      </div>
      <page-numbers v-model="page" :pagecount="maxlines" />
      <job-list-table v-if="mode !== k.SELFBILLS" :lines="lines" v-on:download="downloadPdf" />
      <view-invoice-table v-if="mode === k.SELFBILLS" :lines="lines" v-on:download="downloadPdf" />
    </div>
  </div>
</template>

<script>
import PageNumbers from '@/components/PageNumbers.vue'
import JobListTable from '@/components/tables/JobListTable.vue'
import ViewInvoiceTable from '@/components/tables/ViewInvoiceTable.vue'

export default {
  components: {
    PageNumbers,
    JobListTable,
    ViewInvoiceTable
  },
  data () {
    return {
      lines: [],
      mode: 'ACTIVE',
      maxlines: 1,
      page: 1,
      k: {
        SELFBILLS: 'SELFBILLS'
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async changeMode (newMode) {
      if (newMode === this.mode) {
        return
      }
      this.mode = newMode
      this.page = 1
      await this.loadData()
    },
    async loadData () {
      let res = null
      if (this.mode === this.k.SELFBILLS) {
        res = await this.$apix.post('GetSelfBillsMaxPages')
      } else {
        res = await this.$apix.post('GetJobsMaxPages', { status: this.mode })
      }

      this.maxlines = res.data.d
      await this.loadPage()
    },
    async loadPage () {
      try {
        this.lines = []
        let res = null
        if (this.mode === this.k.SELFBILLS) {
          res = await this.$apix.post('GetSelfBillsPaged', { page: this.page - 1 })
        } else {
          res = await this.$apix.post('GetJobsPaged', { page: this.page - 1, status: this.mode })
        }
        this.lines = res.data.d
      } catch (err) {
        console.log('error was', err)
      }
    },
    downloadPdf (line) {
      if (this.mode !== this.k.SELFBILLS) {
        window.location = `/admin/user_admin/DownloadJmsPdf.aspx?id=${line.Id}`
      } else {
        window.location = `/admin/user_admin/DownloadJmsPdf.aspx?id=${line.JobNumber}&selfbill=y`
      }
    }
  },
  watch: {
    page () {
      this.loadPage()
    }
  }
}
</script>

<style scoped>
.mtab{
  display:inline-block;
  background-color:#ddd;
  color:#000;
  padding:5px 12px;
  cursor:pointer;
}

.mtab:hover{
  background-color:#000;
  color:#fff;
}

.mtab.sel{
  background-color:#ce0e2d;
  color:#fff;
}

.line-bottom{
  border-bottom:1px solid #ce0e2d;
}
.asterisk{
  font-weight:700;
  font-size:16px;
}
.flexplain{
  display: flex;
  max-width: 600px;
}
.exp-text{
  font-size:14px;
  line-height:18px;
  flex-grow:1;
}

.exp-text p{
  margin-top:0;
}

.explain{
  display:flex;
  justify-content: space-between;
}
</style>
