import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import BaseLayout from '../layouts/BaseLayout.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import TransactionPage from '../views/TransactionPage.vue'
import DetailMenuPage from '../views/DetailMenuPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePage
        },
        {
          path: '/transaction',
          name: 'transaction',
          component: TransactionPage
        },
        {
          path: '/detailMenu/:id',
          name: 'detailMenu',
          component: DetailMenuPage
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },

  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token
  if((to.name == 'home' || to.name == 'detailMenu'|| to.name == 'transaction') && !isAuthenticated){
    next({name: 'login'})
  } else if (isAuthenticated && (to.name == 'login' || to.name == 'register')){
    next({name: 'home'})
  } else {
    next()
  }
})

export default router
