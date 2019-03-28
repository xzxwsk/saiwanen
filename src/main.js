// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import router from './router'
import axios from 'axios'
import weui from 'weui.js'
import setTitle from './util/setTitle'
import store from './store'

import 'weui/dist/style/weui.min.css'
import './assets/fonts/iconfont'
import App from './App'

// axios.defaults.baseURL = '/api/sevenglish' // 本地
axios.defaults.baseURL = '/sevenglish' // 正式环境

window.setTitle = setTitle

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.weui = weui

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
