"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_3_8_9_libs_config_config = require("../config/config.js");
const uni_modules_uviewPlus_3_8_9_libs_config_color = require("../config/color.js");
const uni_modules_uviewPlus_3_8_9_libs_function_index = require("../function/index.js");
const DEFAULT_LIGHT_THEME_COLORS = Object.freeze({
  primary: "#3c9cff",
  info: "#909399",
  warning: "#f9ae3d",
  error: "#f56c6c",
  success: "#5ac725",
  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#dadbde",
  bgColor: "#f3f4f6",
  disabledColor: "#c8c9cc",
  primaryDark: "#398ade",
  primaryDisabled: "#9acafc",
  primaryLight: "#ecf5ff",
  warningDark: "#f1a532",
  warningDisabled: "#f9d39b",
  warningLight: "#fdf6ec",
  successDark: "#53c21d",
  successDisabled: "#a9e08f",
  successLight: "#f5fff0",
  errorDark: "#e45656",
  errorDisabled: "#f7b2b2",
  errorLight: "#fef0f0",
  infoDark: "#767a82",
  infoDisabled: "#c4c6c9",
  infoLight: "#f4f4f5"
});
const DEFAULT_DARK_THEME_COLORS = Object.freeze({
  primary: "#3c9cff",
  info: "#909399",
  warning: "#f9ae3d",
  error: "#f56c6c",
  success: "#5ac725",
  mainColor: "#f5f5f5",
  contentColor: "#d1d5db",
  tipsColor: "#9ca3af",
  lightColor: "#6b7280",
  borderColor: "#3a3a3c",
  bgColor: "#1f1f1f",
  disabledColor: "#4b5563",
  primaryDark: "#5aa8ff",
  primaryDisabled: "#4c6f92",
  primaryLight: "#10243a",
  warningDark: "#ffbf66",
  warningDisabled: "#8a6a3a",
  warningLight: "#3d2f1b",
  successDark: "#7ad94b",
  successDisabled: "#5f7f4f",
  successLight: "#1f3316",
  errorDark: "#ff8a8a",
  errorDisabled: "#8d5858",
  errorLight: "#3a2222",
  infoDark: "#b0b3b8",
  infoDisabled: "#5f6368",
  infoLight: "#2f3238"
});
const themeState = {
  preference: "system",
  mode: "light",
  version: 0,
  vars: {}
};
const THEME_MODE_STORAGE_KEY = "u-theme-mode";
const THEME_MODE_SYSTEM = "system";
const THEME_MODE_MANUAL = ["light", "dark"];
let cachedLightThemeColors = null;
let hasRegisterThemeListener = false;
let currentThemePreference = THEME_MODE_SYSTEM;
function normalizeThemeMode(theme = "light") {
  return theme === "dark" ? "dark" : "light";
}
function normalizeThemePreference(mode = THEME_MODE_SYSTEM) {
  if (THEME_MODE_MANUAL.includes(mode))
    return mode;
  return THEME_MODE_SYSTEM;
}
function readThemePreferenceFromStorage() {
  try {
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.getStorageSync === "function") {
      const mode = common_vendor.index.getStorageSync(THEME_MODE_STORAGE_KEY);
      return normalizeThemePreference(mode);
    }
  } catch (e) {
  }
  return THEME_MODE_SYSTEM;
}
function writeThemePreferenceToStorage(mode) {
  try {
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.setStorageSync === "function") {
      common_vendor.index.setStorageSync(THEME_MODE_STORAGE_KEY, mode);
    }
  } catch (e) {
  }
}
function getSystemTheme() {
  let theme = "light";
  try {
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.getAppBaseInfo === "function") {
      const appBaseInfo = common_vendor.index.getAppBaseInfo() || {};
      if (appBaseInfo.theme) {
        theme = appBaseInfo.theme;
      }
    }
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.getSystemInfoSync === "function") {
      const systemInfo = common_vendor.index.getSystemInfoSync() || {};
      if (systemInfo.theme) {
        theme = systemInfo.theme;
      }
    }
  } catch (e) {
    theme = "light";
  }
  return normalizeThemeMode(theme);
}
function getCurrentLightThemeColors() {
  const safeConfigColor = uni_modules_uviewPlus_3_8_9_libs_config_config.config.color || {};
  return {
    ...DEFAULT_LIGHT_THEME_COLORS,
    primary: uni_modules_uviewPlus_3_8_9_libs_config_color.color.primary || DEFAULT_LIGHT_THEME_COLORS.primary,
    info: uni_modules_uviewPlus_3_8_9_libs_config_color.color.info || DEFAULT_LIGHT_THEME_COLORS.info,
    warning: uni_modules_uviewPlus_3_8_9_libs_config_color.color.warning || DEFAULT_LIGHT_THEME_COLORS.warning,
    error: uni_modules_uviewPlus_3_8_9_libs_config_color.color.error || DEFAULT_LIGHT_THEME_COLORS.error,
    success: uni_modules_uviewPlus_3_8_9_libs_config_color.color.success || DEFAULT_LIGHT_THEME_COLORS.success,
    mainColor: uni_modules_uviewPlus_3_8_9_libs_config_color.color.mainColor || DEFAULT_LIGHT_THEME_COLORS.mainColor,
    contentColor: uni_modules_uviewPlus_3_8_9_libs_config_color.color.contentColor || DEFAULT_LIGHT_THEME_COLORS.contentColor,
    tipsColor: uni_modules_uviewPlus_3_8_9_libs_config_color.color.tipsColor || DEFAULT_LIGHT_THEME_COLORS.tipsColor,
    lightColor: uni_modules_uviewPlus_3_8_9_libs_config_color.color.lightColor || DEFAULT_LIGHT_THEME_COLORS.lightColor,
    borderColor: uni_modules_uviewPlus_3_8_9_libs_config_color.color.borderColor || DEFAULT_LIGHT_THEME_COLORS.borderColor,
    bgColor: safeConfigColor["u-bg-color"] || DEFAULT_LIGHT_THEME_COLORS.bgColor,
    disabledColor: safeConfigColor["u-disabled-color"] || DEFAULT_LIGHT_THEME_COLORS.disabledColor
  };
}
function getThemeColorsByMode(mode) {
  if (!cachedLightThemeColors) {
    cachedLightThemeColors = getCurrentLightThemeColors();
  }
  const themeMode = normalizeThemeMode(mode);
  if (themeMode === "dark") {
    return {
      ...DEFAULT_DARK_THEME_COLORS,
      primary: cachedLightThemeColors.primary,
      info: cachedLightThemeColors.info,
      warning: cachedLightThemeColors.warning,
      error: cachedLightThemeColors.error,
      success: cachedLightThemeColors.success
    };
  }
  return {
    ...cachedLightThemeColors
  };
}
function buildConfigColorMap(themeColors) {
  return {
    "u-primary": themeColors.primary,
    "u-warning": themeColors.warning,
    "u-success": themeColors.success,
    "u-error": themeColors.error,
    "u-info": themeColors.info,
    "u-main-color": themeColors.mainColor,
    "u-content-color": themeColors.contentColor,
    "u-tips-color": themeColors.tipsColor,
    "u-light-color": themeColors.lightColor,
    "u-border-color": themeColors.borderColor,
    "u-bg-color": themeColors.bgColor,
    "u-disabled-color": themeColors.disabledColor,
    "up-primary": themeColors.primary,
    "up-warning": themeColors.warning,
    "up-success": themeColors.success,
    "up-error": themeColors.error,
    "up-info": themeColors.info,
    "up-main-color": themeColors.mainColor,
    "up-content-color": themeColors.contentColor,
    "up-tips-color": themeColors.tipsColor,
    "up-light-color": themeColors.lightColor,
    "up-border-color": themeColors.borderColor,
    "up-bg-color": themeColors.bgColor,
    "up-disabled-color": themeColors.disabledColor
  };
}
function buildThemeCssVars(themeColors, mode = "light") {
  const themeMode = normalizeThemeMode(mode);
  const isDark = themeMode === "dark";
  const runtimeColorMap = uni_modules_uviewPlus_3_8_9_libs_config_config.config.color || {};
  const pageBgColor = themeColors.bgColor || (isDark ? "#1f1f1f" : "#f3f4f6");
  const navbarBgColor = runtimeColorMap["up-navbar-bg-color"] || runtimeColorMap["u-navbar-bg-color"] || (isDark ? "#1c1c1e" : "#ffffff");
  const coreVars = {
    "--u-main-color": themeColors.mainColor,
    "--u-content-color": themeColors.contentColor,
    "--u-tips-color": themeColors.tipsColor,
    "--u-light-color": themeColors.lightColor,
    "--u-border-color": themeColors.borderColor,
    "--u-bg-color": themeColors.bgColor,
    "--u-disabled-color": themeColors.disabledColor,
    "--u-primary": themeColors.primary,
    "--u-primary-dark": themeColors.primaryDark,
    "--u-primary-disabled": themeColors.primaryDisabled,
    "--u-primary-light": themeColors.primaryLight,
    "--u-warning": themeColors.warning,
    "--u-warning-dark": themeColors.warningDark,
    "--u-warning-disabled": themeColors.warningDisabled,
    "--u-warning-light": themeColors.warningLight,
    "--u-success": themeColors.success,
    "--u-success-dark": themeColors.successDark,
    "--u-success-disabled": themeColors.successDisabled,
    "--u-success-light": themeColors.successLight,
    "--u-error": themeColors.error,
    "--u-error-dark": themeColors.errorDark,
    "--u-error-disabled": themeColors.errorDisabled,
    "--u-error-light": themeColors.errorLight,
    "--u-info": themeColors.info,
    "--u-info-dark": themeColors.infoDark,
    "--u-info-disabled": themeColors.infoDisabled,
    "--u-info-light": themeColors.infoLight,
    "--up-main-color": themeColors.mainColor,
    "--up-content-color": themeColors.contentColor,
    "--up-tips-color": themeColors.tipsColor,
    "--up-light-color": themeColors.lightColor,
    "--up-border-color": themeColors.borderColor,
    "--up-bg-color": themeColors.bgColor,
    "--up-disabled-color": themeColors.disabledColor,
    "--up-primary": themeColors.primary,
    "--up-primary-dark": themeColors.primaryDark,
    "--up-primary-disabled": themeColors.primaryDisabled,
    "--up-primary-light": themeColors.primaryLight,
    "--up-warning": themeColors.warning,
    "--up-warning-dark": themeColors.warningDark,
    "--up-warning-disabled": themeColors.warningDisabled,
    "--up-warning-light": themeColors.warningLight,
    "--up-success": themeColors.success,
    "--up-success-dark": themeColors.successDark,
    "--up-success-disabled": themeColors.successDisabled,
    "--up-success-light": themeColors.successLight,
    "--up-error": themeColors.error,
    "--up-error-dark": themeColors.errorDark,
    "--up-error-disabled": themeColors.errorDisabled,
    "--up-error-light": themeColors.errorLight,
    "--up-info": themeColors.info,
    "--up-info-dark": themeColors.infoDark,
    "--up-info-disabled": themeColors.infoDisabled,
    "--up-info-light": themeColors.infoLight,
    "--up-page-bg-color": pageBgColor,
    "--up-card-bg-color": isDark ? "#1c1c1e" : "#ffffff",
    "--up-navbar-bg-color": navbarBgColor
  };
  const extraVars = {};
  Object.keys(runtimeColorMap).forEach((key) => {
    if (typeof key !== "string")
      return;
    const isThemeToken = key.indexOf("up-") === 0 || key.indexOf("u-") === 0;
    if (!isThemeToken)
      return;
    const cssVarName = `--${key}`;
    if (Object.prototype.hasOwnProperty.call(coreVars, cssVarName))
      return;
    const value = runtimeColorMap[key];
    if (typeof value === "string" && value) {
      extraVars[cssVarName] = value;
    }
  });
  return {
    ...coreVars,
    ...extraVars
  };
}
function getThemeVars(mode) {
  if (mode) {
    return buildThemeCssVars(getThemeColorsByMode(mode), mode);
  }
  if (themeState.vars && Object.keys(themeState.vars).length > 0) {
    return { ...themeState.vars };
  }
  return buildThemeCssVars(getThemeColorsByMode(themeState.mode), themeState.mode);
}
function getCurrentPageRoute() {
  var _a;
  if (typeof getCurrentPages !== "function")
    return "";
  const pages = getCurrentPages() || [];
  const currentPage = pages[pages.length - 1] || {};
  const route = currentPage.route || ((_a = currentPage.$page) == null ? void 0 : _a.fullPath) || "";
  return String(route).replace(/^\//, "").split("?")[0];
}
function isCurrentTabBarPage() {
  var _a;
  const route = getCurrentPageRoute();
  if (!route || typeof __uniConfig === "undefined")
    return false;
  const tabBarList = ((_a = __uniConfig == null ? void 0 : __uniConfig.tabBar) == null ? void 0 : _a.list) || [];
  return tabBarList.some((item = {}) => String(item.pagePath || "").replace(/^\//, "") === route);
}
function applyNativeThemeUI(mode, themeColors) {
  var _a, _b;
  if (typeof common_vendor.index === "undefined")
    return;
  const isDark = normalizeThemeMode(mode) === "dark";
  const pageBg = (themeColors == null ? void 0 : themeColors.bgColor) || (isDark ? "#1f1f1f" : "#f3f4f6");
  const navBg = ((_a = uni_modules_uviewPlus_3_8_9_libs_config_config.config.color) == null ? void 0 : _a["up-navbar-bg-color"]) || ((_b = uni_modules_uviewPlus_3_8_9_libs_config_config.config.color) == null ? void 0 : _b["u-navbar-bg-color"]) || (isDark ? "#1c1c1e" : "#ffffff");
  if (typeof common_vendor.index.setNavigationBarColor === "function") {
    common_vendor.index.setNavigationBarColor({
      frontColor: isDark ? "#ffffff" : "#000000",
      backgroundColor: navBg,
      animation: {
        duration: 0,
        timingFunc: "linear"
      }
    });
  }
  if (typeof common_vendor.index.setBackgroundColor === "function") {
    common_vendor.index.setBackgroundColor({
      backgroundColor: pageBg,
      backgroundColorTop: pageBg,
      backgroundColorBottom: pageBg
    });
  }
  if (typeof common_vendor.index.setTabBarStyle === "function" && isCurrentTabBarPage()) {
    common_vendor.index.setTabBarStyle({
      color: isDark ? "#8e8e93" : "#909399",
      selectedColor: isDark ? "#f2f2f7" : "#303133",
      backgroundColor: isDark ? "#111111" : "#ffffff",
      borderStyle: isDark ? "white" : "black"
    });
  }
}
function applyTheme(mode = "light") {
  const themeMode = normalizeThemeMode(mode);
  const themeColors = getThemeColorsByMode(themeMode);
  const themeVars = buildThemeCssVars(themeColors, themeMode);
  uni_modules_uviewPlus_3_8_9_libs_function_index.index.shallowMerge(uni_modules_uviewPlus_3_8_9_libs_config_color.color, {
    primary: themeColors.primary,
    info: themeColors.info,
    default: themeColors.info,
    warning: themeColors.warning,
    error: themeColors.error,
    success: themeColors.success,
    mainColor: themeColors.mainColor,
    contentColor: themeColors.contentColor,
    tipsColor: themeColors.tipsColor,
    lightColor: themeColors.lightColor,
    borderColor: themeColors.borderColor,
    bgColor: themeColors.bgColor,
    disabledColor: themeColors.disabledColor
  });
  uni_modules_uviewPlus_3_8_9_libs_function_index.index.shallowMerge(uni_modules_uviewPlus_3_8_9_libs_config_config.config.color, buildConfigColorMap(themeColors));
  uni_modules_uviewPlus_3_8_9_libs_config_config.config.themeMode = themeMode;
  themeState.preference = currentThemePreference;
  themeState.mode = themeMode;
  themeState.vars = { ...themeVars };
  themeState.version = Number(themeState.version || 0) + 1;
  applyNativeThemeUI(themeMode, themeColors);
  if (typeof common_vendor.index !== "undefined" && common_vendor.index.$u && common_vendor.index.$u.theme) {
    common_vendor.index.$u.theme.mode = themeState.mode;
    if (Object.prototype.hasOwnProperty.call(common_vendor.index.$u.theme, "colors")) {
      delete common_vendor.index.$u.theme.colors;
    }
    common_vendor.index.$u.theme.vars = { ...themeState.vars };
    common_vendor.index.$u.theme.version = themeState.version;
  }
  if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.$emit === "function") {
    common_vendor.index.$emit("uThemeChange", {
      mode: themeState.mode,
      colors: { ...themeColors },
      version: themeState.version,
      vars: { ...themeState.vars }
    });
  }
  return themeState;
}
function setTheme(mode = "light") {
  currentThemePreference = normalizeThemeMode(mode);
  writeThemePreferenceToStorage(currentThemePreference);
  return applyTheme(currentThemePreference);
}
function setThemePreference(mode = THEME_MODE_SYSTEM) {
  currentThemePreference = normalizeThemePreference(mode);
  writeThemePreferenceToStorage(currentThemePreference);
  if (currentThemePreference === THEME_MODE_SYSTEM) {
    return applyTheme(getSystemTheme());
  }
  return applyTheme(currentThemePreference);
}
function getThemePreference() {
  return currentThemePreference;
}
function refreshThemeFromConfig() {
  cachedLightThemeColors = getCurrentLightThemeColors();
  if (themeState.version > 0) {
    applyTheme(themeState.mode);
  }
}
function initThemeSystem() {
  if (typeof common_vendor.index === "undefined")
    return;
  if (!cachedLightThemeColors) {
    cachedLightThemeColors = getCurrentLightThemeColors();
  }
  currentThemePreference = readThemePreferenceFromStorage();
  if (currentThemePreference === THEME_MODE_SYSTEM) {
    applyTheme(getSystemTheme());
  } else {
    applyTheme(currentThemePreference);
  }
  if (!hasRegisterThemeListener && typeof common_vendor.index.onThemeChange === "function") {
    common_vendor.index.onThemeChange((res = {}) => {
      if (currentThemePreference === THEME_MODE_SYSTEM) {
        applyTheme(res.theme);
      }
    });
    hasRegisterThemeListener = true;
  }
}
exports.getSystemTheme = getSystemTheme;
exports.getThemePreference = getThemePreference;
exports.getThemeVars = getThemeVars;
exports.initThemeSystem = initThemeSystem;
exports.refreshThemeFromConfig = refreshThemeFromConfig;
exports.setTheme = setTheme;
exports.setThemePreference = setThemePreference;
exports.themeState = themeState;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/libs/theme/theme.js.map
