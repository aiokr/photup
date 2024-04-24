<script lang="ts">
import { defineComponent, type PropType } from 'vue';

type Item = any;

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    }
  }
  // ...
});
</script>

<template class="">
  <div class="flex flex-col items-center">
    <el-image class="w-fit shadow-2xl" :src="item.url" :alt="item.title" :height="item.exif.height"
      :width="item.exif.width" lazy />
  </div>
    <ImageInfo :item="item" place="modal" />
</template>

<style scoped>
.el-image__inner {
  max-height: 80vh;
}
</style>