import "core-js/modules/es.array.concat.js";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useMemo, useState } from "react";
import css from "../style.module.css";
export var SelectBox = function SelectBox(_ref) {
  var children = _ref.children,
      style = _ref.style,
      value = _ref.value,
      className = _ref.className,
      onChange = _ref.onChange;

  var _useState = useState(!!value),
      _useState2 = _slicedToArray(_useState, 2),
      select = _useState2[0],
      setSelect = _useState2[1];

  var judge = useMemo(function () {
    return value !== undefined ? value : select;
  }, [select, value]);
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    className: "".concat(className, " ").concat(css.container),
    onClick: function onClick() {
      onChange && onChange(!judge);
      setSelect(!judge);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: css.box
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20"
  }, /*#__PURE__*/React.createElement("path", {
    onAnimationEnd: function onAnimationEnd() {},
    fill: "transparent",
    stroke: "#000000",
    strokeWidth: "5",
    d: "M0 15 ,10 25,Q15 15,30 5 ",
    className: "".concat(css.path, " ").concat(judge ? css.selected : css.unselect)
  }))), children);
};