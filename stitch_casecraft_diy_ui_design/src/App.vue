<template>
  <div class="app-container">
    <!-- Top Navigation Bar -->
    <TopNavigation />
    
    <!-- Main Workspace -->
    <main class="h-screen pt-16 pb-28 flex overflow-hidden relative">
      <!-- Collapsible Sidebars Container -->
      <SideDrawers @tool-selected="handleToolSelected" :selectedTool="currentTool" />
      
      <!-- Canvas Area -->
      <CanvasArea ref="canvasAreaRef" :currentTool="currentTool" />
    </main>
    
    <!-- Bottom Controls -->
    <footer 
      class="fixed bottom-0 left-0 right-0 h-40 bg-white/95 backdrop-blur-xl z-50 flex items-center px-4 transition-all duration-300 border-t border-gray-200 shadow-lg"
      :class="{ 'footer-hidden': currentTool === 'default' || currentTool === null }"
    >
      <!-- Default Color Toolbar -->
      <DefaultToolbar v-if="currentTool === 'default'" />
      
      <!-- Text Toolbar -->
      <TextToolbar v-if="currentTool === 'text'" />
      
      <!-- Icon Toolbar -->
      <IconToolbar v-if="currentTool === 'icon'" />
      
      <!-- Upload Toolbar -->
      <UploadToolbar v-if="currentTool === 'upload'" />
      
      <!-- Brush Toolbar -->
      <BrushToolbar v-if="currentTool === 'brush'" />
      
      <!-- Filter Toolbar -->
      <FilterToolbar v-if="currentTool === 'filter'" />
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TopNavigation from './components/TopNavigation.vue';
import SideDrawers from './components/SideDrawers.vue';
import CanvasArea from './components/CanvasArea.vue';
import DefaultToolbar from './components/Toolbars/DefaultToolbar.vue';
import TextToolbar from './components/Toolbars/TextToolbar.vue';
import IconToolbar from './components/Toolbars/IconToolbar.vue';
import UploadToolbar from './components/Toolbars/UploadToolbar.vue';
import BrushToolbar from './components/Toolbars/BrushToolbar.vue';
import FilterToolbar from './components/Toolbars/FilterToolbar.vue';

// 状态管理
const currentTool = ref('default');
const canvasAreaRef = ref(null);

// 处理工具选择事件
const handleToolSelected = (payload) => {
  currentTool.value = payload.toolType;
  console.log('Tool selected:', payload.toolType);
  
  // 只有在选择文字工具时，才重置 textToolUsed 状态
  if (payload.toolType === 'text' && canvasAreaRef.value) {
    canvasAreaRef.value.resetTextTool();
  }
};

// 选择工具
const selectTool = (toolType) => {
  currentTool.value = toolType;
  
  // 只有在选择文字工具时，才重置 textToolUsed 状态
  if (toolType === 'text' && canvasAreaRef.value) {
    canvasAreaRef.value.resetTextTool();
  }
};

// 事件监听器
onMounted(() => {
  // 监听添加图标事件
  window.addEventListener('add-icon', (event) => {
    console.log('Add icon:', event.detail.iconType);
    // 实现添加图标的逻辑
  });
  
  // 监听添加图片事件
  window.addEventListener('add-image', (event) => {
    console.log('Add image:', event.detail.src);
    // 实现添加图片的逻辑
  });
  
  // 监听应用滤镜事件
  window.addEventListener('apply-filter', (event) => {
    console.log('Apply filter:', event.detail.filter);
    // 实现应用滤镜的逻辑
  });
  
  // 监听移除滤镜事件
  window.addEventListener('remove-filter', () => {
    console.log('Remove filter');
    // 实现移除滤镜的逻辑
  });
  
  // 监听工具选择事件（来自全局）
  window.addEventListener('tool-selected', (event) => {
    currentTool.value = event.detail.toolType;
    console.log('Tool selected (global):', event.detail.toolType);
    
    // 只有在选择文字工具时，才重置 textToolUsed 状态
    if (event.detail.toolType === 'text' && canvasAreaRef.value) {
      canvasAreaRef.value.resetTextTool();
    }
  });
});

// 暴露给子组件
defineExpose({
  currentTool,
  selectTool
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #F5F5F5;
  font-family: 'Quicksand', sans-serif;
}

.footer-hidden {
  transform: translateY(100%);
}
</style>