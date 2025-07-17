<?php
include "header.php";
include "db.php";
// Only start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION["uid"])) {
    echo '<div class="container mt-5"><div class="alert alert-danger">You must be logged in to view your profile.</div></div>';
    include "footer.php";
    exit();
}

$user_id = $_SESSION["uid"];
$msg = "";

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $f_name = trim($_POST["f_name"]);
    $l_name = trim($_POST["l_name"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $mobile = trim($_POST["mobile"]);
    $address1 = trim($_POST["address1"]);
    $address2 = trim($_POST["address2"]);
    $errors = array();
    if (empty($f_name) || !preg_match("/^[a-zA-Z ]+$/", $f_name)) $errors[] = "First name is required and must contain only letters.";
    if (empty($l_name) || !preg_match("/^[a-zA-Z ]+$/", $l_name)) $errors[] = "Last name is required and must contain only letters.";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required.";
    if (!empty($password) && strlen($password) < 6) $errors[] = "Password must be at least 6 characters (leave blank to keep current).";
    if (empty($mobile) || !preg_match("/^[6-9][0-9]{9}$/", $mobile)) $errors[] = "Mobile number must be 10 digits and start with 9, 8, 7, or 6.";
    if (empty($address1)) $errors[] = "Address is required.";
    if (empty($address2) || !preg_match("/^[a-zA-Z ]+$/", $address2)) $errors[] = "City is required and must contain only letters.";
    if (count($errors) === 0) {
        // Only update password if provided
        if (!empty($password)) {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $update = "UPDATE user_info SET first_name='$f_name', last_name='$l_name', email='$email', password='$hashed_password', mobile='$mobile', address1='$address1', address2='$address2' WHERE user_id='$user_id'";
        } else {
            $update = "UPDATE user_info SET first_name='$f_name', last_name='$l_name', email='$email', mobile='$mobile', address1='$address1', address2='$address2' WHERE user_id='$user_id'";
        }
        if (mysqli_query($con, $update)) {
            $msg = '<div class="alert alert-success">Profile updated successfully!</div>';
        } else {
            $msg = '<div class="alert alert-danger">Error updating profile. Please try again.</div>';
        }
    } else {
        $msg = '<div class="alert alert-danger">' . implode('<br>', $errors) . '</div>';
    }
}

// Fetch user info
$sql = "SELECT * FROM user_info WHERE user_id='$user_id'";
$query = mysqli_query($con, $sql);
$user = mysqli_fetch_assoc($query);
?>
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">My Profile</h4>
        </div>
        <div class="card-body">
          <?php if (!empty($msg)) echo $msg; ?>
          <form method="POST" autocomplete="off">
            <div class="form-group">
              <label for="f_name">First Name</label>
              <input type="text" class="form-control" id="f_name" name="f_name" value="<?php echo htmlspecialchars($user['first_name']); ?>" required>
            </div>
            <div class="form-group">
              <label for="l_name">Last Name</label>
              <input type="text" class="form-control" id="l_name" name="l_name" value="<?php echo htmlspecialchars($user['last_name']); ?>" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
            </div>
            <div class="form-group">
              <label for="password">Password <small>(Leave blank to keep current)</small></label>
              <input type="password" class="form-control" id="password" name="password" placeholder="New Password">
            </div>
            <div class="form-group">
              <label for="mobile">Mobile</label>
              <input type="text" class="form-control" id="mobile" name="mobile" value="<?php echo htmlspecialchars($user['mobile']); ?>" required>
            </div>
            <div class="form-group">
              <label for="address1">Address</label>
              <input type="text" class="form-control" id="address1" name="address1" value="<?php echo htmlspecialchars($user['address1']); ?>" required>
            </div>
            <div class="form-group">
              <label for="address2">City</label>
              <input type="text" class="form-control" id="address2" name="address2" value="<?php echo htmlspecialchars($user['address2']); ?>" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<?php
include "footer.php";
?> 