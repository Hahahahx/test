import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "react";
import { debounce } from "../utils";
export var Input = function Input(_ref) {
  var lazy = _ref.lazy,
      onDebounce = _ref.onDebounce,
      onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ["lazy", "onDebounce", "onChange"]);

  var _onDebounce = debounce(onDebounce, lazy);

  var _onChange = function _onChange(e) {
    onChange && onChange(e);
    e.persist();
    onDebounce && _onDebounce(e);
  };

  return /*#__PURE__*/React.createElement("input", _extends({}, props, {
    onChange: _onChange
  }));
};