class DarkMode {
    constructor(darkModeToggleSelector) {
        this.darkModeToggle = document.getElementById(darkModeToggleSelector);
        this.isDarkMode = localStorage.getItem('dark-mode') === 'true';
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.applyStoredDarkMode();
            this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        });
    }

    applyStoredDarkMode() {
        if (this.isDarkMode) {
            this.applyDarkMode();
        }
    }

    toggleDarkMode() {
        this.isDarkMode = document.body.classList.toggle('dark-mode');
        this.toggleElementsDarkMode('project-card', 'a', '#nav-bar', '#back-to-top', '#chatbox', '#send-btn', '#chat-input', '#focused-project');
        localStorage.setItem('dark-mode', this.isDarkMode);
    }

    applyDarkMode() {
        document.body.classList.add('dark-mode');
        this.addClassToElements('project-card', 'dark-mode');
        this.addClassToElements('a', 'dark-mode');
        document.querySelector('#nav-bar').classList.add('dark-mode');
        document.querySelector('#back-to-top').classList.add('dark-mode');
        this.addClassToElements('#chatbox', 'dark-mode');
        this.addClassToElements('#send-btn', 'dark-mode');
        this.addClassToElements('#chat-input', 'dark-mode');
        document.querySelector('#focused-project').classList.add('dark-mode');
    }

    addClassToElements(selector, className) {
        document.querySelectorAll(selector).forEach(element => element.classList.add(className));
    }

    toggleElementsDarkMode(...selectors) {
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => element.classList.toggle('dark-mode'));
        });
    }
}

const darkMode = new DarkMode('dark-mode-toggle');
darkMode.init();
