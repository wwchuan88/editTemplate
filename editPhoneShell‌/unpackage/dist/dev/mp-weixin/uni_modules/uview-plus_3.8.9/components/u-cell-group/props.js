"use strict";
const uni_modules_uviewPlus_3_8_9_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_3_8_9_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_3_8_9_libs_vue.defineMixin({
  props: {
    // 分组标题
    title: {
      type: String,
      default: () => uni_modules_uviewPlus_3_8_9_libs_config_props.props.cellGroup.title
    },
    // 是否显示外边框
    border: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_3_8_9_libs_config_props.props.cellGroup.border
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus_3.8.9/components/u-cell-group/props.js.map
