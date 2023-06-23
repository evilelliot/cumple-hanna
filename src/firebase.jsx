import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8nog4YuQbggltpkyJQ2RIk4V6Cx9g9Ow",
  authDomain: "cumple-hanna.firebaseapp.com",
  projectId: "cumple-hanna",
  storageBucket: "cumple-hanna.appspot.com",
  messagingSenderId: "370676385384",
  appId: "1:370676385384:web:45451f0594c102a35e1ddd",
  measurementId: "G-4SHFT9E9LZ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtener la instancia del servicio de autenticación
const auth = getAuth();

// Obtener la instancia del servicio de Firestore
const firestore = getFirestore();

// Configurar el proveedor de autenticación de Google
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, firestore, signInWithPopup, googleAuthProvider };