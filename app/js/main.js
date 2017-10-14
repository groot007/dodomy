$(function() {

    $(document).on("touchstart", ".top-head__menu-bar", function(e) {
        $(".top-head__mmenu").addClass("mmenu--opened");
    });


    $(document).on("touchend", ".mmenu__close", function(e) {
        $(this).closest(".mmenu").removeClass("mmenu--opened");
        $(".dropdown-menu .items").css("overflow-y", "hidden");
        $(".all-catagories").css("display", "block");
    });

    $(".catalog__item").on('mouseleave', function(e) {
        $(this).removeClass("catalog__item--active")
    });


    $(".catalog__item").on('touchstart ', function() {
        $(this).data('moved', '0');
    })
    .on('touchmove', function() {
        $(this).data('moved', '1');
    })
    .on('touchend mouseenter', function(e) {
            // console.log(e.type);
            if (e.type == "mouseenter" && $(window).width() > 750) {
                $(this).addClass("catalog__item--active");
                $(this).find('.slider-brands').slick("setPosition");
            }
            if ($(this).data('moved') == 0 &&
                $(this).find(".dropdown-menu").length) {
                $(this).addClass("catalog__item--active");
            $(this).find('.slider-brands').slick("setPosition");
        }
    });


    $(document).on("touchend", function(e) {
        var target = $(e.target);

        if (!target.closest(".catalog__item--active").length ||
            target.closest(".item-catalog__back").length) {
            $(".catalog__item--active").removeClass("catalog__item--active")
    }
});

$(document).on("click", ".all-catagories", function(e){
    e.preventDefault();
    var height = $(".dropdown-menu .items").height();
    console.log()
    $(this).css("display", "none");
    $(".dropdown-menu").css("height", "auto");
    // $(".dropdown-menu .items").animate({scrollTop : 100}, 1000);
});


    $("#lang").niceSelect();


    // ======= TABS ======

    $(document).on("click", ".tabs .tabs__item", function(e){
        e.preventDefault();

        var $this = $(this),
        $tabs = $this
        .closest(".tabs")
        .find(".tabs__item"),
        toSlider = $this.data("to-slider"),
        $allSliders = $this
        .closest("section")
        .find(".slider-products"),
        slider = $("#tabs-slider-" + toSlider);

        $tabs.removeClass("tabs__item--active");
        $this.addClass("tabs__item--active");

        $allSliders.addClass("hidden")
        slider
        .removeClass("hidden")
        .slick('setPosition');

    });

    // ======= end TABS ====



    //  ========= SLIDERs  ========
    $('.slider-brands').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        waitForAnimate: false,
        infinite: true,

        nextArrow: "<div class='slick-arrows arrow-next'><span class='custom-arrow'></span><i class='circle'></i></div>",
        prevArrow: "<div class='slick-arrows arrow-prev'><span class='custom-arrow'></span><i class='circle'></i></div>",
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 768,
            settings: {
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 600,
            settings: {
                dots: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                dots: false,

                slidesToScroll: 1
            }
        }
        ]
    });

    $('.slider-products').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        waitForAnimate: false,
        infinite: true,

        nextArrow: "<div class='slick-arrows arrow-next'><span class='custom-arrow'></span><i class='circle'></i></div>",
        prevArrow: "<div class='slick-arrows arrow-prev'><span class='custom-arrow'></span><i class='circle'></i></div>",
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false
            }
        },{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 768,
            settings: {
                dots: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },

        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                dots: false,

                slidesToScroll: 1
            }
        }
        ]
    });

function mainSlickInit(){

    if($(window).width() >= 750 && !$(".main-slider").hasClass("slick-slider")){
        console.log(1)

        $('.main-slider').slick({
            dots: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            waitForAnimate: false,
            infinite: true,
            cssEase: 'ease-in-out',
            fade: true,
            autoplay: true,
            autoplaySpeed: 3000,
            swipe: false,
            nextArrow: "<div class='slick-arrows arrow-next'><i class='fa fa-angle-right'></i></div>",
            prevArrow: "<div class='slick-arrows arrow-prev'><i class='fa fa-angle-left'></i></div>",
            responsive: [{
                breakpoint: 768,
                settings: "unslick"
            }]
        });

        $('.main-slider').slick("setPosition");
    }

}
mainSlickInit()

    $(window).on("resize", mainSlickInit);



    // end SLIDERs ====


});