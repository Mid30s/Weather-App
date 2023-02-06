var city = " "
var apiKey = "526f2afa46f129ea5281fa05cd6f66f8";



//test api
function getApi(city) {
  
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey +"&units=metric";

  fetch(requestUrl)
    .then(function (response) {
      if (response.status === 200) {
        // save city in local storage if city is valid
        let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
        if (!savedCities.includes(city.toUpperCase())) {
          savedCities.push(city.toUpperCase());
          localStorage.setItem("savedCities", JSON.stringify(savedCities));
         
        }
        searchHistory();
        return response.json();
        
      }
    }
    )
    
    .then(function (data) {
        console.log(data);
      
      // create variables
       var lat = JSON.stringify(data.coord.lat);
       var lon = JSON.stringify(data.coord.lon)
     
        displayCurrent(data);
        displayForecast(lat,lon);
       
      
    })
    .catch(function (error) {
      console.error(error);
      window.location.reload();
    });
    
   
      
}


function displayCurrent(data){
    //Destructuring assignment to get out a data
    const { name } = data;
    const { dt } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    //test
    console.log(name,icon,description,temp,humidity,speed,dt);

    document.querySelector(".city").innerText = "Now in " + name + "      " + new Date(dt * 1000).toLocaleDateString();
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + Math.round(speed*3.6) + "km/h";

}
    

function displayForecast(lat,lon){
    //test lat+lon
    console.log(lat,lon);
    var forecastUrl ="https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" +lon + "&appid=" + apiKey +"&units=metric";
    fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        // use filter method to choose property include the string 06:00:00
        var newData = data.list.filter((e) => e.dt_txt.includes('06:00:00'));
        //test new data
        console.log(newData);

        for (i = 0; i < 5; i++) {
            var date = new Date(newData[i].dt*1000).toLocaleDateString();
            var iconUrl = "https://openweathermap.org/img/wn/" + newData[i].weather[0].icon + ".png";
            var temp = newData[i].main.temp;
            var wind = newData[i].wind.speed;
            var humidity = newData[i].main.humidity;
            //test
            console.log(date,iconUrl,temp,wind,humidity);         
            $("#card-date-" + (i + 1)).html(date);
            $("#card-icon-" + (i + 1)).html("<img src=" + iconUrl + ">");
            $("#card-temp-" + (i + 1)).html(Math.round(temp) + "°C");
            $("#card-wind-" + (i + 1)).html(Math.round(wind*3.6) + "km/h");
            $("#card-humid-" + (i + 1)).html(humidity + "%");
        }
       
    });

};




function searchHistory() {
  const cities = JSON.parse(localStorage.getItem('savedCities'));
  if (cities !== null) {
    $("#search-history-list").html("");
    for (let city of cities){
      const button = $('<button></button>').text(city);
      $(button).on('click', (event) => {
        $("#city-name").val($(button).text());
        submitFunction(event);
      });
      $("#search-history-list").append(button);
    }
  }
};






// use input text city to get api
function submitFunction(event) {
    event.preventDefault();
    if ($("#city-name").val() !== "") {
        let city = $("#city-name").val();
        getApi(city);
            
    } else {
            alert ("Please enter a city name to search")
        }; 

};


//add button click function
$("#searchButton").on("click", submitFunction);

//loading page
function init() {
  searchHistory();
};
init();