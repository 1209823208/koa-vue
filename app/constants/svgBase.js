var config = require('../../config');
var fontList = require('./fontList');

let baseUrl = `http://127.0.0.1:${config.port}/`;
let strFontFace = fontList.map(item => {
    return `@font-face{
        font-family: ${item.title}; src:url(${encodeURI(baseUrl + item.path)}) format("${item.format||'woff'}");
    }`;
}).join("\n");

module.exports = baseHead = 
`<style>
body{margin:0;}
${strFontFace}
</style>`;