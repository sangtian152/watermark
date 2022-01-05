export const isPercent = function(string) {
    return typeof string === 'string' && string.includes('%')
}
export const validNum = function(value) {
    return !isNaN(parseFloat(value))
}