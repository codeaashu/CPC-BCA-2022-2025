document.addEventListener('DOMContentLoaded', function() {
  
  // Select all nav-option elements
  const navOptions = document.querySelectorAll('.nav-option');
  const nav = document.querySelector('nav.nav');


  // Simulate a click on the "dashboard" option by default
  const dashboardOption = document.getElementById('dashboard');
  dashboardOption.click();

    // Add click event listener to menu icon
    const menuIcon = document.getElementById('menuicn');
    menuIcon.addEventListener('click', function() {
      const nav = document.querySelector('nav.nav');
      nav.classList.toggle('nav-active');
    });


  // Add click event listeners to each nav-option (using arrow function)
  navOptions.forEach(option => option.addEventListener('click', () => {
    const id = option.id;
    handleNavClick(id);
  }));

  



  function handleNavClick(id) {
    if (id === 'logout') {
      // Redirect to login page or handle logout here
      window.location.href = 'logout.php'; // Change 'login.html' to your actual login page
    } else {
      updateBoxContainer(id);
      slideNavOption(id);
    }
  }

  function updateBoxContainer(id) {
    const boxContainer = document.querySelector('.box-container');

    // Define content for each option
    const content = {
      dashboard: `
        <div class="box box4">
          <div class="text">
            <h2 class="topic-heading">0</h2>
            <h2 class="topic">Tests</h2>
          </div>
          <img src="assets/images/test.png" alt="published">
        </div>

        <div class="box box1">
          <div class="text">
            <h2 class="topic-heading">0</h2>
            <h2 class="topic">Average Percentage</h2>
          </div>
          <img src="assets/images/avg.png" alt="Views">
        </div>

        <div class="box box2">
          <div class="text">
            <h2 class="topic-heading">0</h2>
            <h2 class="topic">Highest Percentage</h2>
          </div>
          <img src="assets/images/high.png" alt="likes">
        </div>

        <div class="box box3">
          <div class="text">
            <h2 class="topic-heading">0</h2>
            <h2 class="topic">Topper Percentage</h2>
          </div>
          <img src="assets/images/top.png" alt="comments">
        </div>

        <div class="report-container">
          <div class="report-header">
            <h1 class="recent-Articles">List of Tests</h1>
            
          </div>

          <div class="report-body">
          <div>
          <button id="test-container" onclick="loadtestgivenData()" type="submit" class="btn btn-warning" style="width: 87vw">List Of Test</button></div>
          <div name="test_cont" id="test-container" class="table-responsive"></div>
          </div>
        </div>
      `,
      profile: `
        <div class="profile-summary">
          <h2>Profile Details</h2>
          <p>Name: ${studentName}</p>
          <p>ID No: ${studentID}</p>
          <p>Gender: ${studentGen}</p>
        </div>

        <div class="profile-picture">
          <img class="profile_images"src="${(studentGen === 'male') ? 'assets/images/male.png' : 'assets/images/female.png'}" alt="Profile Picture">
        </div>

        <div class="profile-stats">
          <div class="box box5">
            <div class="text">
            <h2 class="topic-heading">0</h2>
            <h2 class="topic">Completed Tests</h2>
            </div>
          </div>
          <div style="margin-top: 2rem" class="box box6">
          <div class="text">
            <h2 class="topic-heading">0</h2>
            <h2 class="topic">Average Percentage</h2>
            </div>
          </div>
        </div>
        <div>
          <h2 style="margin-top: 2rem;text-align: center;">Your Progress Report will updoaded as soon as possible</h2>
        </div>
        <div>
          <img class="profile_images" src="assets/images/chart.png">
        </div>
      `,
      test: `
      <div class="test-details">
      <h1 class="test-heading" style="font-family: fantasy;font-size: 8rem;margin-left: 42px;">Start Test</h1>
      <p class="test-description" style="font-family: cursive;font-size: 1.3rem;margin-left: 48px;margin-top: 45px;width: 63vw;">Enter the required details below to start the test.</p>

      <form id="testForm" method="POST">
        <div class="test-form" style="display: block;margin-top:48px">
          <div class="form-group">
            <label for="techID" style="font-size:22px;min-width:114px">Teacher ID:</label>
            <input type="number" name="techID" id="techID" placeholder="Enter your Teacher ID" style="color: black;height: 47px;font-size: 18px;" class="test-input">
          </div>
          <div class="form-group">
            <label for="testID" style="font-size:22px;min-width:114px">Test ID:</label>
            <input type="number" name="testID" id="testID" placeholder="Enter Test ID" style="color: black;height: 47px;font-size: 18px;" class="test-input">
          </div>
          <div class="form-group">
            <button class="btn btn-primary start-test-button" id="startTestButton" type="button">Submit</button>
          </div>
        </div>
      </form>
    </div>
      `,
      settings: `
        <div class="settings-options">
          <center>
            <h2>Settings</h2>
          </center>
          <br>
          <div style="width:20rem" class="box">
            <h2 class="topic-heading">Account Settings</h2>
            <p style="margin-left:2rem">Update your account details and preferences.</p>
            <br>
          </div>

          <div style="margin-top: 2rem; width: 20rem;" class="box">
            <h2 class="topic-heading">Privacy Settings</h2>
            <p>Manage your privacy and security settings.</p>
          </div>
        </div>
      `,
      // Add content for other options as needed
    };
  // Check if the id exists in the content mapping
  if (content[id]) {
    boxContainer.innerHTML = content[id];
    if (id === 'test') {
      // Add event listener to handle the form submission
      document.getElementById('startTestButton').addEventListener('click', () => {
        const teacherID = document.getElementById('techID').value;
        const testID = document.getElementById('testID').value;

        if (teacherID && testID) {
          // Submit the form using JavaScript
          const formData = new FormData();
          formData.append('teacherID', teacherID);
          formData.append('testID', testID);

          // Use fetch to send the POST request
          fetch('check_test.php', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
        if (data.status === 'success') {
          // If found, redirect to test_login.php
          window.location.href = 'test_login.php';
        } else {
          // If not found, show an error message
          alert(data.message);
        }
      })
      .catch(error => console.error('Error:', error));
    } else {
          alert('Please fill in all fields.');
        }
      });
    }
    if(id==='profile'){
       // Update the test count
       fetch('get_student_test_count.php')
       .then(response => response.json())
       .then(data => {
         document.querySelector('.box5 .topic-heading').innerText = data.test_count || '0';
       })
       .catch(error => console.error('Error:', error));


       //Update the Average percentage
      fetch('get_average_percentage.php')
      .then(response => response.json())
      .then(data => {
        document.querySelector('.box6 .topic-heading').innerText = data.average_percentage.toFixed(2) || '0';
      })
      .catch(error => console.error('Error:', error));

    }

    if (id === 'dashboard') {
      // Update the test count
      fetch('get_student_test_count.php')
        .then(response => response.json())
        .then(data => {
          document.querySelector('.box4 .topic-heading').innerText = data.test_count || '0';
        })
        .catch(error => console.error('Error:', error));

      // Update the highest percentage
      fetch('get_student_highest_percentage.php')
        .then(response => response.json())
        .then(data => {
          document.querySelector('.box2 .topic-heading').innerText = data.highest_percentage || '0';
        })
        .catch(error => console.error('Error:', error));
      
      //Update the Average percentage
      fetch('get_average_percentage.php')
        .then(response => response.json())
        .then(data => {
          document.querySelector('.box1 .topic-heading').innerText = data.average_percentage.toFixed(2) || '0';
        })
        .catch(error => console.error('Error:', error));
    
      //update the Topper percentage
      //Update the Average percentage
      fetch('get_topper_percentage.php')
        .then(response => response.json())
        .then(data => {
          document.querySelector('.box3 .topic-heading').innerText = data.topper_percentage || '0';
        })
        .catch(error => console.error('Error:', error));



      }
  } else {
    console.error('No content available for id:', id);
    boxContainer.innerHTML = '<p>Content not available</p>';
  }
}

function slideNavOption(id) {
  navOptions.forEach(option => option.classList.remove('slide-active'));
  document.getElementById(id).classList.add('slide-active');
  if (nav.classList.contains('nav-active')) {
    nav.classList.remove('nav-active');
  }
}
});
