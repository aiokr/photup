import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapView from '../views/MapView.vue'
import ImageView from '../views/ImageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: { star: true }
    },
    {
      path: '/recent',
      name: 'recent',
      component: HomeView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
      props: { isMap: true }
    },
    {
      path: '/image/:id',
      name: 'image',
      component: ImageView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: '404',
      component: () => import('../views/404View.vue')
    }
  ]
})

export default router
