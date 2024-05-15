document.addEventListener('show', (event) =>{
    const page1 = event.target;

    //Si está en la página de crear nota, se añaden los eventos a los botones
    if(page1.matches('#pageNav1')){
        const botonVolver = page1.querySelector('#backHome');
        const botonCrear = page1.querySelector('#btnCreate');

        //Botón para volver a la página principal
        if(botonVolver){
            botonVolver.addEventListener('click', ()=>{
                content.load('home.html', {value: 'home'})
                .then((a) => {
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
                        .then((a) => {
                            extraerNotas();
                        });
                    }, function(error) {
                        console.log('INSERT error: ' + error.message);
                    });
                });
            });
        }
    }

    //Abrir el formulario para crear una nota
    else if(page1.matches('#homePage')){
        //for (let item of datosNotasList) console.log("hola: "+item);
        //for (let item of datosNotasList) console.log("hola: "+item);
        const aggNota = page1.querySelector('#btnNote');
        if(aggNota || editNota){
            aggNota.addEventListener('click', ()=>{
                content.load('pageNav1.html', {OnComplete: true});
            }, false);
        }
    }
}, false);