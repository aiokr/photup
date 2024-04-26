<script lang="ts">
import { defineComponent, type PropType } from 'vue';

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

</script>

<template>
  <div class="z-0 text-[10px] text-gray-400 pb-8">
    <div
      class="flowItemInfo flex items-start md:items-center justify-start md:justify-center pt-4 md:pt-6 gap-4 whitespace-nowrap overflow-x-auto px-2">
      <div v-if="item.info.rating">
        <el-rate :model-value="item.info.rating" disabled />
      </div>
      <div v-if="item.exif.Make && item.exif.Model" class="flex flex-col items-center gap-1">
        <span>相机</span>
        <span>{{ item.exif.Make }} {{ item.exif.Model }}</span>
      </div>
      <div v-if="item.exif.LensModel" class="flex flex-col items-center gap-1">
        <span>镜头</span>
        <span>{{ item.exif.LensModel }}</span>
      </div>
      <div v-if="item.exif" class="flex flex-col items-center gap-1">
        <span>参数</span>
        <span class="flex items-center gap-1">
          <span v-if="item.exif.FNumber">{{ formatFNumber(item.exif.FNumber) }}</span>
          <span v-if="item.exif.ExposureTime">{{ formatExposureTime(item.exif.ExposureTime) }}</span>
          <span v-if="item.exif.ISO">ISO{{ item.exif.ISO }}</span>
        </span>
      </div>
      <div v-if="item.exif.DateTimeOriginal" class="flex flex-col items-center gap-1 pr-8 md:pr-0">
        <span>拍摄时间</span>
        <span>{{ new Date(item.exif.DateTimeOriginal).toLocaleString("default") }}</span>
      </div>
      <div class="absolute md:static right-0 h-[34px] pl-1 flex items-center justify-center"
        :class="place === 'flow' ? 'bg-gradient-to-r from-white/0 via-white to-white dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900' : 'hidden'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" class="w-5 h-5 m-2">
          <circle fill="currentColor" r="3" cy="24" cx="12" data-follow-fill="currentColor" />
          <circle fill="currentColor" r="3" cy="24" cx="24" data-follow-fill="currentColor" />
          <circle fill="currentColor" r="3" cy="24" cx="36" data-follow-fill="currentColor" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>