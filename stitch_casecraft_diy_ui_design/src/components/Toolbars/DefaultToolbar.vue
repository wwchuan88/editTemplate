<template>
  <div class="w-full flex items-center gap-6 pt-4 pb-4 rounded-t-xl" id="toolbar-default">
    <div class="flex flex-col gap-1 min-w-[100px]">
      <span
        class="font-label text-[10px] font-extrabold uppercase tracking-[0.2em] text-on-surface-variant">底色</span>
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 rounded-full bg-secondary"></div>
        <span class="font-bold text-xs">深林绿</span>
      </div>
    </div>
    <div class="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
      <button
        class="flex-shrink-0 w-10 h-10 rounded-full bg-white border-[3px] border-secondary p-0.5 shadow-md">
        <div class="w-full h-full rounded-full bg-white"></div>
      </button>
      <button class="flex-shrink-0 w-9 h-9 rounded-full bg-[#FFD700] hover:scale-110 transition-all"></button>
      <button class="flex-shrink-0 w-9 h-9 rounded-full bg-[#166665] hover:scale-110 transition-all"></button>
      <button class="flex-shrink-0 w-9 h-9 rounded-full bg-[#ffaebc] hover:scale-110 transition-all"></button>
      <button class="flex-shrink-0 w-9 h-9 rounded-full bg-[#a8efed] hover:scale-110 transition-all"></button>
      <button class="flex-shrink-0 w-9 h-9 rounded-full bg-[#efc900] hover:scale-110 transition-all"></button>
      <button
        class="flex-shrink-0 w-9 h-9 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center hover:bg-surface transition-all">
        <span class="material-symbols-outlined text-outline text-lg">colorize</span>
      </button>
    </div>
    <div class="flex items-center gap-3">
      <div class="flex flex-col items-end">
        <span class="text-[10px] font-label font-bold text-on-surface-variant">不透明度</span>
        <input
          class="w-20 h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
          type="range" />
      </div>
      <div class="w-px h-8 bg-outline-variant/20 mx-1"></div>
      <button class="bg-primary p-3 rounded-full text-white shadow-lg hover:scale-105 transition-all"
        @click="selectTool(null, 'default')">
        <span class="material-symbols-outlined">check</span>
      </button>
    </div>
  </div>
</template>

<script setup>
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