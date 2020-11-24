var submitBtn = $("button");

var API_SECRET = '&id=524901&appid=9ed816d0a4838a096ac31df49691a77a'

var searchHistory = localStorage.getItem('searches') || []

function loadSearchButtons() {
    // TODO - Run a for-loop to add buttons to search area

    // TODO - Each button should have an event listener that calls the API functions
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
            //not showing up at paragraphs
            var cityName = $("<h2>").text(response.name);
            $(".city-choice").append(cityName);
            //date looks off
            var cityDate = $("<p>").text(new Date(response.dt * 1000).toDateString());
            cityName.append(cityDate);

            var iconcode = response.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var cityIcon = $("<img>").attr('src', iconurl);
            cityDate.append(cityIcon);
            //icon not image
            //temp not in farenheit maybe?

            var temp = Math.floor((response.main.temp - 273) * (9/5) + 32)
            var cityTemp = $("<p>").text(temp + 'Â°F');
            $(".city-choice").append(cityTemp);
            //not in percentages
            var cityHum = $("<p>").text(response.main.humidity + '%');
            $(".city-choice").append(cityHum);
            //not in mph
            var cityWind = $("<p>").text((response.wind.speed * 2.237) + ' mph');
            $(".city-choice").append(cityWind);
            
            var uvUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}${API_SECRET}`

            $.ajax({
                url: uvUrl,
                method: "GET"
            }).then(function(uvResponse) {
                // doesnt show up or in color either?

                var uvColor = 'purple';
                var uvValue = uvResponse.value
                if(uvValue < 3) {
                    uvColor = 'green'
                } else if (uvValue >= 3 && uvValue < 6 ) {
                    uvColor = 'yellow'
                } 
                // TODO - Add more UV ranges

                var cityUV = $("<p>").text(uvValue).css({
                    color: 'white',
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

            const fiveForecast = Object.values(forecastMap).slice(0, 5)

            console.log({fiveForecast})

            // TODO - Run a for-loop to render forecast cards
        })

}

submitBtn.on("click", function (event) {
    event.preventDefault();

    var inputCity = $("#inlineFormInputCity").val().trim();
    // TODO - Save the city to local storage
 
    displayCityInfo();
    displayFiveDay()
});

//how to create search history and store information? local storage?

// 1. When the page loads, get search history from local storage
// 2. Load the buttons
// 3. When you search for a city, save that search to local storage
