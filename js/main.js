
$(document).ready(function(){

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
          console.log(position.coords.longitude);
      $("#container").html("latitude: " + position.coords.latitude + "<br>longtitude: " + position.coords.longitude);
    });
  }
});
