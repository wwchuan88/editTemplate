"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "CanvasArea",
  props: {
    layers: {
      type: Array,
      default: () => []
    },
    selectedLayerId: {
      type: String,
      default: ""
    },
    activeFilter: {
      type: String,
      default: "none"
    },
    scale: {
      type: Number,
      default: 1
    },
    currentTool: {
      type: String,
      default: ""
    },
    editingLayerId: {
      type: String,
      default: ""
    }
  },
  emits: ["select-layer", "add-text-layer", "update-text", "clear-tool", "update-layer-position"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editingText = common_vendor.ref("");
    const textInputRefs = common_vendor.ref({});
    const draggingLayerId = common_vendor.ref("");
    const dragStartPos = common_vendor.ref({ x: 0, y: 0 });
    const layerStartPos = common_vendor.ref({ x: 0, y: 0 });
    const hasMoved = common_vendor.ref(false);
    common_vendor.watch(() => props.selectedLayerId, (newId) => {
      if (props.currentTool === "text" && newId) {
        const layer = props.layers.find((l) => l.id === newId);
        if (layer && layer.type === "text") {
          startEditing(layer);
        }
      }
    });
    common_vendor.computed(() => {
      const map = {
        none: "滤镜：原图",
        warm: "滤镜：暖调",
        cool: "滤镜：冷调",
        retro: "滤镜：复古",
        night: "滤镜：夜幕"
      };
      return map[props.activeFilter] || "滤镜：原图";
    });
    const filterOverlay = common_vendor.computed(() => {
      switch (props.activeFilter) {
        case "warm":
          return { background: "rgba(255, 183, 77, 0.18)" };
        case "cool":
          return { background: "rgba(91, 141, 239, 0.16)" };
        case "retro":
          return { background: "rgba(201, 153, 97, 0.2)" };
        case "night":
          return { background: "rgba(31, 41, 55, 0.24)" };
        default:
          return null;
      }
    });
    const screenStyle = common_vendor.computed(() => {
      const colorMap = {
        none: "#fffdf8",
        warm: "#fff7ed",
        cool: "#eef6ff",
        retro: "#f9f1e7",
        night: "#e8edf5"
      };
      return {
        backgroundColor: colorMap[props.activeFilter] || "#fffdf8"
      };
    });
    function handleScreenClick(event) {
      if (props.currentTool === "text") {
        let x, y;
        const systemInfo = common_vendor.index.getSystemInfoSync();
        const screenWidth = systemInfo.windowWidth || 375;
        const pxToRpx = 750 / screenWidth;
        if (event.detail && event.detail.x !== void 0 && event.detail.y !== void 0) {
          x = event.detail.x * pxToRpx / props.scale;
          y = event.detail.y * pxToRpx / props.scale;
        } else if (event.clientX !== void 0 && event.clientY !== void 0) {
          if (event.currentTarget && typeof event.currentTarget.getBoundingClientRect === "function") {
            const rect = event.currentTarget.getBoundingClientRect();
            const relX = event.clientX - rect.left;
            const relY = event.clientY - rect.top;
            x = relX * pxToRpx / props.scale;
            y = relY * pxToRpx / props.scale;
          } else {
            x = event.clientX * pxToRpx / props.scale;
            y = event.clientY * pxToRpx / props.scale;
          }
        } else {
          emit("add-text-layer");
          return;
        }
        emit("add-text-layer", x, y);
        emit("clear-tool");
      } else {
        emit("clear-tool");
      }
    }
    function handleLayerClick(layer) {
      if (hasMoved.value) {
        hasMoved.value = false;
        return;
      }
      if (layer.type === "text") {
        startEditing(layer);
      } else {
        emit("select-layer", layer.id);
      }
    }
    function startEditing(layer) {
      editingText.value = layer.text || "";
      emit("select-layer", layer.id);
      common_vendor.nextTick$1(() => {
        if (textInputRefs.value[layer.id] && typeof textInputRefs.value[layer.id].focus === "function") {
          textInputRefs.value[layer.id].focus();
        }
      });
    }
    function handleTextBlur(layerId) {
      emit("update-text", layerId, editingText.value || "输入文字");
      emit("clear-tool");
    }
    function handleLayerMouseDown(event, layer) {
      if (layer.locked)
        return;
      if (props.editingLayerId === layer.id)
        return;
      draggingLayerId.value = layer.id;
      hasMoved.value = false;
      emit("select-layer", layer.id);
      const clientX = event.clientX;
      const clientY = event.clientY;
      dragStartPos.value = { x: clientX, y: clientY };
      layerStartPos.value = { x: layer.x, y: layer.y };
    }
    function handleLayerMouseMove(event) {
      if (!draggingLayerId.value)
        return;
      const deltaX = event.clientX - dragStartPos.value.x;
      const deltaY = event.clientY - dragStartPos.value.y;
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMoved.value = true;
      }
      const newX = layerStartPos.value.x + deltaX / props.scale;
      const newY = layerStartPos.value.y + deltaY / props.scale;
      emit("update-layer-position", draggingLayerId.value, newX, newY);
    }
    function handleLayerMouseUp() {
      draggingLayerId.value = "";
    }
    function handleLayerTouchStart(event, layer) {
      if (layer.locked)
        return;
      if (props.editingLayerId === layer.id)
        return;
      draggingLayerId.value = layer.id;
      hasMoved.value = false;
      emit("select-layer", layer.id);
      const touch = event.touches[0];
      const clientX = touch.clientX;
      const clientY = touch.clientY;
      dragStartPos.value = { x: clientX, y: clientY };
      layerStartPos.value = { x: layer.x, y: layer.y };
    }
    function handleLayerTouchMove(event) {
      if (!draggingLayerId.value)
        return;
      const touch = event.touches[0];
      const deltaX = touch.clientX - dragStartPos.value.x;
      const deltaY = touch.clientY - dragStartPos.value.y;
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMoved.value = true;
      }
      const newX = layerStartPos.value.x + deltaX / props.scale;
      const newY = layerStartPos.value.y + deltaY / props.scale;
      emit("update-layer-position", draggingLayerId.value, newX, newY);
    }
    function handleLayerTouchEnd() {
      draggingLayerId.value = "";
    }
    function getTextStyle(layer) {
      return {
        fontSize: layer.size + "rpx",
        color: layer.color,
        fontFamily: layer.font
      };
    }
    function getIconStyle(layer) {
      return {
        fontSize: layer.size + "rpx",
        color: layer.color
      };
    }
    function getBrushStyle(layer) {
      return {
        background: layer.color,
        borderRadius: "50%"
      };
    }
    function getLayerStyle(layer) {
      return {
        position: "absolute",
        left: layer.x + "rpx",
        top: layer.y + "rpx",
        width: layer.width + "rpx",
        height: layer.height + "rpx"
      };
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.layers, (layer, k0, i0) => {
          return common_vendor.e({
            a: layer.type === "text"
          }, layer.type === "text" ? common_vendor.e({
            b: props.editingLayerId !== layer.id
          }, props.editingLayerId !== layer.id ? {
            c: common_vendor.t(layer.text || "输入文字"),
            d: common_vendor.s(getTextStyle(layer))
          } : {
            e: common_vendor.s(getTextStyle(layer)),
            f: common_vendor.o(($event) => handleTextBlur(layer.id), layer.id),
            g: common_vendor.o(($event) => handleTextBlur(layer.id), layer.id),
            h: (el) => textInputRefs.value[layer.id] = el,
            i: editingText.value,
            j: common_vendor.o(($event) => editingText.value = $event.detail.value, layer.id)
          }) : layer.type === "icon" ? {
            l: common_vendor.t(layer.text),
            m: common_vendor.s(getIconStyle(layer))
          } : layer.type === "image" ? {
            o: layer.url
          } : layer.type === "brush" ? {
            q: common_vendor.s(getBrushStyle(layer))
          } : {}, {
            k: layer.type === "icon",
            n: layer.type === "image",
            p: layer.type === "brush",
            r: layer.id,
            s: __props.selectedLayerId === layer.id ? 1 : "",
            t: draggingLayerId.value === layer.id ? 1 : "",
            v: common_vendor.s(getLayerStyle(layer)),
            w: common_vendor.o(($event) => handleLayerTouchStart($event, layer), layer.id),
            x: common_vendor.o(($event) => handleLayerTouchMove($event), layer.id),
            y: common_vendor.o(handleLayerTouchEnd, layer.id),
            z: common_vendor.o(($event) => handleLayerMouseDown($event, layer), layer.id),
            A: common_vendor.o(($event) => handleLayerMouseMove($event), layer.id),
            B: common_vendor.o(handleLayerMouseUp, layer.id),
            C: common_vendor.o(($event) => handleLayerClick(layer), layer.id)
          });
        }),
        b: filterOverlay.value
      }, filterOverlay.value ? {
        c: common_vendor.s(filterOverlay.value)
      } : {}, {
        d: common_vendor.o(handleScreenClick, "79"),
        e: common_vendor.s(screenStyle.value),
        f: `scale(${__props.scale})`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8bceeae"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/editTemplate/components/CanvasArea.js.map
