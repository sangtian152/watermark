import canvasImage from './canvas'
const image2canvas = function (src, options) {
    const _canvas = new canvasImage(src)
    return _canvas.init(options)
}
export default image2canvas