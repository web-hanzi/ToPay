import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/login'
import loginsuccess from '../components/loginsuccess'
import searchlist from '../components/searchlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/loginsuccess',
      name: 'loginsuccess',
      component: loginsuccess
    },
    {
      path: '/searchlist',
      name: 'searchlist',
      component: searchlist
    }
  ]
})
