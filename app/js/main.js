//import("../js/libs/jquery-ui.min.js");
//import("../js/libs/jquery-bar-rating.min.js");



// ================**********=============



// ================== main js =========

$(function() {
    $( ".price-filter__slider" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 10, 450 ],
      create: function( event, ui ) {
        $( ".price-filter .min-input" ).val( 10 );
        $( ".price-filter .max-input" ).val( 450 );
      },
      slide: function( event, ui ) {
        $( ".price-filter .min-input" ).val( ui.values[ 0 ] );
        $( ".price-filter .max-input" ).val( ui.values[ 1 ] );
      }
    });


    // ====== YOUTUBE ======

 $(".youtube").each(function(i, el) {
        // Based on the YouTube ID, we can easily find the thumbnail image
        $(el).css('background-image', 'url(http://i.ytimg.com/vi/' + el.id + '/sddefault.jpg)');

        // Overlay the Play icon to make it look like a video player
        $(el).append($('<div/>', {'class': 'play'}));

        $(document).on( 'click','#' + el.id, function() {
            // Create an iFrame with autoplay set to true
            var iframe_url = "https://www.youtube.com/embed/" + el.id + "?autoplay=1&autohide=1";
            if ($(el).data('params')) iframe_url+='&'+$(el).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(el).width(), 'height': $(el).height() })

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            $(el).replaceWith(iframe);
        });
    });

// ======================


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

    $('.product-slider-g').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        infinite: true,
        customPaging : function(slider, i) {
            if(slider.$slides.eq(i).find(".youtube").length){
                return '<span href="#" class="dots-item">Y</span>';
            }
        return '<span href="#" class="dots-item">0</span>';
    },
        nextArrow: "<div class='slick-arrows arrow-next'><span class='custom-arrow'></span><i class='circle'></i></div>",
        prevArrow: "<div class='slick-arrows arrow-prev'><span class='custom-arrow'></span><i class='circle'></i></div>",

    });

    function mainSlickInit(){

        if($(window).width() > 768 && !$(".main-slider").hasClass("slick-slider")){
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


$(document).on("click touchend", ".top-head__menu-bar", function(e) {
    $(".top-head__mmenu").addClass("mmenu--opened");
});


$(".rating-stars").barrating({
    theme: 'fontawesome-stars'
});;

$(document).on("click touchend", ".mmenu__close", function(e) {
    $(this).closest(".mmenu").removeClass("mmenu--opened");
});

$(".catalog__item").on('mouseleave', function(e) {
    $(this).removeClass("catalog__item--active")
});


$(".catalog__item").on('mouseenter touchend', function(e) {
    var $this = $(this),
    dropM = $this.find(".dropdown-menu"),
    items = dropM.find(".dropdown-menu__item");
    if(dropM.length){
        $this.addClass("catalog__item--active");
        $this.find('.slider-brands').slick("setPosition");

        if(items.length > 6){
            dropM.find(".all-catagories").css("display", "inline-block");
        }
    }
});

var filters = $(".filters"),
    childs = $(".filters").find(".filter");

if(childs.length > 5){
    var heightFive = 0;
    childs.each(function(i, el){
        heightFive += $(el).height();
    });
    filters.height(heightFive + 30);
}

$(document).on("click", ".filters__show-all", function(e){
    e.preventDefault();
    $(this).addClass("hidden")
    $(this).closest(".filters").css("height", "auto");
});



$(document).on("click touchend", function(e) {
    var target = $(e.target);

    if (!target.closest(".catalog__item--active").length ||
        target.closest(".item-catalog__back").length) {
        $(".catalog__item--active").removeClass("catalog__item--active")
}
});

$(document).on("click", ".dropdown__show-all", function(e){
    e.preventDefault();
    $(this).addClass("hidden")
    $(".dropdown-menu").css("height", "auto");
});

$(document).on("click", ".read-more", function(e){
    e.preventDefault();
    console.log("show")
    $(this)
    .closest("section")
    .find(".more-txt")
    .css("display", "block");
});


$("#lang, #sort").niceSelect();


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






});