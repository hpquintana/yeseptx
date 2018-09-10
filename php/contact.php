<?php
    $error = 0;
    if(!mail("helloworld@nosuit.io", "#YESEPTX Inquiry from " + $_POST['email'],
             "Name: " . $_POST['name'] .
            "\r\nEmail: " . $_POST['email'] .
            " \r\nReasons for reaching out: \r\n" .
            ($_POST['isLearn'] == "true" ?   "Learning about El Paso startups\r\n" : "") .
            ($_POST['isMeeting'] == "true" ? "Meeting and helping like-minded locals\r\n" : "").
            ($_POST['isAttending'] == "true" ? "Attending startup-related events\r\n" : "").
            ($_POST['isInvesting'] == "true" ? "Investing in El paso startups\r\n" : "").
            ($_POST['isWaysIcanHelp'] == "true" ? "Ways I can help #yeseptx\r\n": ""))){
         $error = 1;
    }

    echo $error;
?>
