import canvasImage from './canvas'
const watermark = function (src, options) {
    const _canvas = new canvasImage(src)
    return _canvas.init(options)
}
export default watermark