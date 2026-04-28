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
  __name: "UploadToolbar",
  emits: ["choose", "demo", "exit", "select-template"],
  setup(__props) {
    const activeNav = common_vendor.ref("local");
    const templateOptions = [
      { icon: "🌟", label: "星空模板" },
      { icon: "🌸", label: "樱花模板" },
      { icon: "🌊", label: "海洋模板" },
      { icon: "🍃", label: "森林模板" }
    ];
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: activeNav.value === "local" ? 1 : "",
        b: common_vendor.o(($event) => activeNav.value = "local", "87"),
        c: activeNav.value === "template" ? 1 : "",
        d: common_vendor.o(($event) => activeNav.value = "template", "00"),
        e: common_vendor.o(($event) => _ctx.$emit("exit"), "11"),
        f: activeNav.value === "local"
      }, activeNav.value === "local" ? {
        g: common_vendor.o(($event) => _ctx.$emit("choose"), "78"),
        h: common_vendor.p({
          text: "选择图片",
          type: "primary"
        }),
        i: common_vendor.o(($event) => _ctx.$emit("demo"), "27"),
        j: common_vendor.p({
          text: "加入示例图",
          plain: true
        })
      } : {}, {
        k: activeNav.value === "template"
      }, activeNav.value === "template" ? {
        l: common_vendor.f(templateOptions, (item, index, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.label),
            c: index,
            d: common_vendor.o(($event) => _ctx.$emit("select-template", item), index)
          };
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33a4232e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/editTemplate/components/Toolbars/UploadToolbar.js.map
