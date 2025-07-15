auth.onAuthStateChanged((user) => {
  if (!user) return location.href = "login.html";

  db.collection("trains").get().then(snapshot => {
    const list = document.getElementById("trainList");
    snapshot.forEach(doc => {
      const train = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${train.name} | ${train.source} to ${train.destination} | ${train.date}</p>
        <button onclick="bookTrain('${doc.id}')">Book</button>
      `;
      list.appendChild(div);
    });
  });
});

function bookTrain(trainId) {
  const user = auth.currentUser;
  db.collection("bookings").add({
    userId: user.uid,
    trainId: trainId,
    bookedAt: new Date()
  }).then(() => alert("Ticket booked!"));
}
