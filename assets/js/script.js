var city = "sydney";
var apiKey = "526f2afa46f129ea5281fa05cd6f66f8";


//test api
function getApi() {
  
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey +"&units=metric";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);

        // create variables

       var lat = JSON.stringify(data.coord.lat);
       var lon = JSON.stringify(data.coord.lon)
     
        displayCurrent(data);
        displayForecast(lat,lon);
      
    });
}


function displayCurrent(data){
    //Destructuring assignment to get out a data
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // var {lat} = data.coord;
    // var {lon} = data.coord;
   
    console.log(name,icon,description,temp,humidity,speed);

    document.querySelector(".city").innerText = "Now in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + Math.round(speed*3.6) + "km/h";

}
    


    





// use input text city-name to get api
function searchCity(event) {
    event.preventDefault();
    if ($("#city-name").val().trim() !== "") {
        city = $("#city-name").val().trim();
        getApi();
    } else {
            alert ("Please enter a city name to search")
        };    
};

//add button click function
$("#searchButton").on("click", searchCity);