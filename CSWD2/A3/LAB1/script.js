const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

// function logText(e) {
//     console.log('e: ',e);
//     console.log(this.classList.value);
//     e.stopPropagation(); //Stop bubbling
// }

const logText = (e) => {
    console.log('e: ',e);
    e.stopPropagation(); //Stop bubbling
}

divs.forEach((div) => div.addEventListener('click', logText));

button.addEventListener('click', () => {
    console.log('Me has been drank.')
},
{
    once: true,
});