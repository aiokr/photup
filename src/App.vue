<script setup lang="ts">
import { RouterView } from 'vue-router';
import IconStar2 from './components/icons/IconStar2.vue';
import IconTime from './components/icons/IconTime.vue';
import SiteHeader from './components/SiteHeader.vue';
import { isMapView } from '@/stores/mapStore';
import { isImageView } from '@/stores/viewMode';
import SiteNav from './components/SiteNav.vue';

const navItems = [
  {
    name: '首页',
    path: '/',
    icon: IconStar2,
  },
  {
    name: '最近',
    path: '/recent',
    icon: IconTime,
  },
];

const recommendLocations = [
  {
    name: '城市记忆',
    items: [
      {
        name: '柳州市',
        location: [109.4284, 24.3262],
        zoom: 9,
        image: 'https://imgur.lzmun.com/tricms/1712461091301-DSC01133.jpg_itp',
      },
      {
        name: '南宁市',
        location: [108.3664, 22.8161],
        zoom: 8,
        image: 'https://imgur.lzmun.com/tricms/1712675251864-DSC06702im.jpg_itp',
      },
      {
        name: '重庆市',
        location: [107.0539, 29.5904],
        zoom: 6,
        image: 'https://imgur.lzmun.com/tricms/1714887197154-DSC04777-web.jpg',
      }
    ]
  },
  {
    name: '向着星辰与深渊',
    items: [
      {
        name: '龙女沟',
        location: [109.2028160, 25.226878],
        zoom: 14,
        image: 'https://imgur.lzmun.com/tricms/1713662884707-20231004_DSC01937-%E7%BC%96%E8%BE%91_MARK.jpg',
      },
      {
        name: '麒麟水库',
        location: [109.161667, 24.412677],
        zoom: 12,
        image: 'https://imgur.lzmun.com/tricms/1713663117870-20231014_DJI_0070-web.jpg',
      }
    ]
  }
]

const isCnUrl = () => {
  return window.location.href.indexOf('lzmun') > -1;
}

</script>

<template>
  <div v-if="isMapView().mode == false" class="dark:bg-zinc-950 dark:text-gray-50">
    <SiteHeader />
  </div>
  <SiteNav v-if="isImageView().mode == false" :navItems="navItems" :recommendLocations="recommendLocations" />
  <section class="dark:bg-zinc-900 dark:text-gray-50">
    <RouterView />
  </section>
  <div v-if="isMapView().mode == false && isCnUrl() == true">
    class="w-full flex justify-center items-center gap-2 text-gray-300 text-xs pb-12">
    <a href="https://beian.miit.gov.cn/" target="_blank">桂ICP备17001361号</a>
    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45020502000245"
      target="_blank">桂公网安备45020502000245号</a>
  </div>
</template>