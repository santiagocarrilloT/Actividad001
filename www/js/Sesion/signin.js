import {signInUser, auth} from "../Conexion/conexionDB.js";


const iniciarSesion = document.querySelector("#sigIn");

iniciarSesion.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    try{
        await sigIn(email, password);
      }catch(error){
        console.log(error);
      }
});

async function sigIn(email, password){
    signInUser(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        ons.notification.alert("Iniciaste sesión éxito");
        window.open('../Home-html/index.html', '_top');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode ===  'auth/user-not-found') {
            ons.notification.alert('Usuario no encontrado');
        }
        else if (errorCode === 'auth/invalid-email'){
            ons.notification.alert('Correo no válido');
        }
        else if (errorCode === 'auth/invalid-credential'){
            ons.notification.alert('Contraseña incorrecta');
        }
        else{
            ons.notification.alert(errorMessage);
        }
      });
} 