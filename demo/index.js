import watermark from 'src/index'
const src = require('src/static/demo.jpg').default
const mark = require('src/static/mark.png').default

window.onload = function() {
    document.getElementById('old').src = src
}
document.getElementById('create').onclick = function(){
    const ele = document.getElementById('img')
    const can = new watermark(src, {
      quality: '1',
      fontSize: 26,
      fillStyle: '#fff',
      globalAlpha: 0.5,
      clip: {
        shape: 'rect',
        // padding: '10,50'
      }
    })
    can.addText('文字水印', {repeat: true, lineSpacing: 146, markSpacing: '50%' })
    can.addText('测试水印居中', {repeat: false, fontSize: 36, position: {right: '50%', bottom:  '50%'}, translate: '50%,50%'})
    can.addImage(mark, {repeat: false, markHeight: 26, lineSpacing: 146, start: 36})
    can.draw(function() {
      console.log('canvas.draw')
      ele.src = can.getBase64()
    })
}
// const g = gen();
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())