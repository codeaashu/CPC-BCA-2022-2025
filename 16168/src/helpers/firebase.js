import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 import { getEnv } from "./getEnv";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  getEnv('VITE_FIREBASE_API'),
  authDomain: "rk-my-app.firebaseapp.com",
  projectId: "rk-my-app",
  storageBucket: "rk-my-app.appspot.com",
  messagingSenderId: "951865672313",
  appId: "1:951865672313:web:69380b1f1fa626c6590aa8",
  measurementId: "G-9H0L1RV38P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}
