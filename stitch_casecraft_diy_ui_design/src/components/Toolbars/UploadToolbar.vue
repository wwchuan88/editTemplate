<template>
  <div class="w-full flex flex-col gap-4 pt-4 pb-4 rounded-t-xl" id="toolbar-upload">
    <div class="flex items-center gap-4 pb-3 border-b border-gray-200">
      <div class="flex-1 flex items-center gap-2">
        <button 
          class="px-4 py-2 rounded-full bg-primary text-yellow-300 text-xs" 
          @click="switchUploadCategory('local')"
        >
          本地图片
        </button>
        <button 
          class="px-4 py-2 rounded-full text-on-surface-variant text-xs" 
          @click="switchUploadCategory('template')"
        >
          模板
        </button>
      </div>
      <button class="bg-primary p-3 rounded-full text-white shadow-lg hover:scale-105 transition-all"
        @click="selectTool(null, 'default')">
        <span class="material-symbols-outlined">check</span>
      </button>
    </div>
    <div class="flex-1">
      <!-- 本地图片 -->
      <div id="upload-local" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        <div class="flex flex-col gap-1">
          <div class="flex gap-2">
            <button
              class="flex flex-col items-center justify-center w-20 h-16 bg-primary-container/30 border-2 border-dashed border-primary/50 rounded-2xl hover:bg-primary-container/50 transition-all"
            >
              <span class="material-symbols-outlined text-primary">add_photo_alternate</span>
              <span class="text-[10px] font-bold mt-1">上传图片</span>
            </button>
          </div>
        </div>
      </div>
      <!-- 模板 -->
      <div id="upload-template" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth hidden">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex-shrink-0 overflow-hidden hover:scale-105 transition-all cursor-pointer"
              @click="addImageToCanvas('/images/2025-7-14-11-47.png')"
            >
              <img alt="Abstract 1" class="w-full h-full object-cover" 
                src="/images/2025-7-14-11-47.png" />
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
const selectedUploadCategory = ref('local');

// 切换上传分类
const switchUploadCategory = (category) => {
  selectedUploadCategory.value = category;
  
  // 隐藏所有上传内容区域
  const uploadContents = ['upload-local', 'upload-template'];
  uploadContents.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('hidden');
    }
  });
  
  // 显示选中的上传内容区域
  const selectedElement = document.getElementById('upload-' + category);
  if (selectedElement) {
    selectedElement.classList.remove('hidden');
  }
  
  // 更新上层导航按钮的高亮显示
  const buttons = document.querySelectorAll('#toolbar-upload .flex-1 button');
  buttons.forEach(button => {
    if (button.textContent.includes(getUploadCategoryLabel(category))) {
      button.classList.remove('bg-surface', 'text-on-surface-variant');
      button.classList.add('bg-primary', 'text-yellow-300');
    } else {
      button.classList.remove('bg-primary', 'text-yellow-300');
      button.classList.add('bg-surface', 'text-on-surface-variant');
    }
  });
};

// 获取上传分类标签
const getUploadCategoryLabel = (category) => {
  switch(category) {
    case 'local': return '本地图片';
    case 'template': return '模板';
    default: return '';
  }
};

// 添加图片到画布
const addImageToCanvas = (src) => {
  // 触发添加图片事件
  const event = new CustomEvent('add-image', { detail: { src } });
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