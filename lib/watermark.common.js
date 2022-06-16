/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ src; }
});

;// CONCATENATED MODULE: external "@babel/runtime/helpers/classCallCheck"
var classCallCheck_namespaceObject = require("@babel/runtime/helpers/classCallCheck");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/createClass"
var createClass_namespaceObject = require("@babel/runtime/helpers/createClass");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_namespaceObject);
;// CONCATENATED MODULE: external "core-js/modules/es.object.assign.js"
var es_object_assign_js_namespaceObject = require("core-js/modules/es.object.assign.js");
;// CONCATENATED MODULE: external "core-js/modules/es.object.to-string.js"
var es_object_to_string_js_namespaceObject = require("core-js/modules/es.object.to-string.js");
;// CONCATENATED MODULE: external "core-js/modules/es.promise.js"
var es_promise_js_namespaceObject = require("core-js/modules/es.promise.js");
;// CONCATENATED MODULE: external "core-js/modules/es.string.repeat.js"
var es_string_repeat_js_namespaceObject = require("core-js/modules/es.string.repeat.js");
;// CONCATENATED MODULE: external "core-js/modules/es.array.includes.js"
var es_array_includes_js_namespaceObject = require("core-js/modules/es.array.includes.js");
;// CONCATENATED MODULE: external "core-js/modules/es.string.includes.js"
var es_string_includes_js_namespaceObject = require("core-js/modules/es.string.includes.js");
;// CONCATENATED MODULE: ./src/utils/validate.js



// 判断百分数
var isPercent = function isPercent(string) {
  return typeof string === 'string' && string.includes('%');
};
var validNum = function validNum(value) {
  return !isNaN(parseFloat(value));
};
var isObject = function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
;// CONCATENATED MODULE: external "core-js/modules/es.string.trim.js"
var es_string_trim_js_namespaceObject = require("core-js/modules/es.string.trim.js");
;// CONCATENATED MODULE: external "core-js/modules/es.regexp.exec.js"
var es_regexp_exec_js_namespaceObject = require("core-js/modules/es.regexp.exec.js");
;// CONCATENATED MODULE: external "core-js/modules/es.string.replace.js"
var es_string_replace_js_namespaceObject = require("core-js/modules/es.string.replace.js");
;// CONCATENATED MODULE: external "core-js/modules/es.string.split.js"
var es_string_split_js_namespaceObject = require("core-js/modules/es.string.split.js");
;// CONCATENATED MODULE: ./src/utils/measure.js




 // 计算水印的偏移

function getTranslate(mark, translate) {
  if (!translate) {
    return {
      translateX: 0,
      translateY: 0
    };
  }

  var width = mark.width,
      height = mark.height;

  var _translate;

  if (Array.isArray(translate)) {
    _translate = translate;
  } else if (typeof translate === 'string') {
    _translate = translate.trim();
    _translate = _translate.replace(/\s+/g, ',');
    _translate = _translate.replace(/,+/g, ',');
    _translate = _translate.split(',');
  }

  var translateX = _translate[0] || 0;
  var translateY = _translate[1] || translateX;

  if (validNum(translateX)) {
    translateX = isPercent(translateX) ? parseFloat(translateX) / 100 * width : parseFloat(translateX);
  } else {
    translateX = 0;
  }

  if (validNum(translateY)) {
    translateY = isPercent(translateY) ? parseFloat(translateY) / 100 * height : parseFloat(translateY);
  } else {
    translateY = 0;
  }

  return {
    translateX: translateX,
    translateY: translateY
  };
} // 计算水印位置

function getPosition(mark, options) {
  var width = options.width,
      height = options.height,
      position = options.position;
  var top = position.top,
      right = position.right,
      bottom = position.bottom,
      left = position.left;
  var x = 0;
  var y = 0;

  if (validNum(top)) {
    y = isPercent(top) ? parseFloat(top) / 100 * height : parseFloat(top);
  } else if (validNum(bottom)) {
    var toBottom = isPercent(bottom) ? parseFloat(bottom) / 100 * height : parseFloat(bottom);
    y = height - toBottom - mark.height;
  }

  if (validNum(left)) {
    x = isPercent(left) ? parseFloat(left) / 100 * width : parseFloat(left);
  } else if (validNum(right)) {
    var toRight = isPercent(right) ? parseFloat(right) / 100 * width : parseFloat(right);
    x = width - toRight - mark.width;
  }

  return {
    x: x,
    y: y
  };
} // 计算水印之间间隔

function getSpacing(size, spacing) {
  if (!validNum(spacing)) {
    return size;
  }

  if (isPercent(spacing)) {
    return size + parseFloat(spacing) / 100 * size;
  } else {
    return size + parseFloat(spacing);
  }
} // 转换边距

function transferPadding() {
  var padding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
  var arr = Array.isArray(padding) ? padding : padding.split(',');
  var pad = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  if (Array.isArray(arr) && arr.length > 0) {
    pad.top = arr[0];
    pad.right = arr[1] || pad.top;
    pad.bottom = arr[2] || pad.top;
    pad.left = arr[3] || pad.right;
  }

  return pad;
} // 将边距百分比、像素等统一转换成像素距离

function pad2distance(size, pad) {
  if (isPercent(pad)) {
    return parseFloat(pad) / 100 * size;
  } else {
    return parseFloat(pad);
  }
}
;// CONCATENATED MODULE: external "core-js/modules/es.string.match.js"
var es_string_match_js_namespaceObject = require("core-js/modules/es.string.match.js");
;// CONCATENATED MODULE: external "core-js/modules/es.array.iterator.js"
var es_array_iterator_js_namespaceObject = require("core-js/modules/es.array.iterator.js");
;// CONCATENATED MODULE: external "core-js/modules/es.array-buffer.slice.js"
var es_array_buffer_slice_js_namespaceObject = require("core-js/modules/es.array-buffer.slice.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.uint8-array.js"
var es_typed_array_uint8_array_js_namespaceObject = require("core-js/modules/es.typed-array.uint8-array.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.copy-within.js"
var es_typed_array_copy_within_js_namespaceObject = require("core-js/modules/es.typed-array.copy-within.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.every.js"
var es_typed_array_every_js_namespaceObject = require("core-js/modules/es.typed-array.every.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.fill.js"
var es_typed_array_fill_js_namespaceObject = require("core-js/modules/es.typed-array.fill.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.filter.js"
var es_typed_array_filter_js_namespaceObject = require("core-js/modules/es.typed-array.filter.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.find.js"
var es_typed_array_find_js_namespaceObject = require("core-js/modules/es.typed-array.find.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.find-index.js"
var es_typed_array_find_index_js_namespaceObject = require("core-js/modules/es.typed-array.find-index.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.for-each.js"
var es_typed_array_for_each_js_namespaceObject = require("core-js/modules/es.typed-array.for-each.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.includes.js"
var es_typed_array_includes_js_namespaceObject = require("core-js/modules/es.typed-array.includes.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.index-of.js"
var es_typed_array_index_of_js_namespaceObject = require("core-js/modules/es.typed-array.index-of.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.iterator.js"
var es_typed_array_iterator_js_namespaceObject = require("core-js/modules/es.typed-array.iterator.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.join.js"
var es_typed_array_join_js_namespaceObject = require("core-js/modules/es.typed-array.join.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.last-index-of.js"
var es_typed_array_last_index_of_js_namespaceObject = require("core-js/modules/es.typed-array.last-index-of.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.map.js"
var es_typed_array_map_js_namespaceObject = require("core-js/modules/es.typed-array.map.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.reduce.js"
var es_typed_array_reduce_js_namespaceObject = require("core-js/modules/es.typed-array.reduce.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.reduce-right.js"
var es_typed_array_reduce_right_js_namespaceObject = require("core-js/modules/es.typed-array.reduce-right.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.reverse.js"
var es_typed_array_reverse_js_namespaceObject = require("core-js/modules/es.typed-array.reverse.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.set.js"
var es_typed_array_set_js_namespaceObject = require("core-js/modules/es.typed-array.set.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.slice.js"
var es_typed_array_slice_js_namespaceObject = require("core-js/modules/es.typed-array.slice.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.some.js"
var es_typed_array_some_js_namespaceObject = require("core-js/modules/es.typed-array.some.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.sort.js"
var es_typed_array_sort_js_namespaceObject = require("core-js/modules/es.typed-array.sort.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.subarray.js"
var es_typed_array_subarray_js_namespaceObject = require("core-js/modules/es.typed-array.subarray.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.to-locale-string.js"
var es_typed_array_to_locale_string_js_namespaceObject = require("core-js/modules/es.typed-array.to-locale-string.js");
;// CONCATENATED MODULE: external "core-js/modules/es.typed-array.to-string.js"
var es_typed_array_to_string_js_namespaceObject = require("core-js/modules/es.typed-array.to-string.js");
;// CONCATENATED MODULE: external "core-js/modules/es.function.name.js"
var es_function_name_js_namespaceObject = require("core-js/modules/es.function.name.js");
;// CONCATENATED MODULE: ./src/utils/file.js































// 将base64转换为blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
} // 将blob转换为file

function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}
;// CONCATENATED MODULE: external "core-js/modules/es.array.slice.js"
var es_array_slice_js_namespaceObject = require("core-js/modules/es.array.slice.js");
;// CONCATENATED MODULE: external "core-js/modules/es.array.from.js"
var es_array_from_js_namespaceObject = require("core-js/modules/es.array.from.js");
;// CONCATENATED MODULE: external "core-js/modules/es.symbol.iterator.js"
var es_symbol_iterator_js_namespaceObject = require("core-js/modules/es.symbol.iterator.js");
;// CONCATENATED MODULE: external "@babel/runtime/helpers/toConsumableArray"
var toConsumableArray_namespaceObject = require("@babel/runtime/helpers/toConsumableArray");
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/slicedToArray"
var slicedToArray_namespaceObject = require("@babel/runtime/helpers/slicedToArray");
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/regenerator"
var regenerator_namespaceObject = require("@babel/runtime/regenerator");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_namespaceObject);
;// CONCATENATED MODULE: external "core-js/modules/es.map.js"
var es_map_js_namespaceObject = require("core-js/modules/es.map.js");
;// CONCATENATED MODULE: external "core-js/modules/es.string.iterator.js"
var es_string_iterator_js_namespaceObject = require("core-js/modules/es.string.iterator.js");
;// CONCATENATED MODULE: external "core-js/modules/web.dom-collections.iterator.js"
var web_dom_collections_iterator_js_namespaceObject = require("core-js/modules/web.dom-collections.iterator.js");
;// CONCATENATED MODULE: external "core-js/modules/es.object.get-own-property-descriptor.js"
var es_object_get_own_property_descriptor_js_namespaceObject = require("core-js/modules/es.object.get-own-property-descriptor.js");
;// CONCATENATED MODULE: external "core-js/modules/es.symbol.js"
var es_symbol_js_namespaceObject = require("core-js/modules/es.symbol.js");
;// CONCATENATED MODULE: external "core-js/modules/es.symbol.description.js"
var es_symbol_description_js_namespaceObject = require("core-js/modules/es.symbol.description.js");
;// CONCATENATED MODULE: ./src/utils/eventQueue.js











function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }










var EventQueue = /*#__PURE__*/function () {
  function EventQueue() {
    classCallCheck_default()(this, EventQueue);

    this.current = '';
    this.gen = null; // 用于存储事件队列中每个事件状态

    this.queue = {}; // 事件队列

    this.events = new Map();
  } // 生成器函数


  createClass_default()(EventQueue, [{
    key: "generator",
    value:
    /*#__PURE__*/
    regenerator_default().mark(function generator() {
      var _iterator, _step, _step$value, key, value, fn, arg;

      return regenerator_default().wrap(function generator$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(this.events);
              _context.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 12;
                break;
              }

              _step$value = slicedToArray_default()(_step.value, 2), key = _step$value[0], value = _step$value[1];
              fn = value.fn, arg = value.arg;
              this.current = key;
              this.queue[key] = 'starting';
              _context.next = 10;
              return fn.apply(void 0, toConsumableArray_default()(arg));

            case 10:
              _context.next = 3;
              break;

            case 12:
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);

              _iterator.e(_context.t0);

            case 17:
              _context.prev = 17;

              _iterator.f();

              return _context.finish(17);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, generator, this, [[1, 14, 17, 20]]);
    }) // 当前事件状态改变通知执行下一步或完成

  }, {
    key: "notify",
    value: function notify() {
      var gen = this.gen,
          queue = this.queue,
          current = this.current;

      if (queue[current] === 'finish') {
        if (gen) {
          var res = gen.next();

          if (res.done) {
            this.done();
          }
        }
      }
    } // 监听对象

  }, {
    key: "defineReactive",
    value: function defineReactive(obj, key, val) {
      var _this = this;

      var property = Object.getOwnPropertyDescriptor(obj, key);

      if (property && property.configurable === false) {
        return;
      } // cater for pre-defined getter/setters


      var getter = property && property.get;
      var setter = property && property.set;

      if ((!getter || setter) && arguments.length === 2) {
        val = obj[key];
      }

      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
          var value = getter ? getter.call(obj) : val;
          return value;
        },
        set: function reactiveSetter(newVal) {
          var value = getter ? getter.call(obj) : val;
          /* eslint-disable no-self-compare */

          if (newVal === value || newVal !== newVal && value !== value) {
            return;
          } // #7981: for accessor properties without setter


          if (getter && !setter) {
            return;
          }

          if (setter) {
            setter.call(obj, newVal);
          } else {
            val = newVal;
          }

          _this.notify();
        }
      });
    } // 添加事件队列

  }, {
    key: "add",
    value: function add(fn, arg) {
      var timestamp = new Date().getTime();
      var key = Symbol(timestamp);
      this.events.set(key, {
        fn: fn,
        arg: arg
      });
      this.queue[key] = 'waiting'; // 监听当前事件状态

      this.defineReactive(this.queue, key);
    } // 开始执行事件队列

  }, {
    key: "start",
    value: function start() {
      this.gen = this.generator();
      this.gen.next();
    } // 下一步

  }, {
    key: "next",
    value: function next() {
      var _this2 = this;

      setTimeout(function () {
        _this2.queue[_this2.current] = 'finish';
      }, 0);
    } // 完成事件队列

  }, {
    key: "done",
    value: function done() {
      this.gen = null;
      this.queue = null;
      this.events = null;

      if (typeof this.end === 'function') {
        this.end();
      }
    }
  }]);

  return EventQueue;
}();

/* harmony default export */ var eventQueue = (EventQueue);
;// CONCATENATED MODULE: ./src/index.js











var watermark = /*#__PURE__*/function () {
  function watermark(url, options) {
    classCallCheck_default()(this, watermark);

    // 时间队列
    this.eventQueue = new eventQueue();
    this.canvas = null;
    this.image = null;
    this.ctx = null; // 待添加水印图片地址

    this.url = url; // 添加水印执行状态

    this.waiting = false; // 待添加水印图片加载

    this.loading = true; // 默认参数

    this.options = {
      start: 0,
      quality: 0.6,
      // 生成图片质量
      fontSize: 16,
      // 文字水印字号
      fillStyle: "#fff",
      // 文字水印颜色
      globalAlpha: 0.2,
      // 水印透明度
      rotate: -45,
      // 水印旋转角度
      repeat: false,
      // 水印是否重复
      clip: null,
      // 设置添加水印的区域，接受对象，含shape（形状）, padding（边距）
      defineClip: null,
      // 自定义添加水印的区域的方法
      position: {
        top: 10,
        left: 10
      },
      // 水印位置
      translate: 0,
      // 水印偏移
      crossOrigin: false,
      // 是否跨域
      markSpacing: '50%',
      // 水印间距
      lineSpacing: 60 // 水印行间距

    };
    this.init(options);
  }

  createClass_default()(watermark, [{
    key: "init",
    value: function init(opt) {
      var _this2 = this;

      this.options = Object.assign(this.options, opt);
      var options = this.options;
      return new Promise(function (resolve, reject) {
        _this2.image = new Image();
        _this2.image.crossOrigin = _this2.crossOrigin;

        _this2.image.addEventListener("load", function () {
          var image = _this2.image;
          var imgWidht = image.naturalWidth;
          var imgHeight = image.naturalHeight;
          options.width = options.width || imgWidht;
          options.height = options.height || imgHeight;
          _this2.canvas = document.createElement("canvas");

          _this2.canvas.setAttribute("id", "__compress__");

          _this2.canvas.width = imgWidht;
          _this2.canvas.height = imgHeight;
          _this2.canvas.style.visibility = "hidden";
          _this2.ctx = _this2.canvas.getContext("2d");

          _this2.ctx.clearRect(0, 0, imgWidht, imgHeight);

          _this2.ctx.drawImage(image, 0, 0, imgWidht, imgHeight); // 渲染图片
          // 规定一个区域内添加水印


          var clip = options.clip,
              defineClip = options.defineClip;

          if (typeof defineClip === 'function') {
            defineClip(_this2.ctx);

            _this2.ctx.clip();
          } else if (isObject(clip)) {
            var _clip$shape = clip.shape,
                shape = _clip$shape === void 0 ? 'rect' : _clip$shape,
                padding = clip.padding;
            var pad = transferPadding(padding);
            var tp = pad2distance(imgHeight, pad.top);
            var rt = pad2distance(imgWidht, pad.right);
            var bt = pad2distance(imgHeight, pad.bottom);
            var lf = pad2distance(imgWidht, pad.left);
            var w = imgWidht - lf - rt;
            var h = imgHeight - tp - bt;

            if (shape === 'rect') {
              _this2.ctx.rect(lf, tp, w, h);
            } else if (shape === 'circle') {
              var r = Math.min(w, h) / 2;

              _this2.ctx.arc(lf + r, tp + r, r, 0, Math.PI * 2, false);
            }

            _this2.ctx.clip();
          }

          _this2.loading = false;

          if (_this2.waiting) {
            _this2.run();
          }

          resolve(_this2);
        });

        _this2.image.src = _this2.url;
      });
    } // 重复添加水印

  }, {
    key: "repeat",
    value: function repeat(_ref, opt, cb) {
      var moveX = _ref.moveX,
          moveY = _ref.moveY;
      var width = opt.width,
          height = opt.height,
          rotate = opt.rotate,
          start = opt.start;
      this.ctx.rotate(rotate * Math.PI / 180); // 水印初始偏转角度

      for (var i = height * 0.65 * -1; i < width; i += moveX) {
        for (var j = start; j < height * 2; j += moveY) {
          cb(i, j);
        }
      }

      this.ctx.rotate(-(rotate * Math.PI) / 180); // 水印初始偏转角度
    } // 添加文字水印事件到事件队列中

  }, {
    key: "addText",
    value: function addText() {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      this.eventQueue.add(this.drawText.bind(this), arg);
    } // 添加图片水印事件到事件队列中

  }, {
    key: "addImage",
    value: function addImage() {
      for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        arg[_key2] = arguments[_key2];
      }

      this.eventQueue.add(this.drawImage.bind(this), arg);
    } // 开始执行绘制水印

  }, {
    key: "draw",
    value: function draw(cb) {
      this.eventQueue.end = cb;
      this.waiting = true;
      this.run();
    } // 运行事件队列

  }, {
    key: "run",
    value: function run() {
      if (!this.loading) {
        this.waiting = false;
        this.eventQueue.start();
      }
    } // 绘制文字水印

  }, {
    key: "drawText",
    value: function drawText(mark, options) {
      var opt = Object.assign({}, this.options, options);
      var fontSize = opt.fontSize,
          fillStyle = opt.fillStyle,
          globalAlpha = opt.globalAlpha,
          repeat = opt.repeat,
          markSpacing = opt.markSpacing,
          lineSpacing = opt.lineSpacing;
      var ctx = this.ctx;
      ctx.fillStyle = fillStyle;
      ctx.font = fontSize + "px 黑体";
      ctx.globalAlpha = globalAlpha;
      var textSize = ctx.measureText(mark);
      var textWidth = textSize.width;

      if (!repeat) {
        // 填充文字，x 间距, y 间距
        var _getPosition = getPosition({
          width: textWidth,
          height: fontSize
        }, opt),
            x = _getPosition.x,
            y = _getPosition.y;

        var _getTranslate = getTranslate({
          width: textWidth,
          height: fontSize
        }, opt.translate),
            translateX = _getTranslate.translateX,
            translateY = _getTranslate.translateY;

        ctx.fillText(mark, x + translateX, fontSize + y + translateY);
        this.eventQueue.next();
        return;
      }

      opt.start = opt.start + fontSize;
      var moveY = getSpacing(fontSize, lineSpacing);
      var moveX = getSpacing(textWidth, markSpacing);
      this.repeat({
        moveX: moveX,
        moveY: moveY
      }, opt, function (x, y) {
        // 填充文字，x 间距, y 间距
        ctx.fillText(mark, x, y);
      });
      this.eventQueue.next();
    } // 添加图片水印

  }, {
    key: "drawImage",
    value: function drawImage(mark, options) {
      var _this = this;

      var ctx = this.ctx;
      var opt = Object.assign({}, this.options, options);
      var width = opt.width,
          markWidth = opt.markWidth,
          markHeight = opt.markHeight,
          globalAlpha = opt.globalAlpha,
          repeat = opt.repeat,
          lineSpacing = opt.lineSpacing,
          markSpacing = opt.markSpacing;
      return new Promise(function (resolve, reject) {
        var markImg = new Image();
        markImg.crossOrigin = opt.crossOrigin;

        markImg.onload = function () {
          var _width = validNum(markWidth) ? parseFloat(markWidth) : Math.min(markImg.width, width / 3);

          var _height = validNum(markHeight) ? parseFloat(markHeight) : markImg.height * _width / markImg.width;

          if (validNum(markHeight) && !validNum(markWidth)) {
            _width = markImg.width * _height / markImg.height;
          }

          ctx.globalAlpha = globalAlpha;

          if (!repeat) {
            var _getPosition2 = getPosition({
              width: _width,
              height: _height
            }, opt),
                x = _getPosition2.x,
                y = _getPosition2.y;

            var _getTranslate2 = getTranslate({
              width: _width,
              height: _height
            }, opt.translate),
                translateX = _getTranslate2.translateX,
                translateY = _getTranslate2.translateY; // 填充文字，x 间距, y 间距


            ctx.drawImage(markImg, x + translateX, y + translateY, _width, _height);
            resolve(_this);

            _this.eventQueue.next();

            return;
          }

          var moveY = getSpacing(_height, lineSpacing);
          var moveX = getSpacing(_width, markSpacing);

          _this.repeat({
            moveX: moveX,
            moveY: moveY
          }, opt, function (x, y) {
            // 填充文字，x 间距, y 间距
            ctx.drawImage(markImg, x, y, _width, _height);
          });

          resolve(_this);

          _this.eventQueue.next();
        };

        markImg.src = mark;
      });
    }
  }, {
    key: "getBase64",
    value: function getBase64() {
      return this.canvas.toDataURL("image/jpeg", this.options.quality); // 压缩图片
    }
  }, {
    key: "getBlob",
    value: function getBlob() {
      var dataUrl = this.getBase64();
      return dataURLtoBlob(dataUrl);
    }
  }, {
    key: "getFile",
    value: function getFile(fileName) {
      var blob = this.getBlob();
      return blobToFile(blob, fileName);
    }
  }, {
    key: "destory",
    value: function destory() {
      this.canvas = null;
      this.image = null;
      this.ctx = null;
      this.eventQueue = null;
    }
  }]);

  return watermark;
}();

/* harmony default export */ var src = (watermark);
module.exports.watermark = __webpack_exports__["default"];
/******/ })()
;