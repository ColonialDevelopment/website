/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

throw new Error("Module build failed: Error: Couldn't find preset \"stage-1\" relative to directory \"/home/ruchames/website/colonialsite\"\n    at /home/ruchames/website/colonialsite/node_modules/babel-core/lib/transformation/file/options/option-manager.js:292:19\n    at Array.map (native)\n    at OptionManager.resolvePresets (/home/ruchames/website/colonialsite/node_modules/babel-core/lib/transformation/file/options/option-manager.js:274:20)\n    at OptionManager.mergePresets (/home/ruchames/website/colonialsite/node_modules/babel-core/lib/transformation/file/options/option-manager.js:263:10)\n    at OptionManager.mergeOptions (/home/ruchames/website/colonialsite/node_modules/babel-core/lib/transformation/file/options/option-manager.js:248:14)\n    at OptionManager.init (/home/ruchames/website/colonialsite/node_modules/babel-core/lib/transformation/file/options/option-manager.js:367:12)\n    at File.initOptions (/home/ruchames/website/colonialsite/node_modules/babel-core/lib/transformation/file/index.js:216:65)\n    at new File (/home/ruchames/website/colonialsite/node_modules/babel-core/lib/transformation/file/index.js:139:24)\n    at Pipeline.transform (/home/ruchames/website/colonialsite/node_modules/babel-core/lib/transformation/pipeline.js:46:16)\n    at transpile (/home/ruchames/website/colonialsite/node_modules/babel-loader/lib/index.js:38:20)\n    at Object.module.exports (/home/ruchames/website/colonialsite/node_modules/babel-loader/lib/index.js:133:12)");

/***/ }
/******/ ]);