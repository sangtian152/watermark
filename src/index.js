import { validNum, isObject } from '@/utils/validate'
import { getTranslate, getPosition, getSpacing, transferPadding, pad2distance } from '@/utils/measure'
import { dataURLtoBlob, blobToFile } from '@/utils/file'
import EventQueue from '@/utils/eventQueue'
class watermark {
  constructor(url, options) {
    // 时间队列
    this.eventQueue = new EventQueue()
    this.canvas = null;
    this.image = null;
    this.ctx = null;
    // 待添加水印图片地址
    this.url = url;
    // 添加水印执行状态
    this.waiting = false
    // 待添加水印图片加载
    this.loading = true
    // 默认参数
    this.options = {
      start: 0,
      quality: 0.6, // 生成图片质量
      fontSize: 16, // 文字水印字号
      fillStyle: "#fff", // 文字水印颜色
      globalAlpha: 0.2, // 水印透明度
      rotate: -45,  // 水印旋转角度
      repeat: false,  // 水印是否重复
      clip: null,  // 设置添加水印的区域，接受对象，含shape（形状）, padding（边距）
      defineClip: null, // 自定义添加水印的区域的方法
      position: { top: 10, left: 10 }, // 水印位置
      translate: 0, // 水印偏移
      crossOrigin: false, // 是否跨域
      markSpacing: '50%', // 水印间距
      lineSpacing: 60 // 水印行间距
    };
    this.init(options)
  }
  init(opt) {
    this.options = Object.assign(this.options, opt);
    const { options } = this;
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.crossOrigin = this.crossOrigin
      this.image.addEventListener("load", () => {
        const { image } = this;
        let imgWidht = image.naturalWidth;
        let imgHeight = image.naturalHeight;
        options.width = options.width || imgWidht;
        options.height = options.height || imgHeight;
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "__compress__");
        this.canvas.width = imgWidht;
        this.canvas.height = imgHeight;
        this.canvas.style.visibility = "hidden";
        this.ctx = this.canvas.getContext("2d");
        this.ctx.clearRect(0, 0, imgWidht, imgHeight);
        this.ctx.drawImage(image, 0, 0, imgWidht, imgHeight); // 渲染图片
        // 规定一个区域内添加水印
        const { clip, defineClip } = options;
        if (typeof defineClip === 'function') {
          defineClip(this.ctx);
          this.ctx.clip();
        } else if(isObject(clip)) {
          const { shape = 'rect', padding } = clip;
          const pad = transferPadding(padding);
          const tp = pad2distance(imgHeight, pad.top);
          const rt = pad2distance(imgWidht, pad.right);
          const bt = pad2distance(imgHeight, pad.bottom);
          const lf = pad2distance(imgWidht, pad.left);
          const w = imgWidht - lf - rt;
          const h = imgHeight - tp - bt;
          if (shape === 'rect') {
            this.ctx.rect(lf, tp, w, h);
          } else if (shape === 'circle') {
            const r = Math.min(w, h) / 2;
            this.ctx.arc(lf + r, tp + r, r, 0, Math.PI * 2, false);
          }
          this.ctx.clip();
        }
        this.loading = false
        if(this.waiting) {
          this.run()
        }
        resolve(this);
      });
      this.image.src = this.url;
    });
  }
  // 重复添加水印
  repeat({moveX, moveY}, opt, cb) {
    const { width, height, rotate, start } = opt;
    this.ctx.rotate((rotate * Math.PI) / 180); // 水印初始偏转角度
    for (let i = height * 0.65 * -1; i < width; i += moveX) {
      for (let j = start; j < height * 2; j += moveY) {
        cb(i, j)
      }
    }
    this.ctx.rotate(-(rotate * Math.PI) / 180); // 水印初始偏转角度
  }
  // 添加文字水印事件到事件队列中
  addText(...arg) {
    this.eventQueue.add(this.drawText.bind(this), arg)
  }
  // 添加图片水印事件到事件队列中
  addImage(...arg) {
    this.eventQueue.add(this.drawImage.bind(this), arg)
  }
  // 开始执行绘制水印
  draw(cb) {
    this.eventQueue.end = cb
    this.waiting = true
    this.run()
  }
  // 运行事件队列
  run() {
    if(!this.loading) {
      this.waiting = false
      this.eventQueue.start()
    }
  }
  // 绘制文字水印
  drawText(mark, options) {
    const opt = Object.assign({}, this.options, options);
    const {
      fontSize,
      fillStyle,
      globalAlpha,
      repeat,
      markSpacing,
      lineSpacing
    } = opt;
    const { ctx } = this
    ctx.fillStyle = fillStyle;
    ctx.font = fontSize + "px 黑体";
    ctx.globalAlpha = globalAlpha;
    const textSize = ctx.measureText(mark)
    const textWidth = textSize.width
    if (!repeat) {
      // 填充文字，x 间距, y 间距
      const { x, y } = getPosition({width: textWidth, height: fontSize}, opt)
      const { translateX, translateY } = getTranslate({width: textWidth, height: fontSize}, opt.translate)
      ctx.fillText(mark, x + translateX, fontSize + y + translateY);
      this.eventQueue.next()
      return;
    }
    opt.start = opt.start + fontSize
    const moveY = getSpacing(fontSize, lineSpacing);
    const moveX = getSpacing(textWidth, markSpacing);
    this.repeat({moveX, moveY}, opt, function(x, y){
      // 填充文字，x 间距, y 间距
      ctx.fillText(mark, x, y);
    })
    this.eventQueue.next()
  }
  // 添加图片水印
  drawImage(mark, options) {
    const _this = this
    const { ctx } = this
    const opt = Object.assign({}, this.options, options);
    const {
      width,
      markWidth,
      markHeight,
      globalAlpha,
      repeat,
      lineSpacing,
      markSpacing
    } = opt;
    return new Promise((resolve, reject)=>{
        const markImg = new Image();
        markImg.crossOrigin = opt.crossOrigin
        markImg.onload = function () {
            let _width = validNum(markWidth) ? parseFloat(markWidth) : Math.min(markImg.width, width / 3);
            let _height = validNum(markHeight) ? parseFloat(markHeight) : (markImg.height * _width) / markImg.width;
            if(validNum(markHeight) && !validNum(markWidth)) {
              _width = (markImg.width * _height) / markImg.height;
            }
            ctx.globalAlpha = globalAlpha;
            if (!repeat) {
                const { x, y } = getPosition({width: _width, height: _height}, opt)
                const { translateX, translateY } = getTranslate({width: _width, height: _height}, opt.translate)
                // 填充文字，x 间距, y 间距
                ctx.drawImage(markImg, x + translateX, y + translateY, _width, _height);
                resolve(_this)
                _this.eventQueue.next()
                return;
            }
            const moveY = getSpacing(_height, lineSpacing);
            const moveX = getSpacing(_width, markSpacing);

            _this.repeat({moveX, moveY}, opt, function(x, y){
              // 填充文字，x 间距, y 间距
              ctx.drawImage(markImg, x, y, _width, _height);
            })
            resolve(_this)
            _this.eventQueue.next()
        };
        markImg.src = mark;
    })
    
  }

  getBase64() {
    return this.canvas.toDataURL("image/jpeg", this.options.quality); // 压缩图片
  }

  getBlob() {
    const dataUrl = this.getBase64()
    return dataURLtoBlob(dataUrl)
  }

  getFile(fileName) {
    const blob = this.getBlob()
    return blobToFile(blob, fileName)
  }

  destory() {
    this.canvas = null;
    this.image = null;
    this.ctx = null;
    this.eventQueue = null
  }
}

export default watermark;
