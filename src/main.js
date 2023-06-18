
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import HomeView from './views/HomeView.vue'
import MainView from './views/MainPage.vue'
import PickupPoint from './views/PickupPoint.vue'

const router = createRouter({
  routes: [{
      path: '/',
      component: HomeView
    },
    {
      path: '/main',
      component: MainView
    },
    {
      path: '/point',
      component: PickupPoint
    }
  ],
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
