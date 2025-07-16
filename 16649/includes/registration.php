<?php
//error_reporting(0);
if(isset($_POST['signup']))
{
$fname=$_POST['fullname'];
$email=$_POST['emailid']; 
$mobile=$_POST['mobileno'];
$password=md5($_POST['password']); 

 if (!preg_match("/^[a-zA-Z ]+$/", $fname)) {
        echo "<script>alert('Full Name should contain only letters and spaces');</script>";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid Email Format');</script>";
    } elseif (!preg_match("/^[0-9]{10}$/", $mobile)) {
        echo "<script>alert('Mobile number must be exactly 10 digits');</script>";
    } elseif (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/', $_POST['password'])) {
    echo "<script>alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');</script>";
}
 
    else {
$sql="INSERT INTO  tblusers(FullName,EmailId,ContactNo,Password) VALUES(:fname,:email,:mobile,:password)";
$query = $dbh->prepare($sql);
$query->bindParam(':fname',$fname,PDO::PARAM_STR);
$query->bindParam(':email',$email,PDO::PARAM_STR);
$query->bindParam(':mobile',$mobile,PDO::PARAM_STR);
$query->bindParam(':password',$password,PDO::PARAM_STR);
$query->execute();
$lastInsertId = $dbh->lastInsertId();
if($lastInsertId)
{
echo "<script>alert('Registration successfull. Now you can login');</script>";
}
else 
{
echo "<script>alert('Something went wrong. Please try again');</script>";
}
}
}
?>


<script>
function checkAvailability() {
$("#loaderIcon").show();
jQuery.ajax({
url: "check_availability.php",
data:'emailid='+$("#emailid").val(),
type: "POST",
success:function(data){
$("#user-availability-status").html(data);
$("#loaderIcon").hide();
},
error:function (){}
});
}
</script>

<div class="modal fade" id="signupform">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title">Sign Up</h3>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="signup_wrap">
            <div class="col-md-12 col-sm-6">
              <form  method="post" name="signup">
                <div class="form-group">
                   <label class="control-label">Full Name <span>*</span></label>
                  <input type="text" class="form-control" name="fullname" placeholder="Full Name" >
                 <span class="error-msg text-danger" id="nameError"></span>
                </div>
                      <div class="form-group">
                         <label class="control-label">Mobile Number <span>*</span></label>
                  <input type="text" class="form-control" name="mobileno" minlength="10" placeholder="Mobile Number" maxlength="10" >
                <span class="error-msg text-danger" id="mobileError"></span>
                </div>
                <div class="form-group">
                  <label class="control-label">Email Address <span>*</span></label>
                  <input type="email" class="form-control" name="emailid" id="emailid" onBlur="checkAvailability()" placeholder="Email Address" >
                   <span id="user-availability-status" style="font-size:12px;"></span> 
                    <span class="error-msg text-danger" id="emailError"></span>
                </div>
               
          <div class="form-group">
        <label class="control-label">Password <span>*</span></label>
      <input type="password" name="password" id="password" class="form-control"  placeholder="Enter password" >
  <span class="error-msg text-danger" id="passwordError"></span>
</div>
                <div class="form-group checkbox">
                  <input type="checkbox" id="terms_agree" required="required" checked="">
                  <label for="terms_agree">I Agree with <a href="#">Terms and Conditions</a></label>
                </div>
                <div class="form-group">
                  <input type="submit" value="Sign Up" name="signup" id="submit" class="btn btn-block">
                </div>
              </form>
            </div>
            <script>
document.forms['signup'].addEventListener('submit', function (e) {
  let hasError = false;

  // Clear previous errors
  document.querySelectorAll(".error-msg").forEach(el => el.innerText = "");

  const name = document.forms['signup']['fullname'].value.trim();
  const mobile = document.forms['signup']['mobileno'].value.trim();
  const email = document.forms['signup']['emailid'].value.trim();
  const password = document.forms['signup']['password'].value.trim();

  // Full Name Validation
  if (!/^[a-zA-Z ]+$/.test(name)) {
    document.getElementById('nameError').innerText = "Only letters and spaces allowed.";
    hasError = true;
  }

  // Mobile Validation
  if (!/^\d{10}$/.test(mobile)) {
    document.getElementById('mobileError').innerText = "Mobile number must be exactly 10 digits.";
    hasError = true;
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').innerText = "Invalid email format.";
    hasError = true;
  }

  // Password Strength Validation
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    document.getElementById("passwordError").innerText = 
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    hasError = true;
  }

  if (hasError) {
    e.preventDefault();
  }
});


// Password validation function
function isStrongPassword(password) {
  const lengthCheck = /.{8,}/;
  const upperCheck = /[A-Z]/;
  const lowerCheck = /[a-z]/;
  const numberCheck = /[0-9]/;
  const specialCheck = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    lengthCheck.test(password) &&
    upperCheck.test(password) &&
    lowerCheck.test(password) &&
    numberCheck.test(password) &&
    specialCheck.test(password)
  );
}

</script>

          </div>
        </div>
      </div>
      <div class="modal-footer text-center">
        <p>Already got an account? <a href="#loginform" data-toggle="modal" data-dismiss="modal">Login Here</a></p>
      </div>
    </div>
  </div>
</div>