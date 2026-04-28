"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  _easycom_up_button2();
}
const _easycom_up_button = () => "../../uni_modules/uview-plus_3.8.9/components/u-button/u-button.js";
if (!Math) {
  (_easycom_up_button + SideDrawers + DecorSideDrawers + CanvasArea + TextToolbar + IconToolbar + UploadToolbar + FilterToolbar + BrushToolbar)();
}
const SideDrawers = () => "./components/SideDrawers.js";
const DecorSideDrawers = () => "./components/DecorSideDrawers.js";
const CanvasArea = () => "./components/CanvasArea.js";
const TextToolbar = () => "./components/Toolbars/TextToolbar.js";
const IconToolbar = () => "./components/Toolbars/IconToolbar.js";
const UploadToolbar = () => "./components/Toolbars/UploadToolbar.js";
const FilterToolbar = () => "./components/Toolbars/FilterToolbar.js";
const BrushToolbar = () => "./components/Toolbars/BrushToolbar.js";
const _sfc_main = {
  __name: "editTemplate",
  emits: ["edit-text-layer"],
  setup(__props, { emit: __emit }) {
    const toolList = [
      { key: "text", label: "文字" },
      { key: "icon", label: "图标" },
      { key: "upload", label: "图片" },
      { key: "filter", label: "滤镜" },
      { key: "brush", label: "画笔" }
    ];
    const decorToolList = [
      { key: "sticker", label: "贴纸" },
      { key: "stand", label: "支架" },
      { key: "style", label: "换款式" }
    ];
    const iconOptions = [
      { label: "星星", icon: "★", color: "#f0b429" },
      { label: "爱心", icon: "♥", color: "#df5f6c" },
      { label: "闪电", icon: "⚡", color: "#ff9f1c" },
      { label: "花朵", icon: "✿", color: "#ef7998" },
      { label: "音符", icon: "♪", color: "#5b8def" },
      { label: "笑脸", icon: "☺", color: "#18a058" }
    ];
    const filterOptions = [
      { key: "none", label: "原图", desc: "保持自然底色" },
      { key: "warm", label: "暖调", desc: "增加柔和暖光" },
      { key: "cool", label: "冷调", desc: "适合清爽风格" },
      { key: "retro", label: "复古", desc: "偏奶油复古色" },
      { key: "night", label: "夜幕", desc: "压低亮度层次" }
    ];
    const textColors = ["#2f241f", "#d9485f", "#3c6e71", "#2b59c3", "#9c6644"];
    const brushColors = ["#ff7b54", "#ffb703", "#5b8def", "#18a058", "#b565d9"];
    const currentTool = common_vendor.ref("");
    const currentDecorTool = common_vendor.ref("");
    const layers = common_vendor.ref([]);
    const selectedLayerId = common_vendor.ref("");
    const editingLayerId = common_vendor.ref("");
    const activeFilter = common_vendor.ref("none");
    const textDraft = common_vendor.ref("店管家");
    const textColor = common_vendor.ref("#2f241f");
    const textSize = common_vendor.ref(30);
    const textFont = common_vendor.ref("Microsoft YaHei");
    const brushColor = common_vendor.ref("#ff7b54");
    const brushSize = common_vendor.ref(28);
    const sidebarVisible = common_vendor.ref(false);
    const decorSidebarVisible = common_vendor.ref(false);
    const isDragging = common_vendor.ref(false);
    const toolbarPosition = common_vendor.ref({ left: 20, top: 10 });
    const dragOffset = common_vendor.ref({ x: 0, y: 0 });
    const phoneFrameScale = common_vendor.ref(1);
    const selectedLayer = common_vendor.computed(() => layers.value.find((item) => item.id === selectedLayerId.value) || null);
    common_vendor.computed(() => {
      const match = filterOptions.find((item) => item.key === activeFilter.value);
      return match ? `滤镜：${match.label}` : "滤镜：原图";
    });
    function createId(prefix) {
      return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e3)}`;
    }
    function getCenterPosition(width, height) {
      return {
        x: Math.max(12, Math.floor((280 - width) / 2)),
        y: Math.max(16, Math.floor((520 - height) / 2))
      };
    }
    function addTextLayer(x, y) {
      const width = 180;
      const height = Math.max(48, textSize.value + 20);
      let position;
      if (x !== void 0 && y !== void 0) {
        position = {
          x: Math.max(0, Math.floor(x - 200)),
          y: Math.max(0, Math.floor(y - 200))
        };
      } else {
        position = getCenterPosition(width, height);
      }
      const layer = {
        id: createId("text"),
        type: "text",
        text: "请输入",
        color: textColor.value,
        size: textSize.value,
        font: textFont.value,
        width,
        height,
        x: position.x,
        y: position.y,
        locked: false
      };
      layers.value.push(layer);
      selectedLayerId.value = layer.id;
      editingLayerId.value = layer.id;
    }
    function handleAddTextLayer(x, y) {
      if (currentTool.value === "text") {
        addTextLayer(x, y);
      }
    }
    function upsertTextLayer() {
      if (selectedLayer.value && selectedLayer.value.type === "text") {
        selectedLayer.value.text = textDraft.value || "输入文字";
        selectedLayer.value.color = textColor.value;
        selectedLayer.value.size = textSize.value;
        selectedLayer.value.font = textFont.value;
        selectedLayer.value.height = Math.max(48, textSize.value + 20);
        return;
      }
      addTextLayer();
    }
    function addIconLayer(item) {
      const size = 64;
      const position = getCenterPosition(size, size);
      const layer = {
        id: createId("icon"),
        type: "icon",
        text: item.icon,
        label: item.label,
        color: item.color,
        size: 38,
        width: size,
        height: size,
        x: position.x,
        y: position.y,
        locked: false
      };
      layers.value.push(layer);
      selectedLayerId.value = layer.id;
    }
    function addImageLayer(url) {
      const width = 150;
      const height = 150;
      const position = getCenterPosition(width, height);
      const layer = {
        id: createId("image"),
        type: "image",
        url,
        width,
        height,
        x: position.x,
        y: position.y,
        locked: false
      };
      layers.value.push(layer);
      selectedLayerId.value = layer.id;
    }
    function addDemoImage() {
      addImageLayer("/static/logo.png");
    }
    function addBrushDot() {
      const size = brushSize.value;
      const position = getCenterPosition(size, size);
      const layer = {
        id: createId("brush"),
        type: "brush",
        color: brushColor.value,
        size,
        width: size,
        height: size,
        x: position.x,
        y: position.y,
        locked: false
      };
      layers.value.push(layer);
      selectedLayerId.value = layer.id;
    }
    function handleUpdateText(id, text) {
      const layer = layers.value.find((item) => item.id === id);
      if (!layer)
        return;
      layer.text = text;
      if (selectedLayerId.value === id) {
        textDraft.value = text;
      }
    }
    function selectLayer(id) {
      selectedLayerId.value = id;
      const layer = layers.value.find((item) => item.id === id);
      if (!layer)
        return;
      if (layer.type === "text") {
        textDraft.value = layer.text;
        textColor.value = layer.color;
        textSize.value = layer.size;
        currentTool.value = "text";
      } else {
        currentTool.value = "";
      }
    }
    function chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const filePath = res.tempFilePaths && res.tempFilePaths[0];
          if (filePath)
            addImageLayer(filePath);
        }
      });
    }
    function changeTextSize(delta) {
      textSize.value = Math.max(20, textSize.value + delta);
      if (selectedLayer.value && selectedLayer.value.type === "text") {
        selectedLayer.value.size = textSize.value;
        selectedLayer.value.height = Math.max(48, textSize.value + 20);
      }
    }
    function pickTextColor(color) {
      textColor.value = color;
      if (selectedLayer.value && selectedLayer.value.type === "text") {
        selectedLayer.value.color = color;
      }
    }
    function pickTextFont(font) {
      textFont.value = font;
      if (selectedLayer.value && selectedLayer.value.type === "text") {
        selectedLayer.value.font = font;
      }
    }
    function exitTool() {
      currentTool.value = "";
    }
    function toggleSidebar() {
      sidebarVisible.value = !sidebarVisible.value;
    }
    function toggleDecorSidebar() {
      decorSidebarVisible.value = !decorSidebarVisible.value;
    }
    function toggleMoveMode() {
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:393", "切换移动模式");
    }
    function startDrag(e) {
      isDragging.value = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragOffset.value = {
        x: clientX - toolbarPosition.value.left,
        y: clientY - toolbarPosition.value.top
      };
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:407", "开始拖拽:", dragOffset.value);
    }
    function drag(e) {
      if (!isDragging.value)
        return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      toolbarPosition.value = {
        left: clientX - dragOffset.value.x,
        top: clientY - dragOffset.value.y
      };
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:423", "拖拽中:", toolbarPosition.value);
    }
    function endDrag() {
      isDragging.value = false;
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:428", "结束拖拽");
    }
    function undo() {
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:433", "撤销操作");
    }
    function redo() {
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:438", "重做操作");
    }
    function zoomIn() {
      if (phoneFrameScale.value < 2) {
        phoneFrameScale.value += 0.1;
        common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:445", "放大到:", phoneFrameScale.value);
      }
    }
    function zoomOut() {
      if (phoneFrameScale.value > 0.5) {
        phoneFrameScale.value -= 0.1;
        common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:453", "缩小到:", phoneFrameScale.value);
      }
    }
    function clearAll() {
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:459", "清空所有内容");
      layers.value = [];
      selectedLayerId.value = "";
    }
    function handleClearTool() {
      currentTool.value = "";
      editingLayerId.value = "";
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:467", "清除工具选择，editingLayerId:", editingLayerId.value);
    }
    function updateLayerPosition(layerId, x, y) {
      const layer = layers.value.find((item) => item.id === layerId);
      if (!layer)
        return;
      layer.x = Math.max(0, x);
      layer.y = Math.max(0, y);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "warning",
          shape: "circle",
          size: "medium",
          text: "保存设计"
        }),
        b: common_vendor.o(toggleMoveMode, "b7"),
        c: common_vendor.o(undo, "05"),
        d: common_vendor.o(redo, "2a"),
        e: common_vendor.o(zoomIn, "c5"),
        f: common_vendor.o(zoomOut, "5c"),
        g: common_vendor.o(clearAll, "c5"),
        h: toolbarPosition.value.left + "rpx",
        i: toolbarPosition.value.top + "rpx",
        j: isDragging.value ? "move" : "default",
        k: common_vendor.o(startDrag, "8c"),
        l: common_vendor.o(drag, "e6"),
        m: common_vendor.o(endDrag, "8e"),
        n: common_vendor.o(startDrag, "3b"),
        o: common_vendor.o(drag, "dc"),
        p: common_vendor.o(endDrag, "cc"),
        q: common_vendor.o(endDrag, "1b"),
        r: common_vendor.o(($event) => currentTool.value = $event, "5a"),
        s: common_vendor.o(($event) => sidebarVisible.value = false, "98"),
        t: common_vendor.p({
          ["current-tool"]: currentTool.value,
          tools: toolList,
          visible: sidebarVisible.value
        }),
        v: common_vendor.o(($event) => currentDecorTool.value = $event, "ec"),
        w: common_vendor.o(($event) => decorSidebarVisible.value = false, "9d"),
        x: common_vendor.p({
          ["current-tool"]: currentDecorTool.value,
          tools: decorToolList,
          visible: decorSidebarVisible.value
        }),
        y: common_vendor.o(selectLayer, "9d"),
        z: common_vendor.o(handleAddTextLayer, "7b"),
        A: common_vendor.o(handleUpdateText, "af"),
        B: common_vendor.o(handleClearTool, "5e"),
        C: common_vendor.o(updateLayerPosition, "0d"),
        D: common_vendor.p({
          layers: layers.value,
          ["selected-layer-id"]: selectedLayerId.value,
          ["active-filter"]: activeFilter.value,
          scale: phoneFrameScale.value,
          ["current-tool"]: currentTool.value,
          ["editing-layer-id"]: editingLayerId.value
        }),
        E: currentTool.value === "text"
      }, currentTool.value === "text" ? {
        F: common_vendor.o(($event) => textDraft.value = $event, "66"),
        G: common_vendor.o(pickTextColor, "59"),
        H: common_vendor.o(changeTextSize, "24"),
        I: common_vendor.o(pickTextFont, "fc"),
        J: common_vendor.o(upsertTextLayer, "d7"),
        K: common_vendor.o(exitTool, "4d"),
        L: common_vendor.p({
          ["text-draft"]: textDraft.value,
          ["text-color"]: textColor.value,
          ["text-size"]: textSize.value,
          ["text-font"]: textFont.value,
          colors: textColors,
          ["is-editing"]: selectedLayer.value && selectedLayer.value.type === "text"
        })
      } : currentTool.value === "icon" ? {
        N: common_vendor.o(addIconLayer, "f3"),
        O: common_vendor.o(exitTool, "71"),
        P: common_vendor.p({
          options: iconOptions
        })
      } : currentTool.value === "upload" ? {
        R: common_vendor.o(chooseImage, "9b"),
        S: common_vendor.o(addDemoImage, "7d"),
        T: common_vendor.o(exitTool, "5f")
      } : currentTool.value === "filter" ? {
        V: common_vendor.o(($event) => activeFilter.value = $event, "0e"),
        W: common_vendor.o(exitTool, "86"),
        X: common_vendor.p({
          options: filterOptions,
          ["active-filter"]: activeFilter.value
        })
      } : currentTool.value === "brush" ? {
        Z: common_vendor.o(($event) => brushColor.value = $event, "38"),
        aa: common_vendor.o(($event) => brushSize.value = $event, "28"),
        ab: common_vendor.o(addBrushDot, "d4"),
        ac: common_vendor.o(exitTool, "b8"),
        ad: common_vendor.p({
          colors: brushColors,
          ["brush-color"]: brushColor.value,
          ["brush-size"]: brushSize.value
        })
      } : {}, {
        M: currentTool.value === "icon",
        Q: currentTool.value === "upload",
        U: currentTool.value === "filter",
        Y: currentTool.value === "brush",
        ae: common_vendor.o(toggleSidebar, "9c"),
        af: common_vendor.o(toggleDecorSidebar, "b0")
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/editTemplate/editTemplate.js.map
