import Vue from 'vue'
import Router from 'vue-router'
import createOrder from '@/components/createOrder'
import confirmOrder from '@/components/confirmOrder'

Vue.use(Router)

export default new Router({
  base: 'test',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/createOrder'
    },
    {
      path: '/createOrder',
      name: 'createOrder',
      component: createOrder
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    }
  ]
})
