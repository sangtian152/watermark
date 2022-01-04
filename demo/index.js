import image2canvas from 'src/index'
import canvasImage from '../src/canvas';
const src = require('src/static/demo.jpg').default
const mark = require('src/static/mark.png').default
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}
window.onload = function() {
    document.getElementById('old').src = src
}
document.getElementById('create').onclick = function(){
    const ele = document.getElementById('img')
    // ele.src=src
    // const src = require('src/static/demo.jpg')
    image2canvas(src, {fontSize: 26, fillStyle: '#fff', globalAlpha: 0.5}).then(async canvas => {
        // canvas.drawText('水印', {repeat: true, lineSpacing: 146, markSpacing: '200%' })
        // canvas.drawText('测试水印', {repeat: false, position: {right: 10, bottom: 10}})
        await canvas.drawImage(mark, {repeat: false, position: {right: 10, bottom: 10}})
        ele.src = canvas.getBase64()
    })
}
const g = gen();
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())