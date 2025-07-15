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


//   // search the location 
// async function handleSearch() {
//   const location = document.getElementById("searchInput").value.trim();
//   const resultsContainer = document.getElementById("hotelResults");

//   if (!location) {
//     resultsContainer.innerHTML = "<p>Please enter a location to search.</p>";
//     return;
//   }

//   try {
//     const response = await fetch(`http://127.0.0.1:9999/api/hotels/search?location=${location}`);
//     const hotels = await response.json();

//     resultsContainer.innerHTML = ""; // Clear old results

//     if (hotels.length === 0) {
//       resultsContainer.innerHTML = "<p>No hotels found for the given location.</p>";
//       return;
//     }

//     hotels.forEach(hotel => {
//       const card = document.createElement('div');
//       card.style.border = '1px solid #ddd';
//       card.style.borderRadius = '10px';
//       card.style.padding = '15px';
//       card.style.marginBottom = '15px';
//       card.style.cursor = 'pointer';

//       card.innerHTML = `
//         <h2 style="margin: 0 0 10px;">${hotel.name}</h2>
//         <p><strong>Location:</strong> ${hotel.location}</p>
//         <p><strong>Description:</strong> ${hotel.description}</p>
//         <p><strong>Price Per Night:</strong> ₹${hotel.pricePerNight}</p>
//         <p><strong>Total Rooms:</strong> ${hotel.totalRooms}</p>
//         <p><strong>Seller:</strong> ${hotel.sellerUsername}</p>
//       `;

//       // Add amenities
//       const amenitiesDiv = document.createElement('div');
//       amenitiesDiv.style.marginTop = '10px';
//       amenitiesDiv.style.display = 'flex';
//       amenitiesDiv.style.flexWrap = 'wrap';
//       amenitiesDiv.style.gap = '8px';

//       hotel.amenities.forEach(amenity => {
//         const tag = document.createElement('span');
//         tag.style.backgroundColor = '#3498db';
//         tag.style.color = '#fff';
//         tag.style.padding = '5px 10px';
//         tag.style.borderRadius = '20px';
//         tag.style.fontSize = '0.85em';
//         tag.textContent = amenity;
//         amenitiesDiv.appendChild(tag);
//       });

//       card.appendChild(amenitiesDiv);

//       // Optional: add click event for detail page
//       card.addEventListener('click', () => {
//         window.location.href = `property-details.html?id=${hotel.id}`;
//       });

//       resultsContainer.appendChild(card);
//     });

//   } catch (error) {
//     console.error("Error fetching hotels:", error);
//     resultsContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
//   }
// }



    const API_URL = 'http://127.0.0.1:9999/api/hotels/all'; // Change if needed

    async function loadPropertiesIndex() {
      try {
        const response = await fetch(API_URL);
        const properties = await response.json();
        console.log(properties);

        const grid = document.getElementById('propertyGrid');
        grid.innerHTML = ''; // Clear any existing content


        properties.forEach(prop => {
          const card = document.createElement('div');
          card.className = 'property-card';
          card.style.cursor = 'pointer';
          
     
          card.innerHTML = `
            <img src="assets/images/${prop.id}.jpeg" alt="Property Image" class="property-image">
            <div class="property-details">
              <h2>${prop.name}</h2>
              <p class="price">₹${prop.pricePerNight} / night</p>
              <p>📍 ${prop.location} </p>
             <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px;">
                ${prop.amenities.map(item => `<span style="background-color: 0D3166; color: #fff; padding: 5px 10px; border-radius: 20px; font-size: 0.85em;">${item}</span>`).join("")}
              </div>
              
              
            </div>
            
          `;
            // 👇 Add click event
            card.addEventListener('click', () => {
                window.location.href = `hotelDetails.html?id=${prop.id}`;
            });
          grid.appendChild(card);
        });

      } catch (err) {
        console.error("Error loading properties:", err);
        let tagDetail = document.getElementById('propertyGrid');
        if(tagDetail!=null){
          tagDetail.innerHTML = `<p>Failed to load properties. Please check the API or console.</p>`;
        }
      }
    }

    window.onload = loadPropertiesIndex;