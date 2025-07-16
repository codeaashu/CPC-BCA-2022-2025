
==============================
🧪 TestSheet - Test Management System
==============================

TestSheet is a complete web-based Test Management System that helps administrators and teachers manage online tests, track student performance, and maintain educational efficiency. It allows for test creation, publication, student result evaluation, and more.

----------------------------------
📁 Project Structure
----------------------------------

TestSheet/
├── index.php                  --> Landing page with login options
├── admin_login.php            --> Admin login script
├── admin_dashboard.php        --> Admin dashboard with test controls
├── create_test.php            --> Interface for creating new tests
├── db_connection.php          --> Central DB connection script
├── delete_test.php            --> Deletes a test and related data
├── fetch_tests.php            --> Fetches test list for display
├── get_test_counts.php        --> Retrieves total test count
├── get_student_data.php       --> Loads student performance data
├── get_topper_percentage.php  --> Shows top score among students
├── get_average_percentage.php --> Calculates student's average percentage
├── get_student_details.php    --> Retrieves individual student details


----------------------------------
🛠️ Setup Instructions
----------------------------------

1. ✅ REQUIREMENTS
------------------
- Web Server: Apache (e.g. XAMPP or WAMP)
- PHP: 7.0 or higher
- MySQL Server
- Browser: Chrome/Firefox/Edge

2. 📦 INSTALLATION STEPS
------------------
- Download and extract the ZIP folder to your web server directory (e.g., `C:/xampp/htdocs/`).
- Open phpMyAdmin: http://localhost/phpmyadmin
- Create a new database named `testZone`.
- Import the SQL file (if available) to populate tables, or manually create the necessary tables (like `teachers`, `students`, `teacher_test`, etc.).
- Update `db_connection.php` with your MySQL username and password.

Example:
```php
$host = "localhost";
$user = "root";
$password = "";
$database = "testZone";
```

3. 🌐 RUNNING THE APPLICATION
------------------
- Start XAMPP > Apache & MySQL
- Visit in browser: http://localhost/mftp_project/htdocs/index.html

----------------------------------
🚀 Features & Usage
----------------------------------

👨‍🏫 Admin/Teacher Panel:
- Login via `admin_login.php`
- Use `admin_dashboard.php` to:
  - Create a new test
  - Publish or stop an existing test
  - View topper scores, average percentages
  - Delete tests and drop test-specific tables

📊 Student Performance:
- Get total questions, total marks, and time per test
- View individual student’s:
  - Correct answers
  - Wrong answers
  - Final score
  - Overall percentage

🎯 Database Operations:
- Test data saved dynamically in new tables named after the test
- AJAX-based fetching of statistics and test data
- Session handling for secure authentication

----------------------------------
🛡️ Security Features
----------------------------------
- User authentication with username and password
- Session-based access control for pages
- Secure PHP queries with prepared statements (if implemented fully)
- Admin-only access to sensitive test functions

----------------------------------
👨‍💻 Developed By
----------------------------------
Name: Abhay Rana
Email: abhayrana9608@gmail.com
GitHub: https://github.com/abhay8201

----------------------------------
📌 Suggestions for Improvement
----------------------------------
- Add email verification during signup
- Allow timed exams with countdown
- Enable exporting results in Excel/PDF
- Use JavaScript frameworks for enhanced interactivity
- Enable mobile responsiveness with Bootstrap

