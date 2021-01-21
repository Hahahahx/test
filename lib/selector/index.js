import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.splice.js";
import "core-js/modules/es.string.includes.js";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useMemo, useState } from "react";
import { SelectBox } from "./selectBox";
import css from "./style.module.css";
export function PictureSelect(_ref) {
  var data = _ref.data,
      id = _ref.id,
      img = _ref.img,
      value = _ref.value,
      onChange = _ref.onChange;

  var _useState = useState(value || []),
      _useState2 = _slicedToArray(_useState, 2),
      selectList = _useState2[0],
      setList = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      init = _useState4[0],
      setInit = _useState4[1];

  var selectAll = useMemo(function () {
    if (init) {
      setInit(false);
    } else {
      onChange && onChange(selectList);
    }

    return selectList.length === data.length;
  }, [selectList]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SelectBox, {
    value: selectAll,
    onChange: function onChange(val) {
      if (val) {
        var list = data.map(function (v) {
          return v[id];
        });
        setList(list);
      } else {
        setList([]);
      }
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      paddingLeft: 25
    }
  }, "\u5DF2\u9009\u4E2D", selectList.length, "\u4E2A\u6587\u4EF6"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block"
    }
  }, data.map(function (value, index) {
    var val = data[index][id];
    return /*#__PURE__*/React.createElement(SelectBox, {
      key: index,
      className: "".concat(css.inlineBox, " item").concat(index),
      value: selectList.includes(val),
      onChange: function onChange(value) {
        if (value) {
          setList([].concat(_toConsumableArray(selectList), [data[index][id]]));
        } else {
          var keyIndex = selectList.indexOf(data[index][id]);
          selectList.splice(keyIndex, 1);
          setList(_toConsumableArray(selectList));
        }
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: data[index][img],
      width: "300"
    }));
  })));
}