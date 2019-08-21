(function (modules) { // webpackBootstrap



    debugger

    // The module cache
    var installedModules = {};



    // script path function
    function jsonpScriptSrc(chunkId) {
                    // publicPath
        return __webpack_require__.p + "" + ({}[chunkId] || chunkId) + ".js"
    }

    // The require function
    function __webpack_require__(moduleId) {

        // Check if module is in cache
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }



    // 储存加载和正在加载chunks的对象
    // object to store loaded and loading chunks
    // undefined = chunk not loaded,     【第一种情况undefined 未加载】 falsy
    // null = chunk preloaded/prefetched 【第二种情况null  chunk preloaded/prefetched】 falsy
    // Promise = chunk loading,          【第三种情况Promise chunk正在加载】 falsy
    // 0 = chunk loaded                  【第四种情况0 chunk已经加载】 truthy
    var installedChunks = {
        "main": 0
    };


    // This file contains only the entry chunk. 翻译:main.js中只包含了entry chunk
    // The chunk loading function for additional chunks 翻译: webpack_require__.e 用来加载额外的chunk
                                            //requireEnsure 传入参数chunkId chunkId是0，1，2这样
    __webpack_require__.e = function requireEnsure(chunkId) {

        // 声明一个空数组 promises
        var promises = [];

        // JSONP chunk loading for javascript // 翻译:javascript JSONP chunk加载方法
        var installedChunkData = installedChunks[chunkId];
        
        // 当前installedChunkData是installedChunks[chunkId]

        if (installedChunkData !== 0) { // 0 means "already installed". 如果不是0 意味着未加载(undefined) 正在加载(Promise) preloaded(null)

            // a Promise means "currently loading".
            if (installedChunkData) { // 正在加载 truthy
                promises.push(installedChunkData[2]); // 正在加载的话 installedChunkData是一个数组，直接向promises里推入这个数组的第二个元素
            } else {
                // 否则

                // setup Promise in chunk cache
            // 创建了一个promise installedChunkData是一个数组,数组内存放了新promise的resolve和reject方法[]
                var promise = new Promise(function (resolve, reject) {
                    installedChunkData = installedChunks[chunkId] = [resolve, reject];
                });
                // installedChunkData[2] 赋值为 promise对象，  此时[resolve,reject,promise对象]
                //      promises数组推入的是promise对象  *因为赋值表达式返回的是赋的那个值
                promises.push(installedChunkData[2] = promise);
                

                // start chunk loading // 创建script标签
                var script = document.createElement('script');
                var onScriptComplete;

                script.charset = 'utf-8';
                script.timeout = 120;
                if (__webpack_require__.nc) {
                    script.setAttribute("nonce", __webpack_require__.nc);
                }
                
                // jsonpScriptSrc用来生成 标签的地址
                script.src = jsonpScriptSrc(chunkId);


                            // 翻译:在栈解旋前创建错误来方便调试
                // create error before stack unwound to get useful stacktrace later
                var error = new Error();

                onScriptComplete = function (event) {
                    
                    // avoid mem leaks in IE.
                    script.onerror = script.onload = null;

                    // 清除timer
                    clearTimeout(timeout);

                    var chunk = installedChunks[chunkId]; // [resolve,reject,promise]
                    
                    if (chunk !== 0) { // 如果不是0

                        if (chunk) { //还是truthy 说明还在加载，有问题了
                                        // type:'timeout' target:是script标签Node
                            var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                            var realSrc = event && event.target && event.target.src;
                            error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                            error.name = 'ChunkLoadError';
                            error.type = errorType;
                            error.request = realSrc;
                            chunk[1](error); // reject Error
                            // 抛出错误
                        }
                        installedChunks[chunkId] = undefined; // installedChunks对象中这个为undefined 即：未加载
                    }
                };

                //2分钟
                var timeout = setTimeout(function () {
                    onScriptComplete({ type: 'timeout', target: script });
                }, 12000000);
                // }, 120000);

                // script的onerror和onload属性都是onScriptCoplete函数  
                // 如果script标签成功加载解析，那么在解析完触发onload事件的时候的时候会执行
                // 如果出error了也会执行
                // 如果超过2分钟了也会执行
                script.onerror = script.onload = onScriptComplete;
                // 在head里面append script标签
                document.head.appendChild(script);
            }
        }

        // Promise.all 对数组操作 

        /* MDN:
        The Promise.all() method returns a single Promise that resolves 
        when all of the promises passed as an iterable have resolved 
        or when the iterable contains no promises.
         It rejects with the reason of the first promise that rejects.
        */

        return Promise.all(promises);
    };

    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, { enumerable: true, get: getter });
        }
    };

    // define __esModule on exports
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        }
        Object.defineProperty(exports, '__esModule', { value: true });
    };

    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
        return ns;
    };

    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ?
            function getDefault() { return module['default']; } :
            function getModuleExports() { return module; };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };

    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

    // __webpack_public_path__
    __webpack_require__.p = "";

    // on error function for async loading
    __webpack_require__.oe = function (err) { console.error(err); throw err; };








    
    // install a JSONP callback for chunk loading
    function webpackJsonpCallback(data) {
        var chunkIds = data[0];
        var moreModules = data[1];


        // add "moreModules" to the modules object,
        // then flag all "chunkIds" as loaded and fire callback
        var moduleId, chunkId, i = 0, resolves = [];
        for (; i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
                resolves.push(installedChunks[chunkId][0]);
            }
            installedChunks[chunkId] = 0;
        }
        for (moduleId in moreModules) {
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                modules[moduleId] = moreModules[moduleId];
            }
        }
        if (parentJsonpFunction) parentJsonpFunction(data);

        while (resolves.length) {
            resolves.shift()();
        }

    };





    /**
     * 创建webpackJsonp数组，如果有旧用那个数组
     * 将数组的push方法改成webpackJsonpcallback
     * 遍历数组，对数组中每个元素进行webpackJsonpCallback处理
     * 
     */

    // 在window下创建webpackJsonp数组 在函数作用域内创建jsonpArray变量指向window.webpackJsonp
    var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];

    // 保存旧的数组的push方法，命名为oldJsonpFunction 使用:oldJsonpFunction(data)
    var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);

    // jsonpArray的push方法 是 webpackJsonpCallback
    jsonpArray.push = webpackJsonpCallback;

    // 本地的jsonpArray 是jsonpArray移除push方法
    jsonpArray = jsonpArray.slice();

    // i=0;i<jsonpArray的长度 对jsonpArray中的元素进行 webpackJsonpCallback处理
    for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);

    // preantJsonpFunction 指向 oldJsonpFunction  指向的是window下面的
    var parentJsonpFunction = oldJsonpFunction;


    // Load entry module and return exports
    // 从入口开始执行
    return __webpack_require__(__webpack_require__.s = "./src/index.js");






})
    ({
        "./src/index.js":
            (function (module, exports, __webpack_require__) {
                eval("new Promise(resolve => {\n  __webpack_require__.e(/*! require.ensure */ 2).then((require => {\n    resolve(__webpack_require__(/*! ./show.js */ \"./src/show.js\"));\n  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n}).then(show => {\n  show('asd');\n});\nnew Promise(resolve => {\n  __webpack_require__.e(/*! require.ensure */ 0).then((require => {\n    resolve(__webpack_require__(/*! ./sb.js */ \"./src/sb.js\"));\n  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n}).then(sb => {\n  sb('aasdasf');\n});\n\n//# sourceURL=webpack:///./src/index.js?");
            })
    });