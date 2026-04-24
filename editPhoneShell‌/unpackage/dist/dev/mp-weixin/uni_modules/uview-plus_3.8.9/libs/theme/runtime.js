"use strict";
const common_vendor = require("../../../../common/vendor.js");
const THEME_MODE_STORAGE_KEY = "u-theme-mode";
const FALLBACK_THEME_VARS = {
  light: {
    "--up-main-color": "#303133",
    "--up-content-color": "#606266",
    "--up-tips-color": "#909193",
    "--up-light-color": "#c0c4cc",
    "--up-border-color": "#dadbde",
    "--up-bg-color": "#f3f4f6",
    "--up-page-bg-color": "#f3f4f6",
    "--up-card-bg-color": "#ffffff",
    "--up-navbar-bg-color": "#ffffff",
    "--up-disabled-color": "#c8c9cc",
    "--up-primary": "#3c9cff",
    "--up-warning": "#f9ae3d",
    "--up-success": "#5ac725",
    "--up-error": "#f56c6c",
    "--up-info": "#909399"
  },
  dark: {
    "--up-main-color": "#f5f5f5",
    "--up-content-color": "#d1d5db",
    "--up-tips-color": "#9ca3af",
    "--up-light-color": "#6b7280",
    "--up-border-color": "#3a3a3c",
    "--up-bg-color": "#1f1f1f",
    "--up-page-bg-color": "#1f1f1f",
    "--up-card-bg-color": "#1c1c1e",
    "--up-navbar-bg-color": "#1c1c1e",
    "--up-disabled-color": "#4b5563",
    "--up-primary": "#3c9cff",
    "--up-warning": "#f9ae3d",
    "--up-success": "#5ac725",
    "--up-error": "#f56c6c",
    "--up-info": "#909399"
  }
};
function getRuntimeU(upU) {
  if (upU)
    return upU;
  if (typeof common_vendor.index !== "undefined")
    return common_vendor.index.$u;
  return null;
}
function normalizeThemeMode(theme = "light") {
  return theme === "dark" ? "dark" : "light";
}
function normalizeThemePreference(mode = "system") {
  return mode === "dark" || mode === "light" ? mode : "system";
}
function getFallbackSystemTheme() {
  let theme = "light";
  try {
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.getAppBaseInfo === "function") {
      const appBaseInfo = common_vendor.index.getAppBaseInfo() || {};
      if (appBaseInfo.theme)
        theme = appBaseInfo.theme;
    }
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.getSystemInfoSync === "function") {
      const systemInfo = common_vendor.index.getSystemInfoSync() || {};
      if (systemInfo.theme)
        theme = systemInfo.theme;
    }
  } catch (e) {
    theme = "light";
  }
  return normalizeThemeMode(theme);
}
function getFallbackThemePreference() {
  try {
    if (typeof common_vendor.index !== "undefined" && typeof common_vendor.index.getStorageSync === "function") {
      const preference = common_vendor.index.getStorageSync(THEME_MODE_STORAGE_KEY);
      return normalizeThemePreference(preference);
    }
  } catch (e) {
  }
  return "system";
}
function getFallbackThemeMode() {
  const preference = getFallbackThemePreference();
  if (preference === "dark" || preference === "light")
    return preference;
  return getFallbackSystemTheme();
}
function getFallbackThemeVarsByMode(mode) {
  const vars = FALLBACK_THEME_VARS[normalizeThemeMode(mode)] || FALLBACK_THEME_VARS.light;
  return {
    ...vars,
    "--u-main-color": vars["--up-main-color"],
    "--u-content-color": vars["--up-content-color"],
    "--u-tips-color": vars["--up-tips-color"],
    "--u-light-color": vars["--up-light-color"],
    "--u-border-color": vars["--up-border-color"],
    "--u-bg-color": vars["--up-bg-color"],
    "--u-page-bg-color": vars["--up-page-bg-color"],
    "--u-card-bg-color": vars["--up-card-bg-color"],
    "--u-navbar-bg-color": vars["--up-navbar-bg-color"],
    "--u-disabled-color": vars["--up-disabled-color"],
    "--u-primary": vars["--up-primary"],
    "--u-warning": vars["--up-warning"],
    "--u-success": vars["--up-success"],
    "--u-error": vars["--up-error"],
    "--u-info": vars["--up-info"]
  };
}
function getFallbackThemeVars(upU) {
  const mode = getThemeIsDark(upU) ? "dark" : "light";
  return getFallbackThemeVarsByMode(mode);
}
function syncRuntimeColor(runtimeU, vars) {
  if (!runtimeU || !runtimeU.color)
    return;
  runtimeU.color.mainColor = vars["--up-main-color"];
  runtimeU.color.contentColor = vars["--up-content-color"];
  runtimeU.color.tipsColor = vars["--up-tips-color"];
  runtimeU.color.lightColor = vars["--up-light-color"];
  runtimeU.color.borderColor = vars["--up-border-color"];
  runtimeU.color.bgColor = vars["--up-bg-color"];
  runtimeU.color.disabledColor = vars["--up-disabled-color"];
  runtimeU.color.primary = vars["--up-primary"];
  runtimeU.color.warning = vars["--up-warning"];
  runtimeU.color.success = vars["--up-success"];
  runtimeU.color.error = vars["--up-error"];
  runtimeU.color.info = vars["--up-info"];
}
function syncThemeRuntimeFromStorage(upU) {
  const runtimeU = getRuntimeU(upU);
  if (!runtimeU || !runtimeU.theme)
    return runtimeU == null ? void 0 : runtimeU.theme;
  const preference = getFallbackThemePreference();
  const mode = preference === "system" ? getFallbackSystemTheme() : preference;
  const vars = getFallbackThemeVarsByMode(mode);
  const shouldUpdate = runtimeU.theme.preference !== preference || runtimeU.theme.mode !== mode;
  if (shouldUpdate && typeof runtimeU.setThemePreference === "function") {
    return runtimeU.setThemePreference(preference) || runtimeU.theme;
  }
  runtimeU.theme.preference = preference;
  runtimeU.theme.mode = mode;
  runtimeU.theme.vars = {
    ...vars,
    ...runtimeU.theme.vars && !shouldUpdate ? runtimeU.theme.vars : {}
  };
  if (shouldUpdate) {
    runtimeU.theme.version = Number(runtimeU.theme.version || 0) + 1;
  }
  syncRuntimeColor(runtimeU, runtimeU.theme.vars);
  return runtimeU.theme;
}
function getThemeIsDark(upU) {
  var _a, _b;
  const runtimeMode = (_b = (_a = getRuntimeU(upU)) == null ? void 0 : _a.theme) == null ? void 0 : _b.mode;
  if (runtimeMode)
    return runtimeMode === "dark";
  return getFallbackThemeMode() === "dark";
}
function getThemeVarsForStyle(upU) {
  const runtimeU = getRuntimeU(upU);
  if (runtimeU && typeof runtimeU.getThemeVars === "function") {
    return runtimeU.getThemeVars();
  }
  return getFallbackThemeVars(runtimeU);
}
function getThemeVar(varName, fallbackColor, upU) {
  var _a, _b;
  const runtimeU = getRuntimeU(upU);
  const themeVars = (_a = runtimeU == null ? void 0 : runtimeU.theme) == null ? void 0 : _a.vars;
  if (themeVars && Object.prototype.hasOwnProperty.call(themeVars, varName)) {
    return themeVars[varName];
  }
  if (typeof varName === "string") {
    const aliasVarName = varName.indexOf("--up-") === 0 ? varName.replace("--up-", "--u-") : varName.indexOf("--u-") === 0 ? varName.replace("--u-", "--up-") : "";
    if (aliasVarName && themeVars && Object.prototype.hasOwnProperty.call(themeVars, aliasVarName)) {
      return themeVars[aliasVarName];
    }
    const runtimeColorMap = ((_b = runtimeU == null ? void 0 : runtimeU.config) == null ? void 0 : _b.color) || {};
    const colorTokenKey = varName.indexOf("--") === 0 ? varName.slice(2) : varName;
    if (Object.prototype.hasOwnProperty.call(runtimeColorMap, colorTokenKey)) {
      return runtimeColorMap[colorTokenKey];
    }
    const aliasColorTokenKey = colorTokenKey.indexOf("up-") === 0 ? colorTokenKey.replace("up-", "u-") : colorTokenKey.indexOf("u-") === 0 ? colorTokenKey.replace("u-", "up-") : "";
    if (aliasColorTokenKey && Object.prototype.hasOwnProperty.call(runtimeColorMap, aliasColorTokenKey)) {
      return runtimeColorMap[aliasColorTokenKey];
    }
  }
  if (runtimeU && typeof runtimeU.getThemeVars === "function") {
    const vars = runtimeU.getThemeVars();
    if (vars && Object.prototype.hasOwnProperty.call(vars, varName)) {
      return vars[varName];
    }
  }
  const fallbackVars = getFallbackThemeVars(runtimeU);
  if (fallbackVars && Object.prototype.hasOwnProperty.call(fallbackVars, varName)) {
    return fallbackVars[varName];
  }
  return typeof fallbackColor !== "undefined" ? fallbackColor : "";
}
function getThemePageStyle(upU, preferCssVars = false) {
  var _a;
  const runtimeU = getRuntimeU(upU);
  const isDark = getThemeIsDark(runtimeU);
  const fallbackBg = isDark ? "#1f1f1f" : ((_a = runtimeU == null ? void 0 : runtimeU.color) == null ? void 0 : _a.bgColor) || "#f3f4f6";
  if (preferCssVars) {
    return {
      ...getThemeVarsForStyle(runtimeU),
      minHeight: "100vh",
      backgroundColor: `var(--up-page-bg-color, var(--up-bg-color, ${fallbackBg}))`
    };
  }
  return {
    backgroundColor: getThemeVar(
      "--up-page-bg-color",
      getThemeVar("--up-bg-color", fallbackBg, runtimeU),
      runtimeU
    )
  };
}
function getThemeCardStyle(upU, preferCssVars = false) {
  var _a;
  const runtimeU = getRuntimeU(upU);
  const isDark = getThemeIsDark(runtimeU);
  const fallbackCard = isDark ? "#1c1c1e" : "#ffffff";
  const fallbackBorder = ((_a = runtimeU == null ? void 0 : runtimeU.color) == null ? void 0 : _a.borderColor) || "#dadbde";
  if (preferCssVars) {
    return {
      backgroundColor: `var(--up-card-bg-color, ${fallbackCard})`,
      borderColor: `var(--up-border-color, ${fallbackBorder})`
    };
  }
  return {
    backgroundColor: getThemeVar("--up-card-bg-color", fallbackCard, runtimeU),
    borderColor: getThemeVar("--up-border-color", fallbackBorder, runtimeU)
  };
}
function getThemeTabBarStyle(upU) {
  const runtimeU = getRuntimeU(upU);
  const isDark = getThemeIsDark(runtimeU);
  return {
    color: isDark ? "#8e8e93" : "#909399",
    selectedColor: isDark ? "#f2f2f7" : "#303133",
    backgroundColor: isDark ? "#111111" : "#ffffff",
    borderStyle: isDark ? "white" : "black"
  };
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
function applyNativeThemeUI(upU) {
  var _a;
  if (typeof common_vendor.index === "undefined")
    return;
  const runtimeU = getRuntimeU(upU);
  const isDark = getThemeIsDark(runtimeU);
  const fallbackBg = isDark ? "#1f1f1f" : ((_a = runtimeU == null ? void 0 : runtimeU.color) == null ? void 0 : _a.bgColor) || "#f3f4f6";
  const pageBg = getThemeVar(
    "--up-page-bg-color",
    getThemeVar("--up-bg-color", fallbackBg, runtimeU),
    runtimeU
  );
  const navBg = getThemeVar(
    "--up-navbar-bg-color",
    isDark ? "#1c1c1e" : "#ffffff",
    runtimeU
  );
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
    common_vendor.index.setTabBarStyle(getThemeTabBarStyle(runtimeU));
  }
}
function applyNativeThemeUIDeferred(upU, delay = 30) {
  applyNativeThemeUI(upU);
  if (typeof setTimeout === "function") {
    setTimeout(() => {
      applyNativeThemeUI(upU);
    }, delay);
  }
}
exports.applyNativeThemeUI = applyNativeThemeUI;
exports.applyNativeThemeUIDeferred = applyNativeThemeUIDeferred;
exports.getThemeCardStyle = getThemeCardStyle;
exports.getThemeIsDark = getThemeIsDark;
exports.getThemePageStyle = getThemePageStyle;
exports.getThemeTabBarStyle = getThemeTabBarStyle;
exports.getThemeVar = getThemeVar;
exports.getThemeVarsForStyle = getThemeVarsForStyle;
exports.syncThemeRuntimeFromStorage = syncThemeRuntimeFromStorage;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/libs/theme/runtime.js.map
