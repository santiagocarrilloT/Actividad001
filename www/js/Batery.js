document.addEventListener("init", () => {
    var btnBatery = document.querySelector('#batery');

    if (btnBatery){
        btnBatery.addEventListener('click', () => {
            var bateryStatus = function(status) {
                ons.notification.alert("Level: " + (status.level*100) + "%" + '\n' +
                "IsPlugged: " + status.isPlugged);
            }
            function onError(error) {
                 ons.notification.alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
            }
            navigator.getBattery().then(bateryStatus, onError);
        });
    }
    else{
        console.error('El elemento no fue encontrado.');
    }
});