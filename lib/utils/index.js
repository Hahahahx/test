import "core-js/modules/web.timers.js";

function debounce(fn, wait) {
  wait === undefined && (wait = 200);
  var timer = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      return fn.apply(void 0, args);
    }, wait);
  };
}

export { debounce };