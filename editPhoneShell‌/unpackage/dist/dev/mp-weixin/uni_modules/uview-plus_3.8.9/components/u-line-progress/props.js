"use strict";
const uni_modules_uviewPlus_3_8_9_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_3_8_9_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_3_8_9_libs_vue.defineMixin({
  props: {
    // 激活部分的颜色
    activeColor: {
      type: String,
      default: () => uni_modules_uviewPlus_3_8_9_libs_config_props.props.lineProgress.activeColor
    },
    inactiveColor: {
      type: String,
      default: () => uni_modules_uviewPlus_3_8_9_libs_config_props.props.lineProgress.color
    },
    // 进度百分比，数值
    percentage: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_3_8_9_libs_config_props.props.lineProgress.inactiveColor
    },
    // 是否在进度条内部显示百分比的值
    showText: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_3_8_9_libs_config_props.props.lineProgress.showText
    },
    // 进度条的高度，单位px
    height: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_3_8_9_libs_config_props.props.lineProgress.height
    },
    // 是否从右往左加载
    fromRight: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_3_8_9_libs_config_props.props.lineProgress.fromRight
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/components/u-line-progress/props.js.map
