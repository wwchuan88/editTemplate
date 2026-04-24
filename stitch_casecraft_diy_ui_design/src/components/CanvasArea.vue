<template>
  <section class="flex-1 canvas-grid relative flex items-center justify-center overflow-hidden"
    id="canvas-section">
    <!-- Decorative Scribbles -->
    <div class="absolute top-10 right-20 opacity-20 rotate-12 pointer-events-none">
      <span class="material-symbols-outlined text-[120px] text-primary">draw</span>
    </div>
    <div class="absolute bottom-40 left-10 opacity-10 -rotate-12 pointer-events-none">
      <span class="material-symbols-outlined text-[80px] text-secondary">flare</span>
    </div>
    <!-- 3D Scene -->
    <div class="absolute inset-0 opacity-0 pointer-events-none z-10" id="scene-3d">
      <!-- Functional Exit Icon for 3D mode -->
      <button
        class="absolute top-6 left-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-surface-container-high transition-all pointer-events-auto"
        @click="toggle3DMode()">
        <span class="material-symbols-outlined text-on-surface-variant">arrow_back</span>
      </button>
      <div id="phone-container">
        <!-- High Quality 3D Edges with Seamless R-Angles -->
        <div class="phone-edge-container">
          <div class="phone-face-middle"></div>
          <div class="phone-side phone-edge-right"></div>
          <div class="phone-side phone-edge-left"></div>
          <div class="phone-side phone-edge-top"></div>
          <div class="phone-side phone-edge-bottom"></div>
          <div class="corner-3d corner-tl"></div>
          <div class="corner-3d corner-tr"></div>
          <div class="corner-3d corner-bl"></div>
          <div class="corner-3d corner-br"></div>
        </div>
        <!-- Back Face (Where design is visible) -->
        <div class="phone-face phone-back" id="phone-content-3d">
          <!-- Dynamic content from canvas -->
        </div>
        <!-- Front Face (Screen side) -->
        <div class="phone-face phone-front">
          <div class="w-1 h-8 bg-white/20 rounded-full absolute top-10"></div>
        </div>
      </div>
    </div>
    <!-- 2D Case Layout Container (Borderless for 3.5rem rounded case look) -->
    <div class="relative bg-white w-[280px] h-[560px] rounded-[3.5rem] border-0 overflow-hidden transition-all duration-500 hover:scale-[1.02] mt-4 shadow-xl z-20"
      id="zoom-target"
      @click="handleCanvasClick">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-full h-full p-4 flex flex-col items-center justify-center gap-4 relative" id="canvas-content"></div>
      </div>
      <!-- Camera Module -->
      <div
        class="absolute top-7 left-7 w-20 h-20 bg-surface-dim rounded-[1.5rem] flex items-center justify-center overflow-hidden z-30">
        <div class="grid grid-cols-2 gap-2 p-2.5">
          <div class="w-5 h-5 rounded-full bg-on-surface/20"></div>
          <div class="w-5 h-5 rounded-full bg-on-surface/20"></div>
          <div class="w-5 h-5 rounded-full bg-on-surface/20"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-on-surface/20 self-center justify-self-center"></div>
        </div>
      </div>
    </div>
    <!-- Preview Button -->
    <div class="absolute right-6 top-36 pointer-events-auto z-40">
      <button
        class="w-12 h-12 bg-white rounded-full shadow-lg border border-surface-container-highest flex items-center justify-center hover:bg-surface-container-low transition-all group"
        id="btn-3d-preview" @click="toggle3DMode()" title="3D预览">
        <span
          class="material-symbols-outlined text-on-surface-variant group-hover:text-primary">view_in_ar</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义 props
const props = defineProps({
  currentTool: {
    type: String,
    default: 'default'
  }
});

// 状态管理
const is3DMode = ref(false);
const textToolUsed = ref(false);

// 重置文字工具状态
const resetTextTool = () => {
  textToolUsed.value = false;
};

// 处理画布点击事件
const handleCanvasClick = (e) => {
  // 检查是否点击了已存在的图层
  if (e.target.closest('.canvas-layer')) return;
  
  if (props.currentTool !== 'text' || textToolUsed.value) return;
  
  textToolUsed.value = true;
  
  const zoomTarget = document.getElementById('zoom-target');
  const canvas = zoomTarget ? zoomTarget.querySelector('#canvas-content') : null;
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const textLayerId = 'text-layer-' + Date.now();
  const textLayer = document.createElement('div');
  textLayer.id = textLayerId;
  textLayer.className = 'canvas-layer group';
  textLayer.style.width = '200px';
  textLayer.style.minHeight = '40px';
  textLayer.style.top = y + 'px';
  textLayer.style.left = x + 'px';
  textLayer.style.zIndex = '10';
  textLayer.style.backgroundColor = 'transparent';
  textLayer.style.position = 'absolute';
  
  textLayer.innerHTML = `
    <div class="w-full h-full" style="position: relative;">
      <div class="w-full h-full p-2" contenteditable="true" style="outline: none; font-size: 24px; font-family: 'Quicksand', sans-serif; color: #000000;" onmousedown="event.stopPropagation();">
        输入文字
      </div>
    </div>
    <div class="layer-controls">
      <div class="layer-btn layer-close" onclick="removeLayer('${textLayerId}')">
        <span class="material-symbols-outlined">close</span>
      </div>
      <div class="layer-btn layer-resize" onmousedown="resizeLayer(event, '${textLayerId}')">
        <span class="material-symbols-outlined">resize</span>
      </div>
    </div>
  `;
  
  canvas.appendChild(textLayer);
  bindLayerEvents(textLayer);
  
  // 自动选中新创建的文字图层
  selectTextLayer(textLayer);
  
  const editableDiv = textLayer.querySelector('[contenteditable]');
  if (editableDiv) {
    editableDiv.focus();
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(editableDiv);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

// 绑定图层事件
const bindLayerEvents = (layer) => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let isDragging = false;
  let dragStartX, dragStartY;

  // 为整个图层添加鼠标按下事件
  layer.onmousedown = function (e) {
    // 排除按钮的点击
    if (e.target.closest('.layer-btn')) return;

    // 选中当前图层
    selectTextLayer(layer);

    // 记录初始位置
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    isDragging = false;

    // 鼠标移动事件
    document.onmousemove = (e) => {
      // 计算移动距离
      const deltaX = Math.abs(e.clientX - dragStartX);
      const deltaY = Math.abs(e.clientY - dragStartY);

      // 如果移动距离超过5px，开始拖拽
      if (deltaX > 5 || deltaY > 5) {
        isDragging = true;
        // 防止文本选择
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        layer.style.top = (layer.offsetTop - pos2) + "px";
        layer.style.left = (layer.offsetLeft - pos1) + "px";
      }
    };

    // 鼠标释放事件
    document.onmouseup = () => {
      if (isDragging) {
        // 保存状态
      }
      document.onmouseup = null;
      document.onmousemove = null;
    };
  };

  // 为文本编辑区域添加双击事件，确保可以编辑文本
  const editableDiv = layer.querySelector('[contenteditable]');
  if (editableDiv) {
    editableDiv.ondblclick = function (e) {
      e.stopPropagation();
      selectTextLayer(layer);
      this.focus();
    };

    // 为文本编辑区域添加鼠标按下事件，支持拖拽
    editableDiv.onmousedown = function (e) {
      e.stopPropagation();
      // 触发layer的mousedown事件
      const event = new MouseEvent('mousedown', {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        cancelable: true
      });
      layer.dispatchEvent(event);
    };
  }
};

// 选择文字图层
const selectTextLayer = (layer) => {
  // 移除所有图层的选中状态
  const layers = document.querySelectorAll('.canvas-layer');
  layers.forEach(l => {
    l.style.borderColor = 'transparent';
    // 移除之前的鼠标移出事件监听器
    l.onmouseleave = null;
  });
  
  // 触发文字图层选择事件
  const event = new CustomEvent('text-layer-selected', { detail: { layer } });
  window.dispatchEvent(event);
};

// 调整图层大小
const resizeLayer = (e, layerId) => {
  e.stopPropagation();
  e.preventDefault();
  const layer = document.getElementById(layerId);
  if (!layer) return;

  let startX = e.clientX;
  let startY = e.clientY;
  let startWidth = layer.offsetWidth;
  let startHeight = layer.offsetHeight;

  // 改变鼠标指针样式
  document.body.style.cursor = 'nwse-resize';

  // 定义事件处理函数
  function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // 只允许向右和向下调整大小
    const newWidth = Math.max(50, startWidth + deltaX);
    const newHeight = Math.max(30, startHeight + deltaY);

    layer.style.width = newWidth + 'px';
    layer.style.height = newHeight + 'px';

    // 调整文本编辑区域的大小
    const editableDiv = layer.querySelector('[contenteditable]');
    if (editableDiv) {
      editableDiv.style.width = '100%';
      editableDiv.style.height = '100%';
    }
    
    // 调整图标大小
    const iconSpan = layer.querySelector(':scope > div > .material-symbols-outlined');
    if (iconSpan) {
      const iconSize = Math.min(newWidth, newHeight) * 0.7; // 图标大小为图层大小的70%
      iconSpan.style.fontSize = iconSize + 'px';
    }
  }

  function handleMouseUp(e) {
    e.stopPropagation();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    // 恢复鼠标指针样式
    document.body.style.cursor = '';
  }

  // 添加事件监听器
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

// 移除图层
const removeLayer = (layerId) => {
  const layer = document.getElementById(layerId);
  if (layer) {
    layer.remove();
  }
};

// 挂载函数到全局，以便在 HTML 中调用
onMounted(() => {
  window.removeLayer = removeLayer;
  window.resizeLayer = resizeLayer;
  
  // 切换3D模式的初始化
  const canvasSection = document.getElementById('canvas-section');
  const btn3D = document.getElementById('btn-3d-preview');
  const scene3D = document.getElementById('scene-3d');
  
  if (canvasSection && btn3D && scene3D) {
    btn3D.addEventListener('click', toggle3DMode);
  }
  
  // 监听添加图标事件
  window.addEventListener('add-icon', (event) => {
    addIconToCanvas(event.detail.iconType);
  });
});

// 切换3D模式
const toggle3DMode = () => {
  is3DMode.value = !is3DMode.value;
  const canvasSection = document.getElementById('canvas-section');
  const btn3D = document.getElementById('btn-3d-preview');
  const scene3D = document.getElementById('scene-3d');
  
  if (is3DMode.value) {
    canvasSection.classList.add('preview-active');
    btn3D.classList.add('bg-primary', 'text-white');
    btn3D.querySelector('.material-symbols-outlined').style.fontVariationSettings = "'FILL' 1";
    scene3D.style.opacity = '1';
    scene3D.style.pointerEvents = 'auto';
    update3DContent();
  } else {
    canvasSection.classList.remove('preview-active');
    btn3D.classList.remove('bg-primary', 'text-white');
    btn3D.querySelector('.material-symbols-outlined').style.fontVariationSettings = "'FILL' 0";
    scene3D.style.opacity = '0';
    scene3D.style.pointerEvents = 'none';
    reset3DRotation();
  }
};

// 更新3D内容
const update3DContent = () => {
  const zoomTarget = document.getElementById('zoom-target');
  if (!zoomTarget) return;

  const contentContainer = zoomTarget.querySelector('.w-full.h-full');
  if (!contentContainer) return;

  let contentHTML = contentContainer.innerHTML;

  // 处理画笔图层：将canvas转换为img元素
  const brushLayers = contentContainer.querySelectorAll('.brush-layer-container');
  brushLayers.forEach(layer => {
    const canvas = layer.querySelector('.brush-layer-canvas');
    if (canvas) {
      // 将canvas内容转换为base64图片
      const dataURL = canvas.toDataURL();
      // 创建img元素替换canvas
      const img = document.createElement('img');
      img.src = dataURL;
      img.className = canvas.className;
      img.style.width = canvas.style.width;
      img.style.height = canvas.style.height;
      img.style.position = 'absolute';
      img.style.top = '0';
      img.style.left = '0';
      img.style.pointerEvents = 'none';

      // 在HTML中替换canvas为img
      const canvasHTML = canvas.outerHTML;
      contentHTML = contentHTML.replace(canvasHTML, img.outerHTML);
    }
  });

  const camera = zoomTarget.querySelector('.absolute.top-7').outerHTML;
  const target = document.getElementById('phone-content-3d');
  if (target) {
    target.innerHTML = contentHTML + camera;
  }
};

// 重置3D旋转
const reset3DRotation = () => {
  const phone = document.getElementById('phone-container');
  if (phone) phone.style.transform = `rotateX(0deg) rotateY(0deg)`;
};

// 初始化3D交互
const init3DInteraction = () => {
  const container = document.getElementById('scene-3d');
  const phone = document.getElementById('phone-container');
  let isDragging = false;
  let lastMouseX, lastMouseY;
  let rotationX = 0;
  let rotationY = 0;

  if (container && phone) {
    container.addEventListener('mousedown', (e) => {
      if (!is3DMode.value) return;
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging || !is3DMode.value) return;
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;

      rotationY += deltaX * 0.5;
      rotationX -= deltaY * 0.5;

      phone.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => isDragging = false);

    // Touch support for 3D
    container.addEventListener('touchstart', (e) => {
      if (!is3DMode.value) return;
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !is3DMode.value) return;
      const deltaX = e.touches[0].clientX - lastMouseX;
      const deltaY = e.touches[0].clientY - lastMouseY;
      rotationY += deltaX * 0.5;
      rotationX -= deltaY * 0.5;
      phone.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', () => isDragging = false);
  }
};

// 添加图标到画布
const addIconToCanvas = (iconType) => {
  const zoomTarget = document.getElementById('zoom-target');
  const canvas = zoomTarget ? zoomTarget.querySelector('#canvas-content') : null;
  if (!canvas) return;
  
  // 创建图标图层
  const iconLayerId = 'icon-layer-' + Date.now();
  const iconLayer = document.createElement('div');
  iconLayer.id = iconLayerId;
  iconLayer.className = 'canvas-layer group';
  iconLayer.style.width = '60px';
  iconLayer.style.height = '60px';
  iconLayer.style.top = '50%';
  iconLayer.style.left = '50%';
  iconLayer.style.transform = 'translate(-50%, -50%)';
  iconLayer.style.zIndex = '10';
  iconLayer.style.backgroundColor = 'transparent';
  iconLayer.style.position = 'absolute';
  
  iconLayer.innerHTML = `
    <div class="w-full h-full flex items-center justify-center" style="color: #000000;">
      <span class="material-symbols-outlined" style="font-size: 40px;">${iconType}</span>
    </div>
    <div class="layer-controls">
      <div class="layer-btn layer-close" onclick="removeLayer('${iconLayerId}')">
        <span class="material-symbols-outlined">close</span>
      </div>
      <div class="layer-btn layer-resize" onmousedown="resizeLayer(event, '${iconLayerId}')">
        <span class="material-symbols-outlined">resize</span>
      </div>
    </div>
  `;
  
  canvas.appendChild(iconLayer);
  bindLayerEvents(iconLayer);
};

// 暴露方法给父组件
defineExpose({
  resetTextTool
});
</script>

<style scoped>
/* 组件样式 */
.canvas-layer {
  position: absolute;
  border: 2px dashed transparent;
  transition: border-color 0.2s ease;
}

.canvas-layer:hover {
  border-color: #3b82f6;
}

.layer-controls {
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  gap: 4px;
  z-index: 20;
}

.layer-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.layer-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
}

.layer-close {
  color: #ef4444;
}

.layer-resize {
  color: #64748b;
  cursor: nwse-resize;
}
</style>