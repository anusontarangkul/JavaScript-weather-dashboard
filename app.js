var APIkey = "54f5d77c61f7b7d7da7d2c41a2956900";
var listGroup_Ul = $(".list-group");
var today_Div = $(".today");
var dashboardName_H2 = $("#dashboard-name");
var dashboardTemperature_P = $("#dashboard-temperature");
var dashboardHumidity_P = $("#dashboard-humidity");
var dashboardWind_P = $("#dashboard-wind");
var dashboardUV_P = $("#dashboard-uv");
var dashboardUVInfo_Span = $("#dashboard-uv-info");
var dashboardIcon_Span = $("#dashboard-icon");
var degreeSymbol = String.fromCharCode(176);
var dashboardBorder = $("#today");

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
  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  for (var i = 0; i < history.length; i++) {
    var savedSearch = history[i].charAt(0).toUpperCase() + history[i].slice(1);
    var previouslySavedSearch = $("<button>").text(savedSearch);
    listGroup_Ul.append(previouslySavedSearch);
  }

  $("#search-button").on("click", function () {
    var searchValue_Input = $("#search-value").val();

    // clear input box
    $("#search-value").val("");

    searchWeather(searchValue_Input);
  });

  function searchWeather(searchValue_Input) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchValue_Input +
      "&appid=54f5d77c61f7b7d7da7d2c41a2956900";
    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      // Create variables for needed data
      var currentCity = response.name;
      var currentDate = moment().subtract(10, "days").calendar();
      var currentTemp =
        Math.round(((response.main.temp * 9) / 5 - 459.67) * 10) / 10;
      var currentHumidity = response.main.humidity;
      var currentWindSpeed = response.wind.speed;
      var currentIcon = response.weather[0].icon;
      var currentLat = response.coord.lat;
      var currentLon = response.coord.lon;
      getUV(currentLat, currentLon);

      // Append city to search history
      var newCitySearch = $("<button>").text(currentCity);
      history.push(searchValue_Input);
      window.localStorage.setItem("history", JSON.stringify(history));

      listGroup_Ul.append(newCitySearch);
      today_Div.append(currentCity);

      // Show current city to dashboard
      // dashboardName_H2.text(currentCity + " (" + currentDate + ") ");
      var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";
      // dashboardIcon_Span.attr("src", iconURL);
      dashboardName_H2.html(
        currentCity + " (" + currentDate + ") " + "<img src='" + iconURL + "'>"
      );
      dashboardTemperature_P.text(
        "Temperature: " + currentTemp + degreeSymbol + "F"
      );
      dashboardHumidity_P.text("Humidity: " + currentHumidity + "%");
      dashboardWind_P.text("Wind Speed " + currentWindSpeed + " MPH");
      dashboardBorder.addClass("border");
      searchForecast(searchValue_Input);
    });
  }

  // UV Data function
  function getUV(currentLat, currentLon) {
    var queryURL =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      currentLat +
      "&lon=" +
      currentLon +
      "&appid=54f5d77c61f7b7d7da7d2c41a2956900";

    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      var uvIndex = response.value;
      dashboardUV_P.html(
        "UV Index: " + "<span id='dashboard-uv-info'>" + uvIndex + "</span>"
      );
      // Color coding UV Index levels
      var uvColorCode = $("#dashboard-uv-info");
      if (uvIndex <= 2) {
        uvColorCode.addClass("bg-success");
      } else if (uvIndex > 2 && uvIndex <= 5) {
        uvColorCode.addClass("bg-warning");
      } else {
        uvColorCode.addClass("bg-danger");
      }
    });
  }

  function searchForecast(searchValue_Input) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchValue_Input +
      "&appid=54f5d77c61f7b7d7da7d2c41a2956900&units=imperial";
    $.ajax({
      type: "GET",
      url: queryURL,
    }).then(function (response) {
      $("#forecast").empty();
      for (var i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          var card = $("<div>").addClass("card");
          var title = $("<h4>").text(
            new Date(response.list[i].dt_txt).toLocaleDateString()
          );
          var icon = $("<img>").attr(
            "src",
            "http://openweathermap.org/img/w/" +
              response.list[i].weather[0].icon +
              ".png"
          );
          var temp = $("<p>").text(
            "Temp: " + response.list[i].main.temp_max + degreeSymbol + "F"
          );
          var humidity = $("<p>").text(
            "Humidity: " + response.list[i].main.humidity + "%"
          );
          card.append(title, icon, temp, humidity);
          $("#forecast").append(card);
        }
      }
    });
  }
  $(".history").on("click", "button", function () {
    searchWeather($(this).text());
  });
});
