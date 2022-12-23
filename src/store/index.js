import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexSession = new VuexPersist({
  key: 'illustration-x',
  storage: sessionStorage,
  reducer: (state) => ({
    poms: state.poms
  })
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messagebox: {
      title: 'IllustrationX',
      message: '',
      show: false
    },
    poms: {
      selectedArtist: {}
    },
    pageTitle: ''
  },
  mutations: {
    setPageTitle (state, val) {
      state.pageTitle = val
    },
    setMessage (state, val) {
      state.messagebox.message = val
    },
    showMessage (state, val) {
      state.messagebox.show = val
    },
    setSelectedArtist (state, val) {
      console.log('setting to', val)
      state.poms.selectedArtist = val
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexSession.plugin]
})
