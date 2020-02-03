
    (function(graph){

        function require(module){

function localRequire(relativePath){
            return require(graph[module].dependencies[relativePath])
           }    // 保证第二次执行require引入模块的路径被改变掉
           var exports = {}; //闭包前面要加分号

    (function (require,exports,code){        
                eval(code)   //localRequire就是代码执行中的require
            })(localRequire,exports,graph[module].code)

            return exports  //用于在模块中导出数据
        }


       require('./src/index.js') 

    })({"./src/index.js":{"dependencies":{"./message":"./src/message.js"},"code":"\"use strict\";\n\nvar _message = _interopRequireDefault(require(\"./message\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_message[\"default\"]);"},"./src/message.js":{"dependencies":{"./word":"./src/word.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _word = _interopRequireDefault(require(\"./word\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar say = \"say \".concat(_word[\"default\"]);\nvar _default = say;\nexports[\"default\"] = _default;"},"./src/word.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = 'hello';\nexports[\"default\"] = _default;"}}) 

    