<template>
  <div class="keyword" :class="{sel: selected }" v-if="keyword" @click.stop.prevent="handleClick">
    {{ keyword.Keyword }}
  </div>
</template>

<script>
export default {
  name: 'KeywordButton',
  props: {
    keyword: Object,
    selected: Boolean
  },
  methods: {
    handleClick () {
      if (this.selected) {
        this.$emit('remove', this.keyword)
      } else {
        this.$emit('add', this.keyword)
      }
    }
  }
}
</script>

<style>

</style>
