import {validarUser, auth} from "../Conexion/conexionDB.js";
import {consultaNotas} from "../Notas/leerNotasFB.js";

let currentPage = '';
const content = document.getElementById('content');
const splitMenu = document.getElementById('splitMenu');
let userId = '';

validarUser(auth, async (user) => {
    if (user){
        userId = user.uid;
    }else{
        console.log("No hay usuario");
    }
});

document.addEventListener('show', () => {
    const homeButton = document.getElementById('home');
    const settingsButton = document.getElementById('settings');
    const aboutButton = document.getElementById('about');
    const openToolHome = document.getElementById('openHome');
    const openToolSett = document.getElementById('openSetting');
    const openToolAbout = document.getElementById('openAbout');

    //Acciones de los botones del split para cargar la ventana
    const loadHomePage = () => {
        loadPage('home.html')
    };

    const loadSettingsPage = () => {
        loadPage('settings.html')
    };

    const loadAboutPage = () => {
        loadPage('about.html')
    };

    // Asociar funciones de carga de páginas a los eventos de click
    if (homeButton) {
        homeButton.addEventListener('click', loadHomePage);
    }

    if (settingsButton) {
        settingsButton.addEventListener('click', loadSettingsPage);
    }

    if (aboutButton) {
        aboutButton.addEventListener('click', loadAboutPage);
    }

    // Asociar función para abrir el menú lateral al hacer click en el botón de menú en la barra de herramientas
    if (openToolHome) {
        openToolHome.addEventListener('click', openMenu);
    }

    if (openToolSett) {
        openToolSett.addEventListener('click', openMenu);
    }

    if (openToolAbout) {
        openToolAbout.addEventListener('click', openMenu);
    }
});

const openMenu = () => {
    splitMenu.open();
};

const loadPage = (page) => {
    if (currentPage !== page) {
        content.load(page, { animation: 'fade' }).then(async ()=>{
            splitMenu.close();
            await consultaNotas(userId);
        })
        currentPage = page;
    }
};