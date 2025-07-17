// Function to load data and display it in the table
function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_tests.php', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);

            var output = '<div style="width: 100%; overflow-x:auto;"><table style="width:100%;text-align: center;"><thead><tr><th> Test ID </th><th> Test Name </th><th> Subject </th><th> No. of Questions </th><th> Total Marks </th><th> Total Time (min) </th><th> Actions </th></tr></thead>';

            data.forEach(function(item) {
                output += '<tbody><tr><th>' + item.test_id + '</th><td style="color: black">' + item.test_name + '</td><td style="color: black">' + item.subject + '</td><td style="color: black">' + item.total_questions + '</td><td style="color: black">' + item.total_marks + '</td><td style="color: black">' +
                '<input type="number" id="time_' + item.test_id + '" value="' + item.total_time + '" style="width: 80px; color: black; text-align: center;">' + '</td><td>' +
                '<button type="button" style="width: 87px;height: 4.2vh; color:white; background-color:green;margin:4px" onclick="publishTest(' + item.test_id + ')">Publish</button></td>' +
                '<td><button style="width: 87px;height: 4.2vh; color:white; background-color: rgba(22,34,57,0.95);margin:4px" type="button" onclick="stopTest(' + item.test_id + ')">Stop</button></td>' + 
                '<td><button type="button" style="width: 87px;height: 4.2vh; color:white; background-color: red;margin:4px" onclick="sendTestLink(' + item.test_id + ',' + item.teacher_id +')">Send Link</button></td></tr>';
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

// Function to handle the Publish button click
function publishTest(testId) {
    // Get the updated total time from the input field
    var timeValue = document.getElementById('time_' + testId).value;

    // Creating an XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'publish_test.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert(xhr.responseText); // Show success message or error from PHP
        }
    };
    
    // Send testId and total_time to PHP
    xhr.send('test_id=' + testId + '&total_time=' + timeValue);
}


// Function to handle the Stop button click
function stopTest(testId) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'stop_test.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert(xhr.responseText); // Show success message or error from PHP
        }
    };
    xhr.send('test_id=' + testId); // Send the test ID to the stop_test.php file
}



// Function to send the test link on send button click

function sendTestLink(testId, teacherId) {
    var baseUrl = 'https://testsheet.rf.gd/test_login.php';
    var url = baseUrl + '?test_id=' + encodeURIComponent(testId) + '&teacher_id=' + encodeURIComponent(teacherId);

    // Create a temporary input element to copy the link
    var tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Test link copied to clipboard:\n');
}