/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var MorseQuest;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/MapEditor.ts":
/*!**************************!*\
  !*** ./src/MapEditor.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MapEditor = void 0;\nvar Engine_1 = __webpack_require__(/*! ./core/Engine */ \"./src/core/Engine.ts\");\nvar EngineGraphics_1 = __webpack_require__(/*! ./core/EngineGraphics */ \"./src/core/EngineGraphics.ts\");\nvar EditionSpace_1 = __webpack_require__(/*! ./mapeditor/EditionSpace */ \"./src/mapeditor/EditionSpace.ts\");\nvar SideMenus_1 = __webpack_require__(/*! ./mapeditor/SideMenus */ \"./src/mapeditor/SideMenus.ts\");\nvar MapEditor = /** @class */ (function (_super) {\n    __extends(MapEditor, _super);\n    function MapEditor(canvasid) {\n        if (canvasid === void 0) { canvasid = 'mapeditor'; }\n        return _super.call(this, canvasid) || this;\n    }\n    MapEditor.prototype.initCanvas = function (canvasid) {\n        if (!_super.prototype.initCanvas.call(this, canvasid))\n            return false;\n        var frontierX = EngineGraphics_1.EngineGraphics.canvas.width * 4 / 5;\n        this.sideMenus = new SideMenus_1.SideMenus(frontierX);\n        this.editionSpace = new EditionSpace_1.EditionSpace(frontierX);\n        this.engineObjects.push(this.sideMenus);\n        this.engineObjects.push(this.editionSpace);\n        return true;\n    };\n    MapEditor.prototype.onLoop = function () {\n        // TODO\n    };\n    MapEditor.prototype.resize = function () {\n        _super.prototype.resize.call(this);\n        this.updateFrontier();\n    };\n    MapEditor.prototype.updateFrontier = function () {\n        var frontierX = EngineGraphics_1.EngineGraphics.canvas.width * 4 / 5;\n        if (this.sideMenus)\n            this.sideMenus.updateStartX(frontierX);\n        if (this.editionSpace)\n            this.editionSpace.endX = frontierX;\n    };\n    return MapEditor;\n}(Engine_1.Engine));\nexports.MapEditor = MapEditor;\n\n\n//# sourceURL=webpack://MorseQuest/./src/MapEditor.ts?");

/***/ }),

/***/ "./src/core/Engine.ts":
/*!****************************!*\
  !*** ./src/core/Engine.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Engine = void 0;\nvar EngineGraphics_1 = __webpack_require__(/*! ./EngineGraphics */ \"./src/core/EngineGraphics.ts\");\nvar EngineController_1 = __webpack_require__(/*! ./EngineController */ \"./src/core/EngineController.ts\");\nvar Engine = /** @class */ (function () {\n    function Engine(canvasid) {\n        if (!this.initCanvas(canvasid))\n            return;\n        this.loop();\n    }\n    Engine.prototype.initCanvas = function (canvasid) {\n        var _this = this;\n        EngineGraphics_1.EngineGraphics.canvas = document.getElementById(canvasid);\n        if (!EngineGraphics_1.EngineGraphics.canvas) {\n            console.log('canvas no found');\n            return false;\n        }\n        window.addEventListener('resize', function () { _this.resize(); }, false);\n        window.addEventListener('keydown', function (e) { _this.keyPressed(e); });\n        window.addEventListener('mousemove', function (e) { _this.mouseMove(e); });\n        EngineGraphics_1.EngineGraphics.canvas.addEventListener('mousedown', function (e) { _this.mousePressed(e); });\n        EngineGraphics_1.EngineGraphics.ctx = EngineGraphics_1.EngineGraphics.canvas.getContext(\"2d\");\n        if (!EngineGraphics_1.EngineGraphics.ctx) {\n            console.log('2d context setup error');\n            return false;\n        }\n        EngineGraphics_1.EngineGraphics.canvas.width = EngineGraphics_1.EngineGraphics.canvas.parentElement.clientWidth;\n        EngineGraphics_1.EngineGraphics.canvas.height = EngineGraphics_1.EngineGraphics.canvas.parentElement.clientHeight;\n        this.engineObjects = [];\n        return true;\n    };\n    Engine.prototype.loop = function () {\n        var _this = this;\n        EngineGraphics_1.EngineGraphics.ctx.clearRect(0, 0, EngineGraphics_1.EngineGraphics.canvas.width, EngineGraphics_1.EngineGraphics.canvas.height);\n        // background test\n        EngineGraphics_1.EngineGraphics.ctx.fillStyle = '#111';\n        EngineGraphics_1.EngineGraphics.ctx.fillRect(0, 0, EngineGraphics_1.EngineGraphics.canvas.width, EngineGraphics_1.EngineGraphics.canvas.height);\n        for (var _i = 0, _a = this.engineObjects; _i < _a.length; _i++) {\n            var obj = _a[_i];\n            obj.display();\n        }\n        this.onLoop();\n        requestAnimationFrame(function () { _this.loop(); });\n    };\n    Engine.prototype.resize = function () {\n        EngineGraphics_1.EngineGraphics.canvas.width = EngineGraphics_1.EngineGraphics.canvas.parentElement.clientWidth;\n        EngineGraphics_1.EngineGraphics.canvas.height = EngineGraphics_1.EngineGraphics.canvas.parentElement.clientHeight;\n        for (var _i = 0, _a = this.engineObjects; _i < _a.length; _i++) {\n            var obj = _a[_i];\n            obj.resize();\n        }\n    };\n    Engine.prototype.keyPressed = function (e) {\n        for (var _i = 0, _a = this.engineObjects; _i < _a.length; _i++) {\n            var obj = _a[_i];\n            obj.keyPressed(EngineController_1.EngineController.KeyMapping[e.key]);\n        }\n    };\n    Engine.prototype.mousePressed = function (e) {\n        var rect = EngineGraphics_1.EngineGraphics.canvas.getBoundingClientRect();\n        var x = e.clientX - rect.left;\n        var y = e.clientY - rect.top;\n        for (var _i = 0, _a = this.engineObjects; _i < _a.length; _i++) {\n            var obj = _a[_i];\n            // obj.mousePressed(e.offsetX, e.offsetY);\n            obj.mousePressed(x, y);\n        }\n    };\n    Engine.prototype.mouseMove = function (e) {\n        var rect = EngineGraphics_1.EngineGraphics.canvas.getBoundingClientRect();\n        EngineController_1.EngineController.mouseX = e.clientX - rect.left;\n        EngineController_1.EngineController.mouseY = e.clientY - rect.top;\n    };\n    return Engine;\n}());\nexports.Engine = Engine;\n\n\n//# sourceURL=webpack://MorseQuest/./src/core/Engine.ts?");

/***/ }),

/***/ "./src/core/EngineController.ts":
/*!**************************************!*\
  !*** ./src/core/EngineController.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EngineController = void 0;\nvar EngineController = /** @class */ (function () {\n    function EngineController() {\n    }\n    EngineController.KEY_UP = 1;\n    EngineController.KEY_DOWN = 2;\n    EngineController.KEY_LEFT = 3;\n    EngineController.KEY_RIGHT = 4;\n    EngineController.KeyMapping = {\n        'z': EngineController.KEY_UP,\n        's': EngineController.KEY_DOWN,\n        'q': EngineController.KEY_LEFT,\n        'd': EngineController.KEY_RIGHT,\n        'ArrowUp': EngineController.KEY_UP,\n        'ArrowDown': EngineController.KEY_DOWN,\n        'ArrowLeft': EngineController.KEY_LEFT,\n        'ArrowRight': EngineController.KEY_RIGHT,\n    };\n    EngineController.mousePressed = false;\n    return EngineController;\n}());\nexports.EngineController = EngineController;\n\n\n//# sourceURL=webpack://MorseQuest/./src/core/EngineController.ts?");

/***/ }),

/***/ "./src/core/EngineGraphics.ts":
/*!************************************!*\
  !*** ./src/core/EngineGraphics.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EngineGraphics = void 0;\nvar EngineGraphics = /** @class */ (function () {\n    function EngineGraphics() {\n    }\n    EngineGraphics.FONT = \"luminari\";\n    return EngineGraphics;\n}());\nexports.EngineGraphics = EngineGraphics;\n\n\n//# sourceURL=webpack://MorseQuest/./src/core/EngineGraphics.ts?");

/***/ }),

/***/ "./src/core/EngineObject.ts":
/*!**********************************!*\
  !*** ./src/core/EngineObject.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EngineObject = void 0;\nvar EngineObject = /** @class */ (function () {\n    function EngineObject() {\n        this.init();\n    }\n    /**\n     * At end of EngineObject constructor\n     */\n    EngineObject.prototype.init = function () { };\n    /**\n     * Each resize event\n     */\n    EngineObject.prototype.resize = function () { };\n    /**\n     * Each keypress event\n     * @param key\n     */\n    EngineObject.prototype.keyPressed = function (key) { };\n    /**\n     * Each mouse pressed event\n     * @param x\n     * @param y\n     */\n    EngineObject.prototype.mousePressed = function (x, y) { };\n    return EngineObject;\n}());\nexports.EngineObject = EngineObject;\n\n\n//# sourceURL=webpack://MorseQuest/./src/core/EngineObject.ts?");

/***/ }),

/***/ "./src/mapeditor/EditionSpace.ts":
/*!***************************************!*\
  !*** ./src/mapeditor/EditionSpace.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.EditionSpace = void 0;\nvar EngineGraphics_1 = __webpack_require__(/*! @game/core/EngineGraphics */ \"./src/core/EngineGraphics.ts\");\nvar EngineObject_1 = __webpack_require__(/*! @game/core/EngineObject */ \"./src/core/EngineObject.ts\");\nvar EditionSpace = /** @class */ (function (_super) {\n    __extends(EditionSpace, _super);\n    function EditionSpace(endX) {\n        var _this = _super.call(this) || this;\n        _this.endX = endX;\n        return _this;\n    }\n    EditionSpace.prototype.display = function () {\n        EngineGraphics_1.EngineGraphics.ctx.fillStyle = 'red';\n        EngineGraphics_1.EngineGraphics.ctx.fillRect(0, 0, this.endX, EngineGraphics_1.EngineGraphics.canvas.height);\n    };\n    EditionSpace.EditionGridWidth = 200;\n    EditionSpace.EditionGridHeighth = 100;\n    return EditionSpace;\n}(EngineObject_1.EngineObject));\nexports.EditionSpace = EditionSpace;\n\n\n//# sourceURL=webpack://MorseQuest/./src/mapeditor/EditionSpace.ts?");

/***/ }),

/***/ "./src/mapeditor/SelectMapMenu.ts":
/*!****************************************!*\
  !*** ./src/mapeditor/SelectMapMenu.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SelectMapMenu = void 0;\nvar EngineGraphics_1 = __webpack_require__(/*! @game/core/EngineGraphics */ \"./src/core/EngineGraphics.ts\");\nvar SideMenu_1 = __webpack_require__(/*! ./SideMenu */ \"./src/mapeditor/SideMenu.ts\");\nvar Dropdown_1 = __webpack_require__(/*! ./components/Dropdown */ \"./src/mapeditor/components/Dropdown.ts\");\nvar SelectMapMenu = /** @class */ (function (_super) {\n    __extends(SelectMapMenu, _super);\n    function SelectMapMenu() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    SelectMapMenu.prototype.initMenu = function () {\n        this.mapDropdown = new Dropdown_1.Dropdown(this.startX + SelectMapMenu.padding, SelectMapMenu.padding, EngineGraphics_1.EngineGraphics.canvas.width - this.startX - 2 * SelectMapMenu.padding, SelectMapMenu.dropdownHeight, [], function () { });\n        this.menuElements.push(this.mapDropdown);\n        console.log(this.mapDropdown);\n        console.log(this.startX + SelectMapMenu.padding);\n        console.log(SelectMapMenu.padding);\n        console.log(EngineGraphics_1.EngineGraphics.canvas.width - this.startX - 2 * SelectMapMenu.padding);\n        console.log(SelectMapMenu.dropdownHeight);\n    };\n    SelectMapMenu.prototype.displayMenu = function (startY) {\n        var height = SelectMapMenu.dropdownHeight + 2 * SelectMapMenu.padding;\n        EngineGraphics_1.EngineGraphics.ctx.fillStyle = 'orange';\n        EngineGraphics_1.EngineGraphics.ctx.fillRect(this.startX, startY, EngineGraphics_1.EngineGraphics.canvas.width - this.startX, height);\n        this.menuElements.forEach(function (elem) {\n            elem.display();\n        });\n        return height;\n    };\n    SelectMapMenu.prototype.updateStartX = function (newValue) {\n        _super.prototype.updateStartX.call(this, newValue);\n        this.mapDropdown.x = this.startX + SelectMapMenu.padding;\n        this.mapDropdown.width = EngineGraphics_1.EngineGraphics.canvas.width - this.startX - 2 * SelectMapMenu.padding;\n    };\n    SelectMapMenu.padding = 5;\n    SelectMapMenu.dropdownHeight = 20;\n    return SelectMapMenu;\n}(SideMenu_1.SideMenu));\nexports.SelectMapMenu = SelectMapMenu;\n\n\n//# sourceURL=webpack://MorseQuest/./src/mapeditor/SelectMapMenu.ts?");

/***/ }),

/***/ "./src/mapeditor/SideMenu.ts":
/*!***********************************!*\
  !*** ./src/mapeditor/SideMenu.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SideMenu = void 0;\nvar EngineObject_1 = __webpack_require__(/*! @game/core/EngineObject */ \"./src/core/EngineObject.ts\");\nvar SideMenu = /** @class */ (function (_super) {\n    __extends(SideMenu, _super);\n    function SideMenu(startX) {\n        var _this = _super.call(this) || this;\n        _this.startX = startX;\n        _this.menuElements = [];\n        _this.initMenu();\n        return _this;\n    }\n    SideMenu.prototype.initMenu = function () { };\n    SideMenu.prototype.updateStartX = function (newValue) {\n        this.startX = newValue;\n    };\n    SideMenu.prototype.display = function () {\n        throw new Error(\"You should use displayMenu(startY: number)\");\n    };\n    SideMenu.prototype.resize = function () {\n        _super.prototype.resize.call(this);\n        this.menuElements.forEach(function (elem) { return elem.resize(); });\n    };\n    SideMenu.prototype.keyPressed = function (key) {\n        _super.prototype.keyPressed.call(this, key);\n        this.menuElements.forEach(function (elem) { return elem.keyPressed(key); });\n    };\n    SideMenu.prototype.mousePressed = function (x, y) {\n        _super.prototype.mousePressed.call(this, x, y);\n        this.menuElements.forEach(function (elem) { return elem.mousePressed(x, y); });\n    };\n    return SideMenu;\n}(EngineObject_1.EngineObject));\nexports.SideMenu = SideMenu;\n\n\n//# sourceURL=webpack://MorseQuest/./src/mapeditor/SideMenu.ts?");

/***/ }),

/***/ "./src/mapeditor/SideMenus.ts":
/*!************************************!*\
  !*** ./src/mapeditor/SideMenus.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SideMenus = void 0;\nvar EngineGraphics_1 = __webpack_require__(/*! @game/core/EngineGraphics */ \"./src/core/EngineGraphics.ts\");\nvar EngineObject_1 = __webpack_require__(/*! @game/core/EngineObject */ \"./src/core/EngineObject.ts\");\nvar SelectMapMenu_1 = __webpack_require__(/*! ./SelectMapMenu */ \"./src/mapeditor/SelectMapMenu.ts\");\nvar TileEditionMenu_1 = __webpack_require__(/*! ./TileEditionMenu */ \"./src/mapeditor/TileEditionMenu.ts\");\nvar SideMenus = /** @class */ (function (_super) {\n    __extends(SideMenus, _super);\n    function SideMenus(startX) {\n        var _this = _super.call(this) || this;\n        _this.startX = startX;\n        _this.menus = [];\n        _this.menus.push(new SelectMapMenu_1.SelectMapMenu(_this.startX));\n        _this.menus.push(new TileEditionMenu_1.TileEditionMenu(_this.startX));\n        return _this;\n    }\n    SideMenus.prototype.display = function () {\n        EngineGraphics_1.EngineGraphics.ctx.fillStyle = 'green';\n        EngineGraphics_1.EngineGraphics.ctx.fillRect(this.startX, 0, EngineGraphics_1.EngineGraphics.canvas.width - this.startX, EngineGraphics_1.EngineGraphics.canvas.height);\n        var startY = 0;\n        this.menus.forEach(function (menu) {\n            startY = menu.displayMenu(startY);\n        });\n    };\n    SideMenus.prototype.updateStartX = function (newValue) {\n        this.startX = newValue;\n        this.menus.forEach(function (menu) { return menu.updateStartX(newValue); });\n    };\n    return SideMenus;\n}(EngineObject_1.EngineObject));\nexports.SideMenus = SideMenus;\n\n\n//# sourceURL=webpack://MorseQuest/./src/mapeditor/SideMenus.ts?");

/***/ }),

/***/ "./src/mapeditor/TileEditionMenu.ts":
/*!******************************************!*\
  !*** ./src/mapeditor/TileEditionMenu.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TileEditionMenu = void 0;\nvar EngineGraphics_1 = __webpack_require__(/*! @game/core/EngineGraphics */ \"./src/core/EngineGraphics.ts\");\nvar SideMenu_1 = __webpack_require__(/*! ./SideMenu */ \"./src/mapeditor/SideMenu.ts\");\nvar Input_1 = __webpack_require__(/*! ./components/Input */ \"./src/mapeditor/components/Input.ts\");\nvar TileEditionMenu = /** @class */ (function (_super) {\n    __extends(TileEditionMenu, _super);\n    function TileEditionMenu() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    TileEditionMenu.prototype.initMenu = function () {\n        this.tileValueInput = new Input_1.Input();\n        this.menuElements.push(this.tileValueInput);\n    };\n    TileEditionMenu.prototype.displayMenu = function (startY) {\n        var height = EngineGraphics_1.EngineGraphics.canvas.height / 5;\n        EngineGraphics_1.EngineGraphics.ctx.fillStyle = 'blue';\n        EngineGraphics_1.EngineGraphics.ctx.fillRect(this.startX, startY, EngineGraphics_1.EngineGraphics.canvas.width - this.startX, height);\n        return height;\n    };\n    return TileEditionMenu;\n}(SideMenu_1.SideMenu));\nexports.TileEditionMenu = TileEditionMenu;\n\n\n//# sourceURL=webpack://MorseQuest/./src/mapeditor/TileEditionMenu.ts?");

/***/ }),

/***/ "./src/mapeditor/components/Dropdown.ts":
/*!**********************************************!*\
  !*** ./src/mapeditor/components/Dropdown.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Dropdown = void 0;\nvar EngineGraphics_1 = __webpack_require__(/*! @game/core/EngineGraphics */ \"./src/core/EngineGraphics.ts\");\nvar EngineObject_1 = __webpack_require__(/*! @game/core/EngineObject */ \"./src/core/EngineObject.ts\");\nvar Dropdown = /** @class */ (function (_super) {\n    __extends(Dropdown, _super);\n    function Dropdown(x, y, width, height, values, onSelect) {\n        var _this = _super.call(this) || this;\n        _this.x = x;\n        _this.y = y;\n        _this.width = width;\n        _this.height = height;\n        _this.values = values;\n        _this.onSelect = onSelect;\n        return _this;\n        //\n    }\n    Dropdown.prototype.display = function () {\n        EngineGraphics_1.EngineGraphics.ctx.fillStyle = 'white';\n        EngineGraphics_1.EngineGraphics.ctx.fillRect(this.x, this.y, this.width, this.height);\n    };\n    /**\n     * Returns true if x,y is inside button\n     * @param x\n     * @param y\n     */\n    Dropdown.prototype.isInbound = function (x, y) {\n        return (x > this.x && x < this.x + this.width &&\n            y > this.y && y < this.y + this.height);\n    };\n    return Dropdown;\n}(EngineObject_1.EngineObject));\nexports.Dropdown = Dropdown;\n\n\n//# sourceURL=webpack://MorseQuest/./src/mapeditor/components/Dropdown.ts?");

/***/ }),

/***/ "./src/mapeditor/components/Input.ts":
/*!*******************************************!*\
  !*** ./src/mapeditor/components/Input.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Input = void 0;\nvar EngineObject_1 = __webpack_require__(/*! @game/core/EngineObject */ \"./src/core/EngineObject.ts\");\nvar Input = /** @class */ (function (_super) {\n    __extends(Input, _super);\n    function Input() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    Input.prototype.display = function () {\n        throw new Error(\"Method not implemented.\");\n    };\n    return Input;\n}(EngineObject_1.EngineObject));\nexports.Input = Input;\n\n\n//# sourceURL=webpack://MorseQuest/./src/mapeditor/components/Input.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/MapEditor.ts");
/******/ 	MorseQuest = __webpack_exports__;
/******/ 	
/******/ })()
;