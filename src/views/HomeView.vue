<script setup lang="ts">
import { ref } from 'vue';

// 假设 Item 是数据项的类型，包含 id 和 exif 属性
interface Item {
  id: number;
  url: string;
  exif: {
    Make: string;
    Model: string;
    LensModel: string;
    DateTimeOriginal: any;
  };
}

function fetchData() {
  let url = "https://flex.tripper.press/flex/flow";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data; // 返回获取到的数据
    })
    .catch((error) => {
      console.error(error); // 错误处理
    });
}
const flowData = ref<Item[]>([]); // 定义响应式数据

fetchData().then((data) => {
  flowData.value = data; // 将获取到的数据赋值给 flowData
});

</script>

<template>
  <div class="container max-w-[1200px] mx-auto">
    <section v-for="item in flowData" :key="item.id" class="pt-6">
      <div class="grid grid-cols-8 gap-6">
        <img :src="item.url" class="max-h-[80vh] mx-auto col-span-6" />
        <div class="cols-span-2 z-0 text-xs text-gray-400">
          <div class="sticky top-20 flex flex-col items-start">
            <div>{{ item.exif.Make }} {{ item.exif.Model }}</div>
            <div> {{ item.exif.LensModel }}</div>
            <div class="pt-6">{{ new Date(item.exif.DateTimeOriginal).toLocaleString("default") }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
