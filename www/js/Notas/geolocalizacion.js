let latitud = ''; 
let altitud = '';
document.addEventListener('init', ()=>{
    const ubicacion = document.querySelector('#swtichUbi');
    if (ubicacion){
        //Verificar si el ons-switch es presionado
        ubicacion.addEventListener('change', (event) => {
            if (event.target.checked){
                pluginMap();
            }else{
                console.log('Desactivado 2');
            }
        });
    }
})

function pluginMap () {
    var options = { enableHighAccuracy: true};
    var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
    };
    
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        ons.notification.alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    var onMapSuccess = function (position) {
        getMap(latitud, Longitude);
        alert(latitud + " " + Longitude);
    }
}