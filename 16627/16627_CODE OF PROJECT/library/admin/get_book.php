<?php 
require_once("includes/config.php");
if(!empty($_POST["bookid"])) {
  $bookid=$_POST["bookid"];
//    $sql ="SELECT tblissuedbookdetails.id FROM tblbooks
// join tblissuedbookdetails on tblissuedbookdetails.BookId=tblbooks.id
//      WHERE (tblbooks.ISBNNumber=:bookid || tblbooks.BookName like '%$bookid%') and (tblissuedbookdetails.RetrunStatus is null || tblissuedbookdetails.RetrunStatus='')";
// $query= $dbh -> prepare($sql);
// $query-> bindParam(':bookid', $bookid, PDO::PARAM_STR);
// $query-> execute();
// $results = $query -> fetchAll(PDO::FETCH_OBJ);
// $issuedbook=$query -> rowCount(); 


 
    $sql ="SELECT tblbooks.BookName as BookName,tblcategory.CategoryName,tblauthors.AuthorName,tblbooks.ISBNNumber,tblbooks.BookPrice,tblbooks.id as bookid,tblbooks.bookImage,tblbooks.isIssued,tblbooks.bookQty,  
               COUNT(tblissuedbookdetails.id) AS issuedBooks,
   COUNT(tblissuedbookdetails.RetrunStatus) AS returnedbook

        FROM tblbooks
        LEFT JOIN tblissuedbookdetails ON tblissuedbookdetails.BookId = tblbooks.id
        LEFT JOIN tblauthors ON tblauthors.id = tblbooks.AuthorId
        Left join tblcategory on tblcategory.id=tblbooks.CatId
     WHERE (tblbooks.ISBNNumber=:bookid || tblbooks.BookName like '%$bookid%') group by BookName";
$query= $dbh -> prepare($sql);
$query-> bindParam(':bookid', $bookid, PDO::PARAM_STR);
$query-> execute();
$results = $query -> fetchAll(PDO::FETCH_OBJ);
$cnt=1;
if($query -> rowCount() > 0){
?>
<table border="1">

  <tr>
<?php foreach ($results as $result) {?>
    <th style="padding-left:5%; width: 10%;">
<img src="bookimg/<?php echo htmlentities($result->bookImage); ?>" width="120"><br />
      <?php echo htmlentities($result->BookName); ?><br />
    <?php echo htmlentities($result->AuthorName); ?><br />
  Book Qunatity:  <?php echo htmlentities($bqty=$result->bookQty); ?><br />
  Available Book Qunatity:  <?php  echo htmlentities($aqty=$result->bookQty-($result->issuedBooks-$result->returnedbook));
?><br />
    <?php if($aqty=='0'): ?>
<p style="color:red;">Book not available for issue.</p>
<?php else:?>
<input type="radio" name="bookid" value="<?php echo htmlentities($result->bookid); ?>" required>
<input type="hidden" name="aqty" value="<?php echo htmlentities($aqty); ?>" required>
<?php endif;?>
  </th>
    <?php  echo "<script>$('#submit').prop('disabled',false);</script>";
}
?>
  </tr>

</table>
</div>
</div>

<?php  
}else{?>
<p>Record not found. Please try again.</p>
<?php
 echo "<script>$('#submit').prop('disabled',true);</script>";
}
}
?>
