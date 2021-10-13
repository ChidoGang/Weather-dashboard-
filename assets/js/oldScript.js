const weathercard=document.getElementById("Weathercard");

 
var cityName = "";
var lat= "";
var lon= "";
var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=minutely,hourly,alerts&appid=0b2c8dcafe03cc68f1ee010c88b59629'; 
 

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
$("#humidity").text("humidity: " + response.current.humidity + "%");
$("#wind").text("wind speed: " + response.current.wind_speed + "MPH");
$(".color").text(response.current.uvi);

$("#current").css({"display":"block"});

var daily = response.daily;

for (i = 1; i <daily.length -2; i++) {

    var dailyDate = document.createElement("p")
     dailyDate.innerHTML = moment (daily.dt ,"X").format("MM/DD/YYYY")
    var dailyTemp = document.createElement("p")
     dailyTemp.innerHTML = daily[i].temp.day;
     var dailyHum = document.createElement("p")
     dailyHum.innerHTML = daily[i].humidity;
     var dailyIcon =document.createElement("img")
     dailyIcon.classList="weathericon"
     $(dailyIcon).attr("src",daily[i].weather[0].icon)


    weathercard.appendChild(dailyDate) 
    weathercard.appendChild(dailyTemp)
    weathercard.appendChild(dailyHum)
    weathercard.appendChild(dailyIcon)
}

function getweather() {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +cityName + "&langappid=0b2c8dcafe03cc68f1ee010c88b59629";
}


function init(){
    localStorage.setItem("cityname,repsone.name");

    cityName = localStorage.getItem("cityname");
    if (cityName !== null) {
    cityList.addclass("list-group-item-group-item-action");
    cityList.text(cityName);
    $("ul").prepend(cityList);   
    }
}

    function searchButtion(){
        cityName = $("input").valtrim();
        var cityList=$("button")
        cityList.addclass("list-group-item-group-item-action");
        cityList.text(cityName);

        $("ul").prepend(cityList);
        $("input").val("");
    }


    $("#city-form").submit(function(Event){
        Event.preventDefault();
        searchButtion();
    });

    $("#form-submit").on("click",function(Event){
        Event.preventDefault();
        searchButtion();
    }); 