let defaultPageSlider = document.querySelector('.default_page__slider');

if (defaultPageSlider) {
    new Swiper('.default_page__slider', {
        speed: 700,
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
            nextEl: '.default_page__slider_btn_next',
            prevEl: '.default_page__slider_btn_prev'
        },
        pagination: {
            el: '.default_page__slider_pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        }
    });
}