let preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
   preloader.classList.add('this--hidden');
});;
const headerBurger = document.querySelector('.header__burger');
const headerMobileMenu = document.querySelector('.header__row');
if (headerMobileMenu) {
    const headerCross = headerMobileMenu.querySelector('.header__cross');
    headerBurger.onclick = () => {
        headerMobileMenu.classList.add('open');
    }
    headerCross.onclick = () => {
        headerMobileMenu.classList.remove('open');
    }
};
// main_top

const mainTopContent = document.querySelector('.main_top__content');

if (mainTopContent) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            mainTopContent.classList.remove('hide');
        }, 200);
    });
}


// main_chess

const mainChess = document.querySelector('.main_chess');

if (mainChess) {

    const numAnimTime = 1500;
    const numAnimElements = mainChess.querySelectorAll('.js_anim_number');

    window.addEventListener('load', () => {

        mainChess.classList.remove('hide');

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


;
let objectsMap = document.getElementById('objects_map');

if (objectsMap) {
    let scriptMap = document.createElement('script');
    scriptMap.src = 'https://api-maps.yandex.ru/2.1/?apikey=dd0f5e76-e8bb-42be-b558-f7af3b491cd2&lang=ru_RU';
    setTimeout(() => document.head.append(scriptMap), 0);
    scriptMap.onload = function () {
        ymaps.ready(init);
    };

    const objectsMapObject = document.querySelectorAll('.objects_map__object');

    function init() {
        var myMap = new ymaps.Map("objects_map", {
            center: [59.939099, 30.315877],
            zoom: 11,
            controls: []
        });
        myMap.controls.add('zoomControl', {
            float: 'none',
            position: {
                top: '40px',
                right: '20px'
            }
        });

        var objects = [];

        for (let i = 0; i < objectsMapObject.length; i++) {
            let objectItem = {
                coords: [],
                id: ''
            }
            objectItem.coords.push(objectsMapObject[i].dataset.x);
            objectItem.coords.push(objectsMapObject[i].dataset.y);
            objectItem.id = objectsMapObject[i].dataset.id;
            objects.push(objectItem);
        }


        for (var i = 0; i < objects.length; i++) {
            var myPlacemark = new ymaps.Placemark(objects[i].coords, {}, {
                iconLayout: 'default#image',
                iconImageHref: '/img/icons/objects_map_point.png',
                iconImageSize: [38, 36],
                iconImageOffset: [-13, -42],
                id: objects[i].id
            });
            myMap.geoObjects.add(myPlacemark);
        }

        myMap.setBounds(myMap.geoObjects.getBounds());
        myMap.geoObjects.events.add('click', function (e) {
            var targetObject = e.get('target');


            if (targetObject.geometry.getType() === 'Point') {
                let placemarks = ymaps.geoQuery(myMap.geoObjects)['_objects'];
                myMap.setCenter(targetObject.geometry.getCoordinates(), 12, {
                    checkZoomRange: true
                });
                for (let i = 0; i < objectsMapObject.length; i++) {
                    objectsMapObject[i].classList.remove('active');
                    placemarks[i].options.set('iconImageHref', '/img/icons/objects_map_point.png');
                    placemarks[i].options.set('iconImageSize', [38, 36]);
                    if (objectsMapObject[i].dataset.id === targetObject['options']['_options']['id']) {
                        objectsMapObject[i].classList.add('active');
                    }
                }
                targetObject.options.set('iconImageHref', '/img/icons/objects_map_point_active.png');
                targetObject.options.set('iconImageSize', [50, 48]);
            }
        });

    }
};
;

const animBlocks = document.querySelectorAll('.js-anim-block');

if (animBlocks.length > 0) {
    let offsetPositions = [];
    window.addEventListener('load', () => {
        for (let i = 0; i < animBlocks.length; i++) {
            offsetPositions.push(animBlocks[i].getBoundingClientRect().top + window.pageYOffset);
        }
        let centerOfWindow = window.pageYOffset + window.innerHeight / 8 * 7;
        for (let i = 0; i < offsetPositions.length; i++) {
            if (centerOfWindow >= offsetPositions[i]) {
                animBlocks[i].classList.remove('hide');
            }
        }
    });
    window.addEventListener('scroll', () => {
        let centerOfWindow = window.pageYOffset + window.innerHeight / 8 * 7;
        for (let i = 0; i < offsetPositions.length; i++) {
            if (centerOfWindow >= offsetPositions[i]) {
                animBlocks[i].classList.remove('hide');
            }
        }
    });
}