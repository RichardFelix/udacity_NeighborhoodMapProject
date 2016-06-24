'use strict';

var googleKey = "AIzaSyCGP6-L9ntH38R_At3QT2mvsIDLiTZIfnY";

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7396571, lng: -73.8668013},
    zoom: 11
  });
}
