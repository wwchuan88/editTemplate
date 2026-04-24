"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../../../uni_modules/uview-plus_3.8.9/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = {
  __name: "BrushToolbar",
  props: {
    colors: {
      type: Array,
      default: () => []
    },
    brushColor: {
      type: String,
      default: "#ff7b54"
    },
    brushSize: {
      type: Number,
      default: 28
    }
  },
  emits: ["pick-color", "pick-size", "submit", "exit"],
  setup(__props, { emit: __emit }) {
    const activeNav = common_vendor.ref("color");
    const emit = __emit;
    function handleSizeChange(e) {
      emit("pick-size", e.detail.value);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: activeNav.value === "color" ? 1 : "",
        b: common_vendor.o(($event) => activeNav.value = "color", "6f"),
        c: activeNav.value === "size" ? 1 : "",
        d: common_vendor.o(($event) => activeNav.value = "size", "92"),
        e: common_vendor.o(($event) => _ctx.$emit("exit"), "b8"),
        f: activeNav.value === "color"
      }, activeNav.value === "color" ? {
        g: common_vendor.f(__props.colors, (item, k0, i0) => {
          return {
            a: item,
            b: item,
            c: __props.brushColor === item ? 1 : "",
            d: common_vendor.o(($event) => _ctx.$emit("pick-color", item), item)
          };
        })
      } : {}, {
        h: activeNav.value === "size"
      }, activeNav.value === "size" ? {
        i: common_vendor.t(__props.brushSize),
        j: __props.brushSize,
        k: common_vendor.o(handleSizeChange, "11")
      } : {}, {
        l: activeNav.value === "tool"
      }, activeNav.value === "tool" ? {
        m: common_vendor.o(($event) => _ctx.$emit("submit"), "b3"),
        n: common_vendor.p({
          text: "添加色点",
          type: "primary"
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-086c4aa2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/editTemplate/components/Toolbars/BrushToolbar.js.map
