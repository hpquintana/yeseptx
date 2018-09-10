<?php
    $error = 0;
    if(!mail("helloworld@nosuit.io", "#YESEPTX Newsletter Signup from " + $_POST['email'],
            "\r\nEmail: " . $_POST['email'])){
         $error = 1;
    }
?>
