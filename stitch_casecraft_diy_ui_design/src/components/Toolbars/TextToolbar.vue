<template>
  <div class="w-full flex flex-col gap-4 pt-4 pb-4 rounded-t-xl" id="toolbar-text">
    <div class="flex items-center gap-4 pb-3 border-b border-gray-200">
      <div class="flex-1 flex items-center gap-2">
        <button 
          class="px-4 py-2 rounded-full bg-primary text-yellow-300 text-xs" 
          @click="switchTextCategory('font')"
        >
          字体选择器
        </button>
        <button 
          class="px-4 py-2 rounded-full text-on-surface-variant text-xs" 
          @click="switchTextCategory('size')"
        >
          字体大小
        </button>
        <button 
          class="px-4 py-2 rounded-full text-on-surface-variant text-xs" 
          @click="switchTextCategory('color')"
        >
          字体颜色
        </button>
      </div>
      <button class="bg-primary p-3 rounded-full text-white shadow-lg hover:scale-105 transition-all"
        @click="selectTool(null, 'default')">
        <span class="material-symbols-outlined">check</span>
      </button>
    </div>
    <div class="flex-1">
      <!-- 字体选择器 -->
      <div id="text-font" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        <div class="flex flex-col gap-1">
          <div class="flex gap-2">
            <button
              class="flex flex-col items-center justify-center w-20 h-16 bg-primary-container/30 border-2 border-dashed border-primary/50 rounded-2xl hover:bg-primary-container/50 transition-all"
            >
              <span class="material-symbols-outlined text-primary">add_photo_alternate</span>
              <span class="text-[10px] font-bold mt-1">上传字体</span>
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex flex-col items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="selectFont('Quicksand')"
              :class="{ 'border-2 border-primary': selectedFont === 'Quicksand' }"
            >
              <span class="font-quicksand text-xs font-bold">Aa</span>
              <span class="text-[8px] font-medium">Quicksand</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex flex-col items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="selectFont('Roboto')"
              :class="{ 'border-2 border-primary': selectedFont === 'Roboto' }"
            >
              <span class="font-roboto text-xs font-bold">Aa</span>
              <span class="text-[8px] font-medium">Roboto</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex flex-col items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="selectFont('Arial')"
              :class="{ 'border-2 border-primary': selectedFont === 'Arial' }"
            >
              <span class="font-arial text-xs font-bold">Aa</span>
              <span class="text-[8px] font-medium">Arial</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex flex-col items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="selectFont('Georgia')"
              :class="{ 'border-2 border-primary': selectedFont === 'Georgia' }"
            >
              <span class="font-georgia text-xs font-bold">Aa</span>
              <span class="text-[8px] font-medium">Georgia</span>
            </div>
            <div
              class="w-14 h-14 bg-surface-container rounded-xl flex flex-col items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="selectFont('Courier New')"
              :class="{ 'border-2 border-primary': selectedFont === 'Courier New' }"
            >
              <span class="font-courier text-xs font-bold">Aa</span>
              <span class="text-[8px] font-medium">Courier</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 字体大小 -->
      <div id="text-size" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth hidden">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setFontSize(12)"
              :class="{ 'bg-primary text-white': selectedFontSize === 12 }"
            >
              <span class="text-xs font-bold">12</span>
            </button>
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setFontSize(14)"
              :class="{ 'bg-primary text-white': selectedFontSize === 14 }"
            >
              <span class="text-sm font-bold">14</span>
            </button>
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setFontSize(16)"
              :class="{ 'bg-primary text-white': selectedFontSize === 16 }"
            >
              <span class="text-base font-bold">16</span>
            </button>
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setFontSize(18)"
              :class="{ 'bg-primary text-white': selectedFontSize === 18 }"
            >
              <span class="text-lg font-bold">18</span>
            </button>
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setFontSize(20)"
              :class="{ 'bg-primary text-white': selectedFontSize === 20 }"
            >
              <span class="text-xl font-bold">20</span>
            </button>
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setFontSize(24)"
              :class="{ 'bg-primary text-white': selectedFontSize === 24 }"
            >
              <span class="text-2xl font-bold">24</span>
            </button>
          </div>
        </div>
      </div>
      <!-- 字体颜色 -->
      <div id="text-color" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth hidden">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <button
              class="w-8 h-8 rounded-full bg-black hover:scale-110 transition-all"
              @click="setFontColor('#000000')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#000000' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full bg-white border border-gray-300 hover:scale-110 transition-all"
              @click="setFontColor('#FFFFFF')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#FFFFFF' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full bg-red-500 hover:scale-110 transition-all"
              @click="setFontColor('#FF0000')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#FF0000' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full bg-green-500 hover:scale-110 transition-all"
              @click="setFontColor('#00FF00')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#00FF00' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full bg-blue-500 hover:scale-110 transition-all"
              @click="setFontColor('#0000FF')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#0000FF' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full bg-yellow-500 hover:scale-110 transition-all"
              @click="setFontColor('#FFFF00')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#FFFF00' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full bg-purple-500 hover:scale-110 transition-all"
              @click="setFontColor('#800080')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#800080' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full bg-pink-500 hover:scale-110 transition-all"
              @click="setFontColor('#FFC0CB')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#FFC0CB' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full bg-orange-500 hover:scale-110 transition-all"
              @click="setFontColor('#FFA500')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedFontColor === '#FFA500' }"
            ></button>
            <button
              class="w-8 h-8 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center hover:bg-surface transition-all"
            >
              <span class="material-symbols-outlined text-outline text-xs">colorize</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 状态管理
const selectedTextCategory = ref('font');
const selectedFont = ref('Quicksand');
const selectedFontSize = ref(16);
const selectedFontColor = ref('#000000');
let currentTextLayer = null;

// 监听文字图层选择事件
const handleTextLayerSelected = (event) => {
  currentTextLayer = event.detail.layer;
  updateTextToolbarFromLayer();
};

// 从文字图层更新工具栏状态
const updateTextToolbarFromLayer = () => {
  if (currentTextLayer) {
    const editableDiv = currentTextLayer.querySelector('[contenteditable]');
    if (editableDiv) {
      // 更新字体
      const fontFamily = editableDiv.style.fontFamily;
      if (fontFamily) {
        selectedFont.value = fontFamily.replace(/['"]/g, '');
      }
      
      // 更新字体大小
      const fontSize = editableDiv.style.fontSize;
      if (fontSize) {
        selectedFontSize.value = parseInt(fontSize);
      }
      
      // 更新字体颜色
      const color = editableDiv.style.color;
      if (color) {
        selectedFontColor.value = color;
      }
    }
  }
};

// 切换文本分类
const switchTextCategory = (category) => {
  selectedTextCategory.value = category;
  
  // 隐藏所有文本内容区域
  const textContents = ['text-font', 'text-size', 'text-color'];
  textContents.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('hidden');
    }
  });
  
  // 显示选中的文本内容区域
  const selectedElement = document.getElementById('text-' + category);
  if (selectedElement) {
    selectedElement.classList.remove('hidden');
  }
  
  // 更新上层导航按钮的高亮显示
  const buttons = document.querySelectorAll('#toolbar-text .flex-1 button');
  buttons.forEach(button => {
    if (button.textContent.includes(getTextCategoryLabel(category))) {
      button.classList.remove('bg-surface', 'text-on-surface-variant');
      button.classList.add('bg-primary', 'text-yellow-300');
    } else {
      button.classList.remove('bg-primary', 'text-yellow-300');
      button.classList.add('bg-surface', 'text-on-surface-variant');
    }
  });
};

// 获取文本分类标签
const getTextCategoryLabel = (category) => {
  switch(category) {
    case 'font': return '字体选择器';
    case 'size': return '字体大小';
    case 'color': return '字体颜色';
    default: return '';
  }
};

// 选择字体
const selectFont = (font) => {
  selectedFont.value = font;
  
  if (currentTextLayer) {
    const editableDiv = currentTextLayer.querySelector('[contenteditable]');
    if (editableDiv) {
      editableDiv.style.fontFamily = font;
    }
  }
};

// 设置字体大小
const setFontSize = (size) => {
  selectedFontSize.value = size;
  
  if (currentTextLayer) {
    const editableDiv = currentTextLayer.querySelector('[contenteditable]');
    if (editableDiv) {
      editableDiv.style.fontSize = size + 'px';
    }
  }
};

// 设置字体颜色
const setFontColor = (color) => {
  selectedFontColor.value = color;
  
  if (currentTextLayer) {
    const editableDiv = currentTextLayer.querySelector('[contenteditable]');
    if (editableDiv) {
      editableDiv.style.color = color;
    }
  }
};

// 选择工具
const selectTool = (btn, toolType) => {
  // 触发工具选择事件
  const event = new CustomEvent('tool-selected', { detail: { toolType } });
  window.dispatchEvent(event);
};

// 生命周期钩子
onMounted(() => {
  // 监听文字图层选择事件
  window.addEventListener('text-layer-selected', handleTextLayerSelected);
});

onUnmounted(() => {
  // 移除事件监听器
  window.removeEventListener('text-layer-selected', handleTextLayerSelected);
});
</script>

<style scoped>
/* 组件样式 */
</style>