$(function () {
    $footer = $('.footer');
    $nav = $('.nav');
    offset = 100;

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if ($(window).width() > 736) {
            if (scroll > $footer.offset().top - offset) {
                $nav.fadeOut();
            } else {
                $nav.fadeIn();
            }
        }
    });
});
