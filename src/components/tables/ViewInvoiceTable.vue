<template>
  <table class="msbTable">
    <tr class="msbACTIVE">
      <th>Job No.</th>
      <th>Invoice Date</th>
      <th style="width:50%">Subject</th>
      <th>Client</th>
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
export default {
  props: {
    lines: Array
  },
  methods: {
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
