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
      props: { star: true },
      meta: { title: 'Photup' }
    },
    {
      path: '/recent',
      name: 'recent',
      component: HomeView,
      meta: { title: 'Recent Photo' }
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
      props: { isMap: true },
      meta: { title: 'Photup Discover' }
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
