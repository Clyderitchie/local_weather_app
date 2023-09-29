// Global variables
var apiKey = 'ea90873a3053ba7b4e31bea43946f0d1';
var apiUrl = 'https://openweathermap.org/'
var searchBar = document.querySelector('#search-bar');
var date = dayjs().format('MM/DD/YY');

// Allows for the user to search for a city using the OpenWeatherAPI to render resaults back
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
            todayweather(data);
            searchHistory(city);
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            // console.log(lon, lat);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    renderWeather(data);
                })
        })
});

// Renders a five day forcast for the current city the user searched for
function renderWeather(data) {
    var cardHTML = ''
    for (var i = 2; i < data.list.length; i += 8) {
        cardHTML +=
        `<div class="col-2 border align-self-center">
            <h5>${dayjs.unix(data.list[i].dt).format('MM/DD/YY')} <img src='https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png' class=card-img-top alt='hi'> </h5> 
            <p>Temp: ${data.list[i].main.temp} F</p>
            <p>Wind: ${data.list[i].wind.speed} MPH</p>
            <p>Humidity: ${data.list[i].main.humidity} %</p>
        </div>
        `
    }
    document.querySelector('#fiveDay-forcast').setHTML(cardHTML);
}

// Renders the weather for the current date in it's conatainer
function todayweather(data) {
    var cardHtml =
        `<div class="card">
            <div class="card-header d-flex justify-content-start align-items-center pr-2">
            <h5 class="card-title fw-3">${date}</h5><img src='https://openweathermap.org/img/w/${data.weather[0].icon}.png' class=card-img-top alt='hi'>
            </div>
            <ul class="list-group list-group-flush fs-2">
              <li class="list-group-item">Temp: ${data.main.temp} F</li>
              <li class="list-group-item">Wind: ${data.wind.speed} MPH</li>
              <li class="list-group-item">Humidity: ${data.main.humidity} %</li>
            </ul>
          </div>`
    document.querySelector('#today-forcast').setHTML(cardHtml);
}

// Saves user search history for the last five searches to localStorage
function searchHistory(city) {
    var search = JSON.parse(localStorage.getItem('city')) || [];
    var newSearch = city;
    if (newSearch) {
        search.unshift(newSearch);
    }
    if (search.length > 5) {
        search = search.slice(0, 5);
    }
    localStorage.setItem('city', JSON.stringify(search));
    var searchList = document.querySelector('#search-history');
    searchList.innerHTML = '';
    for (var i = 0; i < search.length; i++) {
        var searchItem = document.createElement('p');
        searchItem.textContent = search[i]
        searchList.appendChild(searchItem);
    }
};
searchHistory();

//  `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
//The endpoint for the forecast data will use lat and lon from the previous endpoint:
// `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
//The img src for the icon should be constructed like this:
//  `https://openweathermap.org/img/w/${data.weather[0].icon}.png`



// var exampleObject = {
//     "coord": {
//         "lon": -122.4443,
//         "lat": 47.2529
//     },
//     "weather": [
//         {
//             "id": 800,
//             "main": "Clear",
//             "description": "clear sky",
//             "icon": "01n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 62.13,
//         "feels_like": 60.91,
//         "temp_min": 56.55,
//         "temp_max": 66.36,
//         "pressure": 1011,
//         "humidity": 61
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 5.75,
//         "deg": 260
//     },
//     "clouds": {
//         "all": 0
//     },
//     "dt": 1695442151,
//     "sys": {
//         "type": 2,
//         "id": 39016,
//         "country": "US",
//         "sunrise": 1695390981,
//         "sunset": 1695434927
//     },
//     "timezone": -25200,
//     "id": 5812944,
//     "name": "Tacoma",
//     "cod": 200
// } 