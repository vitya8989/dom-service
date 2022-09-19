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
}