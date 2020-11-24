var submitBtn = $("button");


function displayCityInfo() { 
    var inputCity = $("#inlineFormInputCity").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&id=524901&appid=9ed816d0a4838a096ac31df49691a77a";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
    
            // Storing an array of results in the results variable
            console.log(response);

            var cityName = $("<h2>").text(response.name + response.coord.dt);
            $(".city-choice").prepend(cityName);
            
            var cityTemp = $("<p>").text(response.main.temp);
            cityName.append(cityTemp);
            var cityHum = $("<p>").text(response.main.humidity);
            cityTemp.append(cityHum);
            var cityWind = $("<p>").text(response.wind.speed);
            cityHum.append(cityWind);
        });
}

submitBtn.on("click", function (event) {
    console.log('event listener');
    event.preventDefault();
    console.log('event listener');
 
    displayCityInfo();
});