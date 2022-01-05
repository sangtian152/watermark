import { isPercent, validNum } from '@/utils/validate'
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