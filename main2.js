

//////////////////////////////// DIBUJAR RUTAS ////////////////////////////////////////////

//este archivo iria en la carpeta public/javascript

// ESTO DIBUJA EL MAPA EN LA WEB

function startMap() {

  // Store Ironhack's coordinates
  const ironhackBCN = { lat: 41.3977381,  lng: 2.190471916 };

  // Initialize the map
  const map = new google.maps.Map(document.getElementById('map'), 
    {
      zoom: 5,
      center: ironhackBCN
    }
  )

// ESTO ES PARA QUE NOS DE NUESTRA POSICION EN EL MAPA

  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      const ironhackBCNMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here."
      })

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }


//ESTO ES LO QUE DIBUJA LA RUTA

  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer;
//EL user_location  SON LAS COORDENADAS CON NUESTRA LOCALIZACION
  let user_location
  navigator.geolocation.getCurrentPosition( (position) => {
    console.log("permitir")
      user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      const directionRequest = {
        origin: user_location,    //ORIGEN DE LA RUTA QUE SERÁ NUESTRA LOCALIZACIÓN
        destination: ironhackBCN,  //DESTINO (LAS COORDENADAS SE HAN ESTAN EN LA VARIABLE ironhackBDN más arriba)
        travelMode: 'DRIVING'      
      };
      console.log(directionRequest)
      directionsService.route(
        directionRequest,
        function(response, status) {
          
          if (status === 'OK') {
            
            // everything is ok
            directionsDisplay.setDirections(response);
      
          } else {
            // something went wrong
            window.alert('Directions request failed due to ' + status);
          }
        }
      )
      
      directionsDisplay.setMap(map);
    })
  

}



startMap()