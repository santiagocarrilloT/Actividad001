import {validarUser, auth} from "../Conexion/conexionDB.js";
import {abrirNota} from "../Notas/leerNotasFB.js";
let userId = '';

validarUser(auth, async (user) => {
    if (user){
        userId = user.uid;
    }else{
        console.log("No hay usuario");
    }
});


export function informacionNota(titulo, body){
    document.getElementById('textTitle').value = titulo;
    document.getElementById('textBody').value = body;
}

export function agregarDivsFB(titulo, body, idNota){
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
        } 
        else {
            console.error('No se encontró el elemento .page__content');
        }
    }
    else {
        console.error('No se encontró el <ons-page> con ID #homePage');
    }
}

function editarNota (idNota){
    content.load('pageNav1.html', {OnComplete: true}).then(async (a) => {
        await abrirNota(idNota, userId);
    });
}