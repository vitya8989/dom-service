@@include('../components/preloader/preloader.js');
@@include('../components/header/header.js');
@@include('../components/main/main.js');

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