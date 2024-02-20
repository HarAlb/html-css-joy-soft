jQuery(function ($){
    // reveal animation
    if(typeof ScrollReveal === "function"){
        window.sr = ScrollReveal();
        sr.reveal('', {
            scale: 1,
            duration: 1800,
            interval: 80,
            delay: 300,
            mobile: true,
            origin: 'bottom',
            distance: '30px',
            afterReveal: function (el){
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
    if(typeof $.fn.slick === "function"){
        const ideasSlider = $('.js-ideas-slider');
        function typeTextAnimation(slick, currentSlide){
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
        ideasSlider.on('afterChange', function(event, slick, currentSlide){
            typeTextAnimation(slick, currentSlide)
        });

        const stepsSlider = $('.js-steps-slider');
        stepsSlider.slick({
            slidesToShow: 1,
            arrows: false,
            fade: true,
            dots: true,
            infinite: false
        });
        stepsSlider.on('wheel', (function(e) {
            e.preventDefault();
            if (e.originalEvent.deltaY < 0) {
                $(this).slick('slickPrev');
            } else {
                $(this).slick('slickNext');
            }
        }));

        $('.js-staff-slider').slick({
            variableWidth: true,
            arrows: false,
            slidesToScroll: 1,
            centerMode: true
        });
    }

    // menu
    $(".menu-toggle").click(function (e){
        e.preventDefault();
        $("body").toggleClass("mobile-menu-open");
        let svg = $(this).find("use");
        let svgHref = svg.attr("xlink:href");
        let iconName = svgHref.includes("#menu") ? svgHref.replace("#menu", "#close") : svgHref.replace("#close", "#menu");

        svg.attr("xlink:href", iconName);
    });

    $(".mobile-nav .menu-item-has-children").click(function (e){
        e.preventDefault();
        $(this).children(".submenu").slideToggle();
    });

});

// reasons info toggle
const reasonsList = document.querySelector('.reasons-list');
const reasons = reasonsList.querySelectorAll('.reason');
function closeReasonInfo(r){
    r.classList.remove('reason--active');
    reasonsList.classList.remove('reason-list--active');
}
reasonsList.querySelectorAll('.reason').forEach(r => {
    r.addEventListener('click', e => {
        e.target.closest('.reason').classList.add('reason--active');
        reasonsList.classList.add('reason-list--active');

        if(e.target.closest('.close')){
            closeReasonInfo(r);
        }
    });
});

/*

const typeElements = document.querySelectorAll('.idea__text > h2').forEach(el => {
    console.log(el)
});*/
