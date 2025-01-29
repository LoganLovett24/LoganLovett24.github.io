let onForm = false;
let editing = {};
let animals = {
    "animals": [
        {
            "name": "Simba",
            "species": "Lion",
            "sex": "Male",
            "age": 14,
            "pregnant": false,
            "baby": {}
        },
        {
            "name": "Axel",
            "species": "Crocodile",
            "sex": "Male",
            "age": 21,
            "pregnant": false,
            "baby": {}
        },
        {
            "name": "Wulve",
            "species": "Wolf",
            "sex": "Female",
            "age": 8,
            "pregnant": true,
            "baby": {
                "name": "Baby",
                "species": "Wolf",
                "sex": "Female",
                "age": 0,
                "pregnant": false,
                "baby": {}
            }
        },
        {
            "name": "Chris P.",
            "species": "Pig",
            "sex": "Female",
            "age": 17,
            "pregnant": false,
            "baby": {}
        }
    ]
}

class animal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const animal = JSON.parse(this.getAttribute('data-animal'));
        const index = this.getAttribute('data-index');

        const style = document.createElement('style');
        style.textContent = `
            .animal {
                width: 900px;
                padding-bottom: 15px;
                border-bottom: 1px solid black;
                border-top: 1px solid black;
            }
            .animal h1, .animal h2, .animal h3, .animal p {
                margin: 0;
                padding: 0;
            }
            .Male {
                background-color: rgb(187, 222, 255);
            }
            .Female {
                background-color: pink;
            }
        `;

        const animalContainer = document.createElement('div');
        animalContainer.className = `animal ${animal.sex}`;

        const animalName = document.createElement('h1');
        animalName.textContent = animal.name;
        animalContainer.appendChild(animalName);

        const animalDetails = document.createElement('h2');
        animalDetails.textContent = `${animal.sex} ${animal.species}`;
        animalContainer.appendChild(animalDetails);

        const animalAge = document.createElement('h3');
        animalAge.textContent = `${animal.age} years old`;
        animalContainer.appendChild(animalAge);

        const animalPregnancy = document.createElement('p');
        animalPregnancy.textContent = animal.pregnant ? "Is pregnant" : "Is not pregnant";
        animalContainer.appendChild(animalPregnancy);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons';

        const makePregnantButton = document.createElement('button');
        makePregnantButton.id = 'preg';
        makePregnantButton.textContent = 'Make Pregnant';
        makePregnantButton.addEventListener('click', () => makePregnant(animals.animals[index]));
        buttonsContainer.appendChild(makePregnantButton);

        const giveBirthButton = document.createElement('button');
        giveBirthButton.id = 'birth';
        giveBirthButton.textContent = 'Give Birth';
        giveBirthButton.addEventListener('click', () => giveBirth(animals.animals[index]));
        buttonsContainer.appendChild(giveBirthButton);

        buttonsContainer.appendChild(document.createElement('br'));

        const editAnimalButton = document.createElement('button');
        editAnimalButton.id = 'edit';
        editAnimalButton.textContent = 'Edit Animal';
        editAnimalButton.addEventListener('click', () => {
            editing = animals.animals[index];
            prepForm(animals.animals[index]);
            switchDisplay();
        });
        buttonsContainer.appendChild(editAnimalButton);

        const removeAnimalButton = document.createElement('button');
        removeAnimalButton.id = 'remove';
        removeAnimalButton.textContent = 'Remove Animal';
        removeAnimalButton.addEventListener('click', () => {
            removeAnimal(animals.animals[index]);
            loadList();
        });
        buttonsContainer.appendChild(removeAnimalButton);

        animalContainer.appendChild(buttonsContainer);

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(animalContainer);
    }
}
customElements.define("animal-card", animal);


function updateCount(){
    const count = document.getElementById("count");
    count.textContent = `${animals.animals.length} animals`;
}

function addAnimal(animal){
    animals.animals.push(animal);
    updateCount();
    loadList();
}

function removeAnimal(animal){
    const index = animals.animals.findIndex(a =>
        a.name === animal.name &&
        a.species === animal.species &&
        a.sex === animal.sex &&
        a.age === animal.age);

    if (index !== -1){
        animals.animals.splice(index, 1);
    }

    updateCount();
}

function search(query){
    const animalList = Array.from(document.getElementsByTagName("animal-card"));

    if (query === ""){
        animalList.forEach(a => {
            if (a.classList.contains("hidden")) {a.classList.remove("hidden");}
        });
    } else {
        animalList.forEach(a => {
            if (!JSON.parse(a.dataset.animal)["name"].toLowerCase().startsWith(query.toLowerCase())){
                a.classList.add("hidden");
            } else {
                if (a.classList.contains("hidden")) {a.classList.remove("hidden");}
            }
        })
    }
}

function makePregnant(animal){
    if (animal.sex == "Female"){
        if (!animal.pregnant){
            animal.baby.name = "Baby";
            animal.baby.species = animal.species;
            animal.baby.age = 0;
            animal.baby.sex = Math.random() < 0.5 ? "Male" : "Female";
            animal.baby.pregnant = false;
            animal.baby.baby = {};
            animal.pregnant = true;
            loadList();
        } else {
            throw new Error("The animal is already pregnant!");
        }
    } else {
        throw new Error("The animal must be female!")
    }
}

function giveBirth (animal){
    if (animal.sex == "Female"){
        if (animal.pregnant){
            animal.pregnant = false;
            addAnimal(animal.baby);
            animal.baby = {};
        } else {
            throw new Error("The animal isn't pregnant!")
        }
    } else {
        throw new Error("The animal must be female!")
    }
}

function switchDisplay(){
    const animalWrapping = document.getElementById("animals-wrapping");
    const formWrapping = document.getElementById("form-wrapping");

    if (onForm){
        animalWrapping.classList.remove("hidden");
        formWrapping.classList.add("hidden");
        onForm = false;
    } else {
        animalWrapping.classList.add("hidden");
        formWrapping.classList.remove("hidden");
        onForm = true;
    }
}

function prepForm(animal){
    const name = document.getElementById("name");
    const species = document.getElementById("species");
    const sex = document.getElementById("sex");
    const age = document.getElementById("age");

    if (animal !== undefined){
        name.value = animal.name;
        species.value = animal.species;
        sex.value = animal.sex;
        age.value = animal.age;
    } else {
        name.value="";
        species.value="";
        sex.value="";
        age.value="";
    }
}

function loadList () {
    const animalList = document.getElementById("animals");

    while(animalList.firstChild){
        animalList.removeChild(animalList.firstChild);
    }

    let i=0
    animals.animals.forEach(animal => {
        const card = document.createElement('animal-card');
        card.setAttribute('data-animal', JSON.stringify(animal));
        card.setAttribute('data-index', i)
        animalList.appendChild(card);
        i+=1
    });
}

document.getElementById("search").addEventListener("keyup",function() {
    search(document.getElementById("search").value);
});

document.getElementById("add").addEventListener("click", function() {
    prepForm();
    switchDisplay();
});

document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault();
    const newAnimal = {
        name: document.getElementById("name").value,
        species: document.getElementById("species").value,
        sex: document.getElementById("sex").value,
        age: document.getElementById("age").value,
        pregnant: false,
        baby: {}
    }

    if (editing != {}){
        removeAnimal(editing);
        editing = {};
    }
    addAnimal(newAnimal);
    switchDisplay();
});

document.getElementById("cancel").addEventListener("click", function(e) {
    editing = {};
    e.preventDefault();
    switchDisplay();
});

loadList();
updateCount();