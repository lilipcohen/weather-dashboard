var submitBtn = $("button");
var inputCity = $("input");
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&id=524901&appid=9ed816d0a4838a096ac31df49691a77a";

function searchCity() { 
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
    
            // Storing an array of results in the results variable
            console.log(response);
        });
}

submitBtn.on("click", function (event) {
    console.log('event listener');
    event.preventDefault();
    console.log('event listener');
 
    searchCity(inputcity);
});