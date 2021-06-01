/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://static/./src/scss/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _js_chat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/chat */ \"./src/js/chat.js\");\n\r\n\r\n\r\n(0,_js_chat__WEBPACK_IMPORTED_MODULE_1__.default)();\n\n//# sourceURL=webpack://static/./src/index.js?");

/***/ }),

/***/ "./src/js/chat.js":
/*!************************!*\
  !*** ./src/js/chat.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ chat)\n/* harmony export */ });\n\r\nfunction chat() {\r\n\r\n    function scroll() {\r\n        const dialog = document.querySelector('.dialog__content');\r\n\r\n        dialog.scrollTop = dialog.scrollHeight;\r\n    }\r\n\r\n    function connect(name) {\r\n        let socket = new SockJS('/ws');\r\n        userName = name;\r\n\r\n        document.querySelector('.dialog__info').innerHTML = `You logged as ${userName}`;\r\n\r\n        $.ajax({\r\n            url: \"http://localhost:8080/chatik/loaddb\",\r\n            // url: \"https://chatdimonanton.herokuapp.com/chatik/loaddb\",\r\n            type: \"GET\",\r\n            // data: regFormData,\r\n            dataType: 'json',\r\n            contentType: 'application/json; charset=utf-8',\r\n            success: (data) => {\r\n                data.forEach(element => {\r\n                    showMessage(element.sender, element.text);\r\n                    scroll();\r\n                });\r\n            }\r\n        });\r\n\r\n        stompClient = Stomp.over(socket);\r\n        stompClient.connect({}, function (frame) {\r\n            console.log('Connected: ' + frame);\r\n            stompClient.subscribe('/topic/chat',\r\n                function (sendMessage) {\r\n                    const messageObj = JSON.parse(sendMessage.body);\r\n                    showMessage(messageObj.sender, messageObj.text);\r\n            });\r\n            stompClient.send(\"/chat/dialogue\", {}, JSON.stringify({'sender': userName, 'text': 'connected to server'}));\r\n        });\r\n    }\r\n\r\n    function disconnect() {\r\n        const dialog=document.querySelector('.dialog__content');\r\n        dialog.innerHTML = \"\";\r\n        logo();\r\n        if (stompClient !== null) {\r\n            stompClient.disconnect();\r\n            console.log(\"Disconnected\");\r\n            document.querySelector('.registration').classList.remove('hide');\r\n            document.querySelector('.main-chat').classList.add('hide');\r\n        }\r\n    }\r\n\r\n    function sendMessage() {\r\n        stompClient.send(\"/chat/dialogue\", {}, JSON.stringify({'sender': userName, 'text': $(\"#message\").val()}));\r\n        document.querySelector('#message').value = '';\r\n    }\r\n\r\n    function showMessage(sender, text) {\r\n        const newMessage = document.createElement('div');\r\n        const dialog = document.querySelector('.dialog__content');\r\n\r\n        newMessage.classList.add('dialog__message');\r\n        newMessage.innerHTML = `<p class=\"dialog__sender\">${sender}</p><p>${text}</p>`;\r\n        if (sender != userName) {\r\n            newMessage.classList.add('dialog__message--right');\r\n            newMessage.querySelector('.dialog__sender').classList.add('dialog__sender--right')\r\n        }\r\n        dialog.append(newMessage);\r\n        scroll();\r\n    }\r\n\r\n    $(function () {\r\n        $(\"form\").on('submit', function (e) {\r\n            e.preventDefault();\r\n        });\r\n        $(\".header__link\").click(function () {\r\n            disconnect();\r\n        });\r\n        $(\"#send\").click(function () {\r\n            sendMessage();\r\n        });\r\n    });\r\n\r\n    function form() {\r\n        const regForm = document.querySelector('.registration__form');\r\n        const regButton = document.querySelector('.registration__button');\r\n        const authForm = document.querySelector('.registration__authorization-form');\r\n        const authButton = document.querySelector('.registration__authorization-button');\r\n\r\n        regButton.addEventListener('click', (event) => {\r\n            event.preventDefault();\r\n            const regFormData = JSON.stringify(Object.fromEntries((new FormData(regForm)).entries()));\r\n\r\n            $.ajax({\r\n                url: \"http://localhost:8080/chatik/signup\",\r\n                // url: \"https://chatdimonanton.herokuapp.com/chatik/signup\",\r\n                type: \"POST\",\r\n                data: regFormData,\r\n                dataType: 'json',\r\n                contentType: 'application/json; charset=utf-8',\r\n                success: (data) => {\r\n                    if (data) {\r\n                        console.log(data);\r\n                        document.querySelector('.registration').classList.add('hide');\r\n                        document.querySelector('.main-chat').classList.remove('hide');\r\n                        connect(document.querySelector('.registration__registration-input').value);\r\n                        document.querySelector('.registration__registration-alert').innerHTML = '';\r\n                        document.querySelector('.registration__authorization-alert').innerHTML = '';\r\n                    } else {\r\n                        document.querySelector('.registration__registration-alert').innerHTML = \"user with this email is already exist\";\r\n                    }\r\n                }\r\n            });\r\n            $.ajax({\r\n                url: \"http://localhost:8080/chatik/image\",\r\n                // url: \"https://chatdimonanton.herokuapp.com/chatik/signup\",\r\n                type: \"POST\",\r\n                data: new FormData(document.querySelector('#fileUploadForm')),\r\n                enctype:'multipart/form-data' ,\r\n                processData: false,\r\n                contentType: false,\r\n                cache: false,\r\n                success: (data) => {\r\n                    console.log(data);\r\n                    document.querySelector('.dialog__header-img').src = \"img/logo.png\";\r\n                }\r\n            });\r\n        });\r\n        authButton.addEventListener('click', (event) => {\r\n            event.preventDefault();\r\n            const authFormData = JSON.stringify(Object.fromEntries((new FormData(authForm)).entries()));\r\n\r\n            $.ajax({\r\n                url: \"http://localhost:8080/chatik/verification\",\r\n                // url: \"https://chatdimonanton.herokuapp.com/chatik/verification\",\r\n                type: \"POST\",\r\n                data: authFormData,\r\n                dataType: 'json',\r\n                contentType: 'application/json; charset=utf-8',\r\n                success: (data) => {\r\n                    console.log(data);\r\n\r\n                    if (data === 1) {\r\n                        $.ajax({\r\n                            url: \"http://localhost:8080/chatik/signin\",\r\n                            // url: \"https://chatdimonanton.herokuapp.com/chatik/signin\",\r\n                            type: \"POST\",\r\n                            data: authFormData,\r\n                            dataType: 'json',\r\n                            contentType: 'application/json; charset=utf-8',\r\n                            success: (data) => {\r\n                                console.log(data);\r\n                                document.querySelector('.registration').classList.add('hide');\r\n                                document.querySelector('.main-chat').classList.remove('hide');\r\n                                connect(data.userName);\r\n                                document.querySelector('.registration__registration-alert').innerHTML = '';\r\n                                document.querySelector('.registration__authorization-alert').innerHTML = '';\r\n                            }\r\n                        });\r\n                    } else {\r\n                        document.querySelector('.registration__authorization-alert').innerHTML = 'wrong password/email';\r\n                    }\r\n                }\r\n            })\r\n        });\r\n    }\r\n\r\n    function logo() {\r\n        const logos = document.querySelectorAll('.header__logo');\r\n        \r\n        console.log(logos[0]);\r\n        logos[0].classList.add('header__logo--selected-left');\r\n        logos[1].classList.add('header__logo--selected');\r\n        setTimeout(() => {\r\n            logos[0].classList.remove('header__logo--selected-left');\r\n            logos[1].classList.remove('header__logo--selected');\r\n        }, 2300);\r\n    }\r\n\r\n    let stompClient = null;\r\n    let userName;\r\n    form();\r\n}\n\n//# sourceURL=webpack://static/./src/js/chat.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;