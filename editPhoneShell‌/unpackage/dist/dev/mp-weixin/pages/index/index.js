"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      version: "3.8.9",
      progress: 65,
      showPopup: false,
      actions: ["待开始", "开发中", "已完成"],
      currentActionIndex: 0
    };
  },
  computed: {
    currentActionText() {
      return this.actions[this.currentActionIndex];
    }
  },
  onLoad() {
  },
  methods: {
    toggleAction() {
      this.currentActionIndex = (this.currentActionIndex + 1) % this.actions.length;
    },
    addProgress() {
      this.progress = this.progress >= 100 ? 10 : this.progress + 10;
    }
  }
};
if (!Array) {
  const _easycom_u_notice_bar2 = common_vendor.resolveComponent("u-notice-bar");
  const _easycom_u_line_progress2 = common_vendor.resolveComponent("u-line-progress");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_card2 = common_vendor.resolveComponent("u-card");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_notice_bar2 + _easycom_u_line_progress2 + _easycom_u_cell2 + _easycom_u_cell_group2 + _easycom_u_button2 + _easycom_u_card2 + _easycom_u_popup2)();
}
const _easycom_u_notice_bar = () => "../../uni_modules/uview-plus_3.8.9/components/u-notice-bar/u-notice-bar.js";
const _easycom_u_line_progress = () => "../../uni_modules/uview-plus_3.8.9/components/u-line-progress/u-line-progress.js";
const _easycom_u_cell = () => "../../uni_modules/uview-plus_3.8.9/components/u-cell/u-cell.js";
const _easycom_u_cell_group = () => "../../uni_modules/uview-plus_3.8.9/components/u-cell-group/u-cell-group.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus_3.8.9/components/u-button/u-button.js";
const _easycom_u_card = () => "../../uni_modules/uview-plus_3.8.9/components/u-card/u-card.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus_3.8.9/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_notice_bar + _easycom_u_line_progress + _easycom_u_cell + _easycom_u_cell_group + _easycom_u_button + _easycom_u_card + _easycom_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: "店管家UI 已接入，这里是一个首页示例",
      bgColor: "#fff7e6",
      color: "#9a5a00"
    }),
    b: common_vendor.p({
      percentage: $data.progress,
      activeColor: "#e86f2d"
    }),
    c: common_vendor.t($data.progress),
    d: common_vendor.p({
      title: "组件库版本",
      value: $data.version
    }),
    e: common_vendor.p({
      title: "当前选中",
      value: $options.currentActionText
    }),
    f: common_vendor.o($options.toggleAction, "f4"),
    g: common_vendor.p({
      type: "primary",
      text: "切换状态"
    }),
    h: common_vendor.o(($event) => $data.showPopup = true, "1a"),
    i: common_vendor.p({
      plain: true,
      text: "打开弹窗"
    }),
    j: common_vendor.o($options.addProgress, "1f"),
    k: common_vendor.p({
      type: "success",
      plain: true,
      text: "进度 +10"
    }),
    l: common_vendor.p({
      title: "常用组件示例",
      ["sub-title"]: "pages/index/index.vue"
    }),
    m: common_vendor.o(($event) => $data.showPopup = false, "61"),
    n: common_vendor.p({
      type: "primary",
      text: "我知道了"
    }),
    o: common_vendor.o(($event) => $data.showPopup = false, "dd"),
    p: common_vendor.p({
      show: $data.showPopup,
      mode: "bottom",
      round: "16"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
