/* eslint-env browser */
document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
    renderSkills();
    renderProjects();
    setupContactForm();
    setupScrollReveal();
    setupScrollTopButton();
});

function renderProfile() {
    const { profile } = portfolioData;

    setText("[data-profile-name]", profile.name);
    setText("[data-profile-role]", profile.role.toUpperCase());
    setText("[data-profile-intro]", profile.intro);
    setText("[data-profile-about]", profile.about);
    setText("[data-footer-text]", profile.footer);
}

function renderSkills() {
    const skillsContainer = document.querySelector("[data-skills]");

    if (!skillsContainer) {
        return;
    }

    skillsContainer.replaceChildren(
        ...portfolioData.skills.map(skill => {
            const tag = document.createElement("span");
            tag.className = "skill-tag";
            tag.textContent = skill;

            return tag;
        })
    );
}

function renderProjects() {
    const projectsGrid = document.querySelector("[data-projects]");

    if (!projectsGrid) {
        return;
    }

    projectsGrid.replaceChildren(
        ...portfolioData.projects.map(project => {
            const card = document.createElement("article");
            const status = document.createElement("div");
            const title = document.createElement("h4");
            const description = document.createElement("p");
            const tech = document.createElement("div");

            card.className = "project-card";
            status.className = "card-status";
            tech.className = "card-tech";

            status.textContent = project.status;
            title.textContent = project.title;
            description.textContent = project.description;
            tech.textContent = project.tech.join(" • ");

            card.append(status, title, description, tech);

            return card;
        })
    );
}

function setupContactForm() {
    const form = document.querySelector("[data-contact-form]");
    const statusMessage = document.querySelector("[data-form-status]");

    if (!form || !statusMessage) {
        return;
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        statusMessage.textContent = "Message captured locally. Connect a backend or form service before production.";
        form.reset();
    });
}

function setupScrollReveal() {
    const scrollElements = document.querySelectorAll(".section, .project-card, .contact-form");

    const elementWatcher = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                elementWatcher.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.18
    });

    scrollElements.forEach((element, index) => {
        const rotateDirection = index % 2 === 0 ? "-7deg" : "7deg";
        const delay = element.classList.contains("project-card") ? `${(index % 3) * 90}ms` : "0ms";

        element.style.setProperty("--reveal-rotate-y", rotateDirection);
        element.style.setProperty("--reveal-delay", delay);
        element.classList.add("reveal-hidden");
        elementWatcher.observe(element);
    });
}

function setupScrollTopButton() {
    const scrollTopButton = document.querySelector("[data-scroll-top]");

    if (!scrollTopButton) {
        return;
    }

    const toggleScrollTopButton = () => {
        scrollTopButton.classList.toggle("is-visible", window.scrollY > 400);
    };

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", toggleScrollTopButton);
    toggleScrollTopButton();
}

function setText(selector, value) {
    const element = document.querySelector(selector);

    if (element) {
        element.textContent = value;
    }
}
