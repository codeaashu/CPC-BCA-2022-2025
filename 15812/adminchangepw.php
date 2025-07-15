<?php
include 'adminheader.php';
?>
<script>
     function verifyPassword() {
      var pw = document.getElementById("pswd").value;
      //check empty password field  
      if (pw == "") {
        document.getElementById("message").innerHTML = "**Fill the password please!";
        return false;
      }

    


      var numbers = /[0-9]/g;
  if(!pw.match(numbers)) {

        document.getElementById("message").innerHTML = "**password must contain atleast 1 number";
        return false;

      }
      var upperCaseLetters = /[A-Z]/g;
  if(!pw.match(upperCaseLetters)) {

        document.getElementById("message").innerHTML = "**password must contain atleast 1 capital letter";
        return false;

      }
      var lowerCaseLetters = /[a-z]/g;
  if(!pw.match(lowerCaseLetters)) {
        document.getElementById("message").innerHTML = "**password must contain atleast 1 lowercase letter";
        return false;

      }
      if (pw.length < 8) {
        document.getElementById("message").innerHTML = "**Password length must be atleast 8 characters";
        return false;
      }
      else{
        document.getElementById("message").innerHTML = "&#x2713; Strong Password";
        document.getElementById("message").style.color = "green";
        return false;
      }
    

      }  
    
  </script>
<div class="main-content">
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
		
		
        <div class="cards__heading">
        <h3>Change Password</h3>
    </div>
        <div class="card-body">
									<form method= "post" >
										

										<div class="form-group">
                                       
											<label  class="input__label">Current Password</label>
											
												<input type="password" class="form-control " id="current" name="current" required>
											</div>
										

                                        
                                        <div class="form-group">
										
                                            <label  class="input__label">New Password</label>
												<input type="password" class="form-control" onkeypress="verifyPassword()" id="pswd" name="pswd" required>
											
										</div>
                                        <span id="message" style="color:red"> </span>
                                       
                                        <div class="form-group">
											<label class="input__label">Confirm Password</label>
											
												<input type="password" class="form-control"  id="confirm" name="confirm" required>
											
										</div>
                                       
										</div>

                                        <center> <input type="submit" name="submit"  class="btn btn-primary btn-style mt-4" value="Change"></center>
									</form>
								</div>
						</div>	
					</div>
				
			
				<?php
               if(isset($_POST['submit'])){
$current= $_POST['current'];
$pswd= $_POST['pswd'];
$confirm=$_POST['confirm'];

$query = "SELECT `Password` FROM `emp-login` Where EmployeeId='".$EmployeeId."' ";
$result = mysqli_query($con, $query);
 ($data = mysqli_fetch_assoc($result));
 if($current!= $data['Password']){
echo "<script>alert('Wrong Current Password')</script>";
}
 if($pswd!= $confirm){
    echo "<script>alert('Wrong Confirm Password')</script>";
}
else{
$query= "Update `emp-login` set Password= '".$pswd."' Where EmployeeId='".$EmployeeId."' ";
$update= $con->query($query);

    echo "<script>alert('Password Changed')</script>";

}

}            


?>
<?php
include 'footer.php';
?>