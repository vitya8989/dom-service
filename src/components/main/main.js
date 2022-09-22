// main_chess

const mainChess = document.querySelector('.main_chess');

if (mainChess) {

    const numAnimTime = 1500;
    const numAnimElements = mainChess.querySelectorAll('.js_anim_number');

    window.addEventListener('load', () => {

        animNum(numAnimElements, numAnimTime);

        function animNum(elements, time) {
            for (let element of elements) {
                let n = 0;
                let num = element.dataset.max;
                let step = 1;
                if (num.length > 3) {
                    for (let i = 3; i < num.length; i++) {
                        step /= 0.1;
                    }
                }
                step = +step;
                let t = time/(num/step);
                let interval = setInterval(() => {
                        n += step;
                        if ((num - n) < step && step > 1) {
                            while ((num - n) < step) {
                                step = step * 0.1;
                            }
                        }
                        if (n == num) {
                            clearInterval(interval);
                        }
                    element.innerHTML = n;
                    }, t);
            }
        };
    });
}


//Перемещение кнопок в новостях и объектах на главной

const mainNewsContent = document.querySelector('.main_news__content');
const mainNewsTop = document.querySelector('.main_news__top');
const mainNewsLink = document.querySelector('.main_news__link');
const mainObjectsContent = document.querySelector('.main_objects__content');
const mainObjectsTop = document.querySelector('.main_objects__top');
const mainObjectsLink = document.querySelector('.main_objects__link');
const mainAboutContent = document.querySelector('.main_about__content');
const mainAboutContentLeft = document.querySelector('.main_about__content_left');
const mainAboutLink = document.querySelector('.main_about__link');

if (mainNewsLink) {
    if (window.innerWidth < 1024) {
        mainNewsContent.append(mainNewsLink);
        mainObjectsContent.append(mainObjectsLink);
        mainAboutContent.append(mainAboutLink);
    } else {
        mainNewsTop.append(mainNewsLink);
        mainObjectsTop.append(mainObjectsLink);
        mainAboutContentLeft.append(mainAboutLink);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
            mainNewsContent.append(mainNewsLink);
            mainObjectsContent.append(mainObjectsLink);
            mainAboutContent.append(mainAboutLink);
        } else {
            mainNewsTop.append(mainNewsLink);
            mainObjectsTop.append(mainObjectsLink);
            mainAboutContentLeft.append(mainAboutLink);
        }
    });
}


// main_objects

let mainObjectSlider = document.querySelector('.main_objects__slider');

if (mainObjectSlider) {
    new Swiper('.main_objects__slider', {
        speed: 700,
        slidesPerView: 'auto',
        spaceBetween: 15,
        navigation: {
            nextEl: '.main_objects__slider_arrow_next',
            prevEl: '.main_objects__slider_arrow_prev'
        },
        pagination: {
            el: '.main_objects__slider_pagination',
            clickable: true,
        },
        breakpoints: {
            1024: {
                spaceBetween: 20,
            }
        }
    });
}

//map

let map = document.getElementById('map');

if (map) {
    let scriptMap = document.createElement('script');
    scriptMap.src = 'https://api-maps.yandex.ru/2.1/?apikey=dd0f5e76-e8bb-42be-b558-f7af3b491cd2&lang=ru_RU';
    setTimeout(() => document.head.append(scriptMap), 0);
    scriptMap.onload = function () {
        ymaps.ready(init);
    };

    function init() {
        var myMap = new ymaps.Map("map", {
            center: [59.978120, 30.373360],
            zoom: 14,
            controls: []
        });
        myMap.controls.add('zoomControl', {
            float: 'none',
            position: {
                top: '40px',
                right: '20px'
            }
        });
        var myPlacemark = new ymaps.Placemark([59.978120, 30.373360], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map_point.png',
            iconImageSize: [73, 73],
            iconImageOffset: [-25, -25]
        });
        myMap.geoObjects.add(myPlacemark);
    }
}


