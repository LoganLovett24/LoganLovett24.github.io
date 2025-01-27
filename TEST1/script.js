const hero = document.querySelector('.hero');
const text = document.querySelector('h1');
const walk = '100'; //100px
const shadow = (e) => {
    const {offsetWidth: width, offsetHeight: height} = hero;
    let {offsetX: x, offsetY: y} = e;
    if(e.target.nodeName === 'H1'){
        x=x+e.target.parentElement.offsetLeft;
        y=y+e.target.parentElement.offsetTop;
    }
    const xWalk = Math.round((x/width)*walk-walk/2);
    const yWalk = Math.round((y/width)*walk-walk/2);
    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk*-1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${xWalk}px ${yWalk*-1}px 0 rgba(0,255,0,0.7),
    ${xWalk*-1}px ${yWalk}px 0 rgba(255,0,0,0.7)
    `;
};
hero.addEventListener('mousemove', shadow);