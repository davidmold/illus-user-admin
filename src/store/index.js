import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import apix from '../api.js'

const post = async function (url, data) {
  let res = await apix.post(url, data)
  return res.data.d
}

const vuexSession = new VuexPersist({
  key: 'illustration-x',
  storage: sessionStorage,
  reducer: (state) => ({
    poms: state.poms
  })
})

async function waitfor (len) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve()
      }, len)
    } catch (err) {
      reject(err)
    }
  })
}

Vue.use(Vuex)

let loadingArtist = false
let loadedArtist = false

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
    pageTitle: '',
    loggedArtist: null
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
      state.poms.selectedArtist = val
    },
    setLoggedArtist (state, val) {
      state.loggedArtist = val
    }
  },
  actions: {
    async fetchLoggedArtist (context) {
      if (loadedArtist) {
        return context.state.loggedArtist
      }
      if (loadingArtist) {
        let ctr = 0
        while (loadingArtist) {
          await waitfor(300)
          ctr++
          if (ctr > 50) {
            loadingArtist = false
          }
        }
        return context.state.loggedArtist
      }
      loadingArtist = true
      const ret = await post('GetLoggedArtistObject')
      context.commit('setLoggedArtist', ret)
      loadingArtist = false
      loadedArtist = true
      return context.state.loggedArtist
    }
  },
  modules: {
  },
  plugins: [vuexSession.plugin]
})
