<?php include 'header.php'; ?>
<style>
 
  h6{
   
    float: right !important;
  }
</style>

 <div class="main-content">
  
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
 
            <div class="cards__heading">
                <h3>My Dashboard</h3>
            </div>
            <div class="statistics">
      <div class="row" >
        <div class="col-xl-6 pr-xl-2">
          <div class="row">
            <div class="col-sm-6 pr-sm-2 statistics-grid">
              <div class="card card_border border-primary-top p-4">
              <i class="lnr lnr-pencil"> </i>
                <h3 class="text-primary number"><a href="attendance.php" >Mark <br>Attendance</a></h3>
                
              </div>
            </div>
            <div class="col-sm-6 pl-sm-2 statistics-grid">
              <div class="card card_border border-primary-top p-4">
              <i class="lnr lnr-file-add"> </i>
                <h3 class="text-primary number"><a href="Emp_leave.php">Apply for<br>Leave</a></h3>
                
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 pl-xl-2">
          <div class="row">
            <div class="col-sm-6 pr-sm-2 statistics-grid">
              <div class="card card_border border-primary-top p-4">
              <i class="lnr lnr-eye"> </i>
                <h3 class="text-primary number"><a href="view_leave.php">View Applied<br>Leave</a></h3>
              </div>
            </div>
            <div class="col-sm-6 pl-sm-2 statistics-grid">
              <div class="card card_border border-primary-top p-4">
              <i class="lnr lnr-chart-bars"> </i>
              <h3 class="text-primary number"><a href="empattendance.php">View Your<br>Attendance</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
   
    </div>
   


            <div class="row px-2" style="margin-bottom:100px";>
                        <div class="col-lg-3 col-md-6  px-2" >
                            <div class="card text-center card_border py-2">
                                <div class="card-body">
                                <h3>Welcome</h3>
                                    <div class="team-main-19">
                                        <img class="rounded-circle" style="border-radius:50%; height:100px; width:90px;" src="<?php echo $Photo;?>" alt="">
                                        <div class="right-team-9">
                                            <div>
                                                <h5><a href="" class="card__title mb-2 mt-3" style="color:var(--primary)"><?php echo $name; ?></a>
                                                </h5>
                                                
                                                <p><b>Email Id:</b> <?php echo $Email;?></p>
                                                <p><b>Mobile No.:</b> <?php echo  $Mobile;?></p><br>
                                                <h6><a href="empchange.php">Update Profile</h6></a>
                                            </div>
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
               
                </div>
     
 <br>
    <?php include 'empfooter.php'; ?>