var weatherAPIKey = "6a8f3fff2528a34f3bc0896626b63742";


//Get position
function getPosition(position){
  var weatherAPIQuery = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + weatherAPIKey;

  $.getJSON(weatherAPIQuery).done(function(weather){
    console.log(weather);
    console.log("Country: " + weather.sys.country);
  })
  .fail(function(){
    console.log("Coudn't get JSON data.");
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




$(document).ready(function(){

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPosition, parseError);
  }
  else {
    console.log("Geolocation is not supported by your browser :(");
  }
});
