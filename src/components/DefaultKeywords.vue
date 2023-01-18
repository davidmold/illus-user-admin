<template>
  <div>
    <div class="kdiv">
      <h3>Default keywords</h3>
      <div>
        <keyword-button v-for="keyword in current" selected :key="keyword.Id" :keyword="keyword" @remove="handleRemove"></keyword-button>
      </div>
    </div>
    <small-button @click="toggleKeywords">{{ kmessage }}</small-button>
    <div class="keyword-hider" :class="{ visible: showKeywords }">
      <div class="kdiv">
        <h3>Subject keywords</h3>
        <div>
          <keyword-button v-for="keyword in subject" :key="keyword.Id" :keyword="keyword" :selected="isSelected(keyword.Id)" @add="handleAdd" @remove="handleRemove"></keyword-button>
        </div>
      </div>
      <div class="kdiv">
        <h3>Style keywords</h3>
        <div>
          <keyword-button v-for="keyword in style" :key="keyword.Id" :keyword="keyword" :selected="isSelected(keyword.Id)" @add="handleAdd" @remove="handleRemove"></keyword-button>
        </div>
      </div>
      <div class="kdiv">
        <h3>Technique keywords</h3>
        <div>
          <keyword-button v-for="keyword in technique" :key="keyword.Id" :keyword="keyword" :selected="isSelected(keyword.Id)" @add="handleAdd" @remove="handleRemove"></keyword-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import KeywordButton from './buttons/KeywordButton.vue'

export default {
  components: {
    KeywordButton
  },
  computed: {
    kmessage () {
      if (this.showKeywords) {
        return 'Hide all keywords'
      }
      return 'Show all keywords'
    }
  },
  data () {
    return {
      current: [],
      subject: [],
      style: [],
      technique: [],
      showKeywords: false
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    toggleKeywords () {
      this.showKeywords = !this.showKeywords
    },
    isSelected (id) {
      for (let item of this.current) {
        if (item.Id === id) {
          return true
        }
      }
    },
    async handleRemove (item) {
      const wh = this.current.findIndex(el => el.Id === item.Id)
      if (wh >= 0) {
        this.current.splice(wh, 1)
        const res = await this.$apix.post('UpdateDefaultKeyword', { keywordId: item.Id, add: false })
        if (res.data.d !== 'OK') {
          this.$showMessage(res.data.d)
        }
      }
    },
    async handleAdd (item) {
      const wh = this.current.findIndex(el => el.Id === item.Id)
      if (wh < 0) {
        this.current.push(item)
        const res = await this.$apix.post('UpdateDefaultKeyword', { keywordId: item.Id, add: true })
        if (res.data.d !== 'OK') {
          this.$showMessage(res.data.d)
        }
      }
    },
    async loadData () {
      let res = await this.$apix.post('GetDefaultKeywords')
      this.current = res.data.d.current
      this.style = res.data.d.style
      console.log('style', this.style)
      this.technique = res.data.d.technique
      this.subject = res.data.d.subject
    }
  }
}
</script>

<style>
.kdiv {
  border:1px solid #ccc;
  border-radius:5px;
  padding:20px;
  margin:16px 0;
}

.keyword-hider{
  opacity:0;
  transition:opacity 0.2s linear;
}

.keyword-hider.visible{
  opacity:1;
}
</style>
