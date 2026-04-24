"use strict";
const uni_modules_uviewPlus_3_8_9_components_uCellGroup_props = require("./props.js");
const uni_modules_uviewPlus_3_8_9_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_3_8_9_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_3_8_9_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-cell-group",
  mixins: [uni_modules_uviewPlus_3_8_9_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_3_8_9_libs_mixin_mixin.mixin, uni_modules_uviewPlus_3_8_9_components_uCellGroup_props.props],
  computed: {
    groupStyle() {
      const fallbackBg = this.upThemeIsDark ? "#1c1c1e" : "#ffffff";
      return {
        backgroundColor: this.upThemeVar("--up-card-bg-color", fallbackBg)
      };
    }
  },
  methods: {
    addStyle: uni_modules_uviewPlus_3_8_9_libs_function_index.addStyle
  }
};
if (!Array) {
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  _easycom_u_line2();
}
const _easycom_u_line = () => "../u-line/u-line.js";
if (!Math) {
  _easycom_u_line();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.title
  }, _ctx.title ? {
    b: common_vendor.t(_ctx.title),
    c: _ctx.upThemeVar("--up-main-color", "#303133")
  } : {}, {
    d: _ctx.border
  }, _ctx.border ? {} : {}, {
    e: common_vendor.s($options.groupStyle),
    f: common_vendor.s($options.addStyle(_ctx.customStyle)),
    g: common_vendor.n(_ctx.customClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1af58b39"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/components/u-cell-group/u-cell-group.js.map
