// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBNpr7GnqwGskBmpvcK8hBwLp4IT0v6eE",
  authDomain: "vozav-26f94.firebaseapp.com",
  projectId: "vozav-26f94",
  storageBucket: "vozav-26f94.appspot.com",
  messagingSenderId: "825156724687",
  appId: "1:825156724687:web:c13ad9f3927ae4216e54ba",
  measurementId: "G-J8SPV0B35P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
