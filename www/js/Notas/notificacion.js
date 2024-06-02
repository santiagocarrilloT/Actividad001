document.addEventListener('init', () =>{
    const recordatorio = document.querySelector('#switchNoti');

    if (recordatorio){
        //Verificar si el ons-switch es presionado
        recordatorio.addEventListener('change', (event) => {
            if (event.target.checked){
                navigator.notification.beep(1);
                calendario();
            }else{
                console.log('Desactivado 1');
            }
        });
    }
})

function calendario(){
    const calendarEl = document.querySelector('#calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
      });

      calendar.render();
}