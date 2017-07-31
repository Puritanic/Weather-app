// latitude 43.580000,
// longitude 21.333900


// convert degrees to celsius
function fToC(fahrenheit) {
	var fTemp  = fahrenheit,
			fToCel = (fTemp - 32) * 5 / 9;
    // rounding to nearest number after converting
	return Math.round(fToCel);
}


function weatherAPI(latitude, longitude) {
    // variables config for coordinates, url and api key
	// latitude and longitude are accepted arguments and passed once a user has submitted the form.
	var apiKey              = ApiKey,
	url             = 'https://api.darksky.net/forecast/',
	lat             = parseFloat(latitude), 
	lng             = parseFloat(longitude),
    api_call        = url + apiKey + "/" + lat + "," + lng + "?extend=hourly&callback=?";
    var latitude;
    var longitude;

    $.getJSON(api_call, function(forecast) {
        console.log(forecast);
        console.log(forecast.currently.cloudCover);
        $('.temperature').append('<p class="temp">' + fToC(parseInt(forecast.currently.apparentTemperature)) + '</p>')
    });      
}

function weatherReport() {
    // get latitude and longitude of the user via ipapi geolocation
    $.getJSON('//ipapi.co/json/', function (data) {
        if (data) {
            console.log(JSON.stringify(data, null, 2));

            weatherAPI(data.latitude, data.longitude);
        }
    })
};

export default weatherReport;