// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXtHw0bDammKO2KdJzTUHZATr4Exgvh9g",
  authDomain: "railway-management-syste-8bfe4.firebaseapp.com",
  projectId: "railway-management-syste-8bfe4",
  storageBucket: "railway-management-syste-8bfe4.firebasestorage.app",
  messagingSenderId: "182948395723",
  appId: "1:182948395723:web:b61ecb90c70b7d6732394e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export them to use in other scripts
export { auth, db };
