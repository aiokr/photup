<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import FlowItem from '@/components/FlowItem.vue';
import ImageViewer from '@/components/ImageViewer.vue';
import { useViewModeStore } from '@/stores/viewMode';
import { isMapView } from '@/stores/mapStore';
import IconTime from '@/components/icons/IconTime.vue';

const viewModeStore = useViewModeStore();
isMapView().toggleMap(false)

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

// 添加一个响应式变量来控制模态框的显示
const isDialogVisible = ref(false);
const selectedIndex = ref(0);

// 创建一个方法来切换模态框的显示状态
function toggleDialog(index: number) {
  selectedIndex.value = index; // 设置当前选中的索引
  isDialogVisible.value = !isDialogVisible.value; // 切换模态框的显示状态

  if (isDialogVisible.value) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}

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
    <section v-for="(item, index) in filteredData" :key="item.id">
      <FlowItem :item="item" :index="index" :mode="viewModeStore.mode" :onToggleDialog="() => toggleDialog(index)" />
    </section>
  </div>
  <Transition>
    <Model v-if="isDialogVisible" @close="toggleDialog(0)" :index="selectedIndex">
      <div class="modalOverlay bg-gray-50 dark:bg-zinc-800 dark:text-gray-50" @click="toggleDialog(0)"></div>
      <div class="flex p-3 text-gray-400">
        <div @click="toggleDialog(0)">
          <IconX />
        </div>
      </div>
      <ImageViewer :item="filteredData[selectedIndex]" />
    </Model>
  </Transition>
  <div class="sentinel w-full h-1" id="sentinel"></div>
  <div class="w-full h-14"></div>
  <div v-if="isLoading" class="pb-14 text-gray-300">
    <IconTime class="loading-icon mx-auto" />
  </div>
  <div v-if="!isLoading" class="h-[68px] text-gray-300">
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

Model {
  z-index: 999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

.modalOverlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>

<style>
.no-scroll {
  overflow: hidden;
}
</style>