let guests = 40;
let limit = 75;
let warningShown = false;
let minMax = document.getElementById("minMax");
let addMax = document.getElementById("addMax");
const warning = document.getElementById("warning");

//Takes the amount and adds it to guests (with checks)
function addGuest(amount){
    guests+=amount;

    //Check if guest count goes under 0
    if (guests < 0){
        guests = 0;
    }

    //Check if guest count goes over 0 - report if so
    if (guests > limit){
        let difference = guests - limit;
        warning.innerText = `${difference} guests could not be admitted.`;
        warning.classList.remove("hidden");
        warningShown = true;
        guests = limit;
    }

    //Remove the warning if everything is okay
    if (guests < limit && warningShown){
        warning.classList.add("hidden");
        warningShown = false;
    }

    updateGuest();
}

//Updates the guest count on page
function updateGuest(){
    const guestCount = document.getElementById("guest-count");
    guestCount.innerText = guests;
}

//Updates the given button to reflect the amount before hitting the limit
function updateButton(btn, amt, max){
    btn.dataset.mod = `${amt}`;
    if (amt > 0){btn.innerText = `+${amt}`;}
    else {btn.innerText = `${amt}`;}
    
    if (max){
        btn.classList.add("max");
    } else {
        btn.classList.remove("max");
    }
}

//Check to see if nearing a limit
function checkCount(){
    let difference = limit - guests;

    if (guests < 10){
        updateButton(minMax, -guests, true);
    } else if (difference < 10) {
        updateButton(addMax, difference, true)
    } else {
        updateButton(minMax, -10, false);
        updateButton(addMax, 10, false);
    }
}

//Add click event
document.querySelectorAll("button").forEach(button => { 
    button.addEventListener("click", function() { 
        addGuest(parseInt(button.dataset.mod)); 
        checkCount();
    }); 
});

//Do initial runs
document.getElementById("limit").innerText = `The limit is: ${limit} guests`;
updateGuest();
checkCount();