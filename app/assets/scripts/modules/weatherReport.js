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

function getAddress (latitude, longitude) {
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
                }
                else {
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
            var latitude =  position.coords.latitude;
            var longitude = position.coords.longitude;
            try {
                var currentTemp = await weatherAPI(latitude, longitude);
                var userAddress = await getAddress (latitude, longitude);
            } catch(err) {
                console.log(err);
            };
            return userAddress, currentTemp;
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
};


export default weatherReport;