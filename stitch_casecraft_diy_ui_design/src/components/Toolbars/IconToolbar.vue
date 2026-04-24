<template>
  <div class="w-full flex flex-col gap-4 pt-4 pb-4 rounded-t-xl" id="toolbar-icon">
    <div class="flex items-center gap-4 pb-3 border-b border-gray-200">
      <div class="flex-1 flex items-center gap-2">
        <button 
          class="px-4 py-2 rounded-full bg-primary text-yellow-300 text-xs" 
          @click="switchIconCategory('shape')"
        >
          图形
        </button>
        <button 
          class="px-4 py-2 rounded-full text-on-surface-variant text-xs" 
          @click="switchIconCategory('people')"
        >
          人物
        </button>
        <button 
          class="px-4 py-2 rounded-full text-on-surface-variant text-xs" 
          @click="switchIconCategory('cartoon')"
        >
          卡通
        </button>
      </div>
      <button class="bg-primary p-3 rounded-full text-white shadow-lg hover:scale-105 transition-all"
        @click="selectTool(null, 'default')">
        <span class="material-symbols-outlined">check</span>
      </button>
    </div>
    <div class="flex-1">
      <!-- 图形图标 -->
      <div id="icon-shape" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('square')"
            >
              <span class="material-symbols-outlined text-2xl">square</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('circle')"
            >
              <span class="material-symbols-outlined text-2xl">circle</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('triangle')"
            >
              <span class="material-symbols-outlined text-2xl">change_history</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('star')"
            >
              <span class="material-symbols-outlined text-2xl">star</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('heart')"
            >
              <span class="material-symbols-outlined text-2xl">favorite</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('diamond')"
            >
              <span class="material-symbols-outlined text-2xl">diamond</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 人物图标 -->
      <div id="icon-people" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth hidden">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('person')"
            >
              <span class="material-symbols-outlined text-2xl">person</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('people')"
            >
              <span class="material-symbols-outlined text-2xl">people</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('man')"
            >
              <span class="material-symbols-outlined text-2xl">man</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('woman')"
            >
              <span class="material-symbols-outlined text-2xl">woman</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 卡通图标 -->
      <div id="icon-cartoon" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth hidden">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('emoji')"
            >
              <span class="material-symbols-outlined text-2xl">emoji_emotions</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('cat')"
            >
              <span class="material-symbols-outlined text-2xl">pets</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('car')"
            >
              <span class="material-symbols-outlined text-2xl">directions_car</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addIconToCanvas('plane')"
            >
              <span class="material-symbols-outlined text-2xl">airplane</span>
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
const selectedIconCategory = ref('shape');

// 切换图标分类
const switchIconCategory = (category) => {
  selectedIconCategory.value = category;
  
  // 隐藏所有图标内容区域
  const iconContents = ['icon-shape', 'icon-people', 'icon-cartoon'];
  iconContents.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('hidden');
    }
  });
  
  // 显示选中的图标内容区域
  const selectedElement = document.getElementById('icon-' + category);
  if (selectedElement) {
    selectedElement.classList.remove('hidden');
  }
  
  // 更新上层导航按钮的高亮显示
  const buttons = document.querySelectorAll('#toolbar-icon .flex-1 button');
  buttons.forEach(button => {
    if (button.textContent.includes(getIconCategoryLabel(category))) {
      button.classList.remove('bg-surface', 'text-on-surface-variant');
      button.classList.add('bg-primary', 'text-yellow-300');
    } else {
      button.classList.remove('bg-primary', 'text-yellow-300');
      button.classList.add('bg-surface', 'text-on-surface-variant');
    }
  });
};

// 获取图标分类标签
const getIconCategoryLabel = (category) => {
  switch(category) {
    case 'shape': return '图形';
    case 'people': return '人物';
    case 'cartoon': return '卡通';
    default: return '';
  }
};

// 添加图标到画布
const addIconToCanvas = (iconType) => {
  // 触发添加图标事件
  const event = new CustomEvent('add-icon', { detail: { iconType } });
  window.dispatchEvent(event);
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