<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import FlowItem from '@/components/FlowItem.vue';
import { useViewModeStore } from '@/stores/viewMode';
import IconTime from '@/components/icons/IconTime.vue';

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
const currentPage = ref(1); // 第一页
const perPage = ref(12);  // 每页加载的数据量
const allDataLoaded = ref(false);

const isLoading = ref(false);

const observer = ref<IntersectionObserver | null>(null);

const formatDate = (dateString: string) => {
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
  if (allDataLoaded.value || isLoading.value) return;

  isLoading.value = true;
  let url = `https://flex.tripper.press/flex/flow?page=${page}&per_page=${perPage.value}`;
  try {
    const response = await fetch(url);

    if (!response.ok) { // 如果响应的状态码不是2xx
      const errorData = await response.json();
      if (errorData.message === "Out of range (> maxPage)") {
        allDataLoaded.value = true; // 停止进一步加载
        return; // 退出函数
      }
      throw new Error(`Error: ${response.status}`); // 抛出其他错误
    }

    const data: Item[] = await response.json();

    if (data.length === 0) {
      allDataLoaded.value = true;
    } else {
      flowData.value = [...flowData.value, ...data];

      // 每次获取新数据后，重新排序
      sortDataByDate();
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false; // 数据加载完成，设置 isLoading 为 false
    // 确保在加载更多数据之前，哨兵元素不在视口内
    await nextTick();
    const sentinel = document.getElementById('sentinel');
    if (sentinel && sentinel.getBoundingClientRect().bottom <= window.innerHeight) {
      // 延迟加载更多数据，以避免立即触发
      setTimeout(() => {
        loadMoreData();
      }, 300);
    }
  }
}

const loadMoreData = () => {
  if (!allDataLoaded.value && !isLoading.value) {
    currentPage.value++;
    fetchData(currentPage.value);
  }
};

// 在哨兵元素进入视口时加载更多数据
const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  if (entries[0].isIntersecting) {
    loadMoreData();
  }
};

// 监听哨兵元素
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
  <div class="container max-w-[1200px] mx-auto md:pt-6 transition-all"
    :class="viewModeStore.mode === 'grid' ? 'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2' : ''">
    <section v-for="item in filteredData" :key="item.id">
      <FlowItem :item="item" :mode="viewModeStore.mode" />
    </section>
  </div>
  <div class="sentinel w-1 h-1 mb-12" id="sentinel"></div>
  <Transition name="fade">
    <div v-if="isLoading" class="pb-14 text-gray-300">
      <IconTime class="loading-icon mx-auto" />
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>