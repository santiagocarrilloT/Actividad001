import {cerrarSesion, auth} from "../Conexion/conexionDB.js";

document.addEventListener("show", function(event) {
    const page1 = event.target;
    if(page1.matches('#homePage')){
        const botonLogOut = document.querySelector("#cerrar");
        if (botonLogOut){
            botonLogOut.addEventListener("click", logOutF,false);
        }
        else{
            console.log("No se encontró el botón");
        }
    }
});

async function logOutF() {
    try{
        await cerrarSesion(auth);
        console.log("Sesión cerrada");
        window.open('../Sesion-html/inicioSesion.html', '_top')
    }catch(error){
        console.log(error);
    }
}