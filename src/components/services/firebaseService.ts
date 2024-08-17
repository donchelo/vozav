// src/services/firebaseService.ts

import { auth, db } from "../firebase/firebaseApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";

// Función para registrarse con correo electrónico y contraseña
export const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Función para iniciar sesión con correo electrónico y contraseña
export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const logout = () => {
  return signOut(auth);
};

// Función para iniciar sesión con Google
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Función para añadir un servicio a la colección "services"
export const addService = (service: any) => {
  return addDoc(collection(db, "services"), service);
};

// Función para obtener todos los servicios de la colección "services"
export const getServices = async () => {
  const querySnapshot = await getDocs(collection(db, "services"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Función para obtener un servicio específico por su ID
export const getServiceById = async (id: string) => {
  const docRef = doc(db, "services", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Service not found");
  }
};

// Función para obtener el estado de autenticación del usuario
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    }, reject);
  });
};

// Función para obtener los servicios de un usuario específico
export const getServicesByUser = async (userId: string) => {
  const q = query(collection(db, "services"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
