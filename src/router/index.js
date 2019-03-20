import Vue from 'vue'
import Router from 'vue-router'
import createOrder from '@/components/createOrder'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/createOrder',
      name: 'createOrder',
      component: createOrder
    }
  ]
})
