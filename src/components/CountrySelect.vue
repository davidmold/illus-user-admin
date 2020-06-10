<template>
  <select v-model="mcountry" v-on:change="$emit('input', mcountry)">
    <option v-for="country in countries" :key="country.code" v-text="country.name"/>
  </select>
</template>

<script>
import countries from '../data/countries.js'

export default {
  props: {
    value: String
  },
  data () {
    return {
      mcountry: '',
      countries: countries
    }
  },
  created () {
    if (this.value) {
      this.mcountry = this.value
    }
  },
  watch: {
    value () {
      if (this.value === 'UK') {
        this.mcountry = 'United Kingdom'
      } else {
        this.mcountry = this.value
      }
    }
  }
}
</script>

<style>

</style>
