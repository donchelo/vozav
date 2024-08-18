import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

let app: FirebaseApp;
let analytics: Analytics | null = null;
let auth: Auth;
let db: Firestore;

try {
  // Inicializar Firebase solo si aún no se ha inicializado
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase App initialized successfully");
  } else {
    app = getApps()[0];
    console.log("Existing Firebase App retrieved");
  }

  // Inicializar Analytics solo si estamos en el navegador y no es un entorno de desarrollo
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    analytics = getAnalytics(app);
    console.log("Analytics initialized successfully");
  }

  auth = getAuth(app);
  console.log("Auth initialized successfully");

  db = getFirestore(app);
  console.log("Firestore initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export { app, analytics, auth, db };