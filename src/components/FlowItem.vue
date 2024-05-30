<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import ImageInfo from './ImageInfo.vue';
type Item = any;

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    onToggleDialog: {
      type: Function as PropType<(index: number) => void>,
      required: true
    }
  }
  // ...
});

</script>

<script setup lang="ts">

</script>

<template>
  <div :class="mode !== 'grid' ? 'flex flex-col md:flex-row gap-2 pb-4' : null">
    <el-image class="mx-auto md:mr-0 md:ml-auto !block" :src="item.url" :alt="item.title" :height="item.exif.height"
      :width="item.exif.width" lazy :fit="mode === 'grid' ? 'cover' : 'contain'" @click="onToggleDialog(index)"
      :class="mode === 'grid' ? 'h-full w-full object-cover object-center aspect-square gridView' : 'max-h-full max-w-full aspect-[' + item.exif.width / item.exif.height + ']'" />
    <div v-if="mode !== 'grid'">
      <ImageInfo :item="item" :class="mode === 'grid' ? 'hidden' : 'sticky top-8 md:w-[40vw]'"
        :place="mode === 'grid' ? 'grid' : 'flow'" />
    </div>
  </div>
</template>

<style scoped>
.flowItemInfo {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.flowItemInfo::-webkit-scrollbar {
  display: none;
}
</style>

<style>
.gridView .el-image__inner {
  width: 100%;
  height: 100%;
}

.el-image__inner {
  width: fit-content;
  object-fit: contain;
  margin: 0 auto;
}

@media screen and (min-width: 1023px) {
  .el-image__inner {
    max-height: 80vh;
  }
}

.el-rate {
  --el-rate-disabled-void-color: #f8fafc !important;
  --el-rate-fill-color: #cbd5e1 !important;
}
</style>
