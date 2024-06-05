import {validarUser, auth, selectCollection, getDoc, db, whereFB, queryFB, actualizarNota, docAct, eliminarNota} from "../Conexion/conexionDB.js";
import {agregarDivsFB, informacionNota} from "../Home/cargarNotasDB.js";
import {verificaId} from "./addNoteFB.js";


validarUser(auth, async (user) => {
    if (user){
        await consultaNotas(user.uid);
    }else{
        console.log("No hay usuario");
    }
});

export async function consultaNotas(userId){
    try{
        const userCollection = selectCollection(db, 'notas');
        const q = queryFB(userCollection, whereFB('user', '==', userId));
        const querySnapshot = await getDoc(q);
        leerDatos(querySnapshot);
    }catch(e){
        console.error("Error al leer los datos: ", e.code);
    }

}
/* document.addEventListener('show',  (event) => {
    const page = event.target;

    if(page.matches('#homePage')){
        const userId = verID();
        console.log(userId);
    }else{
        console.log("No es la página homePage");
    }

    try{
        
        const userCollection = selectCollection(db, 'notas');
        console.log(userCollection);
        const q = queryFB(userCollection, whereFB('user', '==', userId));
        const querySnapshot = await getDoc(q);
        await leerDatos(querySnapshot);
    }catch(e){
        console.error("Error al leer los datos: ", e);
    }
});*/

function leerDatos (data) {
    data.forEach((doc) => {
        agregarDivsFB(doc.data().titulo, doc.data().texto, doc.id);
      });
}
export async function abrirNota(idNota, userId){
    try{
        const userCollection = selectCollection(db, 'notas');
        const q = queryFB(userCollection, whereFB('user', '==', userId));
        const querySnapshot = await getDoc(q);
        querySnapshot.forEach((doc) => {
            if (idNota === doc.id){
                verificaId("Nota", idNota);
                informacionNota(doc.data().titulo, doc.data().texto);
            }
          });
    }catch(e){
        console.error("Error al leer los datos: ", e.code);
    }
}
export async function actualizaFB(idNota, userId, titulo, body){
    try{
        const notaActu = docAct(db, "notas", idNota);

        // Set the "capital" field of the city 'DC'
        await actualizarNota(notaActu, {
            titulo: titulo,
            texto: body
});
    }catch(e){
        console.error("Error al leer los datos: ", e.message);
    }
}

export async function deleteNotaFB(idNota){
    try{
        await eliminarNota(docAct(db, "notas", idNota));
        
    }catch(e){
        console.error("Error al leer los datos: ", e.message);
    }
}