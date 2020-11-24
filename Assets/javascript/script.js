
    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&id=524901&appid=9ed816d0a4838a096ac31df49691a77a";
    var city = "atlanta"
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
    
          // Storing an array of results in the results variable
            console.log(response);
        });

// Event handler for user clicking the tour dates button
// toursModal.on("click", function (event) {
//     console.log('event listener');
//     // Preventing the button from trying to submit the form
//     event.preventDefault();
//     console.log('event listener');
//     modalBgTours.addClass("bg-active");
//     socialLinks.addClass("hide");
//     // Storing the artist name
//     var inputcity = "";

//     // Running the searchBandsInTown function(passing in the artist as an argument)
//     searchBandsInTown(inputcity);
// });