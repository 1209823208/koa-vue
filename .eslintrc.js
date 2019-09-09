module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true,
        "node": true,
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
        // 不需要
        "space-before-function-paren": 0,
        "eol-last": 0,
        "no-extra-semi": 0,
        "semi": 0,
        "eqeqeq": 0,
        "one-var": 0,
        "no-undef": 0,

        // 警告
        "no-extra-boolean-cast": 1,
        "no-extra-parens": 1,
        "no-empty": 1,
        "no-use-before-define": [1, "nofunc"],
        "complexity": [1, 10],
        "no-unused-vars": 1,

        // 错误
        "indent":2,
        "no-mixed-spaces-and-tabs":2,
        "no-console": 2, //不允许出现console语句
        "max-len":["error", { "code": 120 }], //一行最大长度，单位为字符
        "no-debugger": 2,
        "no-constant-condition": 2,
        "no-dupe-args": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty-character-class": 2,
        "no-invalid-regexp": 2,
        "no-func-assign": 2,
        "valid-typeof": 2,
        "no-unreachable": 2,
        "no-unexpected-multiline": 2,
        "no-sparse-arrays": 2,
        "no-shadow-restricted-names": 2,
        "no-cond-assign": 2,
        "no-native-reassign": 2,

        // 代码风格
        "no-else-return": 1,
        "no-multi-spaces": 1,
        "key-spacing": [1, {
        "beforeColon": false,
        "afterColon": true
        }],
        "block-scoped-var": 2,
        "consistent-return": 2,
        "accessor-pairs": 2,
        "dot-location": [2, "property"],
        "no-lone-blocks": 2,
        "no-labels": 2,
        "no-extend-native": 2,
        "no-floating-decimal": 2,
        "no-loop-func": 2,
        "no-new-func": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-throw-literal": 2,
        "no-return-assign": [2, "always"],
        "no-redeclare": [2, {
        "builtinGlobals": true
        }],
        "no-unused-expressions": [2, {
        "allowShortCircuit": true,
        "allowTernary": true
        }],
        "no-useless-call": 2,
        "no-useless-concat": 2,
        "no-void": 2,
        "no-with": 2,
        "space-infix-ops": 2,
        "valid-jsdoc": [2, {
        "requireParamDescription": true,
        "requireReturnDescription": true
        }],
        "no-warning-comments": [2, {
        "terms": ["todo", "fixme", "any other term"],
        "location": "anywhere"
        }],
        "curly": 1,

        // common js
        "no-duplicate-imports": 1,
    }
};