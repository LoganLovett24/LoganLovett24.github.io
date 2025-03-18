const holes = document.querySelectorAll('.hole');
const scoreboard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#startButton');
let lastHole;
let timeUp = false;
let score = 0;

const randTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randHole = (holes) => {
    const index = Math.floor(Math.random()*holes.length);
    const hole = holes[index];
    if(hole === lastHole) {
        return randHole(holes);
    }
    lastHole=hole;
    return hole;
}

const peep = () => {
    const time=randTime(200,1000);
    const hole=randHole(holes);
    hole.classList.add('up');
    setTimeout(()=>{
        hole.classList.remove('up');
        if(!timeUp){
            peep();
        }
    }, time)
}

const bonk = (e) => {
    if(!e.isTrusted){
        return;
    }
    score++;
    e.target.classList.remove('up');
    scoreboard.textContent=score;
}

const startGame = () => {
    scoreboard.textContent=0;
    timeUp=false;
    score=0;
    peep();
    randHole(holes);
    setTimeout(() => {
        timeUp=true;
    },7500);
}

startButton.addEventListener('click', startGame);
moles.forEach((mole) => mole.addEventListener('click', bonk));