import Vue from 'vue'
import Router from 'vue-router'
import createOrder from '@/components/createOrder'
import confirmOrder from '@/components/confirmOrder'
import newsDetail from '@/components/newsDetail'

Vue.use(Router)

export default new Router({
  base: 'pay',
  mode: 'history',
  routes: [
    {
      path: '/:prodid',
      name: 'index',
      redirect: '/createOrder/:prodid'
    },
    {
      path: '/createOrder/:prodid',
      name: 'createOrder',
      component: createOrder
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    },
    {
      path: '/newsDetail/:newsid',
      name: 'newsDetail',
      component: newsDetail
    }
  ]
})
