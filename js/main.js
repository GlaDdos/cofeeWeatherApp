var weatherAPIKey = "6a8f3fff2528a34f3bc0896626b63742";
var daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var toggleTemp = false;
var temp;
//Get position
function getPosition(position){
  var weatherAPIQuery = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric" +"&APPID=" + weatherAPIKey;

  $.getJSON(weatherAPIQuery).done(function(weather){
    console.log(weather);
    console.log("Country: " + weather.sys.country);

    var date = new Date();

    console.log(date);

    $("#container_location").html("<h5>" + daysOfWeek[date.getDay()] + "</h5> <h6>" + months[date.getMonth()] + " " + date.getDate() + "<br><br><h5>" + weather.name + ", " + weather.sys.country + "</h5>");
    $("#container_icon").html('<i class=" wi wi-owm-' + weather.weather[0].id + '"' + "></i>");
    $("#container_weather").html("<h1>"+ Math.round(weather.main.temp) + "&degC"  + "</h1> <h6> " + weather.weather[0].description.capitalize() + "</h6>");

    temp = weather.main.temp;
  })
  .fail(function(){
    console.log("Coudn't get JSON data.");
  });

  $("#container_weather").on("click", function(){
    toggleTemp = !toggleTemp;
    console.log(toggleTemp);

    if(toggleTemp){
        $("#container_weather > h1").html(Math.round(temp) + "&degC");
    }else{
      $("#container_weather > h1").html(Math.round(temp * 1.8000 + 32.00) + "&degF");
    }
  });
}


//getCurrentPosition error handling
function parseError(error){
  switch(error.code){
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation");
      break;

    case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;

    case error.TIMEOUT:
          console.log("The request to get user location has timed out.");
          break;

    case error.UNKNOWN_ERROR:
          console.log("An unknown error eccurred.");
          break;

    default:
      console.log("An unknown error occurred.");
      break;
  }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


$(document).ready(function(){

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPosition, parseError);
  }
  else {
    console.log("Geolocation is not supported by your browser :(");
  }
});
