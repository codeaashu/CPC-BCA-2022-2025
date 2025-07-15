// ✅ Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCXtHw0bDammKO2KdJzTUHZATr4Exgvh9g",
  authDomain: "railway-management-syste-8bfe4.firebaseapp.com",
  projectId: "railway-management-syste-8bfe4",
  storageBucket: "railway-management-syste-8bfe4.firebasestorage.app",
  messagingSenderId: "182948395723",
  appId: "1:182948395723:web:b61ecb90c70b7d6732394e"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Registration Handler
document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Account created successfully! Please log in.");
      return signOut(auth); // 🚪 Logout after registration
    })
    .then(() => {
      window.location.href = "login.html"; // 🔁 Redirect to login
    })
    .catch(err => alert("Register failed: " + err.message));
});

// ✅ Login Handler
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // ✅ Redirect to dashboard
    })
    .catch(err => alert("Login failed: " + err.message));
});

// ✅ Logout Function
window.logout = function () {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch(err => alert("Logout failed: " + err.message));
};
