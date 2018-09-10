$(function () {
    $confirmation = $('#email-message');

    $email = $('#email');
    $name = $('#name');

    $check_0 = $('#0');
    $check_1 = $('#1');
    $check_2 = $('#2');
    $check_3 = $('#3');
    $check_4 = $('#4');

    $spinner = $('#spinner');

    confirmationMessage = "Please enter a valid email.";

    $('#submit-button').click(function () {
        displaySpinner();
        disableFields();

        if (isEmailValid()) {
            $confirmation.css({
                color: "green"
            });

            sendEmail(
                $name.val()
                , $email.val()
                , $check_0.is(":checked")
                , $check_1.is(":checked")
                , $check_2.is(":checked")
                , $check_3.is(":checked")
                , $check_4.is(":checked")
            );
        } else {
            $confirmation.css({
                color: "red"
            });
            hideSpinner();
            showConfirmationMessage();
        }
    });

    $('#top-button').click(function () {
        displaySpinner();
        disableFields();

        if (isEmailValid()) {
            $confirmation.css({
                color: "green"
            });

            sendEmail2(
                $email.val()
            );
        } else {
            $confirmation.css({
                color: "red"
            });
            hideSpinner();
            showConfirmationMessage();
        }
    });

    function displaySpinner() {
        $spinner.fadeIn(100);
    }

    function hideSpinner() {
        $spinner.fadeOut(100);
    }

    function isEmailValid() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test($email.val());
    }

    function sendEmail2(email) {
        $.ajax({
            url: "php/email_sign_up.php"
            , type: 'POST'
            , data: {
                "email": email
            }
            , success: function (error) {
                if (error == 0) {
                    $('#email').val("");

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
                $confirmation.css({
                    color: "red"
                });
                confirmationMessage = "Something went wrong. Please try again later.";
                hideSpinner();
                showConfirmationMessage();
            }
        });
    }

//    function sendEmail(name, email, isLearn, isMeeting, isAttending, isInvesting, isWaysIcanHelp) {
//        $.ajax({
//            url: "/php/contact.php"
//            , type: 'POST'
//            , data: {
//                "name": name
//                , "email": email
//                , "isLearn": isLearn
//                , "isMeeting": isMeeting
//                , "isAttending": isAttending
//                , "isInvesting": isInvesting
//                , "isWaysIcanHelp": isWaysIcanHelp
//            }
//            , success: function (error) {
//                if (error == 0) {
//                    resetFields();
//                    $confirmation.css({
//                        color: "green"
//                    });
//                    confirmationMessage = "Thank you for signing up we couldn't do this without you. ";
//
//                } else {
//                    $confirmation.css({
//                        color: "red"
//                    });
//                    confirmationMessage = "Something went wrong. Please try again later.";
//
//                }
//                hideSpinner();
//                showConfirmationMessage();
//            }
//            , error: function (xhr, textStatus, errorThrown) {
//                $confirmation.css({
//                    color: "red"
//                });
//                confirmationMessage = "Something went wrong. Please try again later.";
//                hideSpinner();
//                showConfirmationMessage();
//            }
//        });
//    }

    function showConfirmationMessage() {
        $confirmation.text(confirmationMessage);
        $confirmation.fadeIn();

        setTimeout(
            function () {
                $confirmation.fadeOut();
            }, 5000);
    }

    function resetFields() {
        $name.val('');
        $email.val('');
        $check_0.attr("checked", false);
        $check_1.attr("checked", false);
        $check_2.attr("checked", false);
        $check_3.attr("checked", false);
        $check_4.attr("checked", false);
    }

    function disableFields() {
        $('#submit-button').prop('disabled', true);
    }

    function enableFields() {
        $('#submit-button').prop('disabled', false);
    }
});
