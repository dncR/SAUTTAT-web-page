/*
 * Title:   Ombligo HTML Template
 * Author:  QTC Media
 */

/* --------------------------------------------------------
 [Table of contents]

 1. revolutionSlider
 2. raTing
 3. raTingHover
 4. sliderTestimonial
 5. menuMedia
 6. childMenuMedia
 7. flippingGallery
 8. owlCarousel
 9. countDown
 10. setActiveTestimonials
 11. slickSlider
 12. cascadeSlider
 13. hiddenMenuHomeSix
 14. scrollSlider
 15. isLettering
 16. latestBlogSlider
 17. priceRange
 18. subMenuCategoriesSidebar
 19. filterProductOfPage
 20. quantityProduct
 21. showBlogListing
 22. formValidation
 23. popupForm
 24. setBorderWidth
 25. backToTop
 26. scrollSlider
 27. setCenterNav
 28. wowAnimation

 [End table of contents]
 ----------------------------------------------------------------------- */

"use strict"; // Start of use strict

function revolutionSlider() {
    if($('.rev_slider_wrapper #slider_home_one').length) {
        jQuery("#slider_home_one").revolution({
            sliderLayout: "auto",
            dottedOverlay: "none",
            delay: 8000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "on",
                touch:{
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                arrows: {
                    style: "zeus",
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 600,
                    hide_onleave: true,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    tmp: '<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 30,
                        v_offset: 0
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 30,
                        v_offset: 0
                    }
                }
            },
            responsiveLevels: [1640,1440,1240,1024,975,751,463],
            visibilityLevels: [1640,1440,1240,1024,975,751,463],
            gridwidth: [1640,1440,1240,1024,975,751,463],
            gridheight: [760,700,640,580,520,460,460],
            lazyType: "none",
            shadow: 0,
            spinner: "spinner3",
            stopLoop: "off",
            shuffle: "off",
            autoHeight: "off",
            fullScreenAutoWidth: "off",
            fullScreenAlignForce: "off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "60px",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener :false
            }
        });
    }
    if ($('.rev_slider_wrapper #slider_home_two').length) {
        jQuery("#slider_home_two").revolution({
            sliderLayout: "auto",
            dottedOverlay: "none",
            delay: 8000,
            navigation: {
				onHoverStop: "on",
                arrows: {
                    enable: true,
                    left: {
                        h_align: "left",
                        v_align: "bottom",
                        h_offset: 375,
                        v_offset: 100
                    },
                    right: {
                        h_align: "left",
                        v_align: "bottom",
                        h_offset: 435,
                        v_offset: 100
                    }
                }
            },
            responsiveLevels: [1725,1724,1624,1524,1424,1324,1204,975,751,564,364],
            visibilityLevels: [1725,1724,1624,1524,1424,1324,1204,975,751,564,364],
            gridwidth: [1725,1724,1624,1524,1424,1324,1204,975,751,564,364],
            gridheight: [760,760,760,760,710,660,610,560,510,410,260],
            lazyType: "none",
            shadow: 0,
            spinner: "spinner3",
            stopLoop: "off",
            shuffle: "off",
            autoHeight: "off",
            fullScreenAutoWidth: "off",
            fullScreenAlignForce: "off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "60px",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false
        });
    }
    if ($('.rev_slider_wrapper #slider_home_five').length) {
        jQuery("#slider_home_five").revolution({
            sliderLayout: "auto",
            dottedOverlay: "none",
            delay: 8000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "on",
                touch:{
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                }
                ,
                arrows: {
                    style: "metis",
                    enable: true,
                    hide_onmobile: false,
                    hide_onleave: false,
                    tmp: '',
                    left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 0,
                        v_offset: 0
                    }
                }
                ,
                bullets: {
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 768,
                    style: "hermes",
                    hide_onleave: false,
                    direction:"vertical",
                    container:"layergrid",
                    h_align: "right",
                    v_align: "center",
                    h_offset: 100,
                    v_offset: 0,
                    space: 25,
                    tmp: '<div class="slider-name"><h3>Slider</h3><div class="omb-line"></div></div>'
                }
            },
            responsiveLevels: [1700,1634,1344,975,751,463],
            visibilityLevels: [1700,1634,1344,975,751,463],
            gridwidth: [1700,1634,1344,975,751,463],
            gridheight: [850,800,700,500,400,350],
            lazyType: "none",
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false
        });
    }
    if ($('.rev_slider_wrapper #slider_home_six').length) {
        jQuery("#slider_home_six").revolution({
            sliderLayout: "auto",
            dottedOverlay: "none",
            delay: 8000,
            navigation: {
                keyboardNavigation: "off",
                keyboard_direction: "horizontal",
                mouseScrollNavigation: "off",
                mouseScrollReverse: "default",
                onHoverStop: "on",
                touch:{
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                }
                ,
                arrows: {
                    enable: false
                }
                ,
                bullets: {
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 975,
                    style: "hermes",
                    hide_onleave: false,
                    direction:"vertical",
                    container:"layergrid",
                    h_align: "left",
                    v_align: "center",
                    h_offset: 60,
                    v_offset: 0,
                    space: 20,
                    tmp: '<div class="slider-name"></div>'
                }
                ,
                thumbnails: {
                    style: "erinyen",
                    enable: true,
                    width: 75,
                    height: 75,
                    min_width: 75,
                    wrapper_padding: 0,
                    wrapper_color: "transparent",
                    wrapper_opacity: "1",
                    tmp: '<span class="tp-thumb-image"><i class="overlay"></i><h3>Slider </h3><i class="omb-line omb-line-orange"></i></span>',
                    visibleAmount: 5,
                    hide_onmobile: true,
                    hide_under: 1203,
                    hide_onleave: false,
                    direction: "vertical",
                    span: false,
                    position: "inner",
                    space: 0,
                    h_align: "right",
                    v_align: "center",
                    h_offset: 60,
                    v_offset: 0
                }
            },
            responsiveLevels: [1904,1203,975,751,463],
            visibilityLevels: [1904,1203,975,751,463],
            gridwidth: [1904,1203,975,751,463],
            gridheight: [760,660,560,460,360],
            lazyType: "none",
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false
        });
    }
    if ($('.rev_slider_wrapper #slider_newsletter').length) {
        jQuery("#slider_newsletter").revolution({
            sliderLayout: "fullscreen",
            dottedOverlay: "none",
            delay: 8000,
            navigation: {
                bullets: {
                    enable: true,
                    hide_onmobile: true,
                    hide_under: 768,
                    style: "hermes",
                    hide_onleave: false,
                    direction:"horizontal",
                    container:"layergrid",
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 0,
                    space: 25
                }
            },
            responsiveLevels:[1240,992,768,480],
            visibilityLevels:[1240,992,768,480],
            gridwidth:[1240,992,768,480],
            gridheight:[868,768,960,720],
            lazyType:"none",
            shadow:0,
            spinner:"off",
            autoHeight:"off",
            fullScreenAutoWidth:"off",
            fullScreenAlignForce:"off",
            fullScreenOffsetContainer: "",
            fullScreenOffset: "",
            disableProgressBar:"on",
            hideThumbsOnMobile:"off",
            hideSliderAtLimit:0,
            hideCaptionAtLimit:0,
            hideAllCaptionAtLilmit:0,
            debugMode:false,
            fallbacks: {
                simplifyAll:"off",
                disableFocusListener:false,
            }
        });
    }
}
function raTing() {
    if($('.rateYo').length) {
        $('.rateYo').rateYo({
            rating: 2.5,
            halfStar: true
        });
    }
}
function raTingHover() {
    if($('.rateYo-hover').length) {
        $('.rateYo-hover').rateYo({
            rating: 2.5,
            halfStar: true,
            starWidth: "14px",
            normalFill: '#a8a8a8',
            ratedFill: '#ffffff'
        });
    }
}
function sliderTestimonial() {
    if($('.our-testimonial').length) {
        $('.our-testimonial .omb-slidenav-previous').on('click', function(){
            var prevActiveOne = ($(this).parent().siblings('.testimonial-switcher').children('.uk-active'));
            var prevActiveTwo = ($(this).parent().siblings('#our_testimonial').children('.uk-active'));
            prevActiveOne.removeClass('uk-active');
            prevActiveTwo.removeClass('uk-active');
            prevActiveTwo.attr('aria-hidden', 'true');
            if(!prevActiveOne.prev().length) {
                $(this).parent().siblings('.testimonial-switcher').children('li').last().addClass('uk-active');
                $(this).parent().siblings('#our_testimonial').children('li').last().addClass('uk-active');
                $(this).parent().siblings('#our_testimonial').children('li').last().attr({'aria-hidden':'false','style':'animation-duration: 200ms'});
                return false;
            }
            else {
                prevActiveOne.prev().addClass('uk-active');
                prevActiveTwo.prev().addClass('uk-active');
                prevActiveTwo.prev().attr({'aria-hidden':'false','style':'animation-duration: 200ms'});
                return false;
            }
        });
        $('.our-testimonial .omb-slidenav-next').on('click', function(){
            var nextActiveOne = ($(this).parent().siblings('.testimonial-switcher').children('.uk-active'));
            var nextActiveTwo = ($(this).parent().siblings('#our_testimonial').children('.uk-active'));
            nextActiveOne.removeClass('uk-active');
            nextActiveTwo.removeClass('uk-active');
            nextActiveTwo.attr('aria-hidden', 'true');
            if(!nextActiveOne.next().length) {
                $(this).parent().siblings('.testimonial-switcher').children('li').first().addClass('uk-active');
                $(this).parent().siblings('#our_testimonial').children('li').first().addClass('uk-active');
                $(this).parent().siblings('#our_testimonial').children('li').first().attr({'aria-hidden':'false','style':'animation-duration: 200ms'});
                return false;
            }
            else {
                nextActiveOne.next().addClass('uk-active');
                nextActiveTwo.next().addClass('uk-active');
                nextActiveTwo.next().attr({'aria-hidden':'false','style':'animation-duration: 200ms'});
                return false;
            }
        });
    }
}
function backToTop() {
    if ($('#omb_backtotop').length) {
        if ($(window).scrollTop() > 1000) {
            $('#omb_backtotop').addClass('show-backtotop');
        } else {
            $('#omb_backtotop').removeClass('show-backtotop');
        }
    }
}
function menuMedia() {
    if ($('#show_toggle a').length) {
        $('#show_toggle a').on('click', function () {
            $('.menu-media').toggle(0, 'linear');
            $('#show_toggle a').toggleClass('icon_menu icon_close');
            return false;
        });
    }
}
function childMenuMedia() {
    if ($('.nav-holder').length) {
        $('.nav-holder li.has-submenu').children('a').append(function () {
            return '<button class="dropdown-expander"><i class="icon_plus"></i></button>';
        });
        
        $('.nav-holder li.child-has-submenu').children('a').append(function () {
            return '<button class="child-dropdown-expander"><i class="arrow_carrot-down"></i></button>';
        });
        
        $('.nav-holder .dropdown-expander').on('click', function () {
            if($(this).parent().parent().hasClass('active')) {
                $(this).parent().parent().children('.submenu').slideToggle();
                $(this).find('i').toggleClass('icon_plus icon_minus-06');
                $(this).parent('a').parent('li').toggleClass('active');
            }
            else {
                $('.nav-holder li.has-submenu .submenu').slideUp();
                $('.nav-holder li.has-submenu').removeClass('active');
                $('.nav-holder li.has-submenu .dropdown-expander').find('i').removeClass('icon_minus-06');
                $('.nav-holder li.has-submenu .dropdown-expander').find('i').addClass('icon_plus');
                $(this).parent().parent().addClass('active');
                $(this).find('i').removeClass('icon_plus');
                $(this).find('i').addClass('icon_minus-06');
                $(this).parent().parent().children('.submenu').slideDown();
            }
            return false;
        });
        
        $('.nav-holder .child-dropdown-expander').on('click', function () {
            if($(this).parent().parent().hasClass('active')) {
                $(this).parent().parent().children('.child-submenu').slideToggle();
                $(this).find('i').toggleClass('arrow_carrot-down arrow_carrot-up');
                $(this).parent('a').parent('li').toggleClass('active');
            }
            else {
                $('.nav-holder li.child-has-submenu .child-submenu').slideUp();
                $('.nav-holder li.child-has-submenu').removeClass('active');
                $('.nav-holder li.child-has-submenu .child-dropdown-expander').find('i').removeClass('arrow_carrot-up');
                $('.nav-holder li.child-has-submenu .child-dropdown-expander').find('i').addClass('arrow_carrot-down');
                $(this).parent().parent().addClass('active');
                $(this).find('i').removeClass('arrow_carrot-down');
                $(this).find('i').addClass('arrow_carrot-up');
                $(this).parent().parent().children('.child-submenu').slideDown();
            }
            return false;
        });
    }
}
function flippingGallery() {
    if($('.gallery-flipping').length) {
        var z_index_one = 999;
        var margin_one = 0;
        var scale_one = 1;
        
        var z_index_two = 999;
        var margin_two = 0;
        var scale_two = 1;
        
        $('.gallery-flipping-one .wrapper .box-img').each(function() {
            $(this).css({'z-index':z_index_one, 'margin-top':margin_one, '-webkit-transform': 'scale('+scale_one+')', '-moz-transform': 'scale('+scale_one+')', '-ms-transform': 'scale('+scale_one+')', '-o-transform': 'scale('+scale_one+')', 'transform': 'scale('+scale_one+')'});
            z_index_one--;
            margin_one+=20;
            scale_one-=0.05;
        });
        
        $('.gallery-flipping-two .wrapper .box-img').each(function() {
            $(this).css({'z-index':z_index_two, 'margin-top':margin_two, '-webkit-transform': 'scale('+scale_two+')', '-moz-transform': 'scale('+scale_two+')', '-ms-transform': 'scale('+scale_two+')', '-o-transform': 'scale('+scale_two+')', 'transform': 'scale('+scale_two+')'});
            z_index_two--;
            margin_two+=20;
            scale_two-=0.05;
        });
        
        $('.gallery_flipping .prev').on('click', function() {
            var z_index = 999;
            var margin = 0;
            var scale = 1;
            
            var isLast = $(this).parent().parent().siblings('.flipping').children().children('.wrapper').children().last();
            isLast.clone().prependTo($(this).parent().parent().siblings('.flipping').children().children('.wrapper'));
            isLast.remove();
            
            $(this).parent().parent().siblings('.flipping').children().children('.wrapper').children().each(function() {
                $(this).css({'z-index':z_index, 'margin-top':margin, '-webkit-transform': 'scale('+scale+')', '-moz-transform': 'scale('+scale+')', '-ms-transform': 'scale('+scale+')', '-o-transform': 'scale('+scale+')', 'transform': 'scale('+scale+')'});
                z_index--;
                margin+=20;
                scale-=0.05;
            });
            
            return false;
        });
        
        $('.gallery_flipping .next').on('click', function() {
            var z_index = 999;
            var margin = 0;
            var scale = 1;
            
            var isFirst = $(this).parent().parent().siblings('.flipping').children().children('.wrapper').children().next();
            isFirst.clone().prependTo($(this).parent().parent().siblings('.flipping').children().children('.wrapper'));
            isFirst.remove();
            
            $(this).parent().parent().siblings('.flipping').children().children('.wrapper').children().each(function() {
                $(this).css({'z-index':z_index, 'margin-top':margin, '-webkit-transform': 'scale('+scale+')', '-moz-transform': 'scale('+scale+')', '-ms-transform': 'scale('+scale+')', '-o-transform': 'scale('+scale+')', 'transform': 'scale('+scale+')'});
                z_index--;
                margin+=20;
                scale-=0.05;
            });
            
            return false;
        });
        
        $('.gallery-flipping .dot-nav li').on('click', function() {
            var z_index = 999;
            var margin = 0;
            var scale = 1;
            
            $('.gallery-flipping .dot-nav li').removeClass('uk-active');
            $(this).addClass('uk-active');
            
            var index = $(this).index() + 1;
            var isActive = $('.gallery-flipping .wrapper li:nth-child('+index+')');
            
            $('.gallery-flipping .wrapper li').removeClass('uk-active');
            isActive.addClass('uk-active');
            
            if(index === 1) {
                for(var i = index; i <= $('.gallery-flipping .wrapper li').length; i++) {
                    $('.gallery-flipping .wrapper li:nth-child('+i+')').css({'z-index':z_index, 'margin-top':margin, '-webkit-transform': 'scale('+scale+')', '-moz-transform': 'scale('+scale+')', '-ms-transform': 'scale('+scale+')', '-o-transform': 'scale('+scale+')', 'transform': 'scale('+scale+')'});
                    z_index--;
                    margin+=20;
                    scale-=0.05;
                }
            }
            else if(index === $('.gallery-flipping .wrapper li').length) {
                $('.gallery-flipping .wrapper li:nth-child('+index+')').css({'z-index':z_index, 'margin-top':margin, '-webkit-transform': 'scale('+scale+')', '-moz-transform': 'scale('+scale+')', '-ms-transform': 'scale('+scale+')', '-o-transform': 'scale('+scale+')', 'transform': 'scale('+scale+')'});
                z_index--;
                margin+=20;
                scale-=0.05;
                
                for(var i = 1; i < $('.gallery-flipping .wrapper li').length; i++) {
                    $('.gallery-flipping .wrapper li:nth-child('+i+')').css({'z-index':z_index, 'margin-top':margin, '-webkit-transform': 'scale('+scale+')', '-moz-transform': 'scale('+scale+')', '-ms-transform': 'scale('+scale+')', '-o-transform': 'scale('+scale+')', 'transform': 'scale('+scale+')'});
                    z_index--;
                    margin+=20;
                    scale-=0.05;
                }
            }
            else {
                for(var i = index; i <= $('.gallery-flipping .wrapper li').length; i++) {
                    $('.gallery-flipping .wrapper li:nth-child('+i+')').css({'z-index':z_index, 'margin-top':margin, '-webkit-transform': 'scale('+scale+')', '-moz-transform': 'scale('+scale+')', '-ms-transform': 'scale('+scale+')', '-o-transform': 'scale('+scale+')', 'transform': 'scale('+scale+')'});
                    z_index--;
                    margin+=20;
                    scale-=0.05;
                }
                
                for(var i = 1; i < index; i++) {
                    $('.gallery-flipping .wrapper li:nth-child('+i+')').css({'z-index':z_index, 'margin-top':margin, '-webkit-transform': 'scale('+scale+')', '-moz-transform': 'scale('+scale+')', '-ms-transform': 'scale('+scale+')', '-o-transform': 'scale('+scale+')', 'transform': 'scale('+scale+')'});
                    z_index--;
                    margin+=20;
                    scale-=0.05;
                }
            }
            
            return false;
        });
    }
}
function owlCarousel() {
    if($('.loop').length) {
        $('.loop').owlCarousel({
            center: true,
            items: 2,
            nav: true,
            loop: true,
            margin: 0,
            autoplay: true,
            navText: ["<span class='icon arrow_left'></span>", "<span class='icon arrow_right'></span>"],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });
    }
    if($('.loop-one').length) {
        $('.loop-one').owlCarousel({
            center: false,
            items: 2,
            nav: true,
            loop: true,
            margin: 0,
            autoplay: true,
            navText: ["<span class='icon arrow_left'></span>", "<span class='icon arrow_right'></span>"],
            responsive: {
                600: {
                    items: 2
                }
            }
        });
    }
    if($('.loop-two').length) {
        $('.loop-two').owlCarousel({
            center: true,
            items: 5,
            loop: true,
            margin: 10,
            autoplay: true,
            responsive: {
                600: {
                    items: 5
                }
            }
        });
    }
    if($('.loop-three').length) {
        $('.loop-three').owlCarousel({
            center: false,
            nav: true,
            loop: true,
            margin: 30,
            autoplay: true,
            navText: ["<span class='nav prev'></span>", "<span class='nav next'></span>"],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });
    }
    if($('.loop-four').length) {
        $('.loop-four').owlCarousel({
            center: false,
            items: 3,
            nav: true,
            dots: false,
            loop: true,
            margin: 30,
            autoplay: true,
            navText: ["REVIOUS", "NEXT"],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });
    }
    if($('.loop-five').length) {
        $('.loop-five').owlCarousel({
            center: true,
            items: 2,
            nav: true,
            loop: true,
            margin: 30,
            autoplay: true,
            navText: ["REVIOUS", "NEXT"],
            responsive: {
                0: {
                    items: 1,
                    autoWidth: false
                },
                992: {
                    items: 2,
                    autoWidth: true
                }
            }
        });
    }
    if($('.loop-six').length) {
        $('.loop-six').owlCarousel({
            items: 1,
            nav: true,
            loop: true,
            margin: 30,
            dots: false,
            autoplay: true,
            navText: ["", ""],
            responsive: {
                600: {
                    items: 1,
                    margin: 30
                }
            }
        });
    }
    if($('.loop-seven').length) {
        $('.loop-seven').owlCarousel({
            items: 1,
            nav: true,
            loop: true,
            margin: 30,
            dots: true,
            autoplay: false,
            navText: ["<span class='icon arrow_carrot-left'></span>", "<span class='icon arrow_carrot-right'></span>"],
            responsive: {
                600: {
                    items: 1,
                    margin: 30
                }
            }
        });
    }
    if($('.loop-eight').length) {
        $('.loop-eight').owlCarousel({
            items: 3,
            nav: true,
            loop: true,
            center: true,
            margin: 90,
            dots: true,
            autoplay: false,
            navText: ["<span class='nav prev'></span>", "<span class='nav next'></span>"],
            responsive: {
                0: {
                    items: 1,
                    margin: 30,
                    center: false
                },
                768: {
                    items: 2,
                    margin: 60,
                    center: false
                },
                992: {
                    items: 2,
                    margin: 90,
                    center: false
                },
                1131: {
                    items: 2,
                    margin: 130,
                    center: false
                },
                1220: {
                    items: 3,
                    margin: 90
                }
            }
        });
    }
}
function countDown() {
    if($('.count-down-one').length) {
        $('.count-down-one').countdown({
            date: '2017-12-27',
            offset: -8
        });
    }
    if($('.count-down-two').length) {
        $('.count-down-two').countdown({
            date: '2017-08-26',
            offset: -8
        });
    }
    if($('.count-down-three').length) {
        $('.count-down-three').countdown({
            date: '2017-09-22',
            offset: -8
        });
    }
    if($('.count-down-four').length) {
        $('.count-down-four').countdown({
            date: '2017-02-16',
            offset: -8
        });
    }
    if($('.count-down-five').length) {
        $('.count-down-five').countdown({
            date: '2018-01-13',
            offset: -8
        });
    }
}
function setActiveTestimonials() {
    if($('#our_testimonial_home_four').length) {
        $('#our_testimonial_home_four .testimonial-switcher li').on('click', function() {
            var index = $(this).index() + 1;
            $('#our_testimonial_home_four .testimonial-switcher-dot li.uk-active').removeClass('uk-active');
            $('#our_testimonial_home_four .testimonial-switcher-dot li:nth-child('+index+')').addClass('uk-active');
        });
        $('#our_testimonial_home_four .testimonial-switcher-dot li').on('click', function() {
            var index = $(this).index() + 1;
            $('#our_testimonial_home_four .testimonial-switcher li.uk-active').removeClass('uk-active');
            $('#our_testimonial_home_four .testimonial-switcher li:nth-child('+index+')').addClass('uk-active');
        });
        $('#our_testimonial_home_four .omb-slidenav-previous').on('click', function(){
            var prevActiveOne = ($(this).siblings('.testimonial-switcher-dot').children('.uk-active'));
            prevActiveOne.removeClass('uk-active');
            if(!prevActiveOne.prev().length) {
                $(this).siblings('.testimonial-switcher-dot').children('li').last().addClass('uk-active');
                return false;
            }
            else {
                prevActiveOne.prev().addClass('uk-active');
                return false;
            }
        });
        $('#our_testimonial_home_four .omb-slidenav-next').on('click', function(){
            var nextActiveOne = ($(this).siblings('.testimonial-switcher-dot').children('.uk-active'));
            nextActiveOne.removeClass('uk-active');
            if(!nextActiveOne.next().length) {
                $(this).siblings('.testimonial-switcher-dot').children('li').first().addClass('uk-active');
                return false;
            }
            else {
                nextActiveOne.next().addClass('uk-active');
                return false;
            }
        });
    }
}
function initMap() {
    if ($('.google-map').length) {
        var locations = [
            ['Lorem ipsum dolor sit amet, <br> consectetuer adipiscing elit, <br> sed diam nonummy', 48.837579, -1.597302, 2],
            ['Claritas est etiam processus <br> dynamicus, qui sequitur <br> mutationem', 48.837912, -1.581806, 1]
        ];
        
        var map = new google.maps.Map(document.getElementById('home-four-google-map'), {
            zoom: 16,
            center: new google.maps.LatLng(48.837579, -1.597302),
			scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP 
        });
        
        var infowindow = new google.maps.InfoWindow();
        
        var marker, i;
        
        for (i = 0; i < locations.length; i++) {
            var iconPath = new google.maps.MarkerImage('images/index-4/dot-map.png');
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: iconPath
            });
            
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    };
}
function slickSlider() {
    if($('.slick-our-brand').length) {
        $('.slick-our-brand').slick({
            dots: false,
            infinite: false,
            variableWidth: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<a class="prev" href="#"><span class="icon arrow_carrot-left"></span></a>',
            nextArrow: '<a class="next" href="#"><span class="icon arrow_carrot-right"></span></a>',
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1220,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 561,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        var filtered = false;
        $('#our_brand .button-filter').on('click', function(){
            var filtername = $(this).attr('id');
            if (filtered === false) {
                $('.slick-our-brand').slick('slickUnfilter');
                $('.slick-our-brand').slick('slickFilter','.filter-' + filtername);
                $('#our_brand .button-filter').attr('class','button-filter omb-hover-underline');
                $(this).attr('class','uk-active button-filter omb-hover-underline');
                return false;
            } else {
                $('.slick-our-brand').slick('slickUnfilter');
                $('.slick-our-brand').slick('slickFilter','.filter-' + filtername);
                $('.slick-our-brand').slickGoTo(0);
                $('#our_brand .button-filter').attr('class','button-filter omb-hover-underline');
                $(this).attr('class','uk-active button-filter omb-hover-underline');
                filtered = false;
                return false;
            }
        });
    }
    if($('.slick-our-gallery').length) {
        $('.slick-our-gallery').slick({
            dots: false,
            infinite: false,
            variableWidth: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<a class="prev" href="#"><span class="icon arrow_carrot-left"></span></a>',
            nextArrow: '<a class="next" href="#"><span class="icon arrow_carrot-right"></span></a>',
            rtl: true,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1220,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 561,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        var filtered = false;
        $('#our_gallery .button-filter').on('click', function(){
            var filtername = $(this).attr('id');
            if (filtered === false) {
                $('.slick-our-gallery').slick('slickUnfilter');
                $('.slick-our-gallery').slick('slickFilter','.filter-' + filtername);
                $('#our_gallery .button-filter').attr('class','button-filter omb-hover-underline');
                $(this).attr('class','uk-active button-filter omb-hover-underline');
                return false;
            } else {
                $('.slick-our-gallery').slick('slickUnfilter');
                $('.slick-our-gallery').slick('slickFilter','.filter-' + filtername);
                $('.slick-our-gallery').slickGoTo(0);
                $('#our_gallery .button-filter').attr('class','button-filter omb-hover-underline');
                $(this).attr('class','uk-active button-filter omb-hover-underline');
                filtered = false;
                return false;
            }
        });
    }
    if($('.slick-latest-news').length) {
        $('.slick-latest-news').slick({
            dots: true,
            infinite: true,
            variableWidth: true,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<a class="prev" href="#">PREV</a>',
            nextArrow: '<a class="next" href="#">NEXT</a>'
        });
    }
}
function cascadeSlider() {
    if($('#cascade-slider').length) {
        $('#cascade-slider').cascadeSlider({
            itemClass: 'cascade-slider_item',
            arrowClass: 'cascade-slider_arrow'
        });
        var intDots = $('#cascade-slider .cascade-slider_slides .cascade-slider_item').length;
        for(var i = 1; i <= intDots; i++) {
            if(i===1) {
                $('<li class="uk-active"><a href="#">'+i+'</a></li>').appendTo('#cascade-slider .uk-pagination');
            }
            else {
                $('<li><a href="#">'+i+'</a></li>').appendTo('#cascade-slider .uk-pagination');
            }
        }
        $('#cascade-slider .cascade-slider_arrow-left').on('click', function(){
            var isNow = $('#cascade-slider .cascade-slider_slides .cascade-slider_item.now').index()+1;
            $('#cascade-slider .uk-pagination li.uk-active').removeClass('uk-active');
            $('#cascade-slider .uk-pagination li:nth-child('+isNow+')').addClass('uk-active');
        });
        $('#cascade-slider .cascade-slider_arrow-right').on('click', function(){
            var isNow = $('#cascade-slider .cascade-slider_slides .cascade-slider_item.now').index()+1;
            $('#cascade-slider .uk-pagination li.uk-active').removeClass('uk-active');
            $('#cascade-slider .uk-pagination li:nth-child('+isNow+')').addClass('uk-active');
        });
        $('#cascade-slider .uk-pagination li').on('click', function(){
            $('#cascade-slider .uk-pagination li.uk-active').removeClass('uk-active');
            $(this).addClass('uk-active');
            $('#cascade-slider .cascade-slider_slides .cascade-slider_item.now').removeClass('now');
            $('#cascade-slider .cascade-slider_slides .cascade-slider_item.prev').removeClass('prev');
            $('#cascade-slider .cascade-slider_slides .cascade-slider_item.next').removeClass('next');
            var isActive = $(this).index()+1;
            $('#cascade-slider .cascade-slider_slides .cascade-slider_item:nth-child('+isActive+')').addClass('now');
            var newNext = $('#cascade-slider .cascade-slider_slides .cascade-slider_item.now').next();
            var newPrev = $('#cascade-slider .cascade-slider_slides .cascade-slider_item.now').prev();
            if(!newNext.length) {
                $('#cascade-slider .cascade-slider_slides .cascade-slider_item').first().addClass('next');
            }
            else {
                newNext.addClass('next');
            }
            if(!newPrev.length) {
                $('#cascade-slider .cascade-slider_slides .cascade-slider_item').last().addClass('prev');
            }
            else {
                newPrev.addClass('prev');
            }
            return false;
        });
    }
}
function hiddenMenuHomeSix() {
    if($('.toggle').length) {
        $('.toggle').on('click', function() {
            $('.toggle span.icon').toggleClass('icon_close icon_menu');
            $('.content .menu').toggle(500);
            return false;
        });
    }
}
function scrollSlider() {
    if($('.scrolling').length) {
        var amount=Math.max.apply(Math,$('.scrolling li').map(function(){return $(this).outerWidth(true);}).get());
        $('.scrolling').mCustomScrollbar({
            axis: "x",
            theme: "inset",
            advanced:{
                autoExpandHorizontalScroll: 2
            },
            scrollButtons:{
                enable: false,
                scrollType: "stepped"
            },
            keyboard: {scrollType: "stepped"},
            mouseWheel: false
        });
    }
}
function isLettering() {
    if($('.count-down-five').length) {
        $('.lettering').lettering();
    }
}
function latestBlogSlider() {
    if($('#my_latest_blog').length) {
        var i = 0;
        $('.next').on('click', function() {
            var prevActive = $('#my_latest_blog ul li.prev-active');
            var afterPrev = $('#my_latest_blog ul li.prev-active').prev();
            var centerActive = $('#my_latest_blog ul li.center-active');
            var nextActive = $('#my_latest_blog ul li.next-active');
            
            prevActive.addClass('center-active');
            prevActive.removeClass('prev-active');
            centerActive.addClass('next-active');
            centerActive.removeClass('center-active');
            nextActive.removeClass('next-active');
            
            if(!afterPrev.length) {
                $('#my_latest_blog ul li').last().addClass('prev-active');
            }
            else {
                afterPrev.addClass('prev-active');
            }
            if($(window).width() < 975) {
                i = 0;
                $('.latest-blog-home-six .box-right #my_latest_blog ul li').css({'right' : 'auto', 'top' : '50%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(-50%)'});
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.prev-active').css({'right' : 'auto', 'top' : '0', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(0)'});
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.center-active').css({'right' : 'auto', 'top' : '50%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(-50%)'});
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.next-active').css({'right' : 'auto', 'top' : '77%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(0)'});
                
                nextActive.css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '115%', 'transform' : 'translateY(0)'});
                if(!$('#my_latest_blog ul li.prev-active').prev().length) {
                    $('#my_latest_blog ul li').last().css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '-135px', 'transform' : 'translateY(0)'});
                }
                else {
                    $('#my_latest_blog ul li.prev-active').prev().css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '-135px', 'transform' : 'translateY(0)'});
                }
            }
            else {
                i += 60;
                $('#my_latest_blog ul').css({'transform' : 'rotate('+i+'deg)', 'transition' : 'all .5s ease'});
                $('#my_latest_blog ul li .box').css({'transform' : 'rotate('+-i+'deg) translateZ(0)', 'transition' : 'all .5s ease'});
            }
            
            return false;
        });
        $('.prev').on('click', function() {
            var nextActive = $('#my_latest_blog ul li.next-active');
            var afterNext = $('#my_latest_blog ul li.next-active').next();
            var centerActive = $('#my_latest_blog ul li.center-active');
            var prevActive = $('#my_latest_blog ul li.prev-active');
            
            nextActive.addClass('center-active');
            nextActive.removeClass('next-active');
            centerActive.addClass('prev-active');
            centerActive.removeClass('center-active');
            prevActive.removeClass('prev-active');
            
            if(!afterNext.length) {
                $('#my_latest_blog ul li').first().addClass('next-active');
            }
            else {
                afterNext.addClass('next-active');
            }
            
            if($(window).width() < 975) {
                i = 0;
                $('.latest-blog-home-six .box-right #my_latest_blog ul li').css({'right' : 'auto', 'top' : '50%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(-50%)'});
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.prev-active').css({'right' : 'auto', 'top' : '0', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(0)'});
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.center-active').css({'right' : 'auto', 'top' : '50%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(-50%)'});
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.next-active').css({'right' : 'auto', 'top' : '77%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(0)'});
                
                prevActive.css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '-135px', 'transform' : 'translateY(0)'});
                if(!$('#my_latest_blog ul li.next-active').next().length) {
                    $('#my_latest_blog ul li').first().css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '115%', 'transform' : 'translateY(0)'});
                }
                else {
                    $('#my_latest_blog ul li.next-active').next().css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '115%', 'transform' : 'translateY(0)'});
                }
            }
            else {
                i -= 60;
                $('#my_latest_blog ul').css({'transform' : 'rotate('+i+'deg)', 'transition' : 'all .5s ease'});
                $('#my_latest_blog ul li .box').css({'transform' : 'rotate('+-i+'deg) translateZ(0)', 'transition' : 'all .5s ease'});
            }
            
            return false;
        });
        
        var isTablet = 2;
        if($(window).width() < 975) {
            var prevActive = $('.latest-blog-home-six .box-right #my_latest_blog ul li.prev-active').prev();
            var nextActive = $('.latest-blog-home-six .box-right #my_latest_blog ul li.next-active').next();
            
            if(!prevActive.length) {
                $('.latest-blog-home-six .box-right #my_latest_blog ul li').last().css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '-135px', 'transform' : 'translateY(0)'});
            }
            else {
                prevActive.css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '-135px', 'transform' : 'translateY(0)'});
            }
            
            if(!nextActive.length) {
                $('.latest-blog-home-six .box-right #my_latest_blog ul li').first().css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '115%', 'transform' : 'translateY(0)'});
            }
            else {
                nextActive.css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '115%', 'transform' : 'translateY(0)'});
            }
            
            $('.latest-blog-home-six .box-right #my_latest_blog ul li.prev-active').css({'right' : 'auto', 'top' : '0', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(0)'});
            $('.latest-blog-home-six .box-right #my_latest_blog ul li.center-active').css({'right' : 'auto', 'top' : '50%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(-50%)'});
            $('.latest-blog-home-six .box-right #my_latest_blog ul li.next-active').css({'right' : 'auto', 'top' : '77%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(0)'});
        }
        $(window).resize( function() {
            if($(window).width() < 975) {
                isTablet = 1;
            }
            else {
                if(isTablet === 1) {
                    $('#my_latest_blog ul').removeAttr('style');
                    $('#my_latest_blog ul li').removeAttr('style');
                    $('#my_latest_blog ul li .box').removeAttr('style');
                    $('#my_latest_blog ul').addClass('desktop');
                    $('.latest-blog-home-six .box-right #my_latest_blog ul li').removeClass('prev-active center-active next-active');
                    $('.latest-blog-home-six .box-right #my_latest_blog ul li:nth-child(1)').addClass('prev-active');
                    $('.latest-blog-home-six .box-right #my_latest_blog ul li:nth-child(2)').addClass('center-active');
                    $('.latest-blog-home-six .box-right #my_latest_blog ul li:nth-child(3)').addClass('next-active');
                }
                isTablet = 2;
            }
            if(isTablet === 1) {
                var prevActive = $('.latest-blog-home-six .box-right #my_latest_blog ul li.prev-active').prev();
                var nextActive = $('.latest-blog-home-six .box-right #my_latest_blog ul li.next-active').next();
                
                if(!prevActive.length) {
                    $('.latest-blog-home-six .box-right #my_latest_blog ul li').last().css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '-135px', 'transform' : 'translateY(0)'});
                }
                else {
                    prevActive.css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '-135px', 'transform' : 'translateY(0)'});
                }
                
                if(!nextActive.length) {
                    $('.latest-blog-home-six .box-right #my_latest_blog ul li').first().css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '115%', 'transform' : 'translateY(0)'});
                }
                else {
                    nextActive.css({'bottom' : 'auto', 'left' : '0', 'right' : 'auto', 'top' : '115%', 'transform' : 'translateY(0)'});
                }
                
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.prev-active').css({'right' : 'auto', 'top' : '0', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(0)'});
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.center-active').css({'right' : 'auto', 'top' : '50%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(-50%)'});
                $('.latest-blog-home-six .box-right #my_latest_blog ul li.next-active').css({'right' : 'auto', 'top' : '77%', 'bottom' : 'auto', 'left' : '0', 'transform' : 'translateY(0)'});
            }
        });
    }
}
function priceRange() {
    if ($('#price_range').length) {
        $("#price_range").slider({
            range: true,
            min: 0,
            max: 850,
            values: [50, 750],
            slide: function (event, ui) {
                $("#min").val("$" + ui.values[ 0 ]);
                $("#max").val("$" + ui.values[ 1 ]);
            }
        });
        $("#min").val("$" + $("#price_range").slider("values", 0));
        $("#max").val("$" + $("#price_range").slider("values", 1));
    }
}
function subMenuCategoriesSidebar() {
    if ($('.holder-categories').length) {
        $('.holder-categories li.has-submenu').children('a').append(function () {
            return '<button class="dropdown-expander"><i class="icon_plus"></i></button>';
        });
        $('.holder-categories .dropdown-expander').on('click', function () {
            $(this).parent().parent().children('.submenu').slideToggle();
            $(this).find('i').toggleClass('icon_plus icon_minus-06');
            $(this).parent('a').parent('li').toggleClass('uk-active');
            return false;
        });
    }
    if ($('.holder-manufactory').length) {
        $('.holder-manufactory li.has-submenu').children('a').append(function () {
            return '<button class="dropdown-expander"><i class="arrow_carrot-right"></i></button>';
        });
        $('.holder-manufactory .dropdown-expander').on('click', function () {
            $(this).parent().parent().children('.submenu').slideToggle();
            $(this).find('i').toggleClass('arrow_carrot-right arrow_carrot-down');
            $(this).parent('a').parent('li').toggleClass('uk-active');
            return false;
        });
    }
}
function filterProductOfPage() {
    if($('.selected-product-of-page').length) {
        $('.selected-product-of-page .selected .filter-product').on('click', function() {
            $('.selected-product-of-page .selecteds').slideToggle();
            return false;
        });
        $('.selected-product-of-page .selecteds p').on('click', function() {
            $('.selected-product-of-page .selected').find('p').remove();
            $(this).clone().prependTo('.selected-product-of-page .selected');
            $('.selected-product-of-page .selecteds').css('display','none');
            return false;
        });
        var actionScroll = function() {
            $('.selected-product-of-page .selecteds').css('display','none');
        };
        $(window).on('scroll', function() {
            actionScroll();
        });
    }
}
function quantityProduct() {
    if($('.qty').length) {
        $('.qty .box-qty .plus').on('click', function() {
            var $button = $(this);
            var intValue = $button.parent().find('.quantity').val();
            $button.parent().find('.quantity').val(parseInt(intValue, 10) + 1);
            return false;
        });
        $('.qty .box-qty .minus').on('click', function() {
            var $button = $(this);
            var intValue = $button.parent().find('.quantity').val();
            if (parseInt(intValue, 10) > 1) {
                $button.parent().find('.quantity').val(parseInt(intValue, 10) - 1);
            }
            return false;
        });
        $('.quantity').on('blur', function () {
            var $button = $(this);
            if ($button.parent().find('.quantity').val() === "" || parseInt($button.parent().find('.quantity').val(), 10) === 0) {
                $button.parent().find('.quantity').val("1");
            }
        });
        $('.quantity').on('keypress', function (evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
        });
    }
}
function showBlogListing() {
    if($('#show_blog').length) {
        $('#show_blog li').on('click', function() {
            if($(this).hasClass('uk-active')) {
                $(this).toggleClass('uk-active');
                $('#show_blog li .box .content-default').slideDown();
                $('#show_blog li .box .content-hidden').slideUp();
            }
            else {
                $('#show_blog li').removeClass('uk-active');
                $(this).addClass('uk-active');
                $('#show_blog li .box .content-default').slideDown();
                $('#show_blog li .box .content-hidden').slideUp();
                $('#show_blog li.uk-active .box .content-default').slideUp();
                $('#show_blog li.uk-active .box .content-hidden').slideDown();
            }
        });
    }
}
function formValidation() {
    if ($('#form_contact').length) {
        jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
            phone_number = phone_number.replace(/\s+/g, "");
            return this.optional(element) || phone_number.length > 9 &&
                    phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
        }, "Please specify a valid phone number");
        $('#form_contact').validate({
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true
                },
                website: {
                    required: true
                },
                mobile: {
                    required: true,
                    phoneUS: true
                },
                comment: {
                    required: true
                }
            },
            submitHandler: function (form) {
                // sending value with ajax request
                $.post($(form).attr('action'), $(form).serialize(), function (response) {
                    $(form).find('input[type="text"]').val('');
                    $(form).find('textarea').val('');
                });
                return false;
            }
        });
    }
}
function popupForm() {
    if($('.newsletter-popup').length) {
        var maskHeight = $(window).height();
        var maskWidth = $(window).width();
	
        $('#mask').css({'width':maskWidth,'height':maskHeight});
        $('#mask').show();	
	
        var winH = $(window).height();
        var winW = $(window).width();
        $('#dialog').css('top',  winH/2-$('#dialog').outerHeight()/2);
        $('#dialog').css('left', winW/2-$('#dialog').outerWidth()/2);
        $('#dialog').slideDown(1000);
        
	$('.window #cloes_popup').on('click', function (e) {
            e.preventDefault();
            $('#mask').hide();
            $('.window').hide();
	});		
	
	$('#mask').on('click', function () {
            $(this).hide();
            $('.window').hide();
	});
        
        $(window).resize(function() {
            var maskHeight = $(window).height();
            var maskWidth = $(window).width();
            $('#mask').css({'width':maskWidth,'height':maskHeight});
            
            var winH = $(window).height();
            var winW = $(window).width();
            $('#dialog').css('top',  winH/2-$('#dialog').outerHeight()/2);
            $('#dialog').css('left', winW/2-$('#dialog').outerWidth()/2);
        });
    }
}
function setCenterNav() {
    if($('.instagram').length) {
        var full = $(window).width();
        var container = $(".instagram .uk-slider-container").width();
        var maskwidth = ((full - container) / 2) / 2;
        $('.instagram .omb-slidenav').css({'right' : maskwidth, 'margin-right' : '-19px'});
        $(window).resize(function() {
            var full_width = $(window).width();
            var container = $(".instagram .uk-slider-container").width();
            var maskwidth = ((full_width - container) / 2) / 2;
            $('.instagram .omb-slidenav').css({'right' : maskwidth, 'margin-right' : '-19px'});
        });
    }
    
    if($('.our-blog').length) {
        var full = $(window).width();
        var container = $(".our-blog .uk-slider-container").width();
        var maskwidth = ((full - container) / 2) / 2;
        $('.our-blog .omb-slidenav').css({'left' : maskwidth, 'margin-left' : '-19px'});
        $(window).resize(function() {
            var full_width = $(window).width();
            var container = $(".our-blog .uk-slider-container").width();
            var maskwidth = ((full_width - container) / 2) / 2;
            $('.our-blog .omb-slidenav').css({'left' : maskwidth, 'margin-left' : '-19px'});
        });
    }
}
function setBorderWidth() {
    if($('#set_border_width').length) {
        var widthContent = ($('.paratical-information .box .flipping .box-info .content').width()) / 2;
        $('.paratical-information .box .flipping .box-info .content .head-content .shap-border').css({'border-left' : widthContent + 'px solid transparent', 'border-right' : widthContent + 'px solid transparent'});
        $(window).resize(function() {
            var widthContent = ($('.paratical-information .box .flipping .box-info .content').width()) / 2;
            $('.paratical-information .box .flipping .box-info .content .head-content .shap-border').css({'border-left' : widthContent + 'px solid transparent', 'border-right' : widthContent + 'px solid transparent'});
        });
    }
}
function wowAnimation() {
    if($('.wow').length) {
        new WOW().init();
    }
}
// instance of fuction while Document ready event
jQuery(document).on('ready', function () {
    (function ($) {
        revolutionSlider();
        raTing();
        raTingHover();
        sliderTestimonial();
        menuMedia();
        childMenuMedia();
        flippingGallery();
        owlCarousel();
        countDown();
        setActiveTestimonials();
        slickSlider();
        cascadeSlider();
        hiddenMenuHomeSix();
        scrollSlider();
        isLettering();
        latestBlogSlider();
        priceRange();
        subMenuCategoriesSidebar();
        filterProductOfPage();
        quantityProduct();
        showBlogListing();
        formValidation();
        popupForm();
        setBorderWidth();
        wowAnimation();
    })(jQuery);
});
// instance of fuction while Window Scroll event
jQuery(window).on('scroll', function () {
   (function ($) {
       backToTop();
   })(jQuery);
});
// instance of fuction while Window Load event
jQuery(window).on('load', function () {
   (function ($) {
       scrollSlider();
       setCenterNav();
   })(jQuery);
});

// jQuery(document).ready(function($) {
//     $.UIkit.modal('#welcome').show();
// });