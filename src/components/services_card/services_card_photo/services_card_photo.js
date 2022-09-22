let servicesCardPhotoSlider = document.querySelector('.services_card_photo__slider');

if (servicesCardPhotoSlider) {
    new Swiper('.services_card_photo__slider', {
        speed: 700,
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
            nextEl: '.services_card_photo__slider_arrow_next',
            prevEl: '.services_card_photo__slider_arrow_prev'
        },
        pagination: {
            el: '.services_card_photo__slider_pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                spaceBetween: 25,
            }
        }
    });
}