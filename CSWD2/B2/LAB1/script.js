let countdown;
let then = new Date(2552,10,9,6,7,0);
const timerDisplay = document.querySelector('.display_time_left');
const endTime = document.querySelector('.display_end_time');
const buttons = document.querySelectorAll('[data-time]');

const timer = () => {
    clearInterval(countdown);

    //If you're looking into this wondering what is going on
    //I decided to make this a reference to an ARG meant to promote
    //Halo 2. The timer is based off the mirror found at
    //https://ilovebees.co/ as the original site now redirects to a projects page.
    let now = Date.now();
    let diff = then.getTime() - now
    displayTimeLeft(diff);
    displayEndTime(then);

    countdown = setInterval(() => {
        now = Date.now();
        diff = then.getTime()-now;

        //Check if countdown needs to be stopped
        //(ilovebees actually does this as well, which is wild to me. I suppose it's good practice though)
        if (diff<=0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(diff);
    }, 10);
}

const displayTimeLeft = (diff) => {
    //Get the totals
    let seconds = Math.floor(diff/1000);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);

    //Do the math to make it display in a normal format
    //Days can be kept as-is since it's the top value
    let milliseconds = diff % 1000;
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    //Format for display
    seconds = `${seconds < 10 ? '0':''}${seconds}`;
    minutes = `${minutes < 10 ? '0':''}${minutes}`;
    hours = `${hours < 10 ? '0':''}${hours}`;
    milliseconds = `${milliseconds < 100 ? '0':''}${milliseconds < 10 ? '0':''}${milliseconds}`;
    timerDisplay.textContent = `${days}:${hours}:${minutes}:${seconds}:${milliseconds}`;
}

const displayEndTime = (date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    endTime.textContent = `${month}/${day}/${year} (${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes})`;

    //Check to see if year before current year
    if (year < new Date().getFullYear()){
        timerDisplay.textContent="00:00:00:00:000";
        timerDisplay.classList.add('overdue');
        endTime.classList.add('overdue');
    }
}

const modifyEndTime = (seconds) => {
    then.setSeconds(then.getSeconds()-seconds);
    displayEndTime(then);
}

//While the tutorial has the buttons start the timer,
//I will instead have them bring the end time closer
buttons.forEach(button => button.addEventListener('click', (e) => {
    const seconds = e.target.dataset.time;
    modifyEndTime(seconds);
}));

document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mins = document.customForm.minutes.value;
    modifyEndTime(mins*60);
})

timer();