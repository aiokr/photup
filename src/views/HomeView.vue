<script setup lang="ts">
import { ref, computed } from 'vue';
import FlowItem from '@/components/FlowItem.vue';

// 假设 Item 是数据项的类型，包含 id 和 exif 属性
interface Item {
  id: number;
  url: string;
  title: string;
  info: {
    rating: number;
  };
  exif: {
    Make: string;
    Model: string;
    LensModel: string;
    DateTimeOriginal: any;
    width: number;
    height: number;
    FNumber: string;
    ISO: number;
    ExposureTime: string;
  };
}

type Props = {
  star?: boolean;
};

const props = defineProps<Props>();

const flowData = ref<Item[]>([]); // 定义响应式数据

async function fetchData() {
  let url = "https://flex.tripper.press/flex/flow";
  try {
    const response = await fetch(url);
    const data = await response.json();
    flowData.value = data; // 将获取到的数据赋值给 flowData
  } catch (error) {
    console.error(error); // 错误处理
  }
}

fetchData();

// 使用计算属性来根据 star prop 的值筛选 flowData
const filteredData = computed(() => {
  if (props.star) {
    // 如果 star 为 true，则筛选 rating 大于 5 的项
    return flowData.value.filter(item => item.info?.rating > 4);
  } else {
    // 如果 star 不是 true，返回所有项
    return flowData.value;
  }
});

</script>

<template>
  <div class="container max-w-[1200px] mx-auto pb-24">
    <section v-for="item in filteredData" :key="item.id" class="pt-6">
      <FlowItem :item="item" />
    </section>
  </div>
</template>