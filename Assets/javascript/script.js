var submitBtn = $(".btn-primary");

var API_SECRET = '&id=524901&appid=9ed816d0a4838a096ac31df49691a77a'

var searchHistory = localStorage.getItem('searches') || []

function loadSearchButtons() {
    // TODO - Run a for-loop to add buttons to search area
     $("city-buttons").empty();
    var inputCity = $("#inlineFormInputCity").val().trim();

    // TODO - Each button should have an event listener that calls the API functions
        
    var cityBtn = $("<button>").text(inputCity);
    $(".city-buttons").append(cityBtn);
    
    cityBtn.on("click", function (event) { 
        event.preventDefault();
        displayCityInfo();
        displayFiveDay();
    });
}


function displayCityInfo() { 
    var inputCity = $("#inlineFormInputCity").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + API_SECRET;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
    
            // Storing an array of results in the results variable            

            var cityName = $("<h2>").text(response.name);
            $(".city-choice").append(cityName);
            //date looks off
            var cityDate = $("<p>").text(new Date(response.dt * 1000).toDateString());
            cityName.append(cityDate);

            var iconcode = response.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var cityIcon = $("<img>").attr('src', iconurl);
            cityDate.append(cityIcon);

            var temp = Math.floor((response.main.temp - 273) * (9/5) + 32)
            var cityTemp = $("<p>").text("Temperature: " + temp + '°F');
            $(".city-choice").append(cityTemp);

            var cityHum = $("<p>").text("Humidity: " + response.main.humidity + '%');
            $(".city-choice").append(cityHum);

            var cityWind = $("<p>").text("Wind Speed: " + (response.wind.speed * 2.237) + ' mph');
            $(".city-choice").append(cityWind);
            
            var uvUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}${API_SECRET}`

            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function(uvResponse) {

                var uvColor
                var uvValue = uvResponse.value
                if (uvValue < 3) {
                    uvColor = 'lightgreen'
                } else if (uvValue >= 3 && uvValue < 6) {
                    uvColor = 'yellow'
                } else if (uvValue >= 6 && uvValue < 9) {
                    uvColor = 'red'
                } else {
                    uvColor = "purple"
                }

                var cityUV = $("<p>").text("Uv Index: " + uvValue).css({
                    color: 'black',
                    backgroundColor: uvColor
                });

                $(".city-choice").append(cityUV);
            })
        });
}

function displayFiveDay() {
    var inputCity = $("#inlineFormInputCity").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + API_SECRET;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            console.log({response})

            var forecastMap = {}

            for(var i = 0; i < response.list.length; i++) {
                var item = response.list[i]

                var day = new Date(item.dt * 1000).getDate()

                forecastMap[day] = item   
            }

            var fiveForecast = Object.values(forecastMap).slice(0, 5)

            console.log({ fiveForecast })
            
            var fiveTitle = $("<h2>").text("5 Day Forecast");
            $(".city-days").append(fiveTitle);

            // TODO - Run a for-loop to render forecast cards
            for (var i = 0; i < fiveForecast.length; i++) {
                // fiveForecast[i].innerHTML = "";
                var fiveContainer = $(".city-days").append("<div>");
                var iconcode = fiveForecast[i].weather[0].icon
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                var fiveDate = $("<p>").text(new Date(fiveForecast[i].dt * 1000).toDateString());
                var fiveIcon = $("<img>").attr('src', iconurl);
                var temp = Math.floor((fiveForecast[i].main.temp - 273) * (9/5) + 32)
                var fiveTemp = $("<p>").text("Temp: " +temp + '°F');
                var fiveHum = $("<p>").text("Humidity: " + fiveForecast[i].main.humidity + '%');
                fiveContainer.addClass("container-five");
                $(fiveContainer).append(fiveDate);
                $(fiveContainer).append(fiveIcon);
                $(fiveContainer).append(fiveTemp);
                $(fiveContainer).append(fiveHum);
            }
            
        })

}

submitBtn.on("click", function (event) {
    event.preventDefault();
    
    // TODO - Save the city to local storage
    var inputCity = $("#inlineFormInputCity").val().trim();
    
    localStorage.setItem('searches', inputCity) || []
    displayCityInfo();
    displayFiveDay();
    loadSearchButtons();

});

//how to create search history and store information? local storage?

// 1. When the page loads, get search history from local storage
// 2. Load the buttons
// 3. When you search for a city, save that search to local storage
