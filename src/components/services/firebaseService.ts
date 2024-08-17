// src/services/firebaseService.ts

import { auth, db } from "../firebase/firebaseApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const addService = (service: any) => {
  return addDoc(collection(db, "services"), service);
};

export const getServices = async () => {
  const querySnapshot = await getDocs(collection(db, "services"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Añade más funciones según sea necesario
