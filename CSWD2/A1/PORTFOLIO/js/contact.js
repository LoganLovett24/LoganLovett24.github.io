class ContactForm {
    constructor(formSelector, nameSelector, emailSelector, subjectSelector, messageSelector, submitSelector) {
        this.eRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        this.form = document.getElementById(formSelector);
        this.name = document.getElementById(nameSelector);
        this.email = document.getElementById(emailSelector);
        this.subject = document.getElementById(subjectSelector);
        this.message = document.getElementById(messageSelector);
        this.submit = document.getElementById(submitSelector);
        this.fbEmail = this.email.nextElementSibling;
        this.fbSubmit = this.submit.nextElementSibling;
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.setupFieldListeners([this.name, this.subject, this.message]);
            this.setupEmailListeners();
            this.setupFormSubmit();
        });
    }

    setupFieldListeners(fields) {
        fields.forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('focusout', () => this.validateField(field));
        });
    }

    setupEmailListeners() {
        this.email.addEventListener('input', () => this.validateEmail());
        this.email.addEventListener('focusout', () => this.validateEmail());
    }

    setupFormSubmit() {
        this.form.addEventListener("submit", (e) => {
            let hasError = false;

            [this.name, this.subject, this.message].forEach(field => {
                if (field.value === "") {
                    field.nextElementSibling.innerText = "This cannot be empty!";
                    hasError = true;
                } else {
                    field.nextElementSibling.innerText = "";
                }
            });

            if (!this.eRegex.test(this.email.value)) {
                this.fbEmail.innerText = "Please insert a valid email!";
                hasError = true;
            }

            if (hasError) {
                e.preventDefault();
                this.fbSubmit.innerText = "Please fix any errors above.";
            } else {
                alert("Form submitted successfully!");
                this.fbSubmit.innerText = "Looking good!";
            }
        });
    }

    validateField(field) {
        if (field.value === "") {
            field.nextElementSibling.innerText = "This cannot be empty!";
        } else {
            field.nextElementSibling.innerText = "Looking good!";
        }
    }

    validateEmail() {
        if (!this.eRegex.test(this.email.value)) {
            this.fbEmail.innerText = "Please insert a valid email!";
        } else {
            this.fbEmail.innerText = "Looking good!";
        }
    }
}

const contactForm = new ContactForm("contact-form", "name", "email", "subject", "message", "submit");
contactForm.init();
