var historicalOverlay;
var map;

//Подключение карты
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 57.984650, lng: 31.357319}
  });
		
  //наложение мощности культурного слоя

  historicalOverlay = new google.maps.GroundOverlay('image/cult.png', imageBounds);

  historicalOverlay.setOpacity(0.7);

  addOverlay();
		  
  //Границы культурного слоя

  Polygon1 = new google.maps.Polygon({
    map: map,
    paths: cultureCoords,
    strokeColor: 'green',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: 'green',
    fillOpacity: 0.2
  });

  Polygon1.type = 'culture';
  polygons.push(Polygon1);

  //Границы древнего городища
		
	Polygon2 = new google.maps.Polygon({
    map: map,
    paths: townCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.2
  });

  Polygon2.type = 'town';
  polygons.push(Polygon2);
		
  //отрисовка раскопов

  function addMarkers() {

    for(var i=0; i < pitsdata.pits.length; i++) {

      var iwname = new google.maps.InfoWindow({
        content: pitsdata.pits[i].cont
      });

      iw.push(iwname);

      var markername = new google.maps.Marker({
        position: {lat: pitsdata.pits[i].lt, lng: pitsdata.pits[i].ln},
        icon: {
          path: 'M3 3v11h11v-11h-11zM13 13h-9v-9h9v9z',
          scale: 1,
          fillColor: '#000000',
          fillOpacity: 0.8,
        },
        map: map
      });

      markers.push(markername);

      addInfowindows(markername, iwname);
    }  
  }

  function addInfowindows(mk, ifw) {

    mk.addListener('click', function() {
      ifw.open(map, mk);
    });
  }

  addMarkers();
		
}

//функции "показать/скрыть"
	  
function addOverlay() {
  historicalOverlay.setMap(map);
  document.getElementById('cult-thick' ).style.display = 'block';
}

function removeOverlay() {
  historicalOverlay.setMap(null);
  document.getElementById('cult-thick' ).style.display = 'none';
}

function displayPits() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setVisible(true);
  }
  document.getElementById('pit-tag' ).style.display = 'block';
}

function hidePits() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setVisible(false);
  }
  for (var j = 0; j < iw.length; j++) {
    iw[j].close();
  }
  document.getElementById('pit-tag' ).style.display = 'none';
}

function displayPolygon(type, id) {
  for (var i = 0; i < polygons.length; i++) {
    if (polygons[i].type == type) {
      polygons[i].setVisible(true);
      document.getElementById(id).style.display = 'block';
    }
  }
}

function hidePolygon(type, id) {
  for (var i = 0; i < polygons.length; i++) {
    if (polygons[i].type == type) {
      polygons[i].setVisible(false);
      document.getElementById(id).style.display = 'none';
    }
  }
}