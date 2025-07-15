<?php
include 'adminheader.php';

$Id= $_GET['myid'];

$sql = "select * from `emp_reg` where `EmployeeId`='".$Id."'";
$result = $con->query($sql);
if($row = $result->fetch_assoc()){
$Name= $row['Name'];
$Email= $row['Email'];
$Photo= $row['Photo'];
$Mobile = $row['Mobile'];
$Gender = $row['Gender'];

}
$s="select `Date` from `emp-login` where EmployeeId='".$Id."' ";
$result1 = $con->query($s);
if($row1 = $result1->fetch_assoc()){
$date= $row1['Date'];
}
else{
    $date="";
}

$query = "select * from `empdetail` where `EmployeeId`='".$Id."'";
$res = $con->query($query);
if($r = $res->fetch_assoc()){
$adhar= $r['Aadhar'];

$dept= $r['Department'];
$address= $r['Address'];
$bank= $r['Bank'];
$ifsc= $r['IFSC'];
$dob= $r['DOB'];
$father=$r['Father'];
$pan= $r['Pan'];

}
else{
    $adhar= "";

    $dept= "";
    $address= "";
    $bank= "";
    $ifsc= "";
    $dob= ""; 
    $father="";
$pan= "";

}
?>
<style>
.photo{
    height:150px !important;
    width:150px !important;
   
    border-radius: 50%;

  }
  </style>

<div class="main-content">

  <!-- content -->
  <div class="container-fluid content-top-gap">
            <div class="cards__heading">
                <h3> Employee Details</h3>
            </div>
            <div class="card card_border mb-5">
                
                <div class="row px-2">
                        <div class="col-lg-4 col-md-4  px-2" >
                            <div class="card text-center card_border py-2">
                                <div class="card-body">
                               
                                    <div class="team-main-19">
                                        <img class="rounded-circle photo" src="<?php echo $Photo;?>" alt="">
                                        <div class="right-team-9">
                                            <div>
                                                <h5><a href="" class="card__title mb-2 mt-3" style="color:var(--primary)"><?php echo $Name; ?></a>
                                                </h5>
                                                
                                               
                                               
                                               
                                            </div>
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 mt-4  px-2" >
                            <?php
                            if($date!=""){ ?>
                        <p><b>Date of Joining:</b> <?php echo date("d-m-Y", strtotime($date));?></p>
                            <?php }
                            else{?>
                                <p><b>Date of Joining: </b> </p>
                           <?php }?>
                            <p><b>Department: </b><?php echo  $dept;?></p>
                             <p><b>Mobile No.: </b> <?php echo  $Mobile;?></p>
                            
                             <p><b>Date of Birth: </b> <?php echo  $dob;?></p>
                             <p><b>Gender: </b><?php echo  $Gender;?></p>
                             <p><b>Email Id: </b> <?php echo $Email;?></p>
                             <p><b>Address: </b><?php echo  $address;?></p>
                                <p><b>Father's Name: </b><?php echo  $father;?></p>
                       
                                                 
                                            



                                  
                                               
                                               

                        </div>
                          <div class="col-lg-4 col-md-4 mt-4  px-2" >
                            
                
                                
                                  <p><b>Aadhar No.: </b><?php echo $adhar;?></p>
                                                <p><b>Bank Account No.: </b> <?php echo  $bank;?></p>
                                                <p><b>IFSC: </b><?php echo  $ifsc;?></p>
                             <p><b>PAN No.: </b> <?php echo  $pan;?></p>
                          
                       



                                  
                                               
                                               

                        </div>
                        </div>
<br>
<?php 
include 'footer.php';
?>