<?php
include 'header.php'
?>

<link rel="stylesheet" href="fullcalendar/fullcalendar.min.css" />
<script src="fullcalendar/lib/jquery.min.js"></script>
<script src="fullcalendar/lib/moment.min.js"></script>
<script src="fullcalendar/fullcalendar.min.js"></script>

<style>
body {
    margin-top: 50px;
    text-align: center;
    font-size: 12px;
    font-family: "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
}

#calendar {
    width: 700px;
    margin: 0 auto;
}

.response {
    height: 60px;
}

.success {
    background: #cdf3cd;
    padding: 10px 60px;
    border: #c3e6c3 1px solid;
    display: inline-block;
}
</style>

    <h2>PHP Calendar Event Management FullCalendar JavaScript
        Library</h2>

    <div class="response"></div>
    <div id='calendar'></div>

    <script>
$(document).ready(function () {
    var calendar = $('#calendar').fullCalendar({
        editable: true,
        events: "fetch-event.php",
        displayEventTime: false,
        eventRender: function (event, element, view) {
            if (event.allDay === 'true') {
                event.allDay = true;
            } else {
                event.allDay = false;
            }
        },
//         selectable: true,
//         selectHelper: true,
//         select: function (start, end, allDay) {
//             var title = prompt('Event Title:');

//             if (title) {
//                 var start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
//                 var end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");

//                 $.ajax({
//                     url: 'add-event.php',
//                     data: 'title=' + title + '&start=' + start + '&end=' + end,
//                     type: "POST",
//                     success: function (data) {
//                         displayMessage("Added Successfully");
//                     }
//                 });
//                 calendar.fullCalendar('renderEvent',
//                         {
//                             title: title,
//                             start: start,
//                             end: end,
//                             allDay: allDay
//                         },
//                 true
//                         );
//             }
//             calendar.fullCalendar('unselect');
//         },
        
//         editable: true,
//         eventDrop: function (event, delta) {
//                     var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
//                     var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
//                     $.ajax({
//                         url: 'edit-event.php',
//                         data: 'title=' + event.title + '&start=' + start + '&end=' + end + '&id=' + event.id,
//                         type: "POST",
//                         success: function (response) {
//                             displayMessage("Updated Successfully");
//                         }
//                     });
//                 },
//         eventClick: function (event) {
//             var deleteMsg = confirm("Do you really want to delete?");
//             if (deleteMsg) {
//                 $.ajax({
//                     type: "POST",
//                     url: "delete-event.php",
//                     data: "&id=" + event.id,
//                     success: function (response) {
//                         if(parseInt(response) > 0) {
//                             $('#calendar').fullCalendar('removeEvents', event.id);
//                             displayMessage("Deleted Successfully");
//                         }
//                     }
//                 });
//             }
//         }

    });
});

// function displayMessage(message) {
// 	    $(".response").html("<div class='success'>"+message+"</div>");
//     setInterval(function() { $(".success").fadeOut(); }, 1000);
// }
</script>