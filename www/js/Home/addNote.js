document.addEventListener('show', (event) =>{
    const page1 = event.target;

    //Si está en la página de crear nota, se añaden los eventos a los botones
    if(page1.matches('#pageNav1')){
        //Deshabilitar el scroll del splitMenu
        splitMenu.removeAttribute('swipeable');

        const botonVolver = page1.querySelector('#backHome');
        const botonCrear = page1.querySelector('#btnCreate');

        //Botón para v la página principal
        if(botonVolver){
            botonVolver.addEventListener('click', ()=>{
                content.load('home.html', {value: 'home'})
                .then((a) => {
                    splitMenu.setAttribute('swipeable', '');
                    extraerNotas();
                });
            }, false);
        }

        //Botón para crear una nota
        if(botonCrear){
            botonCrear.addEventListener('click', () =>{
                const titulo = page1.querySelector('#textTitle').value;
                const body = page1.querySelector('#textBody').value;
                global_database.transaction(function(tx) {
                    tx.executeSql('INSERT INTO notas (titulo, body, notificacion) VALUES (?,?,?)', [titulo, body, true], function(tx, rs) {
                        content.load('home.html', {value: 'home'})
                        .then(extraerNotas());
                    }, function(error) {
                        console.log('INSERT error: ' + error.message);
                    });
                });
            });
        }
    }

    //Abrir el formulario para crear una nota
    else if(page1.matches('#homePage')){
        const aggNota = page1.querySelector('#btnNote');
        if(aggNota){
            aggNota.addEventListener('click', () => {
                content.load('pageNav1.html')
            }, false);
        }
    }
}, false);

function editarNota (idNota){
    content.load('pageNav1.html', {OnComplete: true}).then((a) => {
        console.log(informacionNota(idNota));
    });
}