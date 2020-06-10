<template>
  <div v-if="pagecount > 1">
    <div class='page-numbers-holder' v-bind:class="{small: small}">
        <div class="flex-numbers">
          <div class='page-descriptor'>Page <em>{{ currentPage }}</em> of {{ pagecount }}</div>
        </div>
        <div class='page-numbers'>
            <div class="material-icons purple" v-show="currentPage > 1" v-on:click="goRelative(-1)">navigate_before</div>
            <div class='pno' v-for="n in Number(pagecount)" :key="n" v-on:click="go(n)"
                v-bind:class="{ sel: currentPage == n}"
                v-show="(n > getMinPage()) && (n < getMaxPage())">{{ (n) }}</div>
            <div class="material-icons purple" v-show="currentPage < pagecount" v-on:click="goRelative(1)">navigate_next</div>
            <div class="mi-standin" v-show="currentPage >= pagecount"></div>
        </div>
        <div class='clearthin'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-numbers',
  props: {
    pagecount: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 1
    },
    small: {
      type: Boolean
    },
    refresh: {
      type: Boolean
    }
  },
  data: function () {
    return {
      currentPage: 1
    }
  },
  watch: {
    value: function () {
      this.currentPage = this.value
    }
  },
  created: function () {
    if (this.value) {
      this.currentPage = this.value
    } else {
      this.currentPage = 1
    }
  },
  methods: {

    getMinPage: function () {
      return Math.min(this.currentPage - 8, this.pagecount - 16)
    },
    getMaxPage: function () {
      return Math.max(this.currentPage + 8, 16)
    },
    goRelative: function (toadd) {
      this.currentPage += toadd
      this.$emit('input', this.currentPage)
    },
    go: function (pno) {
      this.currentPage = pno
      this.$emit('input', this.currentPage)
    }

  }

}
</script>

<style scoped>

  .page-numbers{
    display:flex;
    align-content: center;
  }
  .page-numbers-holder{
    user-select:none;
    font-size:18px;
  }

  .page-numbers-holder.small{
    font-size:12px;
  }

  .pno {
    font-size:18px;
    padding:0 4px;
    cursor:pointer;
    color:#662b57aa;
    display:inline-block;
  }

  .small .pno{
    font-size:12px;
  }

  .pno:hover, .pno.sel{
    box-shadow:0 0 3px #999;
  }

  .pno.sel{
    background-color:#662b57;
    color:#fff;
  }

  .pno:active{
    background-color:#000;
    color:#fff;
  }

  .purple{
    color:#662b57;
  }

  .purple:hover {
    box-shadow:0 0 3px #999;
    cursor:pointer;
    user-select: none;
  }

  .mi-standin{
    width:24px;
    height:24px;
  }

  .refresh{
    margin-left:20px;
  }

  .small .mi-standin{
    width:14px;
    height:14px;
  }

  .small .material-icons{
    font-size:16px;
  }

  .page-size-change{
    display:inline-block;
    margin-left:20px;
  }

  .small .page-size-change select{
    font-size:12px;
    padding:1px;
  }

  .page-numbers-holder .page-descriptor{
    display:inline-block;
    float:none;
  }

  .flex-numbers{
    display:inline-flex;
    align-items:center;
  }

  em{
    display:inline-block;
    padding:0 4px;
    background-color:#000;
    color:#fff;
    font-weight:700;
    font-style:normal;
    margin:0 3px;
  }

</style>
