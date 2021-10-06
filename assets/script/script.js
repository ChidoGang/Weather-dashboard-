$(document).ready(function () {
var cityName = "";
var lat= "";
var lon= "";
var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=minutely,hourly,alerts&appid=0b2c8dcafe03cc68f1ee010c88b59629'; 
}) 

$(".card-deck").empty();

var icon=response.current.weather[0].icon;
var iconImg = $("<img>");
iconImg.addClass("img-fluid");
iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
$("#city").append(iconImg);

var uvi = parseInt(response.current.uvi);
if (uvi <= 2) {
    $(".color").css({"background-color": "green", "color": "white"});
}else if (uvi >= 3 && uvi <= 5 ) {
    $(".color").css({"background-color": "yellow", "color": "black"});
}else if (uvi >= 6 && uvi <= 7 ) {
    $(".color").css({"background-color": "orange", "color": "white"});
}else if (uvi >= 8 && uvi <= 10 ) {
    $(".color").css({"background-color": "red", "color": "white"});
}else if (uvi >= 11) {
    $(".color").css({"background-color": "violet", "color": "white"});
}

$("#temp").text("Temperature: " + response.current.temp + "")