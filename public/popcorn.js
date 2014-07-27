// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var latitude = "Latitude";
var longitude = "Longitude";  

  $(document).on('click',".address", function(e) {
    var $this = $(this);
    console.log("Longitude: " + $this.attr("lon") + " Latitude: " + $this.attr("lat"));
    changeCenter($this.attr("lon"), $this.attr("lat"));
    e.preventDefault();
  }); 
  function changeCenter(lon, lat) {
      mapOptions = {
          zoom: 10,
          center: new google.maps.LatLng(lat, lon),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          maxZoom: 15
    }
    drawMap(false);
  }

  var pos; 
  var posadd;
  var latlngbounds;
  var markers = [];
  var infowins = [];
  var map = [];
  var mapOptions = {};
  var mc;
  var showClustering = true;
  var parserData = [];

  function init() {
    $.get( "http://localhost:8080/lake", function( data ) { 
      //alert(data); myData = data;
        parserData = data;  
        drawMap(true);
    });
  };

function toggleClustering() {
  if(showClustering) {
    showClustering = false;
  }
  else {
    showClustering = true;
  }
  drawMap(false);
}

function drawMap(bool){
  latlngbounds = new google.maps.LatLngBounds(); /*AUTOZOOM*/
  
  //Initialize arrays to hold markers and info windows
  markers = [parserData.length];            
  infowins = [parserData.length]; 
  
  //Set initial map options (start position centered above US)
  if(bool) {
    mapOptions = {
      zoom: 8,        
      center: new google.maps.LatLng(Number(parserData[parserData.length-1].Latitude), Number(parserData[parserData.length-1].Longitude)),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      maxZoom: 15
    }
    for (var i=0;i<parserData.length;i++) {
            //This is the place where I fill out elements.
        var temporaryString = parserData[i].Name;
      $("#data").append("<p class='address' lon='" + Number(parserData[i].Longitude) +"' lat='"+Number(parserData[i].Latitude) + "'>" + temporaryString + "</p>");
    }
  }
  //Create map object in the space provided in HTML using set map options
  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

  //Create markers and info windows for each coop in list and store them in previously defined arrays
  
  for (var i=0;i<parserData.length;i++) {
        markers[i] = new google.maps.Marker({
          position: new google.maps.LatLng(Number(parserData[i].Latitude), Number(parserData[i].Longitude)),
          map: map
        }); 
  }
  
  if(showClustering) {
    mc = new MarkerClusterer(map, markers);
    mc.setGridSize(20);
  }
};

function closeInfoWindow() {
  for (var i=0; i <infowins.length; i++){
    infowins[i].close();
  }
  
}

function bindInfoWindow(marker, map, infowindow){
  google.maps.event.addListener(marker, 'click', function() {
    for(var i=0; i < parserData.length; i++){
    infowins[i].close();    
    }
    infowindow.open(map,marker);
  });
  

}
  //Listens for a click on map and calls closeInfoWindow function
  google.maps.event.addListener(map, 'click', closeInfoWindow); 

  
window.addEventListener( "load", init, false );
