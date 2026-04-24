"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_3_8_9_libs_vue = require("../vue.js");
const uni_modules_uviewPlus_3_8_9_libs_function_index = require("../function/index.js");
const uni_modules_uviewPlus_3_8_9_libs_function_test = require("../function/test.js");
const uni_modules_uviewPlus_3_8_9_libs_util_route = require("../util/route.js");
const uni_modules_uviewPlus_3_8_9_libs_theme_runtime = require("../theme/runtime.js");
const mixin = uni_modules_uviewPlus_3_8_9_libs_vue.defineMixin({
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: () => ({})
    },
    customClass: {
      type: String,
      default: ""
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ""
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: "navigateTo"
    }
  },
  data() {
    return {
      __upPageThemeChangeHandler: null,
      upThemeVersion: 0
    };
  },
  onLoad() {
    this.upBindGetRect();
    this.upInitThemeVersion();
    if (this.upIsPageScope()) {
      this.upApplyNativeThemeUI();
      if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.$on === "function" && !this.__upPageThemeChangeHandler) {
        this.__upPageThemeChangeHandler = () => {
          this.upApplyNativeThemeUI();
        };
        common_vendor.index.$on("uThemeChange", this.__upPageThemeChangeHandler);
      }
    }
  },
  onShow() {
    if (this.upIsPageScope()) {
      this.upApplyNativeThemeUI();
    }
  },
  created() {
    this.upBindGetRect();
    this.upInitThemeVersion();
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.$on === "function") {
      this.__uThemeChangeHandler = (payload = {}) => {
        this.upSyncThemeVersion(payload);
        this.chacheU = null;
        if (typeof this.$forceUpdate === "function") {
          this.$forceUpdate();
        }
      };
      common_vendor.index.$on("uThemeChange", this.__uThemeChangeHandler);
    }
  },
  computed: {
    // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
    // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
    // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
    $u() {
      this.upThemeVersion;
      let mergeU = uni_modules_uviewPlus_3_8_9_libs_function_index.deepMerge(common_vendor.index.$u, {
        props: void 0,
        http: void 0,
        mixin: void 0
      });
      if (!this.chacheU) {
        this.chacheU = mergeU;
      }
      return this.chacheU;
    },
    upThemeIsDark() {
      this.upThemeVersion;
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeIsDark(this.$u);
    },
    upThemeVars() {
      this.upThemeVersion;
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeVarsForStyle(this.$u);
    },
    upThemePageStyle() {
      this.upThemeVersion;
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemePageStyle(this.$u);
    },
    upThemeCardStyle() {
      this.upThemeVersion;
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeCardStyle(this.$u);
    },
    /**
     * 生成bem规则类名
     * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
     * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
     * @param {String} name 组件名称
     * @param {Array} fixed 一直会存在的类名
     * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
     * @returns {Array|string}
     */
    bem() {
      return function(name, fixed, change) {
        const prefix = `u-${name}--`;
        const classes = {};
        if (fixed) {
          fixed.map((item) => {
            classes[prefix + this[item]] = true;
          });
        }
        if (change) {
          change.map((item) => {
            this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
      };
    }
  },
  methods: {
    upBindGetRect() {
      const upU = this.$u || (typeof common_vendor.index !== "undefined" ? common_vendor.index.$u : null);
      if (upU) {
        upU.getRect = this.$uGetRect;
      } else if (typeof common_vendor.index !== "undefined") {
        common_vendor.index.$u = {
          getRect: this.$uGetRect
        };
      }
    },
    upReadThemeVersion() {
      return Number(typeof common_vendor.index !== "undefined" && common_vendor.index.$u && common_vendor.index.$u.theme && common_vendor.index.$u.theme.version || 0);
    },
    upInitThemeVersion() {
      const version = this.upReadThemeVersion();
      if (version) {
        this.upThemeVersion = version;
      }
    },
    upSyncThemeVersion(payload = {}) {
      const version = Number(payload.version || this.upReadThemeVersion() || 0);
      this.upThemeVersion = version || Number(this.upThemeVersion || 0) + 1;
    },
    upIsPageScope() {
      var _a;
      return !!(this.$page || this.route || ((_a = this.$options) == null ? void 0 : _a.mpType) === "page");
    },
    upHasProp(propName) {
      var _a, _b;
      const vnodeProps = ((_b = (_a = this.$) == null ? void 0 : _a.vnode) == null ? void 0 : _b.props) || {};
      const kebabName = propName.replace(/[A-Z]/g, (s) => `-${s.toLowerCase()}`);
      return Object.prototype.hasOwnProperty.call(vnodeProps, propName) || Object.prototype.hasOwnProperty.call(vnodeProps, kebabName);
    },
    upThemeVar(varName, fallbackColor) {
      this.upThemeVersion;
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeVar(varName, fallbackColor, this.$u);
    },
    upApplyNativeThemeUI() {
      uni_modules_uviewPlus_3_8_9_libs_theme_runtime.syncThemeRuntimeFromStorage(this.$u);
      this.upSyncThemeVersion();
      uni_modules_uviewPlus_3_8_9_libs_theme_runtime.applyNativeThemeUIDeferred(this.$u);
    },
    // 跳转某一个页面
    openPage(urlKey = "url") {
      const url = this[urlKey];
      if (url) {
        uni_modules_uviewPlus_3_8_9_libs_util_route.route({ type: this.linkType, url });
      }
    },
    navTo(url = "", linkType = "navigateTo") {
      uni_modules_uviewPlus_3_8_9_libs_util_route.route({ type: this.linkType, url });
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect(selector, all) {
      return new Promise((resolve) => {
        common_vendor.index.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    getParentData(parentName = "") {
      if (!this.parent)
        this.parent = {};
      this.parent = uni_modules_uviewPlus_3_8_9_libs_function_index.$parent.call(this, parentName);
      if (this.parent.children) {
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent(e) {
      e && typeof e.stopPropagation === "function" && e.stopPropagation();
    },
    // 空操作
    noop(e) {
      this.preventEvent(e);
    }
  },
  onReachBottom() {
    common_vendor.index.$emit("uOnReachBottom");
  },
  beforeUnmount() {
    if (this.parent && uni_modules_uviewPlus_3_8_9_libs_function_test.test.array(this.parent.children)) {
      const childrenList = this.parent.children;
      childrenList.map((child, index) => {
        if (child === this) {
          childrenList.splice(index, 1);
        }
      });
    }
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.$off === "function" && this.__uThemeChangeHandler) {
      common_vendor.index.$off("uThemeChange", this.__uThemeChangeHandler);
      this.__uThemeChangeHandler = null;
    }
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.$off === "function" && this.__upPageThemeChangeHandler) {
      common_vendor.index.$off("uThemeChange", this.__upPageThemeChangeHandler);
      this.__upPageThemeChangeHandler = null;
    }
  }
});
exports.mixin = mixin;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/libs/mixin/mixin.js.map
