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
}