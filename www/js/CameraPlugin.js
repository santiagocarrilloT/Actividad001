//import { Camera, CameraOptions } from 'cordova-plugin-camera';
document.addEventListener('init', function(event) {
    var page = event.target;

    if (page.matches('#Tab1')){
        var btnCamera = page.querySelector('#cameraBtn');
        btnCamera.addEventListener('click', () => {
            var onSuccess = function (imageURI) {
                var image = document.getElementById('savePictureDv');
                image.src = "data:image/jpeg;base64,"+ imageURI;
            }
            var onFail = function (message) {
                alert('Failed because: ' + message);
            }
            navigator.camera.getPicture(onSuccess, onFail, {quality:50, destinationType: Camera.DestinationType.FILE_URI});
        });
    }
});