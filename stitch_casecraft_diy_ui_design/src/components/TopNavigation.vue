<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-[#f6f6f6]/95 backdrop-blur-sm px-4 py-3 flex items-center h-16">
    <div class="flex items-center gap-3 relative z-10">
      <button class="w-10 h-10 flex items-center justify-center hover:bg-yellow-50/50 rounded-full transition-all"
        @click="window.history.back()">
        <span class="material-symbols-outlined text-on-surface">close</span>
      </button>
      <h1
        class="font-headline font-black italic text-xl text-yellow-500 tracking-tighter drop-shadow-sm whitespace-nowrap">
        店管家</h1>
    </div>
    <!-- Draggable Toolbar -->
    <div class="absolute top-20 right-1 bottom-0 flex items-center justify-center pointer-events-none">
      <div class="glass-toolbar rounded-full px-2 py-1 flex items-center gap-0.5 shadow-md border border-white/60 pointer-events-auto z-[9999]"
        id="draggable-toolbar">
        <div class="p-2 cursor-grab active:cursor-grabbing flex items-center justify-center group"
          id="toolbar-handle">
          <span
            class="material-symbols-outlined text-on-surface-variant/40 group-hover:text-primary">drag_indicator</span>
        </div>
        <div class="w-px h-5 bg-outline-variant/30 mx-0.5"></div>
        <button
          class="p-2 hover:bg-surface-container-high rounded-full transition-all flex items-center justify-center group"
          @click="toggleToolbar()" title="收起工具栏">
          <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary" id="toolbar-toggle-icon">keyboard_arrow_down</span>
        </button>
        <div class="w-px h-5 bg-outline-variant/30 mx-0.5"></div>
        <button
          class="p-2 hover:bg-surface-container-high rounded-full transition-all flex items-center justify-center group"
          @click="undo()" title="撤销">
          <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary">undo</span>
        </button>
        <button
          class="p-2 hover:bg-surface-container-high rounded-full transition-all flex items-center justify-center group"
          @click="redo()" title="重做">
          <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary">redo</span>
        </button>
        <div class="w-px h-5 bg-outline-variant/30 mx-1"></div>
        <button
          class="p-2 hover:bg-surface-container-high rounded-full transition-all flex items-center justify-center group"
          @click="zoomCanvas(0.1)" title="放大">
          <span
            class="material-symbols-outlined text-on-surface-variant group-hover:text-primary">zoom_in</span>
        </button>
        <button
          class="p-2 hover:bg-surface-container-high rounded-full transition-all flex items-center justify-center group"
          @click="zoomCanvas(-0.1)" title="缩小">
          <span
            class="material-symbols-outlined text-on-surface-variant group-hover:text-primary">zoom_out</span>
        </button>
        <div class="w-px h-5 bg-outline-variant/30 mx-1"></div>
        <button
          class="p-2 hover:bg-surface-container-high rounded-full transition-all flex items-center justify-center group"
          @click="clearCanvas()"
          title="清空">
          <span
            class="material-symbols-outlined text-on-surface-variant group-hover:text-error">delete_sweep</span>
        </button>
      </div>
    </div>
    <button
      class="mr-1 mt-1 fixed top-0 right-0 bg-primary-container text-on-primary-fixed px-6 py-2.5 rounded-full font-label font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-all cursor-text"
      contenteditable="true" spellcheck="false" data-stitch-editable-idx="2"
      data-stitch-added-classes="cursor-text" style="">保存设计</button>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 状态管理
const isToolbarCollapsed = ref(false);

// 工具栏切换
const toggleToolbar = () => {
  const toolbar = document.getElementById('draggable-toolbar');
  const toggleIcon = document.getElementById('toolbar-toggle-icon');
  const buttons = toolbar.querySelectorAll('button:not([onclick="toggleToolbar()"])');
  const dividers = toolbar.querySelectorAll('div.w-px');
  const handle = document.getElementById('toolbar-handle');
  
  isToolbarCollapsed.value = !isToolbarCollapsed.value;
  
  if (isToolbarCollapsed.value) {
    // 收起工具栏
    toolbar.classList.add('toolbar-collapsed');
    toggleIcon.textContent = 'keyboard_arrow_up';
    
    // 隐藏所有按钮和分隔线，只保留切换按钮
    buttons.forEach(button => {
      button.style.display = 'none';
    });
    
    // 只保留切换按钮前后的分隔线
    const allDividers = Array.from(dividers);
    allDividers.forEach((divider, index) => {
      if (index === 0 || index === 1) {
        divider.style.display = 'block';
      } else {
        divider.style.display = 'none';
      }
    });
    
    handle.style.display = 'none';
  } else {
    // 展开工具栏
    toolbar.classList.remove('toolbar-collapsed');
    toggleIcon.textContent = 'keyboard_arrow_down';
    
    // 显示所有按钮和分隔线
    buttons.forEach(button => {
      button.style.display = 'flex';
    });
    
    dividers.forEach(divider => {
      divider.style.display = 'block';
    });
    
    handle.style.display = 'flex';
  }
};

// 撤销
const undo = () => {
  // 实现撤销功能
  console.log('Undo');
};

// 重做
const redo = () => {
  // 实现重做功能
  console.log('Redo');
};

// 放大
const zoomCanvas = (delta) => {
  // 实现放大功能
  console.log('Zoom', delta);
};

// 清空画布
const clearCanvas = () => {
  // 实现清空画布功能
  console.log('Clear Canvas');
};

// 初始化可拖动工具栏
onMounted(() => {
  initDraggableToolbar();
});

// 初始化可拖动工具栏
const initDraggableToolbar = () => {
  const toolbar = document.getElementById('draggable-toolbar');
  const handle = document.getElementById('toolbar-handle');
  let isDragging = false;
  let offsetLeft, offsetTop;

  if (handle) {
    handle.onmousedown = function (e) {
      isDragging = true;
      offsetLeft = e.clientX - toolbar.getBoundingClientRect().left;
      offsetTop = e.clientY - toolbar.getBoundingClientRect().top;

      document.onmousemove = function (e) {
        if (!isDragging) return;
        toolbar.style.left = (e.clientX - offsetLeft) + 'px';
        toolbar.style.top = (e.clientY - offsetTop) + 'px';
        toolbar.style.bottom = 'auto';
        toolbar.style.right = 'auto';
        toolbar.style.transform = 'none';
        toolbar.style.position = 'fixed';
      };

      document.onmouseup = function () {
        isDragging = false;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    // Mobile touch support
    handle.ontouchstart = function (e) {
      isDragging = true;
      const touch = e.touches[0];
      offsetLeft = touch.clientX - toolbar.getBoundingClientRect().left;
      offsetTop = touch.clientY - toolbar.getBoundingClientRect().top;

      document.ontouchmove = function (e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        toolbar.style.left = (touch.clientX - offsetLeft) + 'px';
        toolbar.style.top = (touch.clientY - offsetTop) + 'px';
        toolbar.style.bottom = 'auto';
        toolbar.style.right = 'auto';
        toolbar.style.transform = 'none';
        toolbar.style.position = 'fixed';
      };

      document.ontouchend = function () {
        isDragging = false;
        document.ontouchmove = null;
        document.ontouchend = null;
      };
    };
  }
};
</script>

<style scoped>
/* 组件样式 */
</style>