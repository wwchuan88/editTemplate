"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "FilterToolbar",
  props: {
    options: {
      type: Array,
      default: () => []
    },
    activeFilter: {
      type: String,
      default: "none"
    }
  },
  emits: ["pick", "exit"],
  setup(__props) {
    const activeNav = common_vendor.ref("featured");
    const props = __props;
    const featuredFilters = common_vendor.computed(() => {
      return props.options.filter((item) => ["none", "warm", "cool"].includes(item.key));
    });
    const youthFilters = common_vendor.computed(() => {
      return props.options.filter((item) => ["retro", "night"].includes(item.key));
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: activeNav.value === "featured" ? 1 : "",
        b: common_vendor.o(($event) => activeNav.value = "featured", "65"),
        c: activeNav.value === "youth" ? 1 : "",
        d: common_vendor.o(($event) => activeNav.value = "youth", "34"),
        e: common_vendor.o(($event) => _ctx.$emit("exit"), "97"),
        f: activeNav.value === "featured"
      }, activeNav.value === "featured" ? {
        g: common_vendor.f(featuredFilters.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.desc),
            c: item.key,
            d: __props.activeFilter === item.key ? 1 : "",
            e: common_vendor.o(($event) => _ctx.$emit("pick", item.key), item.key)
          };
        })
      } : {}, {
        h: activeNav.value === "youth"
      }, activeNav.value === "youth" ? {
        i: common_vendor.f(youthFilters.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.t(item.desc),
            c: item.key,
            d: __props.activeFilter === item.key ? 1 : "",
            e: common_vendor.o(($event) => _ctx.$emit("pick", item.key), item.key)
          };
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e1c8a170"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/editTemplate/components/Toolbars/FilterToolbar.js.map
