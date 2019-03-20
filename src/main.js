// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import setTitle from './util/setTitle'
import store from './store'
import 'iview/dist/styles/iview.css'
import './assets/fonts/iconfont'
import App from './App'

axios.defaults.baseURL = 'https://www.sevenglish.com/sevenglish'
window.setTitle = setTitle

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(iView)

Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
