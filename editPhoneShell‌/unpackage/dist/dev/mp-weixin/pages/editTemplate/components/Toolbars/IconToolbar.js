"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "IconToolbar",
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ["add"],
  setup(__props) {
    const activeNav = common_vendor.ref("graphics");
    const props = __props;
    const graphicsOptions = common_vendor.computed(() => {
      return props.options.filter((item, index) => {
        if (item.category) {
          return item.category === "graphics";
        } else {
          return index < 2;
        }
      });
    });
    const peopleOptions = common_vendor.computed(() => {
      return props.options.filter((item, index) => {
        if (item.category) {
          return item.category === "people";
        } else {
          return index >= 2 && index < 4;
        }
      });
    });
    const cartoonOptions = common_vendor.computed(() => {
      return props.options.filter((item, index) => {
        if (item.category) {
          return item.category === "cartoon";
        } else {
          return index >= 4;
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: activeNav.value === "graphics" ? 1 : "",
        b: common_vendor.o(($event) => activeNav.value = "graphics", "05"),
        c: activeNav.value === "people" ? 1 : "",
        d: common_vendor.o(($event) => activeNav.value = "people", "e9"),
        e: activeNav.value === "cartoon" ? 1 : "",
        f: common_vendor.o(($event) => activeNav.value = "cartoon", "87"),
        g: common_vendor.o(($event) => _ctx.$emit("exit"), "cc"),
        h: activeNav.value === "graphics"
      }, activeNav.value === "graphics" ? {
        i: common_vendor.f(graphicsOptions.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.label),
            c: item.label,
            d: common_vendor.o(($event) => _ctx.$emit("add", item), item.label)
          };
        })
      } : {}, {
        j: activeNav.value === "people"
      }, activeNav.value === "people" ? {
        k: common_vendor.f(peopleOptions.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.label),
            c: item.label,
            d: common_vendor.o(($event) => _ctx.$emit("add", item), item.label)
          };
        })
      } : {}, {
        l: activeNav.value === "cartoon"
      }, activeNav.value === "cartoon" ? {
        m: common_vendor.f(cartoonOptions.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.t(item.label),
            c: item.label,
            d: common_vendor.o(($event) => _ctx.$emit("add", item), item.label)
          };
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a983e113"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/editTemplate/components/Toolbars/IconToolbar.js.map
