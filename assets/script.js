// Global variables
var apiKey = 'ea90873a3053ba7b4e31bea43946f0d1';
var apiUrl= 'https://openweathermap.org/'
var searchBar = document.querySelector('#search-bar');



document.querySelector('#city-search').addEventListener('submit', function(event) {
    event.preventDefault();

    var city = searchBar.value.trim();
    var catUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`

    //fetch
    fetch(catUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })

})




// var cardHtml = 
// `<div class="card">
// <img src=${icon} class=card-img-top alt=${title}>
// <div class="card-body>
// <h5 class=card-title>${city}</h5>
// <p class="card-text">${temp}</p>
// <p class="card-text">${wind}</p>
// <p class="card-text">${hum}</p>
// </div>
//  </div>`

// var = {location, temp, wind, hum, icon}