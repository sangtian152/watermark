class canvasImage {
  constructor(url) {
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
      position: { top: 10, left: 10 },
      markSpacing: '50%',
      lineSpacing: 60
    };
  }
  init(options) {
    this.options = Object.assign(this.options, options);
    return new Promise((resolve, reject) => {
      this.image = new Image();
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
        resolve(this);
      });
      this.image.src = this.url;
    });
  }
  isPercent(string) {
    return typeof string === 'string' && top.includes('%')
  }
  valid(value) {
    return typeof value === 'string' || (typeof value === 'number' && !isNaN(value))
  }
  getPosition(mark, options) {
    const { width, height, position } = options;
    const { top, right, bottom, left } = position
    let x = 0;
    let y = 0;
    if(this.valid(top)) {
      if(this.isPercent(top)) {
        y = parseInt(top) / 100 * height
      } else {
        y = parseInt(top)
      }
    } else if (this.valid(bottom)) {
      if(this.isPercent(bottom)) {
        y = height - parseInt(bottom) / 100 * height - mark.height
      } else {
        y = height - parseInt(bottom) - mark.height
      }
    }
    if(this.valid(left)) {
      if(this.isPercent(left)) {
        x = parseInt(left) / 100 * width
      } else {
        x = parseInt(left)
      }
    } else if(this.valid(right)) {
      if(this.isPercent(right)) {
        x = width - parseInt(right) / 100 * width - mark.width
      } else {
        x = width - parseInt(right) - mark.width
      }
    }
    return { x, y }
  }
  measureSpacing(size, spacing) {
    if(!this.valid(spacing)) {
      return size
    }
    if(typeof spacing === 'string' && spacing.includes('%')) {
      return size + parseInt(spacing) / 100 * size
    } else {
      return size + parseInt(spacing)
    }
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
  // 绘制文字水印
  drawText(mark, options) {
    const { ctx } = this
    const opt = Object.assign({}, this.options, options);
    const {
      fontSize,
      fillStyle,
      globalAlpha,
      repeat,
      markSpacing,
      lineSpacing
    } = opt;
    ctx.fillStyle = fillStyle;
    ctx.font = fontSize + "px 黑体";
    ctx.globalAlpha = globalAlpha;
    const textSize = ctx.measureText(mark)
    const textWidth = textSize.width
    if (!repeat) {
      // 填充文字，x 间距, y 间距
      const { x, y } = this.getPosition({width: textWidth, height: fontSize}, opt)
      ctx.fillText(mark, x, fontSize + y);
      return;
    }
    
    const moveY = this.measureSpacing(fontSize, lineSpacing);
    const moveX = this.measureSpacing(textWidth, markSpacing);
    this.repeat({moveX, moveY}, opt, function(x, y){
      // 填充文字，x 间距, y 间距
      ctx.fillText(mark, x, y);
    })
  }
  // 添加图片水印
  drawImage(mark, options) {
    const _this = this
    const { ctx } = this
    const opt = Object.assign({}, this.options, options);
    const {
      width,
      globalAlpha,
      repeat,
      lineSpacing,
      markSpacing
    } = opt;
    return new Promise((resolve, reject)=>{
        const markImg = new Image();
        markImg.onload = function () {
            const _width = Math.min(markImg.width, width / 3);
            const _height = (markImg.height * _width) / markImg.width;
            /*
            双重遍历，
            当 宽度小于页面宽度时，
            当 高度小于页面高度时，
            这里的宽高可以适当写大，目的是为了让水印铺满
            */
            ctx.globalAlpha = globalAlpha;
            if (!repeat) {
                const { x, y } = _this.getPosition({width: _width, height: _height}, opt)
                // 填充文字，x 间距, y 间距
                ctx.drawImage(markImg, x, y, _width, _height);
                resolve(_this)
                return;
            }
            const moveY = _this.measureSpacing(_height, lineSpacing);
            const moveX = _this.measureSpacing(_width, markSpacing);

            _this.repeat({moveX, moveY}, opt, function(x, y){
              // 填充文字，x 间距, y 间距
              ctx.drawImage(markImg, x, y, _width, _height);
            })
            resolve(_this)
        };
        markImg.src = mark;
    })
    
  }
  // 将base64转换为blob
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  // 将blob转换为file
  blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  getBase64() {
    return this.canvas.toDataURL("image/jpeg", this.options.quality); // 压缩图片
  }

  getBlob() {
    const dataUrl = this.getBase64()
    return this.dataURLtoBlob(dataUrl)
  }

  getFile(fileName) {
    const blob = this.getBlob()
    return this.blobToFile(blob, fileName)
  }

  destory() {
    this.canvas = null;
    this.image = null;
    this.ctx = null;
  }
}

export default canvasImage;
