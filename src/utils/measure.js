import { isPercent, validNum } from '@/utils/validate'
// 计算水印的偏移
export function getTranslate(mark, translate) {
  if(!translate) {
    return { translateX: 0, translateY: 0 }
  }
  const { width, height } = mark;
  let _translate
  if(Array.isArray(translate)) {
    _translate = translate
  } else if(typeof translate === 'string') {
    _translate = translate.trim()
    _translate = _translate.replace(/\s+/g,',')
    _translate = _translate.replace(/,+/g,',')
    _translate = _translate.split(',')
  }
  let translateX = _translate[0] || 0
  let translateY = _translate[1] || translateX
  if(validNum(translateX)) {
    translateX = isPercent(translateX) ? parseFloat(translateX) / 100 * width : parseFloat(translateX)
  } else {
    translateX = 0
  }
  if(validNum(translateY)) {
    translateY = isPercent(translateY) ? parseFloat(translateY) / 100 * height : parseFloat(translateY)
  } else {
    translateY = 0
  }
  return { translateX, translateY }
}
// 计算水印位置
export function getPosition(mark, options) {
  const { width, height, position } = options;
  const { top, right, bottom, left } = position
  let x = 0;
  let y = 0;
  if(validNum(top)) {
    y = isPercent(top) ? parseFloat(top) / 100 * height : parseFloat(top)
  } else if (validNum(bottom)) {
    const toBottom = isPercent(bottom) ? parseFloat(bottom) / 100 * height : parseFloat(bottom)
    y = height - toBottom - mark.height
  }
  if(validNum(left)) {
      x = isPercent(left) ? parseFloat(left) / 100 * width : parseFloat(left)
  } else if(validNum(right)) {
    const toRight = isPercent(right) ? parseFloat(right) / 100 * width : parseFloat(right)
    x = width - toRight - mark.width
  }
  return { x, y }
}
// 计算水印之间间隔
export function getSpacing(size, spacing) {
  if(!validNum(spacing)) {
    return size
  }
  if(isPercent(spacing)) {
    return size + parseFloat(spacing) / 100 * size
  } else {
    return size + parseFloat(spacing)
  }
}
// 转换边距
export function transferPadding(padding = '0'){
  const arr = Array.isArray(padding) ? padding : padding.split(',');
  const pad = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
  }
  if(Array.isArray(arr) && arr.length > 0) {
      pad.top = arr[0]
      pad.right = arr[1] || pad.top
      pad.bottom = arr[2] || pad.top
      pad.left = arr[3] || pad.right
  }
  return pad
}
// 将边距百分比、像素等统一转换成像素距离
export function pad2distance(size, pad) {
  if(isPercent(pad)) {
    return parseFloat(pad) / 100 * size
  } else {
    return parseFloat(pad)
  }
}