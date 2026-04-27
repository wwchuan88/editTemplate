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
    }
  },
  emits: ["select-layer", "move-layer", "add-text-layer", "update-text", "clear-tool"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editingLayerId = common_vendor.ref("");
    const editingText = common_vendor.ref("");
    const textInputRefs = common_vendor.ref({});
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
    function emitMove(id, event) {
      emit("move-layer", id, event.detail.x, event.detail.y);
    }
    function handleScreenClick() {
      if (props.currentTool === "text") {
        emit("add-text-layer");
      } else {
        emit("clear-tool");
      }
    }
    function handleLayerClick(layer) {
      if (layer.type === "text") {
        startEditing(layer);
      } else {
        emit("select-layer", layer.id);
      }
    }
    function startEditing(layer) {
      editingLayerId.value = layer.id;
      editingText.value = layer.text || "";
      emit("select-layer", layer.id);
      common_vendor.nextTick$1(() => {
        if (textInputRefs.value[layer.id]) {
          textInputRefs.value[layer.id].focus();
        }
      });
    }
    function handleTextBlur(layerId) {
      emit("update-text", layerId, editingText.value || "输入文字");
      editingLayerId.value = "";
      emit("clear-tool");
    }
    function getLayerBoxStyle(layer) {
      return {
        width: layer.width + "rpx",
        height: layer.height + "rpx"
      };
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.layers, (layer, k0, i0) => {
          return common_vendor.e({
            a: layer.type === "text"
          }, layer.type === "text" ? common_vendor.e({
            b: editingLayerId.value !== layer.id
          }, editingLayerId.value !== layer.id ? {
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
            t: layer.x,
            v: layer.y,
            w: layer.locked ? "none" : "all",
            x: common_vendor.s(getLayerBoxStyle(layer)),
            y: common_vendor.o(($event) => emitMove(layer.id, $event), layer.id),
            z: common_vendor.o(($event) => handleLayerClick(layer), layer.id)
          });
        }),
        b: common_vendor.o(handleScreenClick, "5c"),
        c: filterOverlay.value
      }, filterOverlay.value ? {
        d: common_vendor.s(filterOverlay.value)
      } : {}, {
        e: common_vendor.s(screenStyle.value),
        f: `scale(${__props.scale})`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8bceeae"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/editTemplate/components/CanvasArea.js.map
