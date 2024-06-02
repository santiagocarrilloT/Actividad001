import {auth, createUser} from  "../Conexion/conexionDB.js"; 

const registro = document.querySelector('#register');
if (registro){
  registro.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try{
      console.log(email, password);
      await login(email, password);
    }catch(error){
      console.log(error);
    }
  });
}


async function login (email, password){
    createUser(auth, email, password)
    .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        ons.notification.alert("Usuario registrado con éxito");
        email.value = "";
        password.value = "";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/email-already-in-use"){
        ons.notification.alert("El correo ya está en uso");
      }
      else if (errorCode === "auth/weak-password"){
        ons.notification.alert("La contraseña debe tener al menos 6 caracteres ");
      }
      else if (errorCode === "auth/invalid-email"){
        ons.notification.alert("Verifica el correo ");
      }
      else {
        ons.notification.alert(errorMessage);
      }
    });
}