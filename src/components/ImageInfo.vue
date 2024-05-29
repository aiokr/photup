<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';

type Item = any;

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    },
    place: {
      type: String
    }
  }
  // ...
});

</script>

<script setup lang="ts">

function formatFNumber(fNumber: string) {
  const parts = fNumber.split('/');
  if (parts.length === 2) {
    const numerator = parseFloat(parts[0]);
    const denominator = parseFloat(parts[1]);
    if (denominator !== 0) {
      return ('F' + (numerator / denominator).toFixed(1))
    }
  }
  return fNumber; // 如果格式不正确，返回原始字符串
}

function formatExposureTime(exposureTime: string) {
  if (exposureTime.includes('/')) {
    const parts = exposureTime.split('/');
    if (parts.length === 2) {
      const numerator = parseFloat(parts[0]);
      const denominator = parseFloat(parts[1]);
      if (denominator !== 0) {
        const newExposureTime = numerator / denominator
        if (newExposureTime >= 1) {
          return newExposureTime.toFixed(0)
        }
        return exposureTime
      }
    }
  }
  return exposureTime; // 如果格式不正确，返回原始字符串
}

const isMetaPanel = ref(false);

</script>

<template>
  <div class="z-0 text-[10px] text-gray-400 pb-8"  :class="place === 'modal' ? 'pt-4 md:pt-6':''">
    <div class="flowItemInfo items-start justify-start gap-4 whitespace-nowrap overflow-x-auto px-2"
      :class="place === 'modal' ? 'hidden lg:flex' : 'flex flex-col'">
      <div v-if="item.info.rating">
        <el-rate :model-value="item.info.rating" disabled />
      </div>
      <div v-if="item.exif.Make && item.exif.Model" class="flex flex-col gap-1"
        :class="place === 'modal' ? 'items-center' : ''">
        <span>相机</span>
        <span>{{ item.exif.Make }} {{ item.exif.Model }}</span>
      </div>
      <div v-if="item.exif.LensModel" class="flex flex-col gap-1" :class="place === 'modal' ? 'items-center' : ''">
        <span>镜头</span>
        <span>{{ item.exif.LensModel }}</span>
      </div>
      <div v-if="item.exif" class="flex flex-col gap-1" :class="place === 'modal' ? 'items-center' : ''">
        <span>参数</span>
        <span class="flex gap-1" :class="place === 'modal' ? 'items-center' : ''">
          <span v-if="item.exif.FNumber">{{ formatFNumber(item.exif.FNumber) }}</span>
          <span v-if="item.exif.ExposureTime">{{ formatExposureTime(item.exif.ExposureTime) }}</span>
          <span v-if="item.exif.ISO">ISO{{ item.exif.ISO }}</span>
        </span>
      </div>
      <div v-if="item.exif.DateTimeOriginal" class="flex flex-col gap-1 pr-8 md:pr-0"
        :class="place === 'modal' ? 'items-center' : ''">
        <span>拍摄时间</span>
        <span>{{ new Date(item.exif.DateTimeOriginal).toLocaleString("default") }}</span>
      </div>
    </div>
    <!--小屏幕弹框-->
    <div
      class="lg:hidden px-4 w-full fixed rounded-t-2xl left-0 right-0 bottom-0 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur transition-all"
      @click="isMetaPanel = !isMetaPanel" :class="{
        'block': place === 'modal',
        'hidden lg:flex': place !== 'modal',
        'collapsed': !isMetaPanel,
        'expanded': isMetaPanel
      }">
      <div class="text-[14px] text-center py-4">{{ item.title || '照片信息' }}</div>
      <div class="overflow-y-auto h-[50vh] pb-4">
        <div class="grid grid-cols-2 gap-5">
          <div v-if="item.info.rating" class="infoItem">
            <span>评分</span>
            <span class="infoItemContent">
              <el-rate :model-value="item.info.rating" disabled />
            </span>
          </div>
          <div class="infoItem">
            <span>拍摄时间</span>
            <span class="infoItemContent">{{ new Date(item.exif.DateTimeOriginal).toLocaleString("default") }}</span>

          </div>
          <div div v-if="item.exif.Make && item.exif.Model" class="infoItem">
            <span>相机</span>
            <span class="infoItemContent">{{ item.exif.Make }} {{ item.exif.Model }}</span>
          </div>
          <div v-if="item.info.rating" class="infoItem">
            <span>镜头</span>
            <span class="infoItemContent">{{ item.exif.LensModel }}</span>
          </div>
          <div class="col-span-2 grid grid-cols-3 gap-4">
            <div class="infoItem">
              <span class="text-sm">光圈</span>
              <span>{{ formatFNumber(item.exif.FNumber) }}</span>
            </div>
            <div class="infoItem">
              <span class="text-sm">快门速度</span>
              <span>{{ formatExposureTime(item.exif.ExposureTime) }}</span>
            </div>
            <div class="infoItem">
              <span class="text-sm">ISO</span>
              <span>{{ item.exif.ISO }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.collapsed {
  transform: translateY(50vh);
  /* Start hidden below the screen */
  transition: transform 0.3s ease-in-out;
  /* Smooth transition for the transform property */
}

.expanded {
  transform: translateY(0);
  /* Move to the original position */
}

.infoItem {
  @apply p-5 aspect-square rounded-xl bg-white dark:bg-zinc-800 flex flex-col justify-between;
  font-size: 16px;
}

.infoItemContent {
  font-size: 20px;
}
</style>