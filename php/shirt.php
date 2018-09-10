<?php
    $error = 0;
    if(!mail("helloworld@nosuit.io", "#YESEPTX Shirt from " + $_POST['email'],
           "Name: " . $_POST['name'] .
            "\r\nEmail: " . $_POST['email'] .
            "\r\nPhone: " . $_POST['phone'] .
            "\r\nStreet Address: " . $_POST['streetAddress'] .
            "\r\nZip Code: " . $_POST['zipCode'] .
            "\r\nShirt Size: " . $_POST['shirtSize'] .
            "\r\nNotes: " . $_POST['notes']
            )){
         $error = 1;
    }

    echo $error;
?>
