class Navigation {
    constructor(moreBtnSelector, footerLinksSelector, backToTopBtnSelector) {
        this.moreBtn = document.getElementById(moreBtnSelector);
        this.footerLinks = document.getElementById(footerLinksSelector);
        this.backToTopButton = document.getElementById(backToTopBtnSelector);
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupMoreButton();
            this.setupFooterLinksVisibility();
            this.setupBackToTopButton();
            this.handleResize();
        });

        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('scroll', () => this.toggleBackToTopButton());
    }

    setupMoreButton() {
        this.moreBtn.addEventListener('click', () => {
            if (this.footerLinks.style.display === 'none' || this.footerLinks.style.display === '') {
                this.footerLinks.style.display = 'block';
                this.moreBtn.textContent = 'Less';
            } else {
                this.footerLinks.style.display = 'none';
                this.moreBtn.textContent = 'More';
            }
        });
    }

    setupFooterLinksVisibility() {
        if (window.innerWidth <= 600) {
            this.footerLinks.style.display = 'none';
            this.moreBtn.style.display = 'inline-block';
        } else {
            this.footerLinks.style.display = 'block';
            this.moreBtn.style.display = 'none';
        }
    }

    handleResize() {
        if (window.innerWidth <= 600) {
            this.footerLinks.style.display = 'none';
            this.moreBtn.style.display = 'inline-block';
        } else {
            this.footerLinks.style.display = 'block';
            this.moreBtn.style.display = 'none';
        }
    }

    setupBackToTopButton() {
        this.backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    toggleBackToTopButton() {
        if (window.scrollY > 100) {
            this.backToTopButton.style.display = 'block';
        } else {
            this.backToTopButton.style.display = 'none';
        }
    }
}

const navigation = new Navigation('more-btn', 'footer-links', 'back-to-top');
navigation.init();
