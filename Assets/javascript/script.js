var submitBtn = $(".btn-primary");

var API_SECRET = '&id=524901&appid=9ed816d0a4838a096ac31df49691a77a'

var searchHistory = JSON.parse(localStorage.getItem('searches'));
var cityArr = [];
$(".city-buttons").html(searchHistory);


function loadSearchButtons() {
    // TODO - Run a for-loop to add buttons to search area
     $("city-buttons").empty();
    var inputCity = $("#inlineFormInputCity").val().trim();
    JSON.stringify(inputCity);
    cityArr.push(cityBtn);
    
    // TODO - Each button should have an event listener that calls the API functions
    for (var i = 0; i < cityArr.length; i++) {

        var cityBtn = $("<button>").text(inputCity);
        $(".city-buttons").append(cityBtn);
    }
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
        .then(function (response) {
             

            var cityName = $("<h2>").text(response.name);
            var cityDate = $("<p>").text(new Date(response.dt * 1000).toDateString());
            var iconcode = response.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var cityIcon = $("<img>").attr('src', iconurl);
            var temp = Math.floor((response.main.temp - 273) * (9/5) + 32)
            var cityTemp = $("<p>").text("Temperature: " + temp + '°F');
            var cityHum = $("<p>").text("Humidity: " + response.main.humidity + '%');
            var cityWind = $("<p>").text("Wind Speed: " + (response.wind.speed * 2.237) + ' mph');
            var uvUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${response.coord.lat}&lon=${response.coord.lon}${API_SECRET}`
            $(".city-choice").append(cityName);
            cityName.append(cityDate);
            cityDate.append(cityIcon);
            $(".city-choice").append(cityTemp);
            $(".city-choice").append(cityHum);
            $(".city-choice").append(cityWind);

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
        .then(function (response) {

            var forecastMap = {}

            for(var i = 0; i < response.list.length; i++) {
                var item = response.list[i]

                var day = new Date(item.dt * 1000).getDate()

                forecastMap[day] = item   
            }

            var fiveForecast = Object.values(forecastMap).slice(0, 5)
            
            var fiveTitle = $("<h2>").text("5 Day Forecast");
            $(".city-days").append(fiveTitle);

            for (var i = 0; i < fiveForecast.length; i++) {
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

    var inputCity = $("#inlineFormInputCity").val().trim();
    // var cityBtn = $("<button>").text(inputCity);
    // TODO - Save the city to local storage

    localStorage.setItem('searches', JSON.stringify(inputCity));

    displayCityInfo();
    displayFiveDay();
    loadSearchButtons();

});
