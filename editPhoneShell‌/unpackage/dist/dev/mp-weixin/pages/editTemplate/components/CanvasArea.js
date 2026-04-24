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
    }
  },
  emits: ["select-layer", "move-layer"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
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
      emit("move-layer", {
        id,
        x: event.detail.x,
        y: event.detail.y
      });
    }
    function getLayerBoxStyle(layer) {
      return {
        width: `${layer.width}px`,
        height: `${layer.height}px`
      };
    }
    function getTextStyle(layer) {
      return {
        color: layer.color,
        fontSize: `${layer.size}px`,
        fontFamily: layer.font || "Microsoft YaHei"
      };
    }
    function getIconStyle(layer) {
      return {
        color: layer.color,
        fontSize: `${layer.size}px`
      };
    }
    function getBrushStyle(layer) {
      return {
        backgroundColor: layer.color,
        width: `${layer.width}px`,
        height: `${layer.height}px`
      };
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(__props.layers, (layer, k0, i0) => {
          return common_vendor.e({
            a: layer.type === "text"
          }, layer.type === "text" ? {
            b: common_vendor.t(layer.text || "输入文字"),
            c: common_vendor.s(getTextStyle(layer))
          } : layer.type === "icon" ? {
            e: common_vendor.t(layer.text),
            f: common_vendor.s(getIconStyle(layer))
          } : layer.type === "image" ? {
            h: layer.url
          } : layer.type === "brush" ? {
            j: common_vendor.s(getBrushStyle(layer))
          } : {}, {
            d: layer.type === "icon",
            g: layer.type === "image",
            i: layer.type === "brush",
            k: layer.id,
            l: __props.selectedLayerId === layer.id ? 1 : "",
            m: layer.x,
            n: layer.y,
            o: layer.locked ? "none" : "all",
            p: common_vendor.s(getLayerBoxStyle(layer)),
            q: common_vendor.o(($event) => emitMove(layer.id, $event), layer.id),
            r: common_vendor.o(($event) => _ctx.$emit("select-layer", layer.id), layer.id)
          });
        }),
        b: filterOverlay.value
      }, filterOverlay.value ? {
        c: common_vendor.s(filterOverlay.value)
      } : {}, {
        d: common_vendor.s(screenStyle.value),
        e: `scale(${__props.scale})`
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8bceeae"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/editTemplate/components/CanvasArea.js.map
