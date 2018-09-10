$(function () {

    $("[data-words]").attr("data-words", function (i, d) {
        var $self = $(this)
            , $words = d.split("|")
            , tot = $words.length
            , c = 0;

        for (var i = 0; i < tot; i++) $self.append($('<span/>', {
            text: $words[i]
        }));

        $words = $self.find("span").hide();

        (function loop() {
            $self.animate({
                width: $words.eq(c).width()
            });
            $words.stop().fadeOut(200).eq(c).fadeIn(1500).delay(5000).show(1000, loop);
            c = ++c % tot;
        }());
    });
});
