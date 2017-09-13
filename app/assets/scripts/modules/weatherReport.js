// convert degrees to celsius
function fToC(fahrenheit) {
    var fTemp = fahrenheit,
        fToCel = (fTemp - 32) * 5 / 9;
    // rounding to nearest number after converting
    return Math.round(fToCel);
}

function cToF(celsius) {
    var cTemp = parseFloat(celsius);
    var cToFh = (cTemp * (9/5)) + 32;
    return Math.round(cToFh);
}

function weatherAPI(latitude, longitude) {
    // variables config for coordinates, url and api key
    // latitude and longitude are accepted arguments and passed once a user has submitted the form.
    var apiKey = '6a70ec8ed658efa9fb9cc968bc6c7a22',
        url = 'https://api.darksky.net/forecast/',
        lat = parseFloat(latitude),
        lng = parseFloat(longitude),
        api_call = url + apiKey + "/" + lat + "," + lng + "?extend=hourly&callback=?";

    return $.getJSON(api_call, function (forecast) {
        console.log(forecast);
        console.log(forecast.currently.icon);
        var skycons = new Skycons({"color": "#272527","resizeClear": true});
        var currentCTemp = fToC(parseInt(forecast.currently.apparentTemperature));
        $('.temperature').append('<p class="temp">' + currentCTemp + '<sup>C</sup><sub>F</sub></p>');
        skycons.add(document.getElementById("icon"), forecast.currently.icon);
        // animate the icons
        skycons.play();

        return currentTemp;
    });
}

function skycons() {
    var i,
        icons = new Skycons({
            "color" : "#FFFFFF",
            "resizeClear": true // nasty android hack
        }),
        list  = [ // listing of all possible icons
            "clear-day",
            "clear-night",
            "partly-cloudy-day",
            "partly-cloudy-night",
            "cloudy",
            "rain",
            "sleet",
            "snow",
            "wind",
            "fog"
        ];

    // loop thru icon list array
    for(i = list.length; i--;) {
        var weatherType = list[i], // select each icon from list array
                // icons will have the name in the array above attached to the 
                // canvas element as a class so let's hook into them.
                elements    = document.getElementsByClassName( weatherType );

        // loop thru the elements now and set them up
        for (e = elements.length; e--;) {
            icons.set(elements[e], weatherType);
        }
    }
    
    // animate the icons
    icons.play();
}

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
            } else
                reject('Error Happened');
        });
    });
};

export default weatherReport;