<script lang="ts">
import { defineComponent, type PropType } from 'vue';

type Item = any;

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    }
  },
});


</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <el-image class="w-fit shadow-2xl modalImageViewer" :src="item.url" :alt="item.id" :height="item.exif.height"
      :width="item.exif.width" />
    <ImageInfo :item="item" place="modal"/>
  </div>
</template>

<style>
.modalImageViewer .el-image__inner {
  max-height: 80vh;
}
</style>