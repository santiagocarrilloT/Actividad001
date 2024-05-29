document.addEventListener("init", () => {
    var btnLocation = document.querySelector('#location');

    if(btnLocation){
        btnLocation.addEventListener('click', () =>{

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
                    alert('code: '    + error.code    + '\n' +
                          'message: ' + error.message + '\n');
                }
    
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
                getMap(position.coords.latitude, position.coords.longitude);
                var onMapSuccess = function (position) {
    
                Latitude = position.coords.latitude;
                Longitude = position.coords.longitude;
    
                getMap(Latitude, Longitude);
                alert(Latitude + " " + Longitude);
            }
        })
    }
    else{
        console.error('El elemento con ID btnLocation no fue encontrado.');
    }
});

function getMap(lat, long) {
    var mapOptions = {
        center: new google.maps.LatLng(lat, long),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

