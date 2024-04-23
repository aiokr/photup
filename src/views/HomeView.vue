<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import FlowItem from '@/components/FlowItem.vue';
import { useViewModeStore } from '@/stores/viewMode';

const viewModeStore = useViewModeStore();

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

const flowData = ref<Item[]>([]);
const currentPage = ref(1);
const perPage = ref(9);
const allDataLoaded = ref(false);

const observer = ref<IntersectionObserver | null>(null);

const formatDate = (dateString: string) => {
  // 假设你的日期是标准的 ISO 格式或者可以被 Date.parse 解析的格式
  // 如果不是，请在这里转换成可以被解析的格式
  return new Date(dateString);
};

const sortDataByDate = () => {
  flowData.value.sort((a, b) => {
    // 解析日期
    const dateA = formatDate(a.exif.DateTimeOriginal);
    const dateB = formatDate(b.exif.DateTimeOriginal);
    
    // 按日期排序
    return dateB.getTime() - dateA.getTime();
  });
};

async function fetchData(page: number) {
  if (allDataLoaded.value) return;

  let url = `https://flex.tripper.press/flex/flow?page=${page}&per_page=${perPage.value}`;
  try {
    const response = await fetch(url);
    const data: Item[] = await response.json();
    
    if (data.length < perPage.value) {
      allDataLoaded.value = true; // 如果返回的数据少于预期，假设所有数据已加载
    }
    
    flowData.value = [...flowData.value, ...data];
    
    // 每次获取新数据后，重新排序
    sortDataByDate();

  } catch (error) {
    console.error(error);
  }
}

const loadMoreData = () => {
  if (!allDataLoaded.value) {
    currentPage.value++;
    fetchData(currentPage.value);
  }
};

const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  if (entries[0].isIntersecting) {
    loadMoreData();
  }
};

onMounted(() => {
  observer.value = new IntersectionObserver(onIntersect, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  });

  const sentinel = document.querySelector('#sentinel');
  if (sentinel) {
    observer.value.observe(sentinel);
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

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

fetchData(currentPage.value);

</script>

<template>
  <div class="container max-w-[1200px] mx-auto pb-24 md:pt-6"
    :class="viewModeStore.mode === 'grid' ? 'grid grid-cols-3 gap-1 md:gap-2' : '1'">
    <section v-for="item in filteredData" :key="item.id">
      <FlowItem :item="item" :mode="viewModeStore.mode" />
    </section>
    <div class="sentinel" id="sentinel"></div>
  </div>
</template>