"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_up_button2 + _easycom_u_button2)();
}
const _easycom_up_button = () => "../../uni_modules/uview-plus_3.8.9/components/u-button/u-button.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus_3.8.9/components/u-button/u-button.js";
if (!Math) {
  (_easycom_up_button + SideDrawers + DecorSideDrawers + CanvasArea + _easycom_u_button + TextToolbar + IconToolbar + UploadToolbar + FilterToolbar + BrushToolbar)();
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
  setup(__props) {
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
    function addTextLayer() {
      const width = 180;
      const height = Math.max(48, textSize.value + 20);
      const position = getCenterPosition(width, height);
      const layer = {
        id: createId("text"),
        type: "text",
        text: textDraft.value || "输入文字",
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
    function handleLayerMove(payload) {
      const layer = layers.value.find((item) => item.id === payload.id);
      if (!layer)
        return;
      layer.x = payload.x;
      layer.y = payload.y;
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
      }
    }
    function resizeSelectedLayer(delta) {
      const layer = selectedLayer.value;
      if (!layer)
        return;
      if (layer.type === "text" || layer.type === "icon") {
        layer.size = Math.max(18, layer.size + delta);
        layer.height = Math.max(48, layer.size + 20);
        if (layer.type === "icon") {
          layer.width = Math.max(48, layer.width + delta);
          layer.height = Math.max(48, layer.height + delta);
        }
      }
      if (layer.type === "image" || layer.type === "brush") {
        layer.width = Math.max(36, layer.width + delta);
        layer.height = Math.max(36, layer.height + delta);
      }
    }
    function toggleLayerLock() {
      if (!selectedLayer.value)
        return;
      selectedLayer.value.locked = !selectedLayer.value.locked;
    }
    function removeSelectedLayer() {
      if (!selectedLayerId.value)
        return;
      layers.value = layers.value.filter((item) => item.id !== selectedLayerId.value);
      selectedLayerId.value = "";
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
    function getLayerSummary(layer) {
      if (layer.type === "text")
        return `文字：${layer.text}`;
      if (layer.type === "icon")
        return `图标：${layer.label}`;
      if (layer.type === "image")
        return "图片图层";
      return "笔刷色点";
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
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:390", "切换移动模式");
    }
    function startDrag(e) {
      isDragging.value = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragOffset.value = {
        x: clientX - toolbarPosition.value.left,
        y: clientY - toolbarPosition.value.top
      };
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:404", "开始拖拽:", dragOffset.value);
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
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:420", "拖拽中:", toolbarPosition.value);
    }
    function endDrag() {
      isDragging.value = false;
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:425", "结束拖拽");
    }
    function undo() {
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:430", "撤销操作");
    }
    function redo() {
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:435", "重做操作");
    }
    function zoomIn() {
      if (phoneFrameScale.value < 2) {
        phoneFrameScale.value += 0.1;
        common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:442", "放大到:", phoneFrameScale.value);
      }
    }
    function zoomOut() {
      if (phoneFrameScale.value > 0.5) {
        phoneFrameScale.value -= 0.1;
        common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:450", "缩小到:", phoneFrameScale.value);
      }
    }
    function clearAll() {
      common_vendor.index.__f__("log", "at pages/editTemplate/editTemplate.vue:456", "清空所有内容");
      layers.value = [];
      selectedLayerId.value = "";
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          type: "warning",
          shape: "circle",
          size: "medium",
          text: "保存设计"
        }),
        b: common_vendor.o(toggleMoveMode, "8a"),
        c: common_vendor.o(undo, "ae"),
        d: common_vendor.o(redo, "b9"),
        e: common_vendor.o(zoomIn, "a9"),
        f: common_vendor.o(zoomOut, "7d"),
        g: common_vendor.o(clearAll, "93"),
        h: toolbarPosition.value.left + "rpx",
        i: toolbarPosition.value.top + "rpx",
        j: isDragging.value ? "move" : "default",
        k: common_vendor.o(startDrag, "8c"),
        l: common_vendor.o(drag, "1a"),
        m: common_vendor.o(endDrag, "93"),
        n: common_vendor.o(startDrag, "6d"),
        o: common_vendor.o(drag, "9c"),
        p: common_vendor.o(endDrag, "38"),
        q: common_vendor.o(endDrag, "72"),
        r: common_vendor.o(($event) => currentTool.value = $event, "94"),
        s: common_vendor.o(($event) => sidebarVisible.value = false, "bd"),
        t: common_vendor.p({
          ["current-tool"]: currentTool.value,
          tools: toolList,
          visible: sidebarVisible.value
        }),
        v: common_vendor.o(($event) => currentDecorTool.value = $event, "ac"),
        w: common_vendor.o(($event) => decorSidebarVisible.value = false, "a4"),
        x: common_vendor.p({
          ["current-tool"]: currentDecorTool.value,
          tools: decorToolList,
          visible: decorSidebarVisible.value
        }),
        y: common_vendor.o(selectLayer, "b5"),
        z: common_vendor.o(handleLayerMove, "f4"),
        A: common_vendor.p({
          layers: layers.value,
          ["selected-layer-id"]: selectedLayerId.value,
          ["active-filter"]: activeFilter.value,
          scale: phoneFrameScale.value
        }),
        B: selectedLayer.value
      }, selectedLayer.value ? {
        C: common_vendor.o(removeSelectedLayer, "a7"),
        D: common_vendor.p({
          text: "删除",
          plain: true,
          size: "mini"
        }),
        E: common_vendor.t(getLayerSummary(selectedLayer.value)),
        F: common_vendor.o(($event) => resizeSelectedLayer(12), "30"),
        G: common_vendor.p({
          text: "放大",
          size: "mini"
        }),
        H: common_vendor.o(($event) => resizeSelectedLayer(-12), "64"),
        I: common_vendor.p({
          text: "缩小",
          size: "mini"
        }),
        J: common_vendor.o(toggleLayerLock, "9e"),
        K: common_vendor.p({
          text: selectedLayer.value.locked ? "解锁拖动" : "锁定拖动",
          size: "mini",
          plain: true
        })
      } : {}, {
        L: currentTool.value === "text"
      }, currentTool.value === "text" ? {
        M: common_vendor.o(($event) => textDraft.value = $event, "fa"),
        N: common_vendor.o(pickTextColor, "ef"),
        O: common_vendor.o(changeTextSize, "c8"),
        P: common_vendor.o(pickTextFont, "ea"),
        Q: common_vendor.o(upsertTextLayer, "7e"),
        R: common_vendor.o(exitTool, "f0"),
        S: common_vendor.p({
          ["text-draft"]: textDraft.value,
          ["text-color"]: textColor.value,
          ["text-size"]: textSize.value,
          ["text-font"]: textFont.value,
          colors: textColors,
          ["is-editing"]: selectedLayer.value && selectedLayer.value.type === "text"
        })
      } : currentTool.value === "icon" ? {
        U: common_vendor.o(addIconLayer, "8a"),
        V: common_vendor.o(exitTool, "6b"),
        W: common_vendor.p({
          options: iconOptions
        })
      } : currentTool.value === "upload" ? {
        Y: common_vendor.o(chooseImage, "ad"),
        Z: common_vendor.o(addDemoImage, "fb"),
        aa: common_vendor.o(exitTool, "18")
      } : currentTool.value === "filter" ? {
        ac: common_vendor.o(($event) => activeFilter.value = $event, "d6"),
        ad: common_vendor.o(exitTool, "5f"),
        ae: common_vendor.p({
          options: filterOptions,
          ["active-filter"]: activeFilter.value
        })
      } : currentTool.value === "brush" ? {
        ag: common_vendor.o(($event) => brushColor.value = $event, "20"),
        ah: common_vendor.o(($event) => brushSize.value = $event, "8c"),
        ai: common_vendor.o(addBrushDot, "e1"),
        aj: common_vendor.o(exitTool, "f7"),
        ak: common_vendor.p({
          colors: brushColors,
          ["brush-color"]: brushColor.value,
          ["brush-size"]: brushSize.value
        })
      } : {}, {
        T: currentTool.value === "icon",
        X: currentTool.value === "upload",
        ab: currentTool.value === "filter",
        af: currentTool.value === "brush",
        al: common_vendor.o(toggleSidebar, "5d"),
        am: common_vendor.o(toggleDecorSidebar, "4d")
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/editTemplate/editTemplate.js.map
