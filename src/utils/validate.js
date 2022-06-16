// 判断百分数
export const isPercent = function(string) {
    return typeof string === 'string' && string.includes('%')
}
export const validNum = function(value) {
    return !isNaN(parseFloat(value))
}
export const isObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}