module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-console": 2, //不允许出现console语句
        "no-debugger": 2, //不允许出现debugger语句
        "no-multi-spaces": 2, //不允许出现多余的空格
        "max-len": 2, //一行最大长度，单位为字符
        "space-before-function-paren": 0,  // 函数定义时括号前面要不要有空格
        "no-func-assign": 2, // 禁止重复的函数声明
        "no-else-return": 1, // 如果if语句里面有return,后面不能跟else语句

    }
};