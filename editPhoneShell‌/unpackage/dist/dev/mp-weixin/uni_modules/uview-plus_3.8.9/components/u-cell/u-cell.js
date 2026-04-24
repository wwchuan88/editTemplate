"use strict";
const uni_modules_uviewPlus_3_8_9_components_uCell_props = require("./props.js");
const uni_modules_uviewPlus_3_8_9_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_3_8_9_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_3_8_9_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_3_8_9_libs_function_test = require("../../libs/function/test.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-cell",
  data() {
    return {};
  },
  mixins: [uni_modules_uviewPlus_3_8_9_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_3_8_9_libs_mixin_mixin.mixin, uni_modules_uviewPlus_3_8_9_components_uCell_props.props],
  computed: {
    titleTextStyle() {
      return uni_modules_uviewPlus_3_8_9_libs_function_index.addStyle(this.titleStyle);
    },
    cellDisabledColor() {
      return this.upThemeVar("--up-disabled-color", "#c8c9cc");
    },
    cellTitleDynamicStyle() {
      return {
        color: this.upThemeVar("--up-main-color", "#303133")
      };
    },
    cellLabelDynamicStyle() {
      return {
        color: this.upThemeVar("--up-tips-color", "#909399")
      };
    },
    cellValueDynamicStyle() {
      return {
        color: this.upThemeVar("--up-content-color", "#606266")
      };
    }
  },
  emits: ["click"],
  methods: {
    addStyle: uni_modules_uviewPlus_3_8_9_libs_function_index.addStyle,
    testEmpty: uni_modules_uviewPlus_3_8_9_libs_function_test.test.empty,
    // 点击cell
    clickHandler(e) {
      if (this.disabled)
        return;
      this.$emit("click", {
        name: this.name
      });
      this.openPage();
      this.stop && this.preventEvent(e);
    }
  }
};
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  (_easycom_up_icon2 + _easycom_u_line2)();
}
const _easycom_up_icon = () => "../u-icon/u-icon.js";
const _easycom_u_line = () => "../u-line/u-line.js";
if (!Math) {
  (_easycom_up_icon + _easycom_u_line)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.$slots.icon || _ctx.icon
  }, _ctx.$slots.icon || _ctx.icon ? common_vendor.e({
    b: _ctx.$slots.icon
  }, _ctx.$slots.icon ? {} : {
    c: common_vendor.p({
      name: _ctx.icon,
      ["custom-style"]: _ctx.iconStyle,
      size: _ctx.size === "large" ? 22 : 18
    })
  }) : {}, {
    d: _ctx.$slots.title || !_ctx.title
  }, _ctx.$slots.title || !_ctx.title ? {} : {
    e: common_vendor.t(_ctx.title),
    f: common_vendor.s($options.titleTextStyle),
    g: common_vendor.s($options.cellTitleDynamicStyle),
    h: common_vendor.n(_ctx.required && "u-cell--required"),
    i: common_vendor.n(_ctx.disabled && "u-cell--disabled"),
    j: common_vendor.n(_ctx.size === "large" && "u-cell__title-text--large")
  }, {
    k: _ctx.label
  }, _ctx.label ? {
    l: common_vendor.t(_ctx.label),
    m: common_vendor.s($options.cellLabelDynamicStyle),
    n: common_vendor.n(_ctx.disabled && "u-cell--disabled"),
    o: common_vendor.n(_ctx.size === "large" && "u-cell__label--large")
  } : {}, {
    p: !$options.testEmpty(_ctx.value)
  }, !$options.testEmpty(_ctx.value) ? {
    q: common_vendor.t(_ctx.value),
    r: common_vendor.s($options.cellValueDynamicStyle),
    s: common_vendor.n(_ctx.disabled && "u-cell--disabled"),
    t: common_vendor.n(_ctx.size === "large" && "u-cell__value--large")
  } : {}, {
    v: _ctx.$slots["right-icon"] || _ctx.isLink
  }, _ctx.$slots["right-icon"] || _ctx.isLink ? common_vendor.e({
    w: _ctx.rightIcon && !_ctx.$slots["right-icon"]
  }, _ctx.rightIcon && !_ctx.$slots["right-icon"] ? {
    x: common_vendor.p({
      name: _ctx.rightIcon,
      ["custom-style"]: _ctx.rightIconStyle,
      color: _ctx.disabled ? $options.cellDisabledColor : "info",
      size: _ctx.size === "large" ? 18 : 16
    })
  } : {}, {
    y: common_vendor.n(`u-cell__right-icon-wrap--${_ctx.arrowDirection}`)
  }) : {}, {
    z: _ctx.$slots["righticon"]
  }, _ctx.$slots["righticon"] ? {
    A: common_vendor.n(`u-cell__right-icon-wrap--${_ctx.arrowDirection}`)
  } : {}, {
    B: common_vendor.n(_ctx.center && "u-cell--center"),
    C: common_vendor.n(_ctx.size === "large" && "u-cell__body--large"),
    D: _ctx.border
  }, _ctx.border ? {} : {}, {
    E: common_vendor.n(_ctx.customClass),
    F: common_vendor.s($options.addStyle(_ctx.customStyle)),
    G: !_ctx.disabled && (_ctx.clickable || _ctx.isLink) ? "u-cell--clickable" : "",
    H: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args), "64")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-95ad0836"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/components/u-cell/u-cell.js.map
