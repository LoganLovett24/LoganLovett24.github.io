let countdown;
let then;
const timerDisplay = document.querySelector('.display_time_left');
const endTime = document.querySelector('.display_end_time');
const buttons = document.querySelectorAll('[data-time]');

const timer = () => {
    clearInterval(countdown);

    countdown = setInterval(() => {
        now = Date.now();
        diff = then.getTime()-now;

        if (diff<=0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00:00"
            return;
        }

        displayTimeLeft(diff);
    }, 10);
}

const displayTimeLeft = (diff) => {
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor(diff / (1000 * 60 * 60));

    timerDisplay.textContent = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds<10?'0':''}${seconds}`;
}

const displayEndTime = () => {
    const date = new Date(then.getTime());

    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    endTime.textContent = `${hour < 10 ? '0' : ''}${hour}:${
        minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


const startTimer = (seconds) => {
    milliseconds = seconds*1000;
    then = new Date(Date.now() + milliseconds);
    displayEndTime();
    timer();
}

buttons.forEach(button => button.addEventListener('click', (e) => {
    const seconds = parseInt(e.target.dataset.time, 10);
    startTimer(seconds);
}));

document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mins = parseInt(document.customForm.minutes.value,10);
    startTimer(mins*60);
    document.customForm.reset();
})