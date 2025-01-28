class FadeTransition {
    constructor() {}

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.fadeInPage();
            this.setupLinkTransitions();
        });
    }

    fadeInPage() {
        document.body.classList.add('fade-in');
    }

    setupLinkTransitions() {
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.href;
                
                this.fadeOutPage(() => {
                    window.location.href = href;
                });
            });
        });
    }

    fadeOutPage(callback) {
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        
        setTimeout(callback, 500);
    }
}

const fadeTransition = new FadeTransition();
fadeTransition.init();
