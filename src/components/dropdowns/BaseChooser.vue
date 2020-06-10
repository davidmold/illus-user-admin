<template>
  <div class="drop-search">
    <div class="suggestion over" v-show="doneChoosing" v-on:click="open">
        <div>{{ selectedItem.ReverseName }}</div>
    </div>
    <div v-show="!doneChoosing" class="g-box-holder">
      <input
        type="text"
        class="g-search-box"
        ref="gItemSearchBox"
        placeholder="Search"
        v-model="searchText"
        v-on:keyup="search"
        v-on:keydown.enter="close(true)"
        v-on:keydown.esc="close(false)"
        v-on:keydown.down="down"
        v-on:keydown.up="up"
        v-on:blur="close(false)"

      />
      <div class="material-icons abs-input" v-show="searchText.length > 0"
          v-on:click="clear" v-on:mousedown.prevent>clear</div>
    </div>
    <div class="sug-div" ref="sugDiv">
      <div class="drop-suggestions" v-show="showResults" v-bind:style="{maxHeight: mheight + 'px'}" ref="sugHold">
        <div class="suggestion"

          v-for="(item, index) in result"
          v-bind:key="index"
          v-bind:id="'sug' + index"
          v-on:mousedown.prevent
          v-on:mouseenter="highlightedIndex = index"
          v-on:click="setItem(item)"
          v-bind:class="{active: index === highlightedIndex, live: item.Live}"
        ><div>{{ item.ReverseName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: Object,
    defaultItem: Object,
    options: Array
  },
  data () {
    return {
      searchText: '',
      result: [],
      showResults: false,
      selectedItem: { name: '' },
      doneChoosing: true,
      highlightedIndex: 0,
      lastSearch: '',
      mheight: 400,
      defaultSelectedItem: { name: 'Please select...' }
    }
  },
  created: function () {
    if (this.defaultItem) {
      this.defaultSelectedItem = this.defaultItem
    }
    if (this.value) {
      this.selectedItem = this.value
    } else {
      this.selectedItem = this.defaultSelectedItem
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onScroll)
    this.onScroll()
  },
  methods: {
    search: function () {
      if (this.searchText.length > 0) {
        if (this.searchText != this.lastSearch) {
          let st = this.searchText.toLowerCase()
          this.result = this.options.filter(el => el.ReverseName.toLowerCase().includes(st))
          if (this.result.length > 0) {
            this.showResults = true
          }
          this.lastSearch = this.searchText
        }
      } else {
        if (this.options) {
          this.result = this.options
          this.showResults = true
        }
      }
    },
    clear: function () {
      this.searchText = ''
      this.selectedItem = this.defaultSelectedItem
      this.open()
    },
    down: function () {
      if (this.highlightedIndex < this.result.length - 1) {
        this.highlightedIndex++
        this.scrollHighlightedIntoView()
      }
    },
    moveElementIntoView: function (el, parentEl) {
      let parentTop = parentEl.scrollTop
      let parentBottom = parentEl.offsetHeight + parentTop
      if (el.offsetTop < parentTop) {
        parentEl.scrollTop = el.offsetTop - 10
      } else if (el.offsetTop + el.offsetHeight > parentBottom) {
        let offsetBottom = el.offsetTop + el.offsetHeight + 10
        parentEl.scrollTop = offsetBottom - parentEl.offsetHeight
      }
    },
    scrollHighlightedIntoView: function () {
      if (this.result.length > 0) {
        var el = document.getElementById('sug' + this.highlightedIndex)
        if (el) {
          this.moveElementIntoView(el, this.$refs.sugHold)
        }
      }
    },
    up: function () {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--
        this.scrollHighlightedIntoView()
      }
    },
    setItem: function (item) {
      this.selectedItem = item
      this.itemSelected()
      console.log('item selected is', this.selectedItem)
      this.$emit('input', this.selectedItem)
    },
    open () {
      this.doneChoosing = false
      this.search()
      this.$nextTick(() => {
        this.$refs.gItemSearchBox.focus()
        this.onScroll()
      })
    },
    close: function (select) {
      this.lastSearch = ''
      if (select) {
        if (this.highlightedIndex < this.result.length) {
          this.selectedItem = this.result[this.highlightedIndex]
          this.itemSelected()
        }
        if (this.selectedItem) {
          this.itemSelected()
        }
      } else {
        this.doneChoosing = true
        this.showResults = false
      }
    },
    itemSelected: function () {
      this.doneChoosing = true
      this.showResults = false
      this.searchText = ''
    },
    onScroll: function () {
      if (this.$refs.sugDiv) {
        var pos = this.$refs.sugDiv.getBoundingClientRect()
        var h = window.innerHeight
        var sz = h - pos.top
        this.mheight = sz - 20
      }
    }
  },
  watch: {
    value: function () {
      console.log('setting value to', this.value)
      this.selectedItem = this.value
    },
    options: function () {
      this.result = this.options
      this.highlightedIndex = 0
      this.$nextTick(() => {
        this.scrollHighlightedIntoView()
      })
    }
  }
}
</script>
<style scoped>
.drop-search{
    display:inline-flex;
    flex-direction: column;
    width:220px;
    position:relative;
    margin-bottom:10px;
    font-size:16px;
}

.drop-search input[type="text"] {
    display:block;
}

.sug-div{
    position:relative;
}

.drop-suggestions{
    position:absolute;
    z-index:30;
    background-color:#fff;
    max-height:400px;
    overflow-y:auto;
    overflow-x:hidden;
    box-shadow:2px 2px 2px rgba(0,0,0,0.3);
    width:100%;
    border:1px solid #662b57;
}

.suggestion{
    padding:4px;
    background-color:#eee;
    transition:all 0.1s ease;
    cursor:pointer;
    box-sizing:border-box;
    width:100%;
    min-height:27px;
    background-color:#fff;
    color:#888;
}

.suggestion.over{
  border:1px solid #888;
  color:#000;
}

.suggestion.over:hover{
  box-shadow:1px 1px 4px rgba(0,0,0,0.4);
}

.suggestion.live{
  color:#000;
}

.suggestion.active {
    background-color: #ce0e2d;
    color:#fff;
}

input[type="text"].g-search-box{
    box-sizing:border-box;
    width:100%;
    border-radius: 0;
    display:block;

}

.abs-input {
  position:absolute;
  top:50%;
  right:8px;
  transform:translate(-0, -50%);
  z-index:10;
  color:#ccc;
  cursor:pointer;
  font-size:20px;
}

.abs-input:hover {
  color:#662b57;
}
</style>
