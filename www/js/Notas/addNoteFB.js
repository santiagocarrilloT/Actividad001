import { auth, addDocument, selectCollection, db, validarUser, whereFB, queryFB, getDoc, eliminarNota} from "../Conexion/conexionDB.js";
import {consultaNotas, actualizaFB, deleteNotaFB} from "../Notas/leerNotasFB.js";

let userId = '';
let idNota = '';

const content = document.getElementById('content');

validarUser(auth, async (user) => {
    if (user){
        userId = user.uid;
    }else{
        console.log("No hay usuario");
    }
});

let validacionNota = false;
document.addEventListener('show', (event) => {
    const page1 = event.target;

    //Si está en la página de crear nota, se añaden los eventos a los botones
    if(page1.matches('#pageNav1')){
        //Deshabilitar el scroll del splitMenu
        splitMenu.removeAttribute('swipeable');

        const botonEliminar = page1.querySelector('#btnDelete');
        const botonVolver = page1.querySelector('#backHome');
        const botonCrear = page1.querySelector('#btnCreate');


        if (botonEliminar){
          botonEliminar.addEventListener('click', ()=>{
            content.load('home.html', {value: 'home'})
            .then(async (a) => {
                splitMenu.setAttribute('swipeable', '');
                const userId = extrearID();
                  const userCollection = selectCollection(db, 'notas');
                  const q = queryFB(userCollection, whereFB('user', '==', userId));
                  const querySnapshot = await getDoc(q);
                  querySnapshot.forEach(async (doc) => {
                    if (idNota === doc.id){
                      await deleteNotaFB(doc.id);
                      await consultaNotas(userId);
                    }
                  });
            });
        }, false);
        }
        if (botonVolver){
          botonVolver.addEventListener('click', ()=>{
            content.load('home.html', {value: 'home'})
            .then(async (a) => {
                splitMenu.setAttribute('swipeable', '');
                await consultaNotas(userId);
            });
        }, false);
        }
        //Botón para crear una nota
        if(botonCrear){
            botonCrear.addEventListener('click', async() =>{
              const titulo = page1.querySelector('#textTitle').value;
              const body = page1.querySelector('#textBody').value;
              if(validacionNota === true){
                content.load('home.html', {value: 'home'})
                .then(async (a) => {
                  splitMenu.setAttribute('swipeable', '');
                  try{
                    const userId = extrearID();
                    const userCollection = selectCollection(db, 'notas');
                    const q = queryFB(userCollection, whereFB('user', '==', userId));
                    const querySnapshot = await getDoc(q);
                    querySnapshot.forEach(async (doc) => {
                      if (idNota === doc.id){
                          actualizaFB(doc.id, userId, titulo, body,);
                          await consultaNotas(userId);
                      }
                    });
                }catch(e){
                    console.error("Error al leer los datos: ", e.message);
                }
              });
                
                validacionNota = false;
              }else{
                content.load('home.html', {value: 'home'})
                .then(async (a) => {
                  splitMenu.setAttribute('swipeable', '');
                  const user = extrearID();
                  await agregarNota(user, body, titulo);
                  await consultaNotas(user);
                });
                
              }
            });
        }
    } 
});


async function agregarNota(user, texto, titulo,){
    try {
        const docRef = await addDocument(selectCollection(db, "notas"), {user,texto,titulo});
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export function verificaId(aviso, idNota2){
  if(aviso === "Nota"){
    idNota = idNota2;
    validacionNota = true;
  }else {
    validacionNota =  false;
  }
}

function extrearID() {
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      console.log("No user is signed in.");
      return null;
    }
 }