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
;// CONCATENATED MODULE: external "core-js/modules/es.array.includes.js"
var es_array_includes_js_namespaceObject = require("core-js/modules/es.array.includes.js");
;// CONCATENATED MODULE: external "core-js/modules/es.string.includes.js"
var es_string_includes_js_namespaceObject = require("core-js/modules/es.string.includes.js");
;// CONCATENATED MODULE: external "core-js/modules/es.string.repeat.js"
var es_string_repeat_js_namespaceObject = require("core-js/modules/es.string.repeat.js");
;// CONCATENATED MODULE: external "core-js/modules/es.regexp.exec.js"
var es_regexp_exec_js_namespaceObject = require("core-js/modules/es.regexp.exec.js");
;// CONCATENATED MODULE: external "core-js/modules/es.string.split.js"
var es_string_split_js_namespaceObject = require("core-js/modules/es.string.split.js");
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
;// CONCATENATED MODULE: ./src/canvas.js







































var canvasImage = /*#__PURE__*/function () {
  function canvasImage(url) {
    classCallCheck_default()(this, canvasImage);

    this.canvas = null;
    this.image = null;
    this.ctx = null;
    this.url = url;
    this.options = {
      start: 0,
      quality: 0.6,
      fontSize: 16,
      fillStyle: "#fff",
      globalAlpha: 0.2,
      rotate: -45,
      repeat: false,
      position: {
        top: 10,
        left: 10
      },
      markSpacing: '50%',
      lineSpacing: 60
    };
  }

  createClass_default()(canvasImage, [{
    key: "init",
    value: function init(options) {
      var _this2 = this;

      this.options = Object.assign(this.options, options);
      return new Promise(function (resolve, reject) {
        _this2.image = new Image();

        _this2.image.addEventListener("load", function () {
          var image = _this2.image;
          var imgWidht = image.naturalWidth;
          var imgHeight = image.naturalHeight;
          _this2.options.width = _this2.options.width || imgWidht;
          _this2.options.height = _this2.options.height || imgHeight;
          _this2.canvas = document.createElement("canvas");

          _this2.canvas.setAttribute("id", "__compress__");

          _this2.canvas.width = imgWidht;
          _this2.canvas.height = imgHeight;
          _this2.canvas.style.visibility = "hidden";
          _this2.ctx = _this2.canvas.getContext("2d");

          _this2.ctx.clearRect(0, 0, imgWidht, imgHeight);

          _this2.ctx.drawImage(image, 0, 0, imgWidht, imgHeight); // 渲染图片


          resolve(_this2);
        });

        _this2.image.src = _this2.url;
      });
    }
  }, {
    key: "isPercent",
    value: function isPercent(string) {
      return typeof string === 'string' && top.includes('%');
    }
  }, {
    key: "valid",
    value: function valid(value) {
      return typeof value === 'string' || typeof value === 'number' && !isNaN(value);
    }
  }, {
    key: "getPosition",
    value: function getPosition(mark, options) {
      var width = options.width,
          height = options.height,
          position = options.position;
      var top = position.top,
          right = position.right,
          bottom = position.bottom,
          left = position.left;
      var x = 0;
      var y = 0;

      if (this.valid(top)) {
        if (this.isPercent(top)) {
          y = parseInt(top) / 100 * height;
        } else {
          y = parseInt(top);
        }
      } else if (this.valid(bottom)) {
        if (this.isPercent(bottom)) {
          y = height - parseInt(bottom) / 100 * height - mark.height;
        } else {
          y = height - parseInt(bottom) - mark.height;
        }
      }

      if (this.valid(left)) {
        if (this.isPercent(left)) {
          x = parseInt(left) / 100 * width;
        } else {
          x = parseInt(left);
        }
      } else if (this.valid(right)) {
        if (this.isPercent(right)) {
          x = width - parseInt(right) / 100 * width - mark.width;
        } else {
          x = width - parseInt(right) - mark.width;
        }
      }

      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "measureSpacing",
    value: function measureSpacing(size, spacing) {
      if (!this.valid(spacing)) {
        return size;
      }

      if (typeof spacing === 'string' && spacing.includes('%')) {
        return size + parseInt(spacing) / 100 * size;
      } else {
        return size + parseInt(spacing);
      }
    }
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
    } // 绘制文字水印

  }, {
    key: "drawText",
    value: function drawText(mark, options) {
      var ctx = this.ctx;
      var opt = Object.assign({}, this.options, options);
      var fontSize = opt.fontSize,
          fillStyle = opt.fillStyle,
          globalAlpha = opt.globalAlpha,
          repeat = opt.repeat,
          markSpacing = opt.markSpacing,
          lineSpacing = opt.lineSpacing;
      ctx.fillStyle = fillStyle;
      ctx.font = fontSize + "px 黑体";
      ctx.globalAlpha = globalAlpha;
      var textSize = ctx.measureText(mark);
      var textWidth = textSize.width;

      if (!repeat) {
        // 填充文字，x 间距, y 间距
        var _this$getPosition = this.getPosition({
          width: textWidth,
          height: fontSize
        }, opt),
            x = _this$getPosition.x,
            y = _this$getPosition.y;

        ctx.fillText(mark, x, fontSize + y);
        return;
      }

      var moveY = this.measureSpacing(fontSize, lineSpacing);
      var moveX = this.measureSpacing(textWidth, markSpacing);
      this.repeat({
        moveX: moveX,
        moveY: moveY
      }, opt, function (x, y) {
        // 填充文字，x 间距, y 间距
        ctx.fillText(mark, x, y);
      });
    } // 添加图片水印

  }, {
    key: "drawImage",
    value: function drawImage(mark, options) {
      var _this = this;

      var ctx = this.ctx;
      var opt = Object.assign({}, this.options, options);
      var width = opt.width,
          globalAlpha = opt.globalAlpha,
          repeat = opt.repeat,
          lineSpacing = opt.lineSpacing,
          markSpacing = opt.markSpacing;
      return new Promise(function (resolve, reject) {
        var markImg = new Image();

        markImg.onload = function () {
          var _width = Math.min(markImg.width, width / 3);

          var _height = markImg.height * _width / markImg.width;
          /*
          双重遍历，
          当 宽度小于页面宽度时，
          当 高度小于页面高度时，
          这里的宽高可以适当写大，目的是为了让水印铺满
          */


          ctx.globalAlpha = globalAlpha;

          if (!repeat) {
            var _this$getPosition2 = _this.getPosition({
              width: _width,
              height: _height
            }, opt),
                x = _this$getPosition2.x,
                y = _this$getPosition2.y; // 填充文字，x 间距, y 间距


            ctx.drawImage(markImg, x, y, _width, _height);
            resolve(_this);
            return;
          }

          var moveY = _this.measureSpacing(_height, lineSpacing);

          var moveX = _this.measureSpacing(_width, markSpacing);

          _this.repeat({
            moveX: moveX,
            moveY: moveY
          }, opt, function (x, y) {
            // 填充文字，x 间距, y 间距
            ctx.drawImage(markImg, x, y, _width, _height);
          });

          resolve(_this);
        };

        markImg.src = mark;
      });
    } // 将base64转换为blob

  }, {
    key: "dataURLtoBlob",
    value: function dataURLtoBlob(dataurl) {
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

  }, {
    key: "blobToFile",
    value: function blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
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
      return this.dataURLtoBlob(dataUrl);
    }
  }, {
    key: "getFile",
    value: function getFile(fileName) {
      var blob = this.getBlob();
      return this.blobToFile(blob, fileName);
    }
  }, {
    key: "destory",
    value: function destory() {
      this.canvas = null;
      this.image = null;
      this.ctx = null;
    }
  }]);

  return canvasImage;
}();

/* harmony default export */ var canvas = (canvasImage);
;// CONCATENATED MODULE: ./src/index.js


var image2canvas = function image2canvas(src, options) {
  var _canvas = new canvas(src);

  return _canvas.init(options);
};

/* harmony default export */ var src = (image2canvas);
module.exports.watermark = __webpack_exports__["default"];
/******/ })()
;