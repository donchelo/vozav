import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

export const firebaseConfig = {
  apiKey: "AIzaSyBBNpr7GnqwGskBmpvcK8hBwLp4IT0v6eE",  
  authDomain: "vozav-26f94.firebaseapp.com",
  projectId: "vozav-26f94",
  storageBucket: "vozav-26f94.appspot.com",
  messagingSenderId: "825156724687",
  appId: "1:825156724687:web:c13ad9f3927ae4216e54ba",
  measurementId: "G-J8SPV0B35P",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);