class project extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode:"open"});
    }

    connectedCallback() {
        const project = JSON.parse(this.getAttribute('data-project'));
        const index = this.getAttribute('data-index')

        this.shadowRoot.innerHTML = `
        <style>
        #project {
            border-style: solid;
            border-radius: 2px;
            overflow: hidden;
            transition: all 0.5s ease;
            padding-bottom:30px;
        }
        .dark-mode {
            color: #ffffff;
        }
        #project img {
            height: 15rem;
            width: auto;
            vertical-align: middle;
        }
        #project h2 {
            text-decoration: underline;
            font-style: italic;
        }
        </style>
        <div id="project">
            <h2>${project.name}</h2>
            <img src="${project.img}">
            <br>
        </div>
        `

        this.shadowRoot.getElementById('project').addEventListener('click', () => {
            const fHead = document.getElementById('focused-heading');
            const fBlurb = document.getElementById('focused-blurb');
            const fImage = document.getElementById('focused-image');
            const fContainer = document.getElementById('focus-container');

            fHead.innerText = project.name;
            fBlurb.innerText = project.description;
            fImage.src = project.img;

            fContainer.classList.remove('hidden');
            fContainer.classList.add('visible');
        });
    }
}
customElements.define("project-card", project)

class Projects {
    constructor(projectsData) {
        this.projectsData = projectsData;
        this.section = document.getElementById("projects-section");
        this.searchInput = document.getElementById('search-input');
        this.blackout = document.getElementById('blackout');
    }

    init() {
        this.renderProjects();
        this.setupSearchFilter();
        this.setupBlackoutClick();
    }

    renderProjects() {
        let i=0;
        this.projectsData.forEach(project => {
            const card = document.createElement('project-card');
            card.setAttribute('data-project', JSON.stringify(project));
            card.setAttribute('data-index', i)
            this.section.appendChild(card);
            i+=1;
        });
    }

    setupSearchFilter() {
        this.searchInput.addEventListener("input", (e) => {
            const filter = e.target.value.toLowerCase();
            document.querySelectorAll(".project").forEach(project => {
                const name = project.querySelector("h2").innerText.toLowerCase();
                project.style.display = name.includes(filter) ? "" : "none";
            });
        });
    }

    setupBlackoutClick() {
        this.blackout.addEventListener('click', () => {
            const fContainer = document.getElementById('focus-container');
            fContainer.classList.remove('visible');
            fContainer.classList.add('hidden');
        });
    }
}

const projectsData = {
    "projectsData": [
        {
            "name": "Visor",
            "description": "A Discord bot made with Python that is meant to simplify some tasks. For example, it can download files and host them on a network drive. This allows me to download a file while I'm out and about and easily grab it when I arrive home. Unfortunately, as that implies, Visor is strictly built for my current setup and cannot be used in another environment without modification.",
            "img": "media/visor.png"
        },
        {
            "name": "Gem",
            "description": "Gem is a script made within Python whose purpose was to automate the process of shiny hunting Pokemon in the Generation 2 series of games: Gold, Silver, and Crystal. The script would run the game within an emulator and automate inputs to move the in-game character across the screen. Every few seconds, it would take a screenshot of the screen and compare parts of it to sample images provided to it in order to see if something had interrupted the character. This is almost always a textbox telling them that an egg is hatching. When the egg hatches, it will then check if the Pokemon is shiny (as in a rare color variant), report that to the user, and then store the Pokemon. Due to morality issues, development of this script has been abandoned but it was in a functioning state.",
            "img": "media/gem.png"
        },
        {
            "name": "OBA",
            "description": "\"OBA\" (Organize By Artist) is a script that was originally just a proof of concept. Ultimately anything that can be done with it can also be done with Visor, but this does speed up the process of creating playlists for work. Much like the previous projects, this uses Python. It takes MP3 files that only have a title and artist in the file name, gives them the proper tags, and then organizes them into their respective folders. At least, that's what originally did. Now it merges them into one big folder for my work playlist.",
            "img": "media/oba.png"
        },
        {
            "name": "Track It!",
            "description": "Made in JavaScript for a class, this program offers a simple to-do list. You can easily add and remove tasks as well as mark them as done. Tasks marked as complete will be moved to the bottom automatically and are visually distinct from those that aren't complete.",
            "img": "media/trackit.png"
        }
    ]
}

const projects = new Projects(projectsData.projectsData);
projects.init();
