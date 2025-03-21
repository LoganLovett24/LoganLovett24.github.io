const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
navigator.geolocation.watchPosition((data) => {
    console.log(data);
    let degrees = data.coords.heading
    speed.textContent = data.coords.speed != null ? data.coords.speed : "SPEED NOT AVAILABLE";
    if (degrees != null){
        arrow.style.transform = `rotate(${degrees}deg)`;
    }
    else {
        speed.textContent = speed.textContent+" | ROTATION NOT AVAILABLE"
    }
},
(err) => {
    console.error(err);
});