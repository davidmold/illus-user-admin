<template>
  <div class="image-keywords-window">
    <div class="closebox" v-on:click="$emit('close')"></div>
    <div class="kdiv">
      <h3>Selected keywords</h3>
      <div v-if="image">
        <keyword-button v-for="keyword in image.IaxKeys" selected :key="keyword.Id" :keyword="keyword" @remove="handleRemove"></keyword-button>
      </div>
    </div>
    <div class="keyword-hider visible" v-if="image">
      <div class="kdiv">
        <h3>Subject keywords</h3>
        <div>
          <keyword-button v-for="keyword in keywords.subject" :key="keyword.Id" :keyword="keyword" :selected="isSelected(keyword.Id)" @add="handleAdd" @remove="handleRemove"></keyword-button>
        </div>
      </div>
      <div class="kdiv">
        <h3>Style keywords</h3>
        <div>
          <keyword-button v-for="keyword in keywords.style" :key="keyword.Id" :keyword="keyword" :selected="isSelected(keyword.Id)" @add="handleAdd" @remove="handleRemove"></keyword-button>
        </div>
      </div>
      <div class="kdiv">
        <h3>Technique keywords</h3>
        <div>
          <keyword-button v-for="keyword in keywords.technique" :key="keyword.Id" :keyword="keyword" :selected="isSelected(keyword.Id)" @add="handleAdd" @remove="handleRemove"></keyword-button>
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
  props: {
    image: Object
  },
  data () {
    return {
      showKeywords: false,
      keywords: null
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
      if (!this.image) {
        return false
      }
      for (let item of this.image.IaxKeys) {
        if (item.Id === id) {
          return true
        }
      }
    },
    async handleRemove (item) {
      const wh = this.image.IaxKeys.findIndex(el => el.Id === item.Id)
      if (wh >= 0) {
        this.image.IaxKeys.splice(wh, 1)
        const res = await this.$post('UpdateKeyword', { imageId: this.image.Id, keywordId: item.Id, add: false })
        if (res !== 'OK') {
          this.$showMessage(res)
        }
      }
    },
    async handleAdd (item) {
      const wh = this.image.IaxKeys.findIndex(el => el.Id === item.Id)
      if (wh < 0) {
        this.image.IaxKeys.push(item)
        const res = await this.$post('UpdateKeyword', { imageId: this.image.Id, keywordId: item.Id, add: true })
        if (res !== 'OK') {
          this.$showMessage(res)
        }
      }
    },
    async loadData () {
      this.keywords = await this.$post('GetDefaultKeywords')
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

.image-keywords-window {
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  z-index:1020;
  min-width:800px;
  max-height:95%;
  box-sizing:border-box;
  overflow-y:auto;
}
</style>
