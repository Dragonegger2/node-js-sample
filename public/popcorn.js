// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.
  
  $(document).ready(function() {
    //initialize();
       
      });

  var pos; 
  var posadd;
  var latlngbounds;
  var markers = [];
  var infowins = [];
  var map = [];
  var mapOptions = {};
  var mc;
  function initialize() {
     Parse.initialize("3ZZzYfo6sI6gsA12WlOM54E3xKIN3nKuna5gQ7b6", "OiuEdsflpfMoLv1GtsjsXkZIwaigT3LItTNa8ei2");
      //$("#data").text("parse connection initialized...");

      var Visits = Parse.Object.extend("PopcornVisits");
      var query = new Parse.Query(Visits);
      query.find({
        success: function(results) {
          drawMap(results);
        },
        error: function(error) {
          alert("error");
        }
      });
  }


function drawMap(parserData){
  
  
  latlngbounds = new google.maps.LatLngBounds(); /*AUTOZOOM*/
  
  //Initialize arrays to hold markers and info windows
  markers = [parserData.length];            
  infowins = [parserData.length]; 
  
  //Set initial map options (start position centered above US)
  mapOptions = {
          zoom: 4,
          center: new google.maps.LatLng(38.37721235785647, -98.10000000000002),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          maxZoom: 15
  }
  
  //Create map object in the space provided in HTML using set map options
  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  

  //Create markers and info windows for each coop in list and store them in previously defined arrays
  for (var i=0;i<parserData.length;i++) {
    infowins[i] = new google.maps.InfoWindow({
        //content: '<div>' + parserData[i][7] + '<br>' + parserData[i][1] + ' <br> ' + parserData[i][2] + ', ' + parserData[i][3] + '<br>' + parserData[i][4] + '<br> Major: ' + parserData[i][5] + '<br> </div> <button class="button" id="selectStart" onclick="openDirectionTab(\''+ parserData[i][1] + " " + parserData[i][2] + ", " + parserData[i][3] + '\')">Get Directions</button>',       
        position: new google.maps.LatLng(parserData[i].get("latitude"), parserData[i].get("longitude")),
        maxWidth: 650
    }); 
    
    markers[i] = new google.maps.Marker({
        position: new google.maps.LatLng(parserData[i].get("latitude"), parserData[i].get("longitude")),
        map: map    
    }); 
    bindInfoWindow(markers[i],map,infowins[i]);
  }
  
  mc = new MarkerClusterer(map, markers);
  mc.setGridSize(20);
 
  //Try HTML5 geolocation, if successful store coordinates in pos variable
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
    
    var geo = new google.maps.Geocoder();
    geo.geocode({'latLng': pos}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK){
    posadd = results[1].formatted_address;
    }
    
    }); 
    
    });
  }
};

function closeInfoWindow() {
  for (var i=0; i <infowins.length; i++){
    infowins[i].close();
  }
  
}
  //Listens for a click on map and calls closeInfoWindow function
  google.maps.event.addListener(map, 'click', closeInfoWindow); 

  
window.addEventListener( "load", initialize, false );
