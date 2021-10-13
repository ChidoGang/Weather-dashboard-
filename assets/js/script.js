/* Var functions */
const cityForm = document.getElementById('cityForm');
const cityList = document.getElementById('cityList');
const cityEl = document.getElementById('city');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const windEl = document.getElementById('wind');
const humidityEl = document.getElementById('humidity');
const uvIndexEl = document.getElementById('uvIndex');
const fiveDayEl = document.getElementById('fiveDayEl');

var cityName;
var city;
var cordArray = [];
var forecastArray = [];
/* End of  var */


function generateCoordinates() {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=0b2c8dcafe03cc68f1ee010c88b59629';

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                cordArray = data;
                generateForecast();
            });
        }
    });
}

function generateForecast() {
    var lat = cordArray.coord.lat
    var lon = cordArray.coord.lon
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&exclude=minutely,hourly,alerts&appid=0b2c8dcafe03cc68f1ee010c88b59629';

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                forecastArray = data;
                printForecast();
            });
        }
    });
}

function printForecast() {
    var day = forecastArray.current;
    var temp = ((((day.temp - 273.15) * 9) / 5) + 32).toFixed(1);
    var currentDate = moment(day.dt, 'X').format('MM/DD/YYYY');
    var uvIndex = day.uvi
    var iconUrl = 'http://openweathermap.org/img/w/' + day.weather[0].icon + ".png"
    city = cordArray.name
    localStorage.setItem(city, "");
    generateButtons();

    cityEl.textContent = city;
    dateEl.textContent = currentDate;
    $('#icon').attr('src', iconUrl);
    $('#icon').attr('alt', day.weather[0].description) 
    tempEl.textContent = "Temp: " + temp + '\u00B0F';
    windEl.textContent = "Wind: " + day.wind_speed + " MPH";
    humidityEl.textContent = "Humidity: " + day.humidity;
    uvIndexEl.textContent = "UV Index: " + uvIndex;

    $('#uvIndex').each(function() {
        if (uvIndex < 3) {
            $(this).addClass('low');
            $(this).removeClass('moderate');
            $(this).removeClass('severe');
        } else if (uvIndex >= 3 && uvIndex < 6) {
            $(this).addClass('moderate');
            $(this).removeClass('severe');
            $(this).removeClass('low');
        } else {
            $(this).addClass('severe');
            $(this).removeClass('moderate');
            $(this).removeClass('low');
        }
    });

    print5DayForecast();
}
/* 5 day forcast Displays and functions */
function print5DayForecast() {
    $("#fiveDayEl").children().remove();

    var titleEl = document.createElement('p');
    titleEl.innerHTML = '5 Day Forecast:';
    fiveDayEl.appendChild(titleEl);

    for (let i = 1; i < 6; i++) {
        var five = forecastArray.daily[i];
        var fiveTemp = ((((five.temp.day - 273.15) * 9) / 5) + 32).toFixed(1);
        var currentDate = moment(five.dt, 'X').format('MM/DD/YYYY');
        var iconUrl = 'http://openweathermap.org/img/w/' + five.weather[0].icon + ".png"

        var fiveDay = document.createElement('div');
        fiveDay.classList = 'col-2 row';

        var date = document.createElement('p');
        date.innerHTML = currentDate;

        var icon = document.createElement('img');
        icon.classList = "icon";
        $(icon).attr('src', iconUrl);
        $(icon).attr('alt', five.weather[0].description);
        var temp = document.createElement('p');
        temp.innerHTML = "Temp: " + fiveTemp + "\u00B0F";

        var wind = document.createElement('p');
        wind.innerHTML = "Wind: " + five.wind_speed + " MPH";

        var humidity = document.createElement('p');
        humidity.innerHTML = "Humidity: " + five.humidity + " %";

        fiveDayEl.appendChild(fiveDay);
        fiveDay.appendChild(date);
        fiveDay.appendChild(icon);
        fiveDay.appendChild(temp);
        fiveDay.appendChild(wind);
        fiveDay.appendChild(humidity);
    }
}
/* End of for loop */ 

/* Button generatong section for functions */
function generateButtons() {
    $('#cityList').children().remove();

    for (let j = 0; j < localStorage.length; j++) {
        const key = localStorage.key(j);

        var button = document.createElement('button');
        button.innerText = `${key}`;

        cityList.appendChild(button);
    }

    $("button").each(function() {
        $(this).on("click", function(event) {
            cityName = $(this)[0].innerHTML;
            if (cityName != 'Search') {
                event.preventDefault();
                generateCoordinates();
            }
        })
    })
}

$('#searchBtn').on("click", function() {
    cityName = cityForm.value;

    if(cityName) {
        cityForm.value = "";
        generateCoordinates();
    }
});

$(document).ready(function() {
    generateButtons();
})
/* End of button section */ 
