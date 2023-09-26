// Global variables
var apiKey = 'ea90873a3053ba7b4e31bea43946f0d1';
var apiUrl = 'https://openweathermap.org/'
var searchBar = document.querySelector('#search-bar');



document.querySelector('#city-search').addEventListener('submit', function (event) {
    event.preventDefault();

    var city = searchBar.value.trim();
    var catUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`

    //fetch
    fetch(catUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            console.log(lon,lat);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                 console.log('hello')
            })
        })

});



// function to call certain elements from the object to create a card within the html
// function renderWeather(city) {
//     var cardHtml =
//         `<div class="card">
// <img src=${city.weather.icon} class=card-img-top alt=${title}>
// <div class="card-body>
// <h5 class=card-title>${city.coord}</h5>
// <p class="card-text">${city.main.temp}</p>
// <p class="card-text">${city.wind.speed}</p>
// <p class="card-text">${city.main.humidity}</p>
// </div>
//  </div>`

//     var = {location, temp, wind, hum, icon}
//     document.querySelector('#5day').innerHTML = cardHtml;
// }
// renderWeather();





// Then endpoint you will fetch to for current weather is:
//  `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
//The endpoint for the forecast data will use lat and lon from the previous endpoint:
// `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
//The img src for the icon should be constructed like this:
//  `https://openweathermap.org/img/w/${data.weather[0].icon}.png`



var exampleObject = {
    "coord": {
        "lon": -122.4443,
        "lat": 47.2529
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 62.13,
        "feels_like": 60.91,
        "temp_min": 56.55,
        "temp_max": 66.36,
        "pressure": 1011,
        "humidity": 61
    },
    "visibility": 10000,
    "wind": {
        "speed": 5.75,
        "deg": 260
    },
    "clouds": {
        "all": 0
    },
    "dt": 1695442151,
    "sys": {
        "type": 2,
        "id": 39016,
        "country": "US",
        "sunrise": 1695390981,
        "sunset": 1695434927
    },
    "timezone": -25200,
    "id": 5812944,
    "name": "Tacoma",
    "cod": 200
}