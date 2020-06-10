<template>
  <table class="msbTable">
    <tr class="msbACTIVE">
      <th>Job No.</th>
      <th>Job Date</th>
      <th style="width:50%">Subject</th>
      <th>Client</th>
      <th>Status</th>
      <th>Roughs</th>
      <th>Artwork</th>
      <th>
          Job Details
      </th>
    </tr>
    <tr v-for="line in lines" :key="line.Id" >
      <td>{{ line.Id }}</td>
      <td>{{ $du.formatCsDate(line.JobDate) }}</td>
      <td>{{ line.Subject }}</td>
      <td>{{ line.ClientOrgName }}</td>
      <td>{{ line.Status }}</td>
      <td>{{ $du.formatCsDate(line.PencilDate)}}</td>
      <td>{{ $du.formatCsDate(line.FinalDate) }}</td>
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
    }
  }
}
</script>

<style>

</style>
