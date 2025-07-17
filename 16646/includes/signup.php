<?php
session_start();
error_reporting(0);
include('includes/config.php');

// initialize
$fname = $mnumber = $email = "";
$errors = [];
$successMsg = "";

// on form submit
if (isset($_POST['submit'])) {
    $fname = trim($_POST['fname']);
    $mnumber = trim($_POST['mobilenumber']);
    $email = trim($_POST['email']);
    $passwordRaw = $_POST['password'];
    $password = md5($passwordRaw);

    // Full Name
    if (!preg_match("/^[a-zA-Z ]+$/", $fname)) {
        $errors['fname'] = "Full Name should contain only letters and spaces.";
    }

    // Mobile Number
    if (!preg_match("/^[0-9]{10}$/", $mnumber)) {
        $errors['mobilenumber'] = "Mobile number must be exactly 10 digits.";
    }

    // Email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid Email format.";
    }

    // Password
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/', $passwordRaw)) {
        $errors['password'] = "Password must include uppercase, lowercase, number, special character, and be at least 8 characters.";
    }

    // If no errors, insert
    if (empty($errors)) {
        $sql = "INSERT INTO tblusers(FullName,MobileNumber,EmailId,Password) 
                VALUES(:fname,:mnumber,:email,:password)";
        $query = $dbh->prepare($sql);
        $query->bindParam(':fname', $fname, PDO::PARAM_STR);
        $query->bindParam(':mnumber', $mnumber, PDO::PARAM_STR);
        $query->bindParam(':email', $email, PDO::PARAM_STR);
        $query->bindParam(':password', $password, PDO::PARAM_STR);
        $query->execute();

        if ($dbh->lastInsertId()) {
            $successMsg = "You are successfully registered. Now you can login.";
            $fname = $mnumber = $email = ""; // clear on success
        } else {
            $errors['form'] = "Something went wrong. Please try again.";
        }
    }
}
?>



<!--Javascript for check email availabilty-->
<script>
function checkAvailability() {

$("#loaderIcon").show();
jQuery.ajax({
url: "check_availability.php",
data:'emailid='+$("#email1").val(),
type: "POST",
success:function(data){
$("#user-availability-status").html(data);
$("#loaderIcon").hide();
},
error:function (){}
});
}
</script>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>						
						</div>
							<section>
								<div class="modal-body modal-spa">
									<div class="login-grids">
										<div class="login">
										
											<div class="login-right">
												<?php if(!empty($errorMsg)): ?>
  <div class="alert alert-danger"><?php echo $errorMsg; ?></div>
<?php endif; ?>

<?php if(!empty($successMsg)): ?>
  <div class="alert alert-success"><?php echo $successMsg; ?></div>
<?php endif; ?>
<form name="signup" method="post">
    <h3>Create your account </h3>

    <input type="text" placeholder="Full Name" name="fname" autocomplete="off"
           value="<?php echo htmlentities($fname); ?>">
    <?php if (isset($errors['fname'])): ?>
        <div class="text-danger error-msg"><?php echo $errors['fname']; ?></div>
    <?php endif; ?>

    <input type="text" placeholder="Mobile number" maxlength="10" name="mobilenumber" autocomplete="off"
           value="<?php echo htmlentities($mnumber); ?>">
    <?php if (isset($errors['mobilenumber'])): ?>
        <div class="text-danger error-msg"><?php echo $errors['mobilenumber']; ?></div>
    <?php endif; ?>

    <input type="text" placeholder="Email id" name="email" id="email1" onBlur="checkAvailability()" autocomplete="off"
           value="<?php echo htmlentities($email); ?>">
    <span id="user-availability-status" style="font-size:12px;"></span>
    <?php if (isset($errors['email'])): ?>
        <div class="text-danger error-msg"><?php echo $errors['email']; ?></div>
    <?php endif; ?>

    <input type="password" placeholder="Password" name="password">
    <?php if (isset($errors['password'])): ?>
        <div class="text-danger error-msg"><?php echo $errors['password']; ?></div>
    <?php endif; ?>

    <input type="submit" name="submit" id="submit" value="CREATE ACCOUNT">

    <?php if (isset($errors['form'])): ?>
        <div class="alert alert-danger mt-2"><?php echo $errors['form']; ?></div>
    <?php elseif (!empty($successMsg)): ?>
        <div class="alert alert-success mt-2"><?php echo $successMsg; ?></div>
    <?php endif; ?>
</form>

											</div>
												<div class="clearfix"></div>								
										</div>
											<p>By logging in you agree to our <a href="page.php?type=terms">Terms and Conditions</a> and <a href="page.php?type=privacy">Privacy Policy</a></p>
									</div>
								</div>
								<script>
document.querySelector("form[name='signup']").addEventListener("submit", function (e) {
  let hasError = false;

  // Clear old messages
  document.querySelectorAll(".error-msg").forEach(el => el.innerText = "");

  const name = this.fname.value.trim();
  const mobile = this.mobilenumber.value.trim();
  const email = this.email.value.trim();
  const password = this.password.value.trim();

  // Full Name
  if (!/^[a-zA-Z ]+$/.test(name)) {
    setError(this.fname, "Full Name should contain only letters and spaces.");
    hasError = true;
  }

  // Mobile Number
  if (!/^\d{10}$/.test(mobile)) {
    setError(this.mobilenumber, "Mobile number must be exactly 10 digits.");
    hasError = true;
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError(this.email, "Invalid Email format.");
    hasError = true;
  }

  // Password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    setError(this.password, "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
    hasError = true;
  }

  if (hasError) {
    e.preventDefault(); // prevent form submission
  }

  // function to show error just after input field
  function setError(inputElem, message) {
    let errorDiv = document.createElement("div");
    errorDiv.className = "text-danger error-msg";
    errorDiv.innerText = message;
    inputElem.insertAdjacentElement("afterend", errorDiv);
  }
});
</script>


							</section>
					</div>
				</div>
			</div>
			<script>
  <?php if(!empty($errorMsg) || !empty($successMsg)) : ?>
    $(document).ready(function(){
      $('#myModal').modal('show');
    });
  <?php endif; ?>
</script>
<script>
  <?php if (!empty($errors) || !empty($successMsg)) : ?>
    $(document).ready(function () {
      $('#myModal').modal('show');
    });
  <?php endif; ?>
</script>
