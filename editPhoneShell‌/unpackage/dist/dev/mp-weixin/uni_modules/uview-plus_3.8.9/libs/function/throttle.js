"use strict";
let flag;
function throttle(func, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      typeof func === "function" && func();
      setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    setTimeout(() => {
      flag = false;
      typeof func === "function" && func();
    }, wait);
  }
}
exports.throttle = throttle;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/libs/function/throttle.js.map
