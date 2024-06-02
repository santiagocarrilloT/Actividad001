import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { doc, getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLayn3WjQjSKleEUtZDkvV4Thef4VusxE",
  authDomain: "notesweb-97228.firebaseapp.com",
  projectId: "notesweb-97228",
  storageBucket: "notesweb-97228.appspot.com",
  messagingSenderId: "615595474592",
  appId: "1:615595474592:web:f44ad8879d33c6a12e13c5",
  measurementId: "G-66KHHX1ZVV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const createUser = createUserWithEmailAndPassword;
export const cerrarSesion = signOut;
export const validarUser = onAuthStateChanged;
export const signInUser = signInWithEmailAndPassword;
export const selectCollection = collection;
export const getDoc = getDocs; 