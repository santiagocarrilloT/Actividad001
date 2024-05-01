document.addEventListener("init", () => {
    var btnOrient = document.querySelector('#orientBtn');

    if (btnOrient){
        btnOrient.addEventListener('click', () => {
            screen.orientation.lock('landscape');
            ons.notification.alert('Orientation is ' + screen.orientation.type);
        });
    }
    else{
        console.error('El elemento no fue encontrado.');
    }
});