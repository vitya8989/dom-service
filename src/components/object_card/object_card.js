// gallery

let objectCardGallerySlider = document.querySelector('.object_card_gallery__slider');

if (objectCardGallerySlider) {
    new Swiper('.object_card_gallery__slider', {
        speed: 700,
        slidesPerView: 'auto',
        spaceBetween: 15,
        navigation: {
            nextEl: '.object_card_gallery__slider_arrow_next',
            prevEl: '.object_card_gallery__slider_arrow_prev'
        },
        pagination: {
            el: '.object_card_gallery__slider_pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                spaceBetween: 20,
                slidesPerView: 3,
            }
        }
    });
}



// tabs

const tabs = document.querySelectorAll('.js_tabs');

if (tabs.length > 0) {
    for (let tab of tabs) {
        const tabLink = tab.querySelectorAll('.js_tab_link');
        const tabBody = tab.querySelectorAll('.js_tab_body');
        const tabBodyMobClose = document.querySelectorAll('.tab__body_mob_close');

        for (let tabBodyClose of tabBodyMobClose) {
            tabBodyClose.onclick = () => {
                if (window.innerWidth < 640) {
                    for (let body of tabBody) {
                        body.classList.remove('active');
                        document.body.classList.remove('scroll-lock');
                    }
                    for (let link of tabLink) {
                        link.classList.remove('active');
                    }
                }
            }
        }

        for (let i = 0; i < tabLink.length; i++) {
            tabLink[i].onclick = function (e) {
                e.preventDefault();
                for (let link of tabLink) {
                    if (link !== this) {
                        link.classList.remove('active');
                    }
                }
                for (let j = 0; j < tabBody.length; j++) {
                    if (tabBody[j].dataset.id === tabLink[i].dataset.id) {
                        if (tabBody[j].classList.contains('active') && this.classList.contains('active')) {
                            this.classList.remove('active');
                            tabBody[j].classList.remove('active');
                        } else {
                            this.classList.add('active');
                            tabBody[j].classList.add('active');
                            if (window.innerWidth < 640) {
                                document.body.classList.add('scroll-lock');
                            }
                        }
                    } else {
                        tabBody[j].classList.remove('active');
                    }
                }
            }
        }
    }
}