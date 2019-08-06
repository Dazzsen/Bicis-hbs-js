



/////////////MARKERS DE TODAS LAS ESTACIONES DE BICIS DE LAS BICIS QUE NOS DA LA API//////////////////////////////////


////este archivo iria en la carpeta public/javascript

window.onload = () => {




  ////////ARRAY PARA METER MARCADORES /////////////////////////////////////////////////
  let locationsInfo = []
  
  
  
  ///////// en fetch tenemos la api de donde sacar las coordenadas que nos da la api
    fetch('https://services5.arcgis.com/UxADft6QPcvFyDU1/arcgis/rest/services/ComunidadMadrid_Bici_y_TP/FeatureServer/5/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then(response => response.json())
    .then(locations => {
        locations.features.forEach(location => {
  
          //instanciamos un nuevo marcador de la clase de google y abajo de damos posición donde queremos que se dibujen los marcadores
          let marker = new google.maps.Marker({

  //aqui le pasamos las coordenadas como vienen en la api
            position: {lat: location.geometry.y, lng: location.geometry.x},
    //el títle es para que salga un cartel con el nombre de la calle
            title: location.attributes.calle,
        })
          marker.setMap(map)
          
        })
      })
  
      
  
    
    
    /////////////////////////DUBIJAR MAPA  //////////////////////////////////////////////////////////////
  
    let map = new google.maps.Map(document.getElementById('map'),{
      zoom: 14,
      center: {lat: 40.4188929894322, lng: -3.701304838875525}
    })
  
    ///////////////////////NUESTRA POSICION EN EL MAPA/////////////////////////////////////////////////////
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
  
        const infoWindow = new google.maps.InfoWindow;
  
        infoWindow.setPosition(pos);
        infoWindow.setContent('Estás aquí');
        infoWindow.open(map);
        map.setCenter(pos);
      
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.')
  
  
    
  }