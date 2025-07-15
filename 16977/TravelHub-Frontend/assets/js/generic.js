'use strict';

/**
 *  navbar toggle in mobile
 */

const /**{NodeElement} */ $navbar = document.querySelector("[data-navbar]");
const /**{NodeElement} */ $navToggler = document.querySelector("[data-nav-toggler]");

$navToggler.addEventListener("click",()=> $navbar.classList.toggle("active"));

const $header = document.querySelector("[data-header]");

window.addEventListener("scroll", e => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");

});


// add to favorite button toggle
const $toggleBtns = document.querySelectorAll("[data-toggle-btn]");
$toggleBtns.forEach(
    $toggleBtn =>{
        $toggleBtn.addEventListener("click",()=>{
            $toggleBtn.classList.toggle("active");
        })
    }
)


  // Simulate login check: this could be a token, session flag, etc.
  const isLoggedIn = localStorage.getItem("isLoggedIn");  // example check

  const navbarSection = document.getElementById('navbarUserSection');

  if (isLoggedIn) {
    // User is logged in: show profile icon
    navbarSection.innerHTML = `
      <div class="profile-dropdown">
        <button type="button" class="btn btn-fill label-medium" onclick="toggleDropdown()">Profile</button>
        <ul id="profileMenu" style="display: none; list-style: none; margin: 0.5rem 0.7rem; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); position: absolute;">
          <li><a href="./profile.html">Profile</a></li>
          <li><a href="#" onclick="logout()">Logout</a></li>
        </ul>
      </div>
    `;

  } else {
    // User not logged in: show login/register
    navbarSection.innerHTML = `
      <a href="./login.html" class="btn-link label-medium">Login</a> 
      <a href="./register.html" class="btn btn-fill label-medium">Get Started</a>
    `;
  }

  function toggleDropdown() {
    const menu = document.getElementById("profileMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("jwtToken");
    location.reload(); 
    window.location.href="index.html"; // Refresh page to update navbar
  }
