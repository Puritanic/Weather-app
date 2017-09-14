import func from './modules/weatherReport';

// Boolean for event handling, so that same events can be fired only once
var eventState = true;

func.weatherReport();

// dynamic event listeners
$(document).on('click', '.frh', function() { 
    if(eventState === true){
        var tempVal = parseInt($('.temp').text());
        var frhVal = func.cToF(tempVal);
        $('.temp').html('<p class="temp">' + frhVal + '<sup class="cel">C</sup><sub class="activeUnit frh">F</sub></p>');
        eventState = false;
    }
});

$(document).on('click', '.cel', function() { 
    if (eventState === false) {
        var tempVal = parseInt($('.temp').text());
        var cVal = func.fToC(tempVal);
        $('.temp').html('<p class="temp">' + cVal + '<sup class="cel activeUnit">C</sup><sub class="frh">F</sub></p>');
        eventState = true;
    }
});