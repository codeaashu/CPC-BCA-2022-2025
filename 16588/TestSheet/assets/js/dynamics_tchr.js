document.addEventListener("DOMContentLoaded", function() {
  const generateButton = document.getElementById('generateQuestions');
  const questionCountInput = document.getElementById('questionCount');
  const questionsForm = document.getElementById('questionsForm');
  

if (generateButton && questionCountInput && questionsForm) {
  generateButton.addEventListener('click', function() {
      const questionCount = parseInt(questionCountInput.value);

      // Clear previous questions
      questionsForm.innerHTML = '';

      for (let i = 1; i <= questionCount; i++) {
          // Create a div for each question
          const questionDiv = document.createElement('div');
          questionDiv.classList.add('question');

          // Create a textarea for the question
          const questionLabel = document.createElement('label');
          questionLabel.textContent = `Question ${i}:`;
          const questionInput = document.createElement('textarea');
          questionInput.name = `question_${i}`;
          questionInput.placeholder = `Enter question ${i}`;
          questionDiv.appendChild(questionLabel);
          questionDiv.appendChild(questionInput);

          // Create inputs for the options
          for (let j = 1; j <= 4; j++) {
              const optionLabel = document.createElement('label');
              optionLabel.textContent = `Option ${j}:`;
              const optionInput = document.createElement('input');
              optionInput.type = 'text';
              optionInput.name = `question_${i}_option_${j}`;
              optionInput.placeholder = `Enter option ${j}`;
              questionDiv.appendChild(optionLabel);
              questionDiv.appendChild(optionInput);
          }

          // Create an input for the correct option
          const correctOptionLabel = document.createElement('label');
          correctOptionLabel.textContent = 'Correct Option:';
          const correctOptionInput = document.createElement('input');
          correctOptionInput.type = 'text';
          correctOptionInput.name = `question_${i}_correct_option`;
          correctOptionInput.placeholder = 'Enter the correct option (e.g., 1, 2, 3, or 4)';
          questionDiv.appendChild(correctOptionLabel);
          questionDiv.appendChild(correctOptionInput);

          // Append the question div to the form
          questionsForm.appendChild(questionDiv);
      }
  });
}
});




document.addEventListener('DOMContentLoaded', function() {
  // Select all nav-option elements
  const navOptions = document.querySelectorAll('.nav-option');
  const nav = document.querySelector('nav.nav');

  // Simulate a click on the "profile" option by default
  const profileOption = document.getElementById('profile');
  profileOption.click();

  // Add click event listener to menu icon
  const menuIcon = document.getElementById('menuicn');
  menuIcon.addEventListener('click', function() {
    nav.classList.toggle('nav-active');
  });

  // Add click event listeners to each nav-option
  navOptions.forEach(option => option.addEventListener('click', () => {
    const id = option.id;
    handleNavClick(id);
  }));

  function handleNavClick(id) {
    if (id === 'logout') {
      // Redirect to login page or handle logout here
      window.location.href = 'logout.php'; // Change 'login.php' to your actual login page
    } else {
      updateBoxContainer(id);
      slideNavOption(id);
    }
  }

  function updateBoxContainer(id) {  
    const boxContainer = document.querySelector('.box-container');
    
    const content = {
    
        profile: `
        <div class="profile-summary">
          <h2>Profile Details</h2>
          <p>Name: ${teacherName}</p>
          <p>ID No: ${teacherID}</p>
          <p>Gender: ${teacherGen}</p>
        </div>
        <div class="profile-picture">
          <img class="profile_images" src="${(teacherGen === 'male') ? 'assets/images/male.png' : 'assets/images/female.png'}" alt="Profile Picture">
        </div>
        <div class="profile-stats">
          <div class="box">
            <h2 class="topic-heading" id="createdTests">0</h2>
            <h2 class="topic">Created Tests</h2>
          </div>
          <div style="margin-top: 2rem" class="box">
            <h2 class="topic-heading" id="publishedTests">0</h2>
            <h2 class="topic">Published Tests</h2>
          </div>
        </div>
        <div>
          <h2 style="margin-top: 2rem;text-align: center;">Your Progress Report will be uploaded as soon as possible</h2>
        </div>
        <div>
          <img class="profile_images" src="assets/images/chart.png">
        </div>
      `,
      create: `
    
      <div>
        <h2>Create Test</h2>
        
        <!-- Form to create a new test -->
        <form method="post">
          
          <!-- Test Name Input -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="testName" style="display: block; font-weight: bold;">Test Name:</label>
            <input type="text" id="testName" name="testName" class="form-control" placeholder="Enter test name" required style="width: 100%; padding: 0.5rem;">
          </div>
          
          <!-- Subject Input -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="subject" style="display: block; font-weight: bold;">Subject:</label>
            <input type="text" id="subject" name="subjectName" class="form-control" placeholder="Enter subject" required style="width: 100%; padding: 0.5rem;">
          </div>
  
          <!-- Date Input           
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="testDate" style="display: block; font-weight: bold;">Test Date:</label>
            <input type="date" id="testDate" name="testDate" class="form-control" required style="width: 100%; padding: 0.5rem;">
          </div>     -->

  
          <!-- Total Marks Input -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="totalMarks" style="display: block; font-weight: bold;">Total Marks:</label>
            <input type="number" id="totalMarks" name="totalMarks" class="form-control" placeholder="Enter total marks" required style="width: 100%; padding: 0.5rem;">
          </div>

          <!-- Total Time Input -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="totaltime" style="display: block; font-weight: bold;">Total Time:</label>
            <input type="number" id="totaltime" name="totaltime" class="form-control" placeholder="Enter total time" required style="width: 100%; padding: 0.5rem;">
          </div>
  
          <!-- Total Number of Question Input -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="totalQues" style="display: block; font-weight: bold;">Total No. of Questions:</label>
            <input type="number" id="totalQues" name="totalQues" class="form-control" placeholder="Enter number of questions" required style="width: 100%; padding: 0.5rem;">
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label style="display: block; font-weight: bold;">Method of creating Questions :</label>
            <input type="radio" id="write" name="method"  value="write" style=" padding: 0.5rem;"  checked>
            <label for="write" style="font-weight: bold;">Write</label>
            <input type="radio" id="upload" name="method"  value="upload" style="padding: 0.5rem;">
            <label for="upload" style="font-weight: bold;">Upload</label>
          </div>
          
          <div class="form-group" style="margin-top: 1rem;">
            <button name="submit" type="submit" class="btn btn-primary" style="width: 100%; padding: 0.5rem; background-color: #007bff; color: white; border: none; cursor: pointer;">Generate Question</button>
          </div>
        </form>
      </div>
      `,
      list: `
      
      <ul>
      <div>
      <button id="test-container" onclick="loadData()" type="submit" class="btn btn-warning" style="width: 87vw">List Of Test</button></div>
      <div name="test_cont" id="test-container" class="table-responsive"></div>
      </ul>
      
      
      `,
      T_details: `
      <h2>Test Details</h2>
        <form id="testDetailsForm">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="testID" style="display: block; font-weight: bold;">Test ID:</label>
            <input type="number" id="testID" name="testID" class="form-control" placeholder="Enter test ID" required style="width: 314px; padding: 0.5rem;">
          </div>
          <div>
            <button id="fetchTestDetails" type="submit" class="btn btn-warning" style="width: 314px">Get Test Details</button>
          </div>
        </form>
        <div name="test_cont" id="test-container" class="table-responsive"></div>
      `,
      S_details: `
      <h2>Student Details</h2>
      <form id="studentDetailsForm">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="studentID" style="display: block; font-weight: bold;">Student ID:</label>
            <input type="number" id="studentID" name="studentID" class="form-control" placeholder="Enter student ID" required style="width: 314px; padding: 0.5rem;">
          </div>
          <div>
            <button id="fetchStudentDetails" type="submit" class="btn btn-warning" style="width: 314px">Get Student Details</button>
          </div>
        </form>
        <div name="student_cont" id="student-container" class="table-responsive"></div>
      `
    };

    // Update box-container content based on selected option
    boxContainer.innerHTML = content[id] || 'Content not found.';
  
    if (id === 'T_details') {
      // Attach the event listener for the form submission
      const testDetailsForm = document.getElementById('testDetailsForm');
      testDetailsForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        loadTestDetails();
      });
    }
    if (id === 'profile') {
      // Fetch created and published test counts from the server
      fetch('get_test_counts.php')
       .then(response => response.json())
       .then(data => {
         document.querySelector('#createdTests').innerText = data.total_test || '0';
         document.querySelector('#publishedTests').innerText = data.publish_test || '0';
       })
       .catch(error => console.error('Error:', error));

       
    }
    if (id === 'S_details') {
      // Attach the event listener for the form submission
      const studentDetailsForm = document.getElementById('studentDetailsForm');
      studentDetailsForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        loadStudentDetails();
      });
    }
  }


  function slideNavOption(id) {
    const clickedOption = document.getElementById(id);

    // Slide the clicked option to the right
    clickedOption.style.transform = 'translateX(20px)';
    clickedOption.style.transition = 'transform 0.3s ease';

    // Reset transform for other options
    navOptions.forEach(option => {
      if (option !== clickedOption) {
        option.style.transform = 'translateX(0)';
      }
    });
  }


  function loadTestDetails() {
    const testID = document.getElementById('testID').value;

    // AJAX request to fetch student data with the matching testID
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'get_test_details.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText); // Ensure this is valid JSON
                displayTestDetails(data);
            } catch (e) {
                console.error("Error parsing JSON: ", e);
                console.error("Response Text: ", xhr.responseText);
            }
        } else {
            console.error("Error with the request. Status:", xhr.status);
        }
    };
    xhr.send('testID=' + testID);
}


  function displayTestDetails(data) {
    // let output = '<table style="width:100%;text-align: center;"><thead><tr><th>Date</th><th>Student ID</th><th>Student Name</th><th>Total Marks</th><th>Obtained Marks</th><th>Percentage</th><th>Status</th><th>Activity</th></tr></thead>';

    // data.forEach(function(item) {
    //   output += `<tr>
    //     <td style="min-width: 89px;">${item.test_date}</td>
    //     <td>${item.s_id}</td>
    //     <td>${item.s_name}</td>
    //     <td>${item.total_marks}</td>
    //     <td>${item.obtained_marks}</td>
    //     <td>${item.percentage}%</td>
    //     <td>${item.status}</td>
    //     <td>${item.activity}</td>

    //   </tr>`;
    // });

    // output += '</table>';



let output = `<table style="width:100%; text-align:center; border-collapse: collapse; background-color: transparent; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
  <thead>
    <tr style="background-color: #4CAF50; color: white; font-weight: bold; border: 1px solid white;">
      <th style="padding: 10px; border: 1px solid white;">Date</th>
      <th style="padding: 10px; border: 1px solid white;">Student ID</th>
      <th style="padding: 10px; border: 1px solid white;">Student Name</th>
      <th style="padding: 10px; border: 1px solid white;">Total Marks</th>
      <th style="padding: 10px; border: 1px solid white;">Obtained Marks</th>
      <th style="padding: 10px; border: 1px solid white;">Percentage</th>
      <th style="padding: 10px; border: 1px solid white;">Status</th>
      <th style="padding: 10px; border: 1px solid white;">Activity</th>
    </tr>
  </thead>`;

data.forEach(function(item) {
  output += `<tr style="border: 1px solid white;">
    <td style="padding: 8px; border: 1px solid white; min-width: 89px;">${item.test_date}</td>
    <td style="padding: 8px; border: 1px solid white;">${item.s_id}</td>
    <td style="padding: 8px; border: 1px solid white;">${item.s_name}</td>
    <td style="padding: 8px; border: 1px solid white;">${item.total_marks}</td>
    <td style="padding: 8px; border: 1px solid white;">${item.obtained_marks}</td>
    <td style="padding: 8px; border: 1px solid white;">${item.percentage}%</td>
    <td style="padding: 8px; border: 1px solid white;">${item.status}</td>
    <td style="padding: 8px; border: 1px solid white;">${item.activity}</td>
  </tr>`;
});

output += '</table>';








    
    const testContainer = document.getElementById('test-container');
    testContainer.innerHTML = output;

    // Add buttons for CSV and PDF download
    const downloadButtons = `
        <div style="margin-top: 20px;">
            <button id="downloadCSV" class="btn btn-success">Download CSV</button>
            <button id="downloadPDF" class="btn btn-primary" style="margin-left: 10px;">Download PDF</button>
        </div>
    `;
    testContainer.insertAdjacentHTML('beforeend', downloadButtons);

    // Event listeners for download buttons
    document.getElementById('downloadCSV').addEventListener('click', function() {
        downloadCSV(data);
    });

    document.getElementById('downloadPDF').addEventListener('click', function() {
        downloadPDF(data);
    });
}

// Function to download the data as a CSV file
function downloadCSV(data) {
    let csvContent = 'Date,Student ID,Student Name,Total Marks,Obtained Marks,Percentage,Status,Activity\n';

    data.forEach(function(item) {
        csvContent += `${item.test_date},${item.s_id},${item.s_name},${item.total_marks},${item.obtained_marks},${item.percentage}%,${item.status},${item.activity}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'test_details.csv');
    a.click();
}

// Function to download the data as a PDF file
function downloadPDF(data) {
  const { jsPDF } = window.jspdf; // Get the jsPDF instance from the global object

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Test Details', 20, 20);

  // Table headers
  const headers = ['Date', 'Student ID', 'Student Name', 'Total Marks', 'Obtained Marks', 'Percentage', 'Status', 'Activity'];

  // Table body
  const rows = data.map(item => [
      item.test_date,
      item.s_id,
      item.s_name,
      item.total_marks,
      item.obtained_marks,
      item.percentage + '%',
      item.status,
      item.activity
  ]);

  // Create the table
  doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30,
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid'
  });

  // Save the generated PDF
  doc.save('test_details.pdf');
}

  function loadStudentDetails() {
    const studentID = document.getElementById('studentID').value;

    // AJAX request to fetch student data with the matching studentID
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'get_student_details.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText); // Ensure this is valid JSON
                displayStudentDetails(data);
            } catch (e) {
                console.error("Error parsing JSON: ", e);
                console.error("Response Text: ", xhr.responseText);
            }
        } else {
            console.error("Error with the request. Status:", xhr.status);
        }
    };
    xhr.send('studentID=' + studentID);
  }
  

  function displayStudentDetails(data) {
    let output = '<table style="width:100%;text-align: center;"><thead><tr><th>Test Date</th><th>Student ID</th><th>Student Name</th><th>Test ID</th><th>Test Name</th><th>Subject</th><th>Total Question</th><th>Total Marks</th><th>Obtained Marks</th><th>Percentage</th><th>Status</th><th>Activity</th></tr></thead>';

    data.forEach(function(item) {
      output += `<tr>
      <td>${item.test_date}</td>
        <td>${item.s_id}</td>
        <td>${item.s_name}</td>
        <td>${item.test_id}</td>
        <td>${item.test_name}</td>
        <td>${item.subject}</td>
        <td>${item.total_questions}</td>
        <td>${item.total_marks}</td>
        <td>${item.obtained_marks}</td>
        <td>${item.percentage}%</td>
        <td>${item.status}</td>
        <td>${item.activity}</td>
      </tr>`;
    });

    output += '<tr></tr></table>';

    const studentContainer = document.getElementById('student-container');
    studentContainer.innerHTML = output;
  }

});



document.addEventListener("DOMContentLoaded", function () {

  // Validate static form: Create Test
  const createForm = document.querySelector("form[method='post']");
  if (createForm) {
    createForm.addEventListener("submit", function (e) {
      const testName = document.getElementById('testName');
      const subject = document.getElementById('subject');
      const totalMarks = document.getElementById('totalMarks');
      const totalTime = document.getElementById('totaltime');
      const totalQues = document.getElementById('totalQues');

      if (!testName.value.trim() || !subject.value.trim()) {
        alert("Test Name and Subject are required.");
        e.preventDefault();
        return;
      }

      if (parseInt(totalMarks.value) <= 0 || parseInt(totalTime.value) <= 0 || parseInt(totalQues.value) <= 0) {
        alert("Total Marks, Time, and Questions must be positive numbers.");
        e.preventDefault();
        return;
      }
    });
  }

  // Validate Test Details form
  const testDetailsForm = document.getElementById('testDetailsForm');
  if (testDetailsForm) {
    testDetailsForm.addEventListener('submit', function (e) {
      const testID = document.getElementById('testID');
      if (!testID.value.trim()) {
        alert("Test ID cannot be empty.");
        testID.focus();
        e.preventDefault();
      }
    });
  }

  // Validate Student Details form
  const studentDetailsForm = document.getElementById('studentDetailsForm');
  if (studentDetailsForm) {
    studentDetailsForm.addEventListener('submit', function (e) {
      const studentID = document.getElementById('studentID');
      if (!studentID.value.trim()) {
        alert("Student ID cannot be empty.");
        studentID.focus();
        e.preventDefault();
      }
    });
  }

  // Validate dynamically created questions
  const questionsForm = document.getElementById('questionsForm');
  if (questionsForm) {
    questionsForm.addEventListener('submit', function (e) {
      const inputs = questionsForm.querySelectorAll('input, textarea');

      for (let input of inputs) {
        if (!input.value.trim()) {
          alert("All fields must be filled.");
          input.focus();
          e.preventDefault();
          return;
        }

        if (input.name.includes("correct_option")) {
          const val = parseInt(input.value);
          if (isNaN(val) || val < 1 || val > 4) {
            alert("Correct option must be a number between 1 and 4.");
            input.focus();
            e.preventDefault();
            return;
          }
        }
      }
    });
  }
});
