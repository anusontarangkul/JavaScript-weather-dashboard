var APIkey = "54f5d77c61f7b7d7da7d2c41a2956900";

// search for city button
// get current and future conditions
//append results to search history

//click current city
//get details with city name, date, icon, temp, humidity, wind speed, and UV, index
//color to show conditions are favorable, moderate, or severe

//click future weather conditiosn,
// get 5 day forecast that displays date, icon ,temperature, and humidity

//click on search history
//get current and future as well

$(document).ready(function () {
  $("#search-button").on("click", function () {
    var searchValueElement = $("#search-value").val();

    // clear input box
    $("#search-value").val("");

    searchWeather(searchValueElement);
  });

  function searchWeather(searchValue) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchValue +
      "&appid=54f5d77c61f7b7d7da7d2c41a2956900";
    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      var currentCity = response.name;
      var currentDate = moment().subtract(10, "days").calendar();
      var currentTemp = response.main.temp;
      var currentHumidity = response.main.humidity;
      var currentWindSpeed = response.wind.speed;
      var currentIcon = response.weather[0].icon;
      console.log(response);
      console.log(response.weather[0].icon);
    });
  }
  // $.ajax({
  //     type: "GET",
  //     url:
  //       "http://api.openweathermap.org/data/2.5/weather?q=" +
  //       searchValue +
  //       "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",
  //     dataType: "json",
  //     success: function (data) {
  //       // create history link for this search
  //       if (history.indexOf(searchValue) === -1) {
  //         history.push(searchValue);
  //         window.localStorage.setItem("history", JSON.stringify(history));

  //         makeRow(searchValue);
  //       }

  //       // clear any old content
  //       $("#today").empty();

  //       // create html content for current weather
  //       var title = $("<h3>")
  //         .addClass("card-title")
  //         .text(data.name + " (" + new Date().toLocaleDateString() + ")");
  //       var card = $("<div>").addClass("card");
  //       var wind = $("<p>")
  //         .addClass("card-text")
  //         .text("Wind Speed: " + data.wind.speed + " MPH");
  //       var humid = $("<p>")
  //         .addClass("card-text")
  //         .text("Humidity: " + data.main.humidity + "%");
  //       var temp = $("<p>")
  //         .addClass("card-text")
  //         .text("Temperature: " + data.main.temp + " °F");
  //       var cardBody = $("<div>").addClass("card-body");
  //       var img = $("<img>").attr(
  //         "src",
  //         "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  //       );

  //       // merge and add to page
  //       title.append(img);
  //       cardBody.append(title, temp, humid, wind);
  //       card.append(cardBody);
  //       $("#today").append(card);

  //       // call follow-up api endpoints
  //       getForecast(searchValue);
  //       getUVIndex(data.coord.lat, data.coord.lon);
  //     },
  //   });
});
