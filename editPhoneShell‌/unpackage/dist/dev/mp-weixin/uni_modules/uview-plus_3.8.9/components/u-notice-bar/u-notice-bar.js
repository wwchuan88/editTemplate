"use strict";
const uni_modules_uviewPlus_3_8_9_components_uNoticeBar_props = require("./props.js");
const uni_modules_uviewPlus_3_8_9_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_3_8_9_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_3_8_9_libs_config_props = require("../../libs/config/props.js");
const uni_modules_uviewPlus_3_8_9_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-notice-bar",
  mixins: [uni_modules_uviewPlus_3_8_9_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_3_8_9_libs_mixin_mixin.mixin, uni_modules_uviewPlus_3_8_9_components_uNoticeBar_props.props],
  data() {
    return {
      show: true
    };
  },
  computed: {
    resolvedColor() {
      if (this.upHasProp("color") || this.color !== uni_modules_uviewPlus_3_8_9_libs_config_props.props.noticeBar.color) {
        return this.color;
      }
      return this.upThemeVar("--up-notice-bar-color", this.$u.color.warning || "#f9ae3d");
    },
    resolvedBgColor() {
      if (this.upHasProp("bgColor") || this.bgColor !== uni_modules_uviewPlus_3_8_9_libs_config_props.props.noticeBar.bgColor) {
        return this.bgColor;
      }
      return this.upThemeVar("--up-notice-bar-bg-color", this.$u.color.warningLight || "#fdf6ec");
    }
  },
  emits: ["click", "close"],
  methods: {
    addStyle: uni_modules_uviewPlus_3_8_9_libs_function_index.addStyle,
    // 点击通告栏
    click(index) {
      this.$emit("click", index);
      if (this.url && this.linkType) {
        this.openPage();
      }
    },
    // 点击关闭按钮
    close() {
      this.show = false;
      this.$emit("close");
    }
  }
};
if (!Array) {
  const _easycom_u_column_notice2 = common_vendor.resolveComponent("u-column-notice");
  const _easycom_u_row_notice2 = common_vendor.resolveComponent("u-row-notice");
  (_easycom_u_column_notice2 + _easycom_u_row_notice2)();
}
const _easycom_u_column_notice = () => "../u-column-notice/u-column-notice.js";
const _easycom_u_row_notice = () => "../u-row-notice/u-row-notice.js";
if (!Math) {
  (_easycom_u_column_notice + _easycom_u_row_notice)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? common_vendor.e({
    b: _ctx.direction === "column" || _ctx.direction === "row" && _ctx.step
  }, _ctx.direction === "column" || _ctx.direction === "row" && _ctx.step ? {
    c: common_vendor.o($options.close, "e7"),
    d: common_vendor.o($options.click, "d1"),
    e: common_vendor.p({
      color: $options.resolvedColor,
      bgColor: $options.resolvedBgColor,
      text: _ctx.text,
      mode: _ctx.mode,
      step: _ctx.step,
      icon: _ctx.icon,
      ["disable-touch"]: _ctx.disableTouch,
      fontSize: _ctx.fontSize,
      duration: _ctx.duration,
      justifyContent: _ctx.justifyContent
    })
  } : {
    f: common_vendor.o($options.close, "db"),
    g: common_vendor.o($options.click, "9f"),
    h: common_vendor.p({
      color: $options.resolvedColor,
      bgColor: $options.resolvedBgColor,
      text: _ctx.text,
      mode: _ctx.mode,
      fontSize: _ctx.fontSize,
      speed: _ctx.speed,
      url: _ctx.url,
      linkType: _ctx.linkType,
      icon: _ctx.icon
    })
  }, {
    i: common_vendor.s({
      backgroundColor: $options.resolvedBgColor
    }),
    j: common_vendor.s($options.addStyle(_ctx.customStyle))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3c9f465a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/components/u-notice-bar/u-notice-bar.js.map
