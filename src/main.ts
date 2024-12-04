import routes from 'virtual:generated-pages'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import store from './store'

import { subscribeRecord } from './utils'
import './utils/constant'
import './control'

subscribeRecord(store)

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.use(store)
app.mount('#app')
