import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase/config";

// Registro de usuario
export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in registerUser: ${error.message}`);
    } else {
      throw new Error("Unknown error in registerUser");
    }
  }
};

// Inicio de sesión
export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in loginUser: ${error.message}`);
    } else {
      throw new Error("Unknown error in loginUser");
    }
  }
};

// Cierre de sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in logoutUser: ${error.message}`);
    } else {
      throw new Error("Unknown error in logoutUser");
    }
  }
};
