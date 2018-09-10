$(function () {
    $confirmation = $('#email-message');
    $submit_button = $('#submit-button');
    $name = $('#name');
    $nameError = $('#name-error');

    $email = $('#email');
    $emailError = $('#email-error');

    $phone = $('#phone');
    $phoneError = $('#phone-error');

    $address = $('#address');
    $addressError = $('#address-error');

    $zip = $('#zip');
    $zipError = $('#zip-error');

    $spinner = $('#spinner');

    var shirtSize = "Small";

    $notes = $('#notes');

    $submit_button.click(function () {
        if (areInputsValid()) {
            displaySpinner();
            sendEmail($name.val(), $email.val(), $phone.val(), $address.val(), $zip.val(), shirtSize, $notes.val());
        }
    });

    function areInputsValid() {
        if (!isNameValid()) {
            scrollToPosition($name);
            displayErrorMessage($nameError);
            return false;
        } else if (!isEmailValid()) {
            scrollToPosition($email);
            displayErrorMessage($emailError);
            return false;
        } else if (!isPhoneValid()) {
            scrollToPosition($phone);
            displayErrorMessage($phoneError);
        } else if (!isAddressValid()) {
            scrollToPosition($address);
            displayErrorMessage($addressError);
        } else if (!isZipValid()) {
            scrollToPosition($zip);
            displayErrorMessage($zipError);
        }
        return true;
    }

    $('#myForm input').on('change', function () {
        shirtSize = $('input[name=size]:checked').val();
    });

    function isNameValid() {
        if (!$name.val().trim()) {
            return false;
        }
        return true;
    }

    function isEmailValid() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test($email.val());
    }

    function isPhoneValid() {
        var re = '/^([0-9]*)$/';
        if (!$phone.val().trim()) {
            return false;
        }
        if (!$.isNumeric($phone.val())) {
            return false;
        }
        if ($phone.val().length != 10) {
            return false;
        }
        return true;
    }

    function isAddressValid() {
        if (!$address.val().trim()) {
            return false;
        }
        return true;
    }

    function isZipValid() {
        var re = '/^([0-9]*)$/';
        if (!$zip.val().trim()) {
            return false;
        }
        if (!$.isNumeric($zip.val())) {
            return false;
        }
        if ($zip.val().length != 5) {
            return false;
        }
        return true;
    }

    function scrollToPosition($element) {
        var offset = 50;
        $('html, body').animate({
            scrollTop: $element.offset().top - offset
        }, 100);
    }

    function displayErrorMessage($error) {
        $error.fadeIn();
        setTimeout(
            function () {
                $error.fadeOut();
            }, 3000);
    }

    function sendEmail(name, email, phone, streetAddress, zipCode, shirtSize, notes) {
        $.ajax({
            url: "php/contact.php"
            , type: 'POST'
            , data: {
                "name": name
                , "email": email
                , "phone": phone
                , "streetAddress": streetAddress
                , "zipCode": zipCode
                , "shirtSize": shirtSize
                , "notes": notes
            }
            , success: function (error) {
                resetFields();
                if (error == 0) {
                    $confirmation.css({
                        color: "green"
                    });
                    confirmationMessage = "Thank you for signing up we couldn't do this without you. ";

                } else {
                    $confirmation.css({
                        color: "red"
                    });
                    confirmationMessage = "Something went wrong. Please try again later.";

                }
                hideSpinner();
                showConfirmationMessage();
            }
            , error: function (xhr, textStatus, errorThrown) {
                resetFields();
                $confirmation.css({
                    color: "red"
                });
                confirmationMessage = "Something went wrong. Please try again later.";
                hideSpinner();
                showConfirmationMessage();
            }
        });
    }

    function showConfirmationMessage() {
        $confirmation.text(confirmationMessage);
        $confirmation.fadeIn();
        //        enableFields();

        setTimeout(
            function () {
                $confirmation.fadeOut();
            }, 3000);
    }

    function resetFields() {
        $name.val('');
        $email.val('');
        $phone.val('');
        $address.val('');
        $zip.val('');
    }

    function disableFields() {
        $('#submit-button').prop('disabled', true);
    }

    function enableFields() {
        $('#submit-button').prop('disabled', false);
    }

    function displaySpinner() {
        $spinner.fadeIn(100);
    }

    function hideSpinner() {
        $spinner.fadeOut(100);
    }
});
