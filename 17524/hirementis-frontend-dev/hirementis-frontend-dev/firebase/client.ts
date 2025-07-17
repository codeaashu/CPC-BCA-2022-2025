// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzdBrNLlXnGv2p40d4qRRy_j8aoywgkis",
  authDomain: "eduprep-fdc06.firebaseapp.com",
  projectId: "eduprep-fdc06",
  storageBucket: "eduprep-fdc06.firebasestorage.app",
  messagingSenderId: "31019494091",
  appId: "1:31019494091:web:1bb0914070044f51b7894e",
  measurementId: "G-HLGS9QGXQS"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
