/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _weatherReport = __webpack_require__(1);

var _weatherReport2 = _interopRequireDefault(_weatherReport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _weatherReport2.default)();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// latitude 43.580000,
// longitude 21.333900


// convert degrees to celsius
function fToC(fahrenheit) {
    var fTemp = fahrenheit,
        fToCel = (fTemp - 32) * 5 / 9;
    // rounding to nearest number after converting
    return Math.round(fToCel);
}

function weatherAPI(latitude, longitude) {
    // variables config for coordinates, url and api key
    // latitude and longitude are accepted arguments and passed once a user has submitted the form.
    var apiKey = '6a70ec8ed658efa9fb9cc968bc6c7a22',
        url = 'https://api.darksky.net/forecast/',
        lat = parseFloat(latitude),
        lng = parseFloat(longitude),
        api_call = url + apiKey + "/" + lat + "," + lng + "?extend=hourly&callback=?";

    $.getJSON(api_call, function (forecast) {
        console.log(forecast);
        $('.temperature').append('<p class="temp">' + fToC(parseInt(forecast.currently.apparentTemperature)) + '</p>');
        // $('.location').append('<p class="location">' + +'</p>')
    });
}

function getAddress(latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[1].formatted_address;
                    resolve(address);
                } else {
                    reject(request.status);
                }
            }
        };
        request.send();
    }).then(function (address) {
        $('.location').append('<p class="location">' + address + '</p>');
    });
};

function weatherReport() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            try {
                var currentTemp = await weatherAPI(latitude, longitude);
                var userAddress = await getAddress(latitude, longitude);
            } catch (err) {
                console.log(err);
            };
            return userAddress, currentTemp;
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
};

exports.default = weatherReport;

/***/ })
/******/ ]);