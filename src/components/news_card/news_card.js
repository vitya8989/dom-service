let newsCardPhotoSlider = document.querySelector('.news_card_photo__slider');

if (newsCardPhotoSlider) {
    new Swiper('.news_card_photo__slider', {
        speed: 700,
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
            nextEl: '.news_card_photo__slider_arrow_next',
            prevEl: '.news_card_photo__slider_arrow_prev'
        },
        pagination: {
            el: '.news_card_photo__slider_pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                spaceBetween: 25,
            }
        }
    });
}