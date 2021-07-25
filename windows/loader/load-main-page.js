const loader = document.querySelector('loader');
const logoSVG = document.querySelector('#logo-svg');
const titleApp = document.querySelector('#title-app');


setTimeout(() => {
    loader.style.transform = 'translate(0, 100%)';
    logoSVG.style.transform = 'scale(0)';
    titleApp.style.display = 'none';
}, 3000);