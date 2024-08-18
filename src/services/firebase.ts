// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Importa Firestore
// import { getAnalytics } from "firebase/analytics";  // Puedes comentar o eliminar esta línea si no usas Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBNpr7GnqwGskBmpvcK8hBwLp4IT0v6eE",
  authDomain: "vozav-26f94.firebaseapp.com",
  projectId: "vozav-26f94",
  storageBucket: "vozav-26f94.appspot.com",
  messagingSenderId: "825156724687",
  appId: "1:825156724687:web:c13ad9f3927ae4216e54ba",
  measurementId: "G-J8SPV0B35P"  // Opcional si no usas Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);  // Comenta o elimina si no usas Analytics
export const auth = getAuth(app);
export const db = getFirestore(app);  // Exporta la instancia de Firestore
