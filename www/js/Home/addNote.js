document.addEventListener('init', () =>{
    const botonNota = document.querySelector('#btnNote');
    if (botonNota){
        botonNota.addEventListener('click', newNote, false);
    }else{
        console.alert('No se presionó el botón');
    }
}, false);

function newNote(){
    const homePage = document.querySelector('#homePage');

    if (homePage) {
        // Encuentra el elemento page__content dentro del <ons-page>
        const pageContent = homePage.querySelector('.page__content');

        if (pageContent) {
            // Crea un nuevo div para la nota
            const newDiv = document.createElement('div');
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
            divIcon.style.background = '#F8D872';
            newDiv.appendChild(divIcon);

            const titleLabel = document.createElement('div');
            titleLabel.textContent = 'MERCADO';
            titleLabel.style.color = 'black';
            titleLabel.style.fontSize = '22px';
            titleLabel.style.fontFamily = 'Roboto';
            titleLabel.style.fontWeight = '700';
            titleLabel.style.lineHeight = '28px';
            //titleLabel.style.wordWrap = 'break-word';
            newDiv.appendChild(titleLabel);

            const descriptionLabel = document.createElement('div');
            descriptionLabel.textContent = 'Huevos - Leche';
            descriptionLabel.style.color = 'rgba(0, 0, 0, 0.70)';
            descriptionLabel.style.fontSize = '16px';
            descriptionLabel.style.fontFamily = 'Roboto';
            descriptionLabel.style.fontWeight = '400';
            descriptionLabel.style.lineHeight = '24px';
            //descriptionLabel.style.wordWrap = 'break-word';
            newDiv.appendChild(descriptionLabel);

            // Agrega el nuevo div al page__content
            pageContent.appendChild(newDiv);
        } else {
            console.error('No se encontró el elemento .page__content');
        }
    } else {
        console.error('No se encontró el <ons-page> con ID #homePage');
    }
}

