// ✅ Get login status from localStorage
let userData = localStorage.getItem("user");
let isLoggedIn = !!userData;

// ✅ Search Functionality
const searchForm = document.querySelector("form[role='search']");
const searchInput = document.querySelector("input[type='search']");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const query = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll(".product-3d-card");

  let found = false;
  cards.forEach(card => {
    const name = card.textContent.toLowerCase();
    if (name.includes(query)) {
      card.classList.remove("hide");
      card.style.display = "inline-block";
      found = true;
    } else {
      card.classList.add("hide");
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });

  if (!found) {
    alert("No juice matched your search!");
  }

  searchInput.value = "";
});

// ✅ Category Filter
function filterProducts(category, btn) {
  document.querySelectorAll('.btn-outline-success').forEach(button => {
    button.classList.remove('active');
  });

  btn.classList.add('active');

  const allCards = document.querySelectorAll('.product-3d-card');
  allCards.forEach(card => {
    if (category === 'all' || card.classList.contains(category)) {
      card.classList.remove("hide");
      card.style.display = "inline-block";
    } else {
      card.classList.add("hide");
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
}

// ✅ Order Button - Requires Login
function goToNearbyPage(productName) {
  if (!isLoggedIn) {
    alert("⚠️ Please log in to place an order.");
    window.location.href = "login..html"; // redirect to your login page
    return;
  }

  const encoded = encodeURIComponent(productName);
  window.location.href = `test.html?product=${encoded}`;
}

// ✅ Chatbox Toggle
const recommendBtn = document.getElementById("recommendBtn");
const chatPopup = document.getElementById("chatPopup");
const closeChat = document.getElementById("closeChat");

recommendBtn.onclick = () => {
  chatPopup.style.display = "flex";
};

closeChat.onclick = () => {
  chatPopup.style.display = "none";
  document.getElementById("chatMessages").innerHTML = "";
};

// ✅ Chatbot (Offline – No API)
document.getElementById("submitInput").onclick = () => {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  appendMessage("bot", "⏳ Thinking...");

  setTimeout(() => {
    removeLastMessage();
    appendMessage("bot", getLocalSuggestion(message));
  }, 1000);
};

// ✅ Predefined Juice Suggestions
function getLocalSuggestion(message) {
  const lower = message.toLowerCase();

  if (lower.includes("cold") || lower.includes("cough")) {
    return "Try tulsi-ginger tea or orange juice with turmeric.";
  } else if (lower.includes("fever")) {
    return "Papaya juice and coconut water help during fever.";
  } else if (lower.includes("weight")) {
    return "Cucumber + mint + lemon juice is good for weight loss.";
  } else if (lower.includes("energy")) {
    return "Try banana smoothie or beetroot juice for energy.";
  } else if (lower.includes("skin")) {
    return "Carrot and tomato juice improves skin glow.";
  } else if (lower.includes("hair")) {
    return "Spinach and amla juice helps with hair health.";
  } else if (lower.includes("digestion")) {
    return "Aloe vera juice or jeera water helps digestion.";
  } else {
    return "Try beetroot + amla + apple + ginger juice. It's super healthy!";
  }
}

// ✅ Chat Message UI
function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
  div.textContent = text;
  document.getElementById("chatMessages").appendChild(div);
  div.scrollIntoView({ behavior: "smooth" });
}

function removeLastMessage() {
  const msgs = document.querySelectorAll(".chatbox-body .message");
  if (msgs.length) msgs[msgs.length - 1].remove();
}

// ✅ Dynamic Login/Logout Button in Navbar
function updateAuthButton() {
  const authArea = document.getElementById("authButtonArea");
  if (!authArea) return;

  if (isLoggedIn) {
    const user = JSON.parse(userData);
    authArea.innerHTML = `
      <span class="me-2 text-success">Welcome, ${user.name || user.email}</span>
      <button class="btn btn-outline-danger btn-sm" onclick="logoutUser()">Logout</button>
    `;
  } else {
    authArea.innerHTML = `
      <a href="login..html" class="btn btn-success btn-sm">Login / Get Started</a>
    `;
  }
}

// ✅ Logout clears localStorage
function logoutUser() {
  localStorage.removeItem("user");
  isLoggedIn = false;
  alert("You have been logged out.");
  updateAuthButton();
  location.reload();
}

// ✅ Initialize on page load
updateAuthButton();
