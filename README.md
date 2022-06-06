# watermark

## 介绍
图片加水印，支持文字水印、图片水印，支持多行

### 安装
```
npm install @sangtian152/watermark --save
# or 
yarn add @sangtian152/watermark
```

### 使用
```
import watermark from '@sangtian152/watermark';

const can = new watermark(url, options);
can.addText('文字水印', {repeat: true, lineSpacing: 146, markSpacing: '50%' })
can.addText('测试水印居中', {repeat: false, fontSize: 36, position: {right: '50%', bottom:  '50%'}, translate: '50%,50%'})
can.addImage(mark, {repeat: true, markHeight: 26, lineSpacing: 146, start: 36})
can.draw(function() {
    console.log('水印设置成功')
    const img = can.getBase64()
})
```

### 参数

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url   | 要添加水印的图片地址   | String     |  —   |   —   |
| options   | 全局配置参数，详见options   | Object  |  —   |  —   |


### 方法

| 名称      | 说明    | 参数      |
|---------- |-------- |---------- |
| addText   | 添加文字水印   | text, options（当前水印配置参数）  |
| addImage   | 添加图片水印   | url, options（当前水印配置参数）  |
| draw   | 绘制图片，在addText/addImage之后调用   | callback:Function  |
| getBase64   | 获取图片base64地址，需在draw方法的回调函数内调用  | ——  |
| getBlob   | 获取Blob对象，需在draw方法的回调函数内调用   | ——  |
| getFile   | 获取File对象，需在draw方法的回调函数内调用   | ——  |

### options

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| clip   | 添加水印区域，如：{type: 'rect', padding: '10%'}，type形状，可选值rect和circle，padding边距（参考css中padding用法），接受数组或逗号（,）隔开的字符串，支持百分数和数字  | Object        |  —   |   —   |
| defineClip   | 自定义水印区域，参数为canvas的context对象，支持调用canvas原生方法，绘制任意形状水印区域   | Function        |  —   |   —   |
| fontSize   | 文字水印字体大小   | Number        |  —   |   26   |
| fillStyle   | 文字水印字体颜色   | String  |  —   |  #ffffff   |
| globalAlpha   | 水印透明度   | Number  |  0-1之间小数   |  0.2   |
| position   | 水印位置   | Object  |  —   |  {left: 10, top: 10}   |
| crossOrigin   | 是否开启跨域（需后端支持）   | Boolean  |  —   |  false  |
| translate   | 水印根据给定的参数，从当前元素位置移动   | String/Array  |  —   |  0   |
| repeat   | 水印是否重复   | Boolean  |  —   |  false  |
| rotate   | 水印旋转角度，repeat为true时有效  | Number  |  —   |  -45   |
| start   | 水印起始位置，repeat为true时有效   | Number  |  —   |  0   |
| markSpacing   | 两个相邻水印间隔，repeat为true时有效  | Number/String  |  —   |  50%   |
| lineSpacing   | 两行相邻水印间隔，repeat为true时有效   | Number/String  |  —   |  60   |


### 最新版本

[![NPM version](https://img.shields.io/npm/v/@sangtian152/watermark)](https://www.npmjs.com/package/@sangtian152/watermark)