document.addEventListener('init', function(event) {
    var page = event.target;

    if (page.matches('#Tab1')){
        var btnDialog = page.querySelector('#dialogBtn');
        btnDialog.addEventListener('click', () => {
            var alertDismissed = function() {
                console.log('El usuario cerro el dialogo.');
            }
           navigator.notification.confirm(
               'You are the winner!',  // message
               alertDismissed,         // callback
               'Winner',            // title
               'Done'                  // buttonName
           );
        });
    }
});