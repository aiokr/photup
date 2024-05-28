<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import ImageViewer from '@/components/ImageViewer.vue';
import { isImageView } from '@/stores/viewMode';

const route = useRoute();

// 使用ref来创建一个响应式引用
const imageId = ref<string>('');
const imageData = ref(null); // 用来存储异步请求获取的数据

// 创建一个计算属性来动态生成URL
const url = computed(() => `https://flex.tripper.press/flex/photo?id=${imageId.value}`);

onMounted(async () => {
  imageId.value = route.params.id as string;
  try {
    const response = await fetch(url.value);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    imageData.value = await response.json(); // 更新imageData的值
  } catch (error) {
    console.error(error);
  }
});

isImageView().toggleImageView(true);

</script>

<template>
  <div class="lg:pt-6">
    <ImageViewer v-if="imageData" :item="imageData" />
  </div>
</template>
