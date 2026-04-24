"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uviewPlus_3_8_9_libs_mixin_mixin = require("./libs/mixin/mixin.js");
const uni_modules_uviewPlus_3_8_9_libs_mixin_mpMixin = require("./libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_3_8_9_libs_util_route = require("./libs/util/route.js");
const uni_modules_uviewPlus_3_8_9_libs_function_colorGradient = require("./libs/function/colorGradient.js");
const uni_modules_uviewPlus_3_8_9_libs_function_test = require("./libs/function/test.js");
const uni_modules_uviewPlus_3_8_9_libs_function_debounce = require("./libs/function/debounce.js");
const uni_modules_uviewPlus_3_8_9_libs_function_throttle = require("./libs/function/throttle.js");
const uni_modules_uviewPlus_3_8_9_libs_function_calc = require("./libs/function/calc.js");
const uni_modules_uviewPlus_3_8_9_libs_function_index = require("./libs/function/index.js");
const uni_modules_uviewPlus_3_8_9_libs_config_config = require("./libs/config/config.js");
const uni_modules_uviewPlus_3_8_9_libs_config_props = require("./libs/config/props.js");
const uni_modules_uviewPlus_3_8_9_libs_config_zIndex = require("./libs/config/zIndex.js");
const uni_modules_uviewPlus_3_8_9_libs_config_color = require("./libs/config/color.js");
const uni_modules_uviewPlus_3_8_9_libs_function_platform = require("./libs/function/platform.js");
const uni_modules_uviewPlus_3_8_9_libs_function_http = require("./libs/function/http.js");
require("./libs/i18n/index.js");
const uni_modules_uviewPlus_3_8_9_libs_theme_theme = require("./libs/theme/theme.js");
const uni_modules_uviewPlus_3_8_9_libs_theme_runtime = require("./libs/theme/runtime.js");
const rootToastState = {
  ref: null
};
const rootNotifyState = {
  ref: null
};
function normalizeRootToastOptions(options = {}) {
  const toastOptions = typeof options === "string" ? { message: options } : options && typeof options === "object" ? { ...options } : {};
  if (!toastOptions.message && toastOptions.title) {
    toastOptions.message = toastOptions.title;
  }
  return toastOptions;
}
function setRootToastRef(ref = null) {
  rootToastState.ref = ref || null;
}
function rootToast(options = {}) {
  const toastOptions = normalizeRootToastOptions(options);
  const toastRef = rootToastState.ref;
  if (toastRef && typeof toastRef.show === "function") {
    toastRef.show(toastOptions);
    return;
  }
  if (!toastOptions.message)
    return;
  if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.showToast === "function") {
    common_vendor.index.showToast({
      title: toastOptions.message,
      icon: "none",
      duration: Number(toastOptions.duration) || 2e3
    });
  }
}
function normalizeRootNotifyOptions(options = {}) {
  const notifyOptions = typeof options === "string" ? { message: options } : options && typeof options === "object" ? { ...options } : {};
  if (!notifyOptions.message && notifyOptions.title) {
    notifyOptions.message = notifyOptions.title;
  }
  return notifyOptions;
}
function setRootNotifyRef(ref = null) {
  rootNotifyState.ref = ref || null;
}
function rootNotify(options = {}) {
  const notifyOptions = normalizeRootNotifyOptions(options);
  const notifyRef = rootNotifyState.ref;
  if (notifyRef && typeof notifyRef.show === "function") {
    notifyRef.show(notifyOptions);
    return;
  }
  if (!notifyOptions.message)
    return;
  if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.showToast === "function") {
    common_vendor.index.showToast({
      title: notifyOptions.message,
      icon: "none",
      duration: Number(notifyOptions.duration) || 3e3
    });
  }
}
let themeType = ["primary", "success", "error", "warning", "info"];
function setConfig(configs) {
  var _a;
  const settings = configs || {};
  uni_modules_uviewPlus_3_8_9_libs_function_index.index.shallowMerge(uni_modules_uviewPlus_3_8_9_libs_config_config.config, settings.config || {});
  uni_modules_uviewPlus_3_8_9_libs_function_index.index.shallowMerge(uni_modules_uviewPlus_3_8_9_libs_config_props.props, settings.props || {});
  uni_modules_uviewPlus_3_8_9_libs_function_index.index.shallowMerge(uni_modules_uviewPlus_3_8_9_libs_config_color.color, settings.color || {});
  uni_modules_uviewPlus_3_8_9_libs_function_index.index.shallowMerge(uni_modules_uviewPlus_3_8_9_libs_config_zIndex.zIndex, settings.zIndex || {});
  const shouldRefreshTheme = !!settings.color || !!((_a = settings == null ? void 0 : settings.config) == null ? void 0 : _a.color) || uni_modules_uviewPlus_3_8_9_libs_theme_theme.themeState.version > 0;
  if (shouldRefreshTheme) {
    uni_modules_uviewPlus_3_8_9_libs_theme_theme.refreshThemeFromConfig();
  }
}
uni_modules_uviewPlus_3_8_9_libs_function_index.index.setConfig = setConfig;
const $u = {
  route: uni_modules_uviewPlus_3_8_9_libs_util_route.route,
  date: uni_modules_uviewPlus_3_8_9_libs_function_index.index.timeFormat,
  // 另名date
  colorGradient: uni_modules_uviewPlus_3_8_9_libs_function_colorGradient.colorGradient.colorGradient,
  hexToRgb: uni_modules_uviewPlus_3_8_9_libs_function_colorGradient.colorGradient.hexToRgb,
  rgbToHex: uni_modules_uviewPlus_3_8_9_libs_function_colorGradient.colorGradient.rgbToHex,
  colorToRgba: uni_modules_uviewPlus_3_8_9_libs_function_colorGradient.colorGradient.colorToRgba,
  test: uni_modules_uviewPlus_3_8_9_libs_function_test.test,
  type: themeType,
  http: uni_modules_uviewPlus_3_8_9_libs_function_http.http,
  config: uni_modules_uviewPlus_3_8_9_libs_config_config.config,
  // uview-plus配置信息相关，比如版本号
  zIndex: uni_modules_uviewPlus_3_8_9_libs_config_zIndex.zIndex,
  debounce: uni_modules_uviewPlus_3_8_9_libs_function_debounce.debounce,
  throttle: uni_modules_uviewPlus_3_8_9_libs_function_throttle.throttle,
  calc: uni_modules_uviewPlus_3_8_9_libs_function_calc.calc,
  mixin: uni_modules_uviewPlus_3_8_9_libs_mixin_mixin.mixin,
  mpMixin: uni_modules_uviewPlus_3_8_9_libs_mixin_mpMixin.mpMixin,
  // props,
  ...uni_modules_uviewPlus_3_8_9_libs_function_index.index,
  color: uni_modules_uviewPlus_3_8_9_libs_config_color.color,
  platform: uni_modules_uviewPlus_3_8_9_libs_function_platform.platform,
  theme: uni_modules_uviewPlus_3_8_9_libs_theme_theme.themeState,
  setTheme: uni_modules_uviewPlus_3_8_9_libs_theme_theme.setTheme,
  setThemePreference: uni_modules_uviewPlus_3_8_9_libs_theme_theme.setThemePreference,
  getThemePreference: uni_modules_uviewPlus_3_8_9_libs_theme_theme.getThemePreference,
  getSystemTheme: uni_modules_uviewPlus_3_8_9_libs_theme_theme.getSystemTheme,
  getThemeVars: uni_modules_uviewPlus_3_8_9_libs_theme_theme.getThemeVars,
  getThemeTabBarStyle: uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeTabBarStyle,
  applyNativeThemeUI: uni_modules_uviewPlus_3_8_9_libs_theme_runtime.applyNativeThemeUI,
  rootToast,
  setRootToastRef,
  rootNotify,
  setRootNotifyRef
};
function defineGlobalThemeHelpers(Vue) {
  var _a;
  const globalProperties = (_a = Vue == null ? void 0 : Vue.config) == null ? void 0 : _a.globalProperties;
  if (!globalProperties)
    return;
  Object.defineProperty(globalProperties, "upThemeIsDark", {
    configurable: true,
    get() {
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeIsDark();
    }
  });
  Object.defineProperty(globalProperties, "upThemeVars", {
    configurable: true,
    get() {
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeVarsForStyle();
    }
  });
  Object.defineProperty(globalProperties, "upThemePageStyle", {
    configurable: true,
    get() {
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemePageStyle();
    }
  });
  Object.defineProperty(globalProperties, "upThemeCardStyle", {
    configurable: true,
    get() {
      return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeCardStyle();
    }
  });
  globalProperties.upThemeVar = function(varName, fallbackColor) {
    return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.getThemeVar(varName, fallbackColor);
  };
  globalProperties.upApplyNativeThemeUI = function() {
    return uni_modules_uviewPlus_3_8_9_libs_theme_runtime.applyNativeThemeUI();
  };
}
const install = (Vue, upuiParams = "") => {
  if (upuiParams) {
    common_vendor.index.upuiParams = upuiParams;
    let temp = upuiParams();
    if (temp.httpIns) {
      temp.httpIns(uni_modules_uviewPlus_3_8_9_libs_function_http.http);
    }
    if (temp.options) {
      setConfig(temp.options);
    }
  }
  common_vendor.index.$u = $u;
  uni_modules_uviewPlus_3_8_9_libs_theme_theme.initThemeSystem();
  if (Vue && Vue.config && Vue.config.globalProperties) {
    Vue.config.globalProperties.$u = $u;
    defineGlobalThemeHelpers(Vue);
  }
  if (Vue && typeof Vue.mixin === "function") {
    Vue.mixin(uni_modules_uviewPlus_3_8_9_libs_mixin_mixin.mixin);
  }
};
const uviewPlus = {
  install
};
exports.uviewPlus = uviewPlus;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/index.js.map
