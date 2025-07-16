// Function to load data and display it in the table
function loadtestgivenData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_student_data.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);

            var output = '<div style="width: 100%; overflow-x:auto;"><table style="width:100%;text-align: center;"><thead><tr><th> Student ID </th><th> Student Name </th><th> Test ID </th><th> Test Name </th><th> Test Date </th><th> Total Marks </th><th> Obtained Marks </th><th> Total Percentage </th><th> Status </th></tr></thead>';

            data.forEach(function(item) {
                output += `<tbody><tr>
                    <th>${item.s_id}</th>
                    <td style="color: black">${item.s_name}</td>
                    <td style="color: black">${item.test_id}</td>
                    <td style="color: black">${item.test_name}</td>
                    <td style="color: black">${item.test_date}</td>
                    <td style="color: black">${item.total_marks}</td>
                    <td style="color: black">${item.obtained_marks}</td>
                    <td style="color: black">${item.percentage}</td>
                    <td style="color: black">${item.status}</td>
                    <td style="color: black">
                        <button style="width: 115px;height: 35px;border-radius: 10px;background-color: black;" 
                            onclick="loadresult(${item.s_id}, ${item.test_id})"> View </button>
                    </td>
                </tr>`;
            });

            output += '</tbody></table></div>';

            var showDiv = document.getElementById('test-container');
            if (showDiv) {
                showDiv.innerHTML = output;
            } else {
                console.log('Div not found');
            }
        }
    };
    xhr.send();
}

// Function to load the result when the 'View' button is clicked
function loadresult(studentID, testID) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'fetch_teacher_id.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.status === 'success') {
                // Now you have teacherID, studentID, and testID
                var teacherID = response.teacherID;
                
                // Store teacherID, studentID, and testID in session
                var sessionXhr = new XMLHttpRequest();
                sessionXhr.open('POST', 'store_in_session.php', true);
                sessionXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                sessionXhr.onload = function() {
                    if (sessionXhr.status === 200) {
                        // Redirect to view_results.php
                        window.location.href = 'view_results.php';
                    }
                };
                sessionXhr.send(`teacherID=${teacherID}&studentID=${studentID}&testID=${testID}`);
            } else {
                alert(response.message);
            }
        }
    };
    xhr.send(`testID=${testID}`);
}
