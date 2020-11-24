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
            
            //not showing up at paragraphs
            var cityName = $("<h2>").text(response.name);
            $(".city-choice").append(cityName);
            //date looks off
            var cityDate = $("<p>").text(response.dt);
            cityName.append(cityDate);
            //icon not image
            var cityIcon = $("<img>").attr(response.weather[0].icon);
            cityDate.append(cityIcon);
            //temp not in farenheit maybe?
            var cityTemp = $("<p>").text(response.main.temp);
            cityIcon.append(cityTemp);
            //not in percentages
            var cityHum = $("<p>").text(response.main.humidity);
            cityTemp.append(cityHum);
            //not in mph
            var cityWind = $("<p>").text(response.wind.speed);
            cityHum.append(cityWind);
            //doesnt show up or in color either?
            var cityUV = $("<p>").text(response.uvi);
            cityWind.append(cityUV);
            
            //for the 5 day forecast div
            for (var i = 0; i < 5; i++){
                
            }
        });
}

submitBtn.on("click", function (event) {
    event.preventDefault();

 
    displayCityInfo();
});

//how to create search history and store information? local storage?

localStorage.setItem("city history", "inputCity");
$("form").append(localStorage.getItem("inputcity"));
//when open how to show last searched city?