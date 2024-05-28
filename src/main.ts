import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title.toString()
  }
  next()
})


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
