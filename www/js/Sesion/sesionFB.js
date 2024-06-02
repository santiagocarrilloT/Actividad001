import {validarUser, auth, selectCollection, getDoc, db} from "../Conexion/conexionDB.js";

import "./autenticacionFB.js"
import "./logout.js"
import "./signin.js";


validarUser(auth, async (user) => {
    if (user){
        const consulta = await getDoc(selectCollection(db, "usuarios"))
        console.log(consulta);
    }else{

    }
});
