import Vue from 'vue'
import Router from 'vue-router'

import ContactView from '../view/ContactView'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ContactView',
      component: ContactView
    }
  ]
})
