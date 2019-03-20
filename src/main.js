// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import setTitle from './util/setTitle'
import store from './store'
window.setTitle = setTitle
axios.defaults.baseURL = 'https://www.sevenglish.com/sevenglish'

Vue.config.productionTip = false

Vue.prototype.axios = axios

/* eslint-disable no-new */
/* global setTitle */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
