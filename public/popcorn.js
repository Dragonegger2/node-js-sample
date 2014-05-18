// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.
  
  $(document).ready(function() {
    initialize();
        Parse.initialize("3ZZzYfo6sI6gsA12WlOM54E3xKIN3nKuna5gQ7b6", "OiuEdsflpfMoLv1GtsjsXkZIwaigT3LItTNa8ei2");
        $("#data").text("parse connection initialized...");

        var Visits = Parse.Object.extend("PopcornVisits");
        var query = new Parse.Query(Visits);
        query.find({
          success: function(results) {
            //alert(results[0].get("address"));
            var arrayLength = results.length;
            for(var i = 0; i < arrayLength; i++ ){
              $("#data").append("<p>" + results[i].get("address") + "</p>");

              var marker = new google.maps.Marker( {
                position: myLatlng,
                map: map,
                title:results[i].get("address")
              });

              marker.setMap();
            }
            console.log(results);
          },
          error: function(error) {
            alert("error");
          }
        });
      });



  function dontVisit(position) {
      //showMap(position.coords.latitude, position.coords.longitude, true);
      console.log("Don't visit: " );
      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);
    }

  function visitAgain(position) {
      console.log("Visit Again: " );
      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);
    }
  var map;
  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

  function initialize() {

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    marker.setMap(map);

    var mapOptions = {
      zoom: 17
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);


    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'Location found using HTML5.'
        });

        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }

  google.maps.event.addDomListener(window, 'load', initialize);
