document.addEventListener("init", () => {
    var btnVibra = document.querySelector('#vibrateBtn');

    if (btnVibra){
        btnVibra.addEventListener('click', () => {
            navigator.vibrate(3000);
        });
    }
    else{
        console.error('El elemento no fue encontrado');
    }
});

function checkConnection() {

}