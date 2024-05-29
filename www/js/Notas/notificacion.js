document.addEventListener('init', () =>{
    const recordatorio = document.querySelector('#switchNoti');
    

    if (recordatorio){
        //Verificar si el ons-switch es presionado
        recordatorio.addEventListener('change', (event) => {
            if (event.target.checked){
                navigator.notification.beep(1);
                navigator.notification.vibrate(3000);
            }else{
                console.log('Desactivado 1');
            }
        });
    }
})