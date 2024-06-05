document.addEventListener('show', (event) =>{
    const page1 = event.target;

    //Si está en la página de crear nota, se añaden los eventos a los botones
    if(page1.matches('#pageNav1')){
        //Deshabilitar el scroll del splitMenu
        splitMenu.removeAttribute('swipeable');

        const botonCrear = page1.querySelector('#btnCreate');
        

        //Botón para crear una nota
        if(botonCrear){
            botonCrear.addEventListener('click', () =>{
                page1.querySelector('#textTitle').value;
                page1.querySelector('#textBody').value;
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
