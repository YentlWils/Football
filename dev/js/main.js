function headerAnimation(){
    var distanceY = $(window).scrollTop();
    var shrinkOn = 34;
    if (distanceY > shrinkOn) {
        $('#main-navigation').removeClass('scrollable');
    } else {
        $('#main-navigation').addClass('scrollable');
    }
}

function headerScroll() {
    window.addEventListener('scroll', function(e){
        headerAnimation();
    });
}

window.onload = headerScroll();
headerAnimation();

$(function() {

    var $el, leftPos, newWidth;

    /* Add Magic Line markup via JavaScript, because it ain't gonna work without */
    $("#navigation-links").append("<li id='magic-line'></li>");

    $("#navigation-links").append("<li id='magic-block'></li>");

    /* Cache it */
    var $magicLine = $("#magic-line");

    var $magicBlock = $("#magic-block");

    $magicLine
        .width($("#navigation-links .current_page_item").width())
        .css("left", $("#navigation-links .current_page_item").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());

    $magicBlock
        .width($("#navigation-links .current_page_item").width())
        .height($("#navigation-links .current_page_item").height())
        .css("left", $("#navigation-links .current_page_item").position().left)
        .data("origLeft", $magicBlock.position().left)
        .data("origWidth", $magicBlock.width());

    $("#navigation-links li").find("a").hover(function() {
        $el = $(this);
        leftPos = $el.parent().position().left;
        newWidth = $el.outerWidth();;

        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });

        $magicBlock.stop().animate({
            left: leftPos,
            width: newWidth
        })

    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });

        $magicBlock.stop().animate({
            left: $magicBlock.data("origLeft"),
            width: $magicBlock.data("origWidth")
        });
    });






    $("#example-two a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        $magicLineTwo.stop().animate({
            left: leftPos,
            width: newWidth,
            backgroundColor: $el.attr("rel")
        })
    }, function() {
        $magicLineTwo.stop().animate({
            left: $magicLineTwo.data("origLeft"),
            width: $magicLineTwo.data("origWidth"),
            backgroundColor: $magicLineTwo.data("origColor")
        });
    });

});