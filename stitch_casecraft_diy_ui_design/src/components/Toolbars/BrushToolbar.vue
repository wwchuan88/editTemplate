<template>
  <div class="w-full flex flex-col gap-4 pt-4 pb-4 rounded-t-xl" id="toolbar-brush">
    <div class="flex items-center gap-4 pb-3 border-b border-gray-200">
      <div class="flex-1 flex items-center gap-2">
        <button 
          class="px-4 py-2 rounded-full bg-primary text-yellow-300 text-xs" 
          @click="switchBrushCategory('color')"
        >
          笔刷颜色
        </button>
        <button 
          class="px-4 py-2 rounded-full text-on-surface-variant text-xs" 
          @click="switchBrushCategory('size')"
        >
          笔触粗细
        </button>
        <button 
          class="px-4 py-2 rounded-full text-on-surface-variant text-xs" 
          @click="switchBrushCategory('tool')"
        >
          工具
        </button>
      </div>
      <button class="bg-primary p-3 rounded-full text-white shadow-lg hover:scale-105 transition-all"
        @click="selectTool(null, 'default')">
        <span class="material-symbols-outlined">check</span>
      </button>
    </div>
    <div class="flex-1">
      <!-- 笔刷颜色 -->
      <div id="brush-color" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <button
              class="w-6 h-6 rounded-full bg-black hover:scale-110 transition-all"
              @click="setBrushColor('black')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'black' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full bg-white border border-gray-300 hover:scale-110 transition-all"
              @click="setBrushColor('white')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'white' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full bg-red-500 hover:scale-110 transition-all"
              @click="setBrushColor('red')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'red' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full bg-green-500 hover:scale-110 transition-all"
              @click="setBrushColor('green')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'green' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full bg-blue-500 hover:scale-110 transition-all"
              @click="setBrushColor('blue')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'blue' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full bg-yellow-500 hover:scale-110 transition-all"
              @click="setBrushColor('yellow')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'yellow' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full bg-purple-500 hover:scale-110 transition-all"
              @click="setBrushColor('purple')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'purple' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full bg-pink-500 hover:scale-110 transition-all"
              @click="setBrushColor('pink')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'pink' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full bg-orange-500 hover:scale-110 transition-all"
              @click="setBrushColor('orange')"
              :class="{ 'ring-2 ring-offset-2 ring-yellow-300': selectedBrushColor === 'orange' }"
            ></button>
            <button
              class="w-6 h-6 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center hover:bg-surface transition-all"
            >
              <span class="material-symbols-outlined text-outline text-xs">colorize</span>
            </button>
          </div>
        </div>
      </div>
      <!-- 笔触粗细 -->
      <div id="brush-size" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth hidden">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <button
              class="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setBrushSize(1)"
              :class="{ 'bg-primary text-white': selectedBrushSize === 1 }"
            >
              <div class="w-1 h-1 bg-current rounded-full"></div>
            </button>
            <button
              class="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setBrushSize(2)"
              :class="{ 'bg-primary text-white': selectedBrushSize === 2 }"
            >
              <div class="w-2 h-2 bg-current rounded-full"></div>
            </button>
            <button
              class="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setBrushSize(4)"
              :class="{ 'bg-primary text-white': selectedBrushSize === 4 }"
            >
              <div class="w-3 h-3 bg-current rounded-full"></div>
            </button>
            <button
              class="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setBrushSize(6)"
              :class="{ 'bg-primary text-white': selectedBrushSize === 6 }"
            >
              <div class="w-4 h-4 bg-current rounded-full"></div>
            </button>
            <button
              class="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setBrushSize(8)"
              :class="{ 'bg-primary text-white': selectedBrushSize === 8 }"
            >
              <div class="w-5 h-5 bg-current rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
      <!-- 工具 -->
      <div id="brush-tool" class="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 scroll-smooth hidden">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setBrushTool('brush')"
              :class="{ 'bg-primary text-white': selectedBrushTool === 'brush' }"
            >
              <span class="material-symbols-outlined">brush</span>
            </button>
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setBrushTool('eraser')"
              :class="{ 'bg-primary text-white': selectedBrushTool === 'eraser' }"
            >
              <span class="material-symbols-outlined">edit</span>
            </button>
            <button
              class="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all cursor-pointer"
              @click="setBrushTool('spray')"
              :class="{ 'bg-primary text-white': selectedBrushTool === 'spray' }"
            >
              <span class="material-symbols-outlined">filter_vintage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 状态管理
const selectedBrushCategory = ref('color');
const selectedBrushColor = ref('black');
const selectedBrushSize = ref(2);
const selectedBrushTool = ref('brush');

// 切换画笔分类
const switchBrushCategory = (category) => {
  selectedBrushCategory.value = category;
  
  // 隐藏所有画笔内容区域
  const brushContents = ['brush-color', 'brush-size', 'brush-tool'];
  brushContents.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('hidden');
    }
  });
  
  // 显示选中的画笔内容区域
  const selectedElement = document.getElementById('brush-' + category);
  if (selectedElement) {
    selectedElement.classList.remove('hidden');
  }
  
  // 更新上层导航按钮的高亮显示
  const buttons = document.querySelectorAll('#toolbar-brush .flex-1 button');
  buttons.forEach(button => {
    if (button.textContent.includes(getBrushCategoryLabel(category))) {
      button.classList.remove('bg-surface', 'text-on-surface-variant');
      button.classList.add('bg-primary', 'text-yellow-300');
    } else {
      button.classList.remove('bg-primary', 'text-yellow-300');
      button.classList.add('bg-surface', 'text-on-surface-variant');
    }
  });
};

// 获取画笔分类标签
const getBrushCategoryLabel = (category) => {
  switch(category) {
    case 'color': return '笔刷颜色';
    case 'size': return '笔触粗细';
    case 'tool': return '工具';
    default: return '';
  }
};

// 设置画笔颜色
const setBrushColor = (color) => {
  selectedBrushColor.value = color;
};

// 设置笔触粗细
const setBrushSize = (size) => {
  selectedBrushSize.value = size;
};

// 设置画笔工具
const setBrushTool = (tool) => {
  selectedBrushTool.value = tool;
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