const footer = document.querySelector('footer');
const logoSVG = document.querySelector('#logo-svg');
const titleApp = document.querySelector('#title-app');

setTimeout(() => {
    footer.style.transform = 'translate(0, 90%)';
    logoSVG.style.transform = scale(0);
    titleApp.style.display = 'none';
    logoSVG.style.transform = scale(1);
}, 5000);