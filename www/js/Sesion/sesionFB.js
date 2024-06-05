import {validarUser, auth} from "../Conexion/conexionDB.js";

import "./autenticacionFB.js"
import "./logout.js"
import "./signin.js";


validarUser(auth, async (user) => {
    if (user){
        window.open('../Home-html/index.html', '_top');
    }else{

    }
});
