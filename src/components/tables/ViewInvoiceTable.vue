<template>
  <table class="msbTable">
    <tr class="msbACTIVE">
      <th>Job No.</th>
      <th>Invoice Date</th>
      <th style="width:50%">Subject</th>
      <th>Client</th>
      <th>Amount</th>
      <th>*Expect Payment</th>
      <th>
          Selfbill
      </th>
    </tr>
    <tr v-for="line in lines" :key="line.Id" >
      <td>{{ line.JobNumber }}</td>
      <td>{{ $du.formatCsDate(line.InvoiceDate) }}</td>
      <td>{{ line.Subject }}</td>
      <td>{{ line.Company }}</td>
      <td style="text-align:right">{{ formatAmount(line.ArtistCurrency, line.ArtistAmt) }}</td>
      <td>{{ getExpectPayment(line.InvoiceDate )}}</td>

      <td>
        <a href="#" v-on:click.prevent="downloadPdf(line)">
          <img src="/img/msb/pdficon_small.gif" alt="download pdf" title="download pdf" width="17" height="17" border="0" />
        </a>
      </td>
    </tr>
  </table>
</template>

<script>
import currencies from '@/data/currencies.js'

export default {
  props: {
    lines: Array
  },
  methods: {
    formatAmount (cur, amt) {
      return currencies[cur] + Number(amt).toFixed(2)
    },
    downloadPdf (line) {
      this.$emit('download', line)
    },
    getExpectPayment (invoiceDate) {
      let date = this.$du.parseCsDate(invoiceDate)
      let paydate = new Date(date.getFullYear(), date.getMonth() + 2, 15)

      return this.$du.formatDate(paydate)
    }
  }
}
</script>

<style>

</style>
