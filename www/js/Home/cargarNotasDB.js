document.addEventListener('deviceready', extraerNotas, false);

let datosNotasList = new Set();
function extraerNotas(){
    global_database.transaction(function(tx){
        tx.executeSql('SELECT * FROM notas', [], function(tx, rs){
            if (rs.rows.length > 0){
                for(i = 0; i < rs.rows.length; i++){
                    const datosNotas = rs.rows.item(i);
                    datosNotasList.add(datosNotas.id_notas);
                    agregarDivs(datosNotas.titulo, datosNotas.body, datosNotas.id_notas);
                }
            }else{
                console.error('No se encontraron datos en notas');
            }
        }, function(error){
            console.error('El comando no ha sido correcto', error);
        });
    });
}

/*function busquedasNotas() {
    global_database.transaction(function(tx){
        tx.executeSql('SELECT * FROM notas', [], function(tx, rs){
            if (rs.rows.length > 0){
                for(i = 0; i < rs.rows.length; i++){
                    const datosNotas = rs.rows.item(i);
                    return datosNotas;
                }
            }
            else{
                console.error('No se encontraron datos en notas');
            }
        }, function(error){
            console.error('El comando no ha sido correcto', error);
        });
    });
}*/

function nuevaNota(){
    global_database.transaction(function(tx) {
        tx.executeSql('INSERT INTO notas (titulo, body, notificacion) VALUES (?,?,?)', ['titulo1', 'body', true], function(tx, rs) {
            console.log('Registro en cargarNotas insertado con éxito');
        }, function(error) {
            console.log('INSERT error: ' + error.message);
        });
    });
    global_database.transaction(function(tx) {
        tx.executeSql('INSERT INTO notas (titulo, body, notificacion) VALUES (?,?,?)', ['titulo2', 'body2', true], function(tx, rs) {
            console.log('Registro en cargarNotas insertado con éxito');
        }, function(error) {
            console.log('INSERT error: ' + error.message);
        });
    });
}

function informacionNota(idNota){
    console.log("info "+idNota);
    global_database.transaction(function(tx){
        tx.executeSql('SELECT * FROM notas WHERE id_notas = ?', [idNota], function(tx, rs){
            if (rs.rows.length > 0){
                const datosNotas = rs.rows.item(0);
                console.log("infor: "+datosNotas.titulo+" "+datosNotas.body+" "+datosNotas.id_notas);
                document.getElementById('textTitle').value = datosNotas.titulo;
                document.getElementById('textBody').value = datosNotas.body;
                return datosNotas;
            }else{
                console.error('No se encontraron datos en notas');
            }
        }, function(error){
            console.error('El comando no ha sido correcto', error);
        });
    });

}

function agregarDivs(titulo, body, idNota){
    const homePage = document.querySelector('#homePage');

    if (homePage) {       
        // Encuentra el elemento page__content dentro del <ons-page>
        const pageContent = homePage.querySelector('.page__content');

        if (pageContent) {
            // Crea un nuevo div para la nota
            const newDiv = document.createElement('div');
            newDiv.classList.add('divBtn');
            newDiv.id = idNota; 
            newDiv.style.width = '281px';
            newDiv.style.height = '133px';
            newDiv.style.paddingTop = '38px';
            newDiv.style.paddingBottom = '32px';
            newDiv.style.paddingLeft = '32px';
            newDiv.style.paddingRight = '32px';
            newDiv.style.background = '#F8D872';
            newDiv.style.boxShadow = '4px 4px 0px black';
            newDiv.style.border = '1px black solid';
            newDiv.style.flexDirection = 'column';
            newDiv.style.justifyContent = 'flex-start';
            newDiv.style.alignItems = 'flex-start';
            newDiv.style.gap = '12px';
            newDiv.style.display = 'inline-flex';

            const divIcon = document.createElement('div');
            divIcon.style.width = '279px';
            divIcon.style.height = '16px';
            divIcon.style.background = '#F5B332';
            newDiv.appendChild(divIcon);

            const titleLabel = document.createElement('div');
            titleLabel.style.alignSelf = 'stretch';
            titleLabel.textContent = titulo;
            titleLabel.style.color = 'black';
            titleLabel.style.fontSize = '22px';
            titleLabel.style.fontFamily = 'Roboto';
            titleLabel.style.fontWeight = '700';
            titleLabel.style.lineHeight = '28px';
            titleLabel.style.wordWrap = 'break-word';
            newDiv.appendChild(titleLabel);

            const descriptionLabel = document.createElement('div');
            descriptionLabel.style.alignSelf = 'stretch';
            descriptionLabel.textContent = body;
            descriptionLabel.style.color = 'rgba(0, 0, 0, 0.70)';
            descriptionLabel.style.fontSize = '16px';
            descriptionLabel.style.fontFamily = 'Roboto';
            descriptionLabel.style.fontWeight = '400';
            descriptionLabel.style.lineHeight = '24px';
            descriptionLabel.style.wordWrap = 'break-word';
            newDiv.appendChild(descriptionLabel);

            const selectNota = document.createElement('ons-button');
            selectNota.id = idNota;
            selectNota.style.backgroundColor = 'transparent';
            selectNota.style.paddingTop = '10px';
            selectNota.style.paddingBottom = '20px';
            selectNota.addEventListener('click', () => editarNota(idNota), false);
            selectNota.appendChild(newDiv);

            // Agrega el nuevo div al page__content
            pageContent.prepend(selectNota); 

            /*pageContent.addEventListener('click', (event) =>{
                if(event.target.classList.contains('divBtn')){
                    const id = event.target.id;
                    console.log('ID de la nota seleccionada: ' + id);
                    editarNota(id);
                }else{
                }
            });*/
        } 
        else {
            console.error('No se encontró el elemento .page__content');
        }
    }
    else {
        console.error('No se encontró el <ons-page> con ID #homePage');
    }
}