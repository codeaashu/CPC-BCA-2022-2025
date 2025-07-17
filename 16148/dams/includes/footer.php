<footer class="site-footer section-padding" id="contact">
    <div class="container">
        <div class="row">

            <div class="col-lg-5 me-auto col-12">
                <?php
                $sql = "SELECT * from tblpage where PageType='contactus'";
                $query = $dbh->prepare($sql);
                $query->execute();
                $results = $query->fetchAll(PDO::FETCH_OBJ);

                if ($query->rowCount() > 0) {
                    foreach ($results as $row) {
                ?>
                <h5 class="mb-lg-4 mb-3"><i class="bi bi-clock-fill me-2"></i>Timing</h5>
                <ul class="list-group list-group-flush mb-3">
                    <li class="list-group-item d-flex align-items-center">
                        <?php echo htmlentities($row->Timing); ?>
                    </li>
                </ul>

                <h5 class="mb-lg-4 mb-3"><i class="bi bi-envelope-fill me-2"></i>Email</h5>
                <ul class="list-group list-group-flush mb-3">
                    <li class="list-group-item d-flex align-items-center">
                        <?php echo htmlentities($row->Email); ?>
                    </li>
                </ul>

                <h5 class="mb-lg-4 mb-3"><i class="bi bi-telephone-fill me-2"></i>Contact Number</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex align-items-center">
                        <?php echo htmlentities($row->MobileNumber); ?>
                    </li>
                </ul>
                <?php } } ?>
            </div>

            <div class="col-lg-2 col-md-6 col-12 my-4 my-lg-0">
                <h5 class="mb-lg-4 mb-3">Our Clinic</h5>
                <p><?php echo htmlentities($row->PageDescription); ?></p>
            </div>

            <div class="col-lg-3 col-md-6 col-12 ms-auto">
                <h5 class="mb-lg-4 mb-2">Socials</h5>
                <ul class="social-icon list-inline mt-3">
                    <li class="list-inline-item me-3">
                        <a href="#" class="text-dark fs-4 social-hover"><i class="bi bi-facebook"></i></a>
                    </li>
                    <li class="list-inline-item me-3">
                        <a href="#" class="text-dark fs-4 social-hover"><i class="bi bi-twitter"></i></a>
                    </li>
                    <li class="list-inline-item me-3">
                        <a href="#" class="text-dark fs-4 social-hover"><i class="bi bi-instagram"></i></a>
                    </li>
                    <li class="list-inline-item me-3">
                        <a href="#" class="text-dark fs-4 social-hover"><i class="bi bi-youtube"></i></a>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</footer>

<!-- Add in your main CSS or before </body> -->
<style>
    .social-hover {
        transition: transform 0.3s ease, color 0.3s ease;
    }

    .social-hover:hover {
        transform: scale(1.2);
        color: #dc3545 !important; /* Red hover */
    }
</style>
