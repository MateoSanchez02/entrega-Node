
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Configuracion de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBkc_t70SeFyerVJ39DIS1Gxrt0AMVg1Dc",
  authDomain: "proyecto-final-10136.firebaseapp.com",
  projectId: "proyecto-final-10136",
  storageBucket: "proyecto-final-10136.firebasestorage.app",
  messagingSenderId: "96309067501",
  appId: "1:96309067501:web:72b8692ee0e310cffd16e4"
};

//Inicializamos Firebase
const app = initializeApp(firebaseConfig);

//Conectamos la BD
const db = getFirestore(app);

console.log("Conexión exitosa a Firestore vía Web SDK");

//Exporto la base de datos de FB para poder trabajar con ella en los servicios
export { db };