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

// Boolean for event handling, so that same events can be fired only once
var eventState = true;

_weatherReport2.default.weatherReport();

// dynamic event listeners
$(document).on('click', '.frh', function () {
    if (eventState === true) {
        var tempVal = parseInt($('.temp').text());
        var frhVal = _weatherReport2.default.cToF(tempVal);
        $('.temp').html('<p class="temp">' + frhVal + '<sup class="cel">&#8451;</sup><sub class="activeUnit frh">&#8457;</sub></p>');
        eventState = false;
    }
});

$(document).on('click', '.cel', function () {
    if (eventState === false) {
        var tempVal = parseInt($('.temp').text());
        var cVal = _weatherReport2.default.fToC(tempVal);
        $('.temp').html('<p class="temp">' + cVal + '<sup class="cel activeUnit">&#8451;</sup><sub class="frh">&#8457;</sub></p>');
        eventState = true;
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// convert fahrenheit to celsius
function fToC(fahrenheit) {
    var fTemp = fahrenheit,
        fToCel = (fTemp - 32) * 5 / 9;
    // rounding to nearest number after converting
    return Math.round(fToCel);
}
// convert celsius to fahrenheit
function cToF(celsius) {
    var cTemp = parseFloat(celsius);
    var cToFh = cTemp * (9 / 5) + 32;
    return Math.round(cToFh);
}
// DarkSky API call
function weatherAPI(latitude, longitude) {
    // variables config for coordinates, url and api key
    // latitude and longitude are accepted arguments and passed once a user has submitted the form.
    var apiKey = '6a70ec8ed658efa9fb9cc968bc6c7a22',
        url = 'https://api.darksky.net/forecast/',
        lat = parseFloat(latitude),
        lng = parseFloat(longitude),
        api_call = url + apiKey + "/" + lat + "," + lng + "?extend=hourly&callback=?";

    return $.getJSON(api_call, function (forecast) {
        var skycons;

        var currentCTemp = fToC(parseInt(forecast.currently.apparentTemperature));
        $('.temperature').append('<p class="temp">' + currentCTemp + '<sup class="cel activeUnit">&#8451;</sup><sub class="frh">&#8457;</sub></p>');
        // skycons.add(document.getElementById("icon"), forecast.currently.icon);
        switch (forecast.currently.icon) {
            case "clear-day":
                $(document.body).addClass('clearDaySky');
                skycons = new Skycons({
                    "color": "#fcde2b",
                    "resizeClear": true
                });
                skycons.add(document.getElementById("icon"), forecast.currently.icon);
                break;
            case "clear-night":
                $(document.body).addClass('clearNightSky');
                break;
            case "partly-cloudy-day":
                $(document.body).addClass('partlyCloudyDay');
                break;
            case "partly-cloudy-night":
                $(document.body).addClass('partlyCloudyNight');
                break;
            case "cloudy":
                $(document.body).addClass('cloudy');
                break;
            case "rain":
                $(document.body).addClass('rain');
                break;
            case "sleet":
                $(document.body).addClass('sleet');
                break;
            case "snow":
                $(document.body).addClass('snow');
                break;
            case "wind":
                $(document.body).addClass('wind');
                break;
            case "fog":
                $(document.body).addClass('fog');
                break;
        }
        // animate the icons
        skycons.play();
        return currentCTemp;
    });
}

// get User's current location(city, state)
function getAddress(latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    console.log(data);
                    var address = data.results[2].formatted_address;
                    resolve(address);
                } else {
                    reject(request.status);
                }
            }
        };
        request.send();
    }).then(function (address) {
        $('.location').append('<p class="loc">' + address + '</p>');
    });
};

function weatherReport() {
    // Check HTML5 geolocation.
    if (!navigator.geolocation) {
        console.error('Geolocation not enabled');
    };
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var currentTemp = weatherAPI(latitude, longitude);
            var userAddress = getAddress(latitude, longitude);
            var promised = Promise.all([currentTemp, userAddress]);
            console.log(userAddress, currentTemp);
            if (promised) {
                resolve(promised);
                console.log('resolved');
            } else reject('Error Happened');
        });
    });
};

// Object for exporting
var func = {
    weatherReport: weatherReport,
    cToF: cToF,
    fToC: fToC
};
exports.default = func;

/***/ })
/******/ ]);