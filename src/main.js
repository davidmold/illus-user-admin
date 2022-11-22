import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apix from './api.js'
import SmallButton from './components/buttons/SmallButton.vue'
import LangSelect from './components/LangSelect.vue'
import DateUtils from './utils/date-utils.js'
import k from './constants.js'

Vue.config.productionTip = false
Vue.prototype.$apix = apix
Vue.prototype.$du = DateUtils
Vue.prototype.$k = k
Vue.component('small-button', SmallButton)
Vue.component('lang-select', LangSelect)
Vue.prototype.$showMessage = (ms) => {
  store.commit('setMessage', ms)
  store.commit('showMessage', true)
}
Vue.prototype.$hideMessage = () => {
  store.commit('showMessage', false)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
