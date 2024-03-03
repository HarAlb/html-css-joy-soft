jQuery(function ($) {
    // reveal animation
    if (typeof ScrollReveal === "function") {
        window.sr = ScrollReveal();
        sr.reveal('', {
            scale: 1,
            duration: 1800,
            interval: 80,
            delay: 300,
            mobile: true,
            origin: 'bottom',
            distance: '30px',
            afterReveal: function (el) {
                el.classList.add("is-visible");
            }
        });
    }

    const commonTypingOptions = {
        typeSpeed: 50,
        startDelay: 0,
        fadeOut: true,
        showCursor: false,
        smartBackspace: false,
        autoInsertCss: true,
        fadeOutDelay: 0,
        backDelay: 30,
        preStringTyped: (arrayPos, self) => {
            self.el.classList.remove('completed');
            self.el.classList.add('typing');
        },
        onComplete: (self) => {
            self.el.classList.add('completed');
            self.el.classList.remove('typing');
        },
    };
    // new TypeIt(document.querySelector("#idea1 h2"), commonTypingOptions).go();
    new Typed("#idea1 h2", {
        strings: ['Better Insights For Business <span class="highlight-second">Growth</span>'],
        ...commonTypingOptions,
    });

    // sliders
    if (typeof $.fn.slick === "function") {
        const ideasSlider = $('.js-ideas-slider');

        function typeTextAnimation(slick, currentSlide) {
            const currSlide = slick.$slides[currentSlide];
            const currTargetEl = currSlide.querySelector(".idea__text h2");
            new Typed(currTargetEl, {
                strings: [currTargetEl.innerHTML],
                ...commonTypingOptions,
            });
        }

        ideasSlider.slick({
            slidesToShow: 1,
            arrows: false,
            fade: true,
        });
        /*ideasSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){

        });*/
        ideasSlider.on('afterChange', function (event, slick, currentSlide) {
            typeTextAnimation(slick, currentSlide)
        });


    }

    // menu
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("mobile-menu-open");
        let svg = $(this).find("use");
        let svgHref = svg.attr("xlink:href");
        let iconName = svgHref.includes("#menu") ? svgHref.replace("#menu", "#close") : svgHref.replace("#close", "#menu");

        svg.attr("xlink:href", iconName);
    });

    $(".mobile-nav .menu-item-has-children").click(function (e) {
        e.preventDefault();
        $(this).children(".submenu").slideToggle();
    });

});

// reasons info toggle
const reasonsList = document.querySelector('.reasons-list');
const reasons = reasonsList.querySelectorAll('.reason');

function closeReasonInfo(r) {
    r.classList.remove('reason--active');
    reasonsList.classList.remove('reason-list--active');
}

reasonsList.querySelectorAll('.reason').forEach(r => {
    r.addEventListener('click', e => {
        e.target.closest('.reason').classList.add('reason--active');
        reasonsList.classList.add('reason-list--active');

        if (e.target.closest('.close')) {
            closeReasonInfo(r);
        }
    });
});


$('.staff-slider').owlCarousel({
    center: true,
    loop: true,
    nav: false,
    margin: 0,
    items: 5,
    dots: false,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 3,
        },
        990: {
            items: 5,
        }
    },
    onInitialized: coverFlowEfx,
    onTranslate: coverFlowEfx,
});

function coverFlowEfx(e) {
    idx = e.item.index;
    $('.owl-item.big').removeClass('big');
    $('.owl-item.medium').removeClass('medium');
    $('.owl-item.mdright').removeClass('mdright');
    $('.owl-item.mdleft').removeClass('mdleft');
    $('.owl-item.smallRight').removeClass('smallRight');
    $('.owl-item.smallLeft').removeClass('smallLeft');
    $('.owl-item').eq(idx - 1).addClass('medium mdleft');
    $('.owl-item').eq(idx).addClass('big');
    $('.owl-item').eq(idx + 1).addClass('medium mdright');
    $('.owl-item').eq(idx + 2).addClass('smallRight');
    $('.owl-item').eq(idx - 2).addClass('smallLeft');
}


$(function () {
    AOS.init({offset: -300, duration: 700, easing: "ease-out-quad",});
    window.addEventListener('load', AOS.refresh);
});


