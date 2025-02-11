class AboutPage {
    constructor(details, skills, endorsements, workExperiences, educationDetails) {
        this.details = details;
        this.skills = skills;
        this.endorsements = endorsements;
        this.workExperiences = workExperiences;
        this.educationDetails = educationDetails;
        this.contLoaded = 0;
        this.loading = false;
    }

    init() {
        this.loadMoreContent();

        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 200) {
                this.loadMoreContent();
            }
        });

        // Initial load to ensure at least the first chunk is loaded
        this.loadMoreContent();
    }

    displayDetails(details) {
        const aboutSection = document.getElementById("about-section");
        if (!aboutSection) return;
        
        const nameHeading = document.createElement("h2");
        nameHeading.textContent = details.name;
        aboutSection.appendChild(nameHeading);

        const prof = document.createElement("img");
        prof.src = "media/lgn.png";
        prof.id = "pfp";
        aboutSection.appendChild(prof);

        const bio = document.createElement("p");
        bio.innerText = details.bio;
        aboutSection.appendChild(bio);
    }

    displaySkills(skills) {
        const aboutSection = document.getElementById("about-section");
        if (!aboutSection) return;
        
        const info = document.createElement("div");
        info.append(document.createElement("hr"));

        const skillHeader = document.createElement("h1");
        skillHeader.innerHTML = "Have a look at my skills!";
        info.append(skillHeader);

        const table = document.createElement("table");
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        info.appendChild(table);

        skills.forEach(skill => {
            const newRow = tbody.insertRow();
            const logoCell = newRow.insertCell(0);
            const logoImg = document.createElement("img");
            logoImg.src = skill.img;
            logoImg.className = "logo";
            logoCell.appendChild(logoImg);

            for (let i = 1; i <= skill.rating; i++) {
                const starCell = newRow.insertCell(i);
                starCell.className = "stars";
                starCell.innerText = "★";
            }
        });

        aboutSection.appendChild(info);
    }

    displayEndorsements(endorsements) {
        const aboutSection = document.getElementById("about-section");
        if (!aboutSection) return;

        const testimonials = document.createElement("div");
        testimonials.appendChild(document.createElement("hr"));

        const testHeader = document.createElement("h1");
        testHeader.innerText = "Look at all of these endorsements!";
        testimonials.appendChild(testHeader);

        endorsements.forEach(e => {
            const d = document.createElement("div");
            const header = document.createElement("h3");
            const quote = document.createElement("q");
            quote.innerText = e.quote;
            header.appendChild(quote);
            d.appendChild(header);
            const quoted = document.createElement("i");
            quoted.innerText = `- ${e.quoted}`;
            d.appendChild(quoted);
            testimonials.appendChild(d);
        });

        aboutSection.appendChild(testimonials);
    }

    displayTimeline(workExperiences, educationDetails) {
        const aboutSection = document.getElementById("about-section");
        if (!aboutSection) return;

        const experiences = [...workExperiences, ...educationDetails].sort((a, b) => a.order - b.order);

        const timeline = document.createElement("div");
        timeline.appendChild(document.createElement("hr"));
        timeline.classList.add("timeline");

        experiences.forEach(exp => {
            const item = document.createElement("div");
            item.classList.add("timeline-item");

            const content = document.createElement("div");
            const contentType = workExperiences.includes(exp) ? "work" : "education";
            content.classList.add("timeline-content", contentType);

            const year = document.createElement("span");
            year.textContent = exp.year;
            year.classList.add("year");

            const title = document.createElement("h3");
            title.textContent = exp.title;

            const details = document.createElement("p");
            details.textContent = exp.details;

            year.addEventListener('click', () => {
                content.classList.toggle('show-details');
            });

            content.appendChild(year);
            content.appendChild(title);
            content.appendChild(details);
            item.appendChild(content);
            timeline.appendChild(item);
        });

        aboutSection.appendChild(timeline);
    }

    loadMoreContent() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                switch (this.contLoaded) {
                    case 0:
                        this.displayDetails(this.details);
                        break;
                    case 1:
                        this.displayTimeline(this.workExperiences, this.educationDetails);
                        break;
                    case 2:
                        this.displaySkills(this.skills);
                        break;
                    case 3:
                        this.displayEndorsements(this.endorsements);
                        break;
                }
                this.contLoaded++;
                this.loading = false;
            }, 500);
        }
    }
}

const details = {
    "personalDetails": {
        "name": "Logan Lovett",
        "bio": "Hello, my name is Logan Lovett. I've always grown up around computers and have had a natural affinity with them. During my middle and high school days, I would program a game in my free time, and that's what gave me my love for software development. I'm currently part of the IT Software Development program at Northcentral Technical College with hopes to make my passion into a career.\n As it stands, I currently work at Lands' End as an embroidery machine operator. While it may sound drastically different from any sort of developer job, it still has some similarities as I have to work with machines and program them to reach a desired goal."
    },
    "skills": [
        { "name": "Python", "img": "media/python.png", "rating": 5 },
        { "name": "JavaScript", "img": "media/js.png", "rating": 3 },
        { "name": "C#", "img": "media/cs.png", "rating": 3 },
        { "name": "SQL", "img": "media/sql.png", "rating": 3 },
        { "name": "Word", "img": "media/word.png", "rating": 4 },
        { "name": "Excel", "img": "media/excel.png", "rating": 3 }
    ],
    "endorsements": [
        { "quote": "I thoroughly enjoyed working with Logan. His work has made a lot of consumers happy.", "quoted": "James Chase, lead at Stitch 'Em Ups" },
        { "quote": "He has proven reliable and has questioned inconsistent things consistently.", "quoted": "Elizabeth Shepard, lead at Stitch 'Em Ups" },
        { "quote": "Logan does great work. I'm very proud of him.", "quoted": "My mom (she's very proud of me)" }
    ],
    "workExperiences": [
        { "title": "Art Commissions", "details": "Throughout 2021 and leading into 2022, I worked on digital art commissions.", "order": 1, "year": 2021 },
        { "title": "Lands' End", "details": "Starting in September of 2022, I began working at Lands' End as a flex embroidery machine operator. I continue to work this job to this day.", "order": 3, "year": 2022 }
    ],
    "educationDetails": [
        { "title": "Highschool", "details": "In 2020, I graduated from Stevens Point Area Highschool with a GPA of 3.7", "order": 0, "year": 2020 },
        { "title": "Liberal Arts - Associate of Arts", "details": "In 2022, I graduated from Nicolet College's Liberal Arts - Associate of Arts program in collaboration with Mid-State.", "order": 2, "year": 2022 },
        { "title": "IT - Software Developer", "details": "As of 2024, I am currently at North Central Technical College working on my IT - Software Developer degree.", "order": 4, "year": 2023 }
    ]
};

const aboutPage = new AboutPage(details.personalDetails, details.skills, details.endorsements, details.workExperiences, details.educationDetails);
aboutPage.init();
