import {cerrarSesion, auth} from "../Conexion/conexionDB.js";

const botonLogOut = document.querySelector("#logOut");
botonLogOut.addEventListener("click", logOutF,false);

async function logOutF() {
    try{
        await cerrarSesion(auth);
        console.log("Sesión cerrada");
    }catch(error){
        console.log(error);
    }
}