import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCXtHw0bDammKO2KdJzTUHZATr4Exgvh9g",
  authDomain: "railway-management-syste-8bfe4.firebaseapp.com",
  projectId: "railway-management-syste-8bfe4",
  storageBucket: "railway-management-syste-8bfe4.firebasestorage.app",
  messagingSenderId: "182948395723",
  appId: "1:182948395723:web:b61ecb90c70b7d6732394e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = "";

  snapshot.forEach(async (docSnap) => {
    const b = docSnap.data();
    const trainDoc = await getDoc(doc(db, "trains", b.trainId));
    const train = trainDoc.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <p>${train.name} | ${train.source} ➝ ${train.destination} | ${train.date}</p>
      <button onclick="cancelBooking('${docSnap.id}', '${b.trainId}')">Cancel</button>
    `;
    bookingList.appendChild(div);
  });
});

// ✅ Cancel Booking
window.cancelBooking = async function (bookingId, trainId) {
  try {
    // Delete booking
    await deleteDoc(doc(db, "bookings", bookingId));

    // Increase train seat count
    const trainRef = doc(db, "trains", trainId);
    const trainSnap = await getDoc(trainRef);
    const trainData = trainSnap.data();

    await updateDoc(trainRef, {
      availableSeats: trainData.availableSeats + 1
    });

    alert("Booking cancelled.");
    location.reload();
  } catch (error) {
    alert("Error cancelling booking: " + error.message);
  }
};
