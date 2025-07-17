<?php include './admin_components/admin_header.php'; ?>

<div class="ui container">
    <!-- Top Navigation Bar -->
    <?php include './admin_components/admin_top-menu.php'; ?>

    <div class="ui stackable grid">
        <!-- Left menu -->
        <div class="four wide column">
            <?php include './admin_components/admin_side-menu.php'; ?>
        </div>

        <!-- Right content -->
        <div class="twelve wide column">
            <div class="ui raised segment">
                <h1 class="ui dividing header">
                     Create Member Type
                </h1>

                <!-- Form Container -->
                <div class="ui segment">
                    <form class="ui form" id="memberTypeForm" method="POST">
                        <div class="two fields">
                            <div class="field">
                                <label>Member Type ID</label>
                                <div class="ui left icon input">
                                    <input type="number" name="member_type_id" placeholder="Member Type ID" required>
                                    
                                </div>
                            </div>
                            <div class="field">
                                <label>Member Type Name</label>
                                <div class="ui left icon input">
                                    <input type="text" name="member_type_name" placeholder="Member Type Name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label>Description</label>
                            <textarea name="description" rows="3" placeholder="Enter a brief description" required></textarea>
                        </div>
                        <button type="submit" class="ui huge blue button">
                            </i> Submit
                        </button>
                        <button type="reset" class="ui button">
                             Reset
                        </button>
                    </form>

                    <!-- Success & Error Message -->
                    <div id="message" class="ui hidden message"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include './admin_components/admin_footer.php'; ?>

<script>
    document.getElementById("memberTypeForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        let messageBox = document.getElementById("message");
        messageBox.classList.remove("hidden", "positive", "negative");

        // Simulating form submission
        setTimeout(() => {
            messageBox.classList.add("positive");
            messageBox.innerHTML = '<i class="check circle icon"></i> Member Type created successfully!';
        }, 1000);
    });
</script>