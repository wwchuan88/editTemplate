"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "TextToolbar",
  props: {
    textDraft: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: "#2f241f"
    },
    textSize: {
      type: Number,
      default: 30
    },
    textFont: {
      type: String,
      default: "Microsoft YaHei"
    },
    colors: {
      type: Array,
      default: () => []
    },
    fonts: {
      type: Array,
      default: () => [
        { label: "微软雅黑", value: "Microsoft YaHei" },
        { label: "宋体", value: "SimSun" },
        { label: "黑体", value: "SimHei" },
        { label: "楷体", value: "KaiTi" },
        { label: "华文细黑", value: "STXihei" },
        { label: "苹方", value: "PingFang SC" },
        { label: "Arial", value: "Arial" },
        { label: "Helvetica", value: "Helvetica" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" }
      ]
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update-draft", "pick-color", "change-size", "pick-font", "submit", "exit"],
  setup(__props, { emit: __emit }) {
    const activeNav = common_vendor.ref("font");
    const props = __props;
    const emit = __emit;
    function handleSizeChange(e) {
      emit("change-size", e.detail.value - props.textSize);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: activeNav.value === "font" ? 1 : "",
        b: common_vendor.o(($event) => activeNav.value = "font", "1f"),
        c: activeNav.value === "size" ? 1 : "",
        d: common_vendor.o(($event) => activeNav.value = "size", "f8"),
        e: activeNav.value === "color" ? 1 : "",
        f: common_vendor.o(($event) => activeNav.value = "color", "b7"),
        g: common_vendor.o(($event) => _ctx.$emit("exit"), "44"),
        h: __props.textDraft,
        i: common_vendor.o(($event) => _ctx.$emit("update-draft", $event.target.value), "f7"),
        j: activeNav.value === "font"
      }, activeNav.value === "font" ? {
        k: common_vendor.f(__props.fonts, (item, k0, i0) => {
          return {
            a: item.value,
            b: common_vendor.t(item.label),
            c: item.value,
            d: __props.textFont === item.value ? 1 : "",
            e: common_vendor.o(($event) => _ctx.$emit("pick-font", item.value), item.value)
          };
        })
      } : {}, {
        l: activeNav.value === "size"
      }, activeNav.value === "size" ? {
        m: common_vendor.t(__props.textSize),
        n: __props.textSize,
        o: common_vendor.o(handleSizeChange, "a0")
      } : {}, {
        p: activeNav.value === "color"
      }, activeNav.value === "color" ? {
        q: common_vendor.f(__props.colors, (item, k0, i0) => {
          return {
            a: item,
            b: item,
            c: __props.textColor === item ? 1 : "",
            d: common_vendor.o(($event) => _ctx.$emit("pick-color", item), item)
          };
        })
      } : {}, {
        r: common_vendor.o(($event) => _ctx.$emit("submit"), "3d")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb3d09ea"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/editTemplate/components/Toolbars/TextToolbar.js.map
