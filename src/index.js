import { validNum } from '@/utils/validate'
import { getTranslate, getPosition, getSpacing } from '@/utils/measure'
import { dataURLtoBlob, blobToFile } from '@/utils/file'
import EventQueue from '@/utils/eventQueue'
const eventQueue = new EventQueue()
class watermark {
  constructor(url, options) {
    this.canvas = null;
    this.image = null;
    this.ctx = null;
    this.url = url;
    this.waiting = false
    this.loading = true
    this.options = {
      start: 0,
      quality: 0.6,
      fontSize: 16,
      fillStyle: "#fff",
      globalAlpha: 0.2,
      rotate: -45,
      repeat: false,
      position: { top: 10, left: 10 },
      translate: 0,
      crossOrigin: false,
      markSpacing: '50%',
      lineSpacing: 60
    };
    this.init(options)
  }
  init(options) {
    this.options = Object.assign(this.options, options);
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.crossOrigin = this.crossOrigin
      this.image.addEventListener("load", () => {
        const { image } = this;
        let imgWidht = image.naturalWidth;
        let imgHeight = image.naturalHeight;
        this.options.width = this.options.width || imgWidht;
        this.options.height = this.options.height || imgHeight;
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("id", "__compress__");
        this.canvas.width = imgWidht;
        this.canvas.height = imgHeight;
        this.canvas.style.visibility = "hidden";
        this.ctx = this.canvas.getContext("2d");
        this.ctx.clearRect(0, 0, imgWidht, imgHeight);
        this.ctx.drawImage(image, 0, 0, imgWidht, imgHeight); // 渲染图片
        this.loading = false
        if(this.waiting) {
          this.run()
        }
        resolve(this);
      });
      this.image.src = this.url;
    });
  }
  
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
  addText(...arg) {
    eventQueue.add(this.drawText.bind(this), arg)
  }
  addImage(...arg) {
    eventQueue.add(this.drawImage.bind(this), arg)
  }
  draw(cb) {
    eventQueue.end = cb
    this.waiting = true
    this.run()
  }
  run() {
    if(!this.loading) {
      this.waiting = false
      eventQueue.start()
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
      eventQueue.next()
      return;
    }
    opt.start = opt.start + fontSize
    const moveY = getSpacing(fontSize, lineSpacing);
    const moveX = getSpacing(textWidth, markSpacing);
    this.repeat({moveX, moveY}, opt, function(x, y){
      // 填充文字，x 间距, y 间距
      ctx.fillText(mark, x, y);
    })
    eventQueue.next()
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
                const { x, y } = _getPosition({width: _width, height: _height}, opt)
                const { translateX, translateY } = getTranslate({width: _width, height: _height}, opt.translate)
                // 填充文字，x 间距, y 间距
                ctx.drawImage(markImg, x + translateX, y + translateY, _width, _height);
                resolve(_this)
                eventQueue.next()
                return;
            }
            const moveY = getSpacing(_height, lineSpacing);
            const moveX = getSpacing(_width, markSpacing);

            _this.repeat({moveX, moveY}, opt, function(x, y){
              // 填充文字，x 间距, y 间距
              ctx.drawImage(markImg, x, y, _width, _height);
            })
            resolve(_this)
            eventQueue.next()
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
    eventQueue = null
  }
}

export default watermark;
