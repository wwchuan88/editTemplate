"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "DecorSideDrawers",
  props: {
    currentTool: {
      type: String,
      default: ""
    },
    tools: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["select", "close"],
  setup(__props) {
    const toolIcons = {
      sticker: "🏷️",
      stand: "📱",
      style: "🎨"
    };
    function getToolIcon(key) {
      return toolIcons[key] || "📌";
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close"), "72"),
        b: common_vendor.f(__props.tools, (tool, k0, i0) => {
          return {
            a: common_vendor.t(getToolIcon(tool.key)),
            b: common_vendor.t(tool.label),
            c: tool.key,
            d: __props.currentTool === tool.key ? 1 : "",
            e: common_vendor.o(($event) => _ctx.$emit("select", tool.key), tool.key)
          };
        }),
        c: __props.visible ? 1 : ""
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4f71c424"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/editTemplate/components/DecorSideDrawers.js.map
