<template>
  <div class="absolute top-36 left-0 bottom-32 z-30 flex flex-col gap-4 pointer-events-none">
    <!-- Drawer 1: Layout Design -->
    <div class="relative flex items-start pointer-events-auto" id="drawer-layout">
      <button
        class="w-10 h-40 bg-white/90 glass-toolbar border border-white/40 border-l-0 rounded-r-2xl flex flex-col items-center justify-center gap-3 shadow-sm hover:bg-white transition-all duration-300 relative z-10"
        @click="toggleDrawer('drawer-layout')">
        <span class="material-symbols-outlined text-on-surface-variant text-lg">dashboard</span>
        <span
          class="vertical-text font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">版面设计</span>
      </button>
      <div class="absolute left-0 top-0 w-[84px] bg-white glass-toolbar rounded-r-3xl border border-white/40 shadow-xl transition-all duration-300 transform -translate-x-full opacity-0 flex flex-col items-center py-4 gap-4 z-20 ease-in-out"
        id="panel-layout" :class="{ 'translate-x-0 opacity-100': activeDrawer === 'drawer-layout' }">
        <div class="w-full flex justify-end px-2 mb-1">
          <span
            class="material-symbols-outlined text-on-surface-variant/40 text-sm hover:text-primary cursor-pointer rotate-180"
            @click="toggleDrawer('drawer-layout')">arrow_forward_ios</span>
        </div>
        <button class="flex flex-col items-center gap-1 group" id="tool-text"
          @click="selectTool('text')">
          <div
            class="w-14 h-14 bg-surface rounded-xl flex items-center justify-center transition-all group-hover:bg-primary-container group-hover:rounded-full tool-icon-container"
            :class="{ 'tool-active': internalSelectedTool === 'text' }">
            <span
              class="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container">text_fields</span>
          </div>
          <span class="font-label text-[11px] font-semibold text-on-surface-variant">文字</span>
        </button>
        <button class="flex flex-col items-center gap-1 group" @click="selectTool('icon')">
          <div
            class="w-14 h-14 bg-surface rounded-xl flex items-center justify-center transition-all group-hover:bg-primary-container group-hover:rounded-full tool-icon-container"
            :class="{ 'tool-active': internalSelectedTool === 'icon' }">
            <span
              class="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container">emoji_objects</span>
          </div>
          <span class="font-label text-[11px] font-semibold text-on-surface-variant">图标</span>
        </button>
        <button class="flex flex-col items-center gap-1 group" @click="selectTool('filter')">
          <div
            class="w-14 h-14 bg-surface rounded-xl flex items-center justify-center transition-all group-hover:bg-primary-container group-hover:rounded-full tool-icon-container"
            :class="{ 'tool-active': internalSelectedTool === 'filter' }">
            <span
              class="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container">filter_vintage</span>
          </div>
          <span class="font-label text-[11px] font-semibold text-on-surface-variant">滤镜</span>
        </button>
        <button class="flex flex-col items-center gap-1 group" @click="selectTool('brush')">
          <div
            class="w-14 h-14 bg-surface rounded-xl flex items-center justify-center transition-all group-hover:bg-primary-container group-hover:rounded-full tool-icon-container"
            :class="{ 'tool-active': internalSelectedTool === 'brush' }">
            <span
              class="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary-container">brush</span>
          </div>
          <span class="font-label text-[11px] font-semibold text-on-surface-variant">画笔</span>
        </button>
        <button class="flex flex-col items-center gap-1 group" @click="selectTool('upload')">
          <div
            class="w-14 h-14 bg-surface  bg-secondary-container/20 rounded-xl flex items-center justify-center transition-all group-hover:bg-secondary-container group-hover:scale-105 tool-icon-container"
            :class="{ 'tool-active': internalSelectedTool === 'upload' }">
            <span class="material-symbols-outlined text-on-secondary-container">cloud_upload</span>
          </div>
          <span class="font-label text-[11px] font-semibold text-on-secondary-container">上传</span>
        </button>
      </div>
    </div>
    <!-- Drawer 2: Decoration -->
    <div class="relative flex items-start pointer-events-auto" id="drawer-deco">
      <button
        class="w-10 h-32 bg-white/90 glass-toolbar border border-white/40 border-l-0 rounded-r-2xl flex flex-col items-center justify-center gap-3 shadow-sm hover:bg-white transition-all duration-300 relative z-10"
        @click="toggleDrawer('drawer-deco')">
        <span class="material-symbols-outlined text-on-surface-variant text-lg">category</span>
        <span
          class="vertical-text font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">款式装饰</span>
      </button>
      <div class="absolute left-0 top-0 w-[84px] bg-white glass-toolbar rounded-r-3xl border border-white/40 shadow-xl transition-all duration-300 transform -translate-x-full opacity-0 flex flex-col items-center py-4 gap-4 z-20 ease-in-out"
        id="panel-deco" :class="{ 'translate-x-0 opacity-100': activeDrawer === 'drawer-deco' }">
        <div class="w-full flex justify-end px-2 mb-1">
          <span
            class="material-symbols-outlined text-on-surface-variant/40 text-sm hover:text-primary cursor-pointer rotate-180"
            @click="toggleDrawer('drawer-deco')">arrow_forward_ios</span>
        </div>
        <button class="flex flex-col items-center gap-1 group" @click="selectTool('accent')">
          <div
            class="w-14 h-14 bg-surface rounded-xl flex items-center justify-center transition-all group-hover:bg-primary-container group-hover:rounded-full tool-icon-container"
            :class="{ 'tool-active': internalSelectedTool === 'accent' }">
            <span class="iconfont icon-sdk-tiezhi text-[24px]"></span>
          </div>
          <span class="font-label text-[11px] font-semibold text-on-surface-variant">贴纸</span>
        </button>
        <button class="flex flex-col items-center gap-1 group" @click="selectTool('stand')">
          <div
            class="w-14 h-14 bg-surface rounded-xl flex items-center justify-center transition-all group-hover:bg-primary-container group-hover:rounded-full tool-icon-container"
            :class="{ 'tool-active': internalSelectedTool === 'stand' }">
            <span class="iconfont icon-fadongjizhijia text-[24px]"></span>
          </div>
          <span class="font-label text-[11px] font-semibold text-on-surface-variant">支架</span>
        </button>
        <button class="flex flex-col items-center gap-1 group" @click="selectTool('stand')">
          <div
            class="w-14 h-14 bg-surface rounded-xl flex items-center justify-center transition-all group-hover:bg-primary-container group-hover:rounded-full tool-icon-container"
            :class="{ 'tool-active': internalSelectedTool === 'stand' }">
            <span class="iconfont icon-kuanshi text-[24px]"></span>
          </div>
          <span class="font-label text-[11px] font-semibold text-on-surface-variant">换款式</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// 定义事件
const emit = defineEmits(['tool-selected']);

// 定义 props
const props = defineProps({
  selectedTool: {
    type: String,
    default: null
  }
});

// 状态管理
const activeDrawer = ref(null);
const internalSelectedTool = ref(props.selectedTool);

// 监听 props 变化
watch(() => props.selectedTool, (newTool) => {
  internalSelectedTool.value = newTool;
});

// 切换抽屉
const toggleDrawer = (drawerId) => {
  if (activeDrawer.value === drawerId) {
    activeDrawer.value = null;
  } else {
    activeDrawer.value = drawerId;
  }
};

// 选择工具
const selectTool = (toolType) => {
  // 更新内部选中工具状态
  internalSelectedTool.value = toolType;
  
  // 触发工具选择事件
  emit('tool-selected', { toolType });
  
  // 抽屉保持打开状态，不收起
};
</script>

<style scoped>
/* 组件样式 */
.tool-active {
  background-color: #3b82f6 !important;
  border-radius: 50% !important;
}

.tool-active span {
  color: white !important;
}
</style>