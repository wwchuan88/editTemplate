<template>
  <div class="w-full flex flex-col gap-4 pt-4 pb-4 rounded-t-xl" id="toolbar-filter">
    <div class="flex items-center gap-4 pb-3 border-b border-gray-200">
      <div class="flex-1 flex items-center gap-2">
        <button 
          class="px-4 py-2 rounded-full bg-primary text-yellow-300 text-xs" 
          @click="switchFilterCategory('preset')"
        >
          精选预设
        </button>
        <button 
          class="px-4 py-2 rounded-full text-on-surface-variant text-xs" 
          @click="switchFilterCategory('youth')"
        >
          青春预设
        </button>
      </div>
      <button class="bg-primary p-3 rounded-full text-white shadow-lg hover:scale-105 transition-all"
        @click="selectTool(null, 'default')">
        <span class="material-symbols-outlined">check</span>
      </button>
    </div>
    <div class="flex-1">
      <!-- 精选预设 -->
      <div id="filter-preset" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <div
              class="w-20 h-20 bg-surface-container rounded-xl flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="applyFilter('original')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFilter === 'original' }"
            >
              <img alt="Original" class="w-full h-full object-cover" 
                src="/images/filters/original1.png" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                <span class="text-white text-xs font-bold">原图</span>
              </div>
            </div>
            <div
              class="w-20 h-20 bg-surface-container rounded-xl flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="applyFilter('warm')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFilter === 'warm' }"
            >
              <img alt="Warm" class="w-full h-full object-cover" 
                src="/images/filters/warm1.png" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                <span class="text-white text-xs font-bold">温暖</span>
              </div>
            </div>
            <div
              class="w-20 h-20 bg-surface-container rounded-xl flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="applyFilter('black')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFilter === 'black' }"
            >
              <img alt="Black" class="w-full h-full object-cover" 
                src="/images/filters/black1.png" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                <span class="text-white text-xs font-bold">黑白</span>
              </div>
            </div>
            <div
              class="w-20 h-20 bg-surface-container rounded-xl flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="applyFilter('vivid')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFilter === 'vivid' }"
            >
              <img alt="Vivid" class="w-full h-full object-cover" 
                src="/images/filters/vivid1.png" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                <span class="text-white text-xs font-bold">鲜艳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 青春预设 -->
      <div id="filter-youth" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth hidden">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <div
              class="w-20 h-20 bg-surface-container rounded-xl flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="applyFilter('cool')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFilter === 'cool' }"
            >
              <img alt="Cool" class="w-full h-full object-cover" 
                src="/images/filters/cool1.png" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                <span class="text-white text-xs font-bold">冷清</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 状态管理
const selectedFilterCategory = ref('preset');
const selectedFilter = ref(null);

// 切换滤镜分类
const switchFilterCategory = (category) => {
  selectedFilterCategory.value = category;
  
  // 隐藏所有滤镜内容区域
  const filterContents = ['filter-preset', 'filter-youth'];
  filterContents.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('hidden');
    }
  });
  
  // 显示选中的滤镜内容区域
  const selectedElement = document.getElementById('filter-' + category);
  if (selectedElement) {
    selectedElement.classList.remove('hidden');
  }
  
  // 更新上层导航按钮的高亮显示
  const buttons = document.querySelectorAll('#toolbar-filter .flex-1 button');
  buttons.forEach(button => {
    if (button.textContent.includes(getFilterCategoryLabel(category))) {
      button.classList.remove('bg-surface', 'text-on-surface-variant');
      button.classList.add('bg-primary', 'text-yellow-300');
    } else {
      button.classList.remove('bg-primary', 'text-yellow-300');
      button.classList.add('bg-surface', 'text-on-surface-variant');
    }
  });
};

// 获取滤镜分类标签
const getFilterCategoryLabel = (category) => {
  switch(category) {
    case 'preset': return '精选预设';
    case 'youth': return '青春预设';
    default: return '';
  }
};

// 应用滤镜
const applyFilter = (filter) => {
  // 如果点击的是当前选中的滤镜，则取消选中
  if (selectedFilter.value === filter) {
    selectedFilter.value = null;
    // 触发取消滤镜事件
    const event = new CustomEvent('remove-filter');
    window.dispatchEvent(event);
  } else {
    selectedFilter.value = filter;
    // 触发应用滤镜事件
    const event = new CustomEvent('apply-filter', { detail: { filter } });
    window.dispatchEvent(event);
  }
};

// 选择工具
const selectTool = (btn, toolType) => {
  // 触发工具选择事件
  const event = new CustomEvent('tool-selected', { detail: { toolType } });
  window.dispatchEvent(event);
};
</script>

<style scoped>
/* 组件样式 */
</style>