<?php

include 'adminheader.php';

?>
 <div class="main-content">
    <div class="container-fluid content-top-gap">
        <div class="card card_border py-2 mb-4">
            <div class="cards__heading">
                <h3>Welcome Admin</h3>
            </div>
<div class="statistics  ">
      <div class="row">
        <div class="col-xl-6 pr-xl-2">
          <div class="row">
            <div class="col-sm-6 pr-sm-2 statistics-grid">
              <div class="card card_border border-primary-top p-4">
                <i class="lnr lnr-users"> </i>
                <h3 class="text-primary number"><a href="reg_status.php">Registration <br>Status</a></h3>
                
              </div>
            </div>
            <div class="col-sm-6 pl-sm-2 statistics-grid">
              <div class="card card_border border-primary-top p-4">
                <i class="lnr lnr-file-add"> </i>
                <h3 class="text-primary number"><a href="leave_status.php">Leave<br>Status</a></h3>
                
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 pl-xl-2">
          <div class="row">
            <div class="col-sm-6 pr-sm-2 statistics-grid">
              <div class="card card_border border-primary-top p-4">
                <i class="lnr lnr-cloud-download"> </i>
               
                <h3 class="text-primary number"><a href="workingdays.php">Add Working<br>Days</a></h3>
              </div>
            </div>
            <div class="col-sm-6 pl-sm-2 statistics-grid">
              <div class="card card_border border-primary-top p-4">
                <i class="lnr lnr-eye"> </i>
                <h3 class="text-primary number"><a href="viewattendance.php">View<br>Attendance</a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    </div>
      </div>
    </div>
    <br>
    <?php include 'footer.php'; ?>