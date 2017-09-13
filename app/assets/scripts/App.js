import func from './modules/weatherReport';

func.weatherReport();

$(document).on('click', '.frh', function() { 
    var tempVal = parseInt($('.temp').text());
    var frhVal = func.cToF(tempVal);
    $('.temp').html('<p class="temp">' + frhVal + '<sup class="cel activeUnit">C</sup><sub class="frh">F</sub></p>');
});

$(document).on('click', '.cel', function() { 
    var tempVal = parseInt($('.temp').text());
    var cVal = func.fToC(tempVal);
    $('.temp').html('<p class="temp">' + cVal + '<sup class="cel activeUnit">C</sup><sub class="frh">F</sub></p>');
});