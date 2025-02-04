const nav = document.querySelector('#main');
const topOfNav = nav.offsetTop;

const fixNav = () => {
    if (window.scrollY >= topOfNav){
        document.body.style.paddingTop = nav.offsetHeight;
        document.body.classList.add("fixed-nav");
    } else {
        document.body.classList.remove("fixed-nav");
    }
};

window.addEventListener('scroll',fixNav);