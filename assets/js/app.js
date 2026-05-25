/* eslint-env browser */
document.addEventListener("DOMContentLoaded", () => {
    setupPageStart();
    setupIntroScreen();
    renderProfile();
    renderSkills();
    renderProjects();
    setupContactForm();
    setupScrollReveal();
    setupScrollTopButton();
});

function setupPageStart() {
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);
}

function setupIntroScreen() {
    const introScreen = document.querySelector("[data-intro-screen]");

    if (!introScreen) {
        return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const introDelay = prefersReducedMotion ? 250 : 2300;
    const removeIntro = () => {
        introScreen.remove();
    };

    document.body.classList.add("intro-active");

    window.setTimeout(() => {
        introScreen.classList.add("intro-screen-exit");
        document.body.classList.remove("intro-active");
    }, introDelay);

    introScreen.addEventListener("animationend", event => {
        if (event.animationName === "intro-splash-out") {
            removeIntro();
        }
    });

    window.setTimeout(removeIntro, introDelay + 1100);
}

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
        scrollTopButton.classList.toggle("is-visible", window.scrollY > 2);
    };

    scrollTopButton.addEventListener("click", () => {
        scrollTopButton.classList.add("is-lifting");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    scrollTopButton.addEventListener("animationend", () => {
        scrollTopButton.classList.remove("is-lifting");
        toggleScrollTopButton();
    });

    window.addEventListener("scroll", toggleScrollTopButton);
    window.addEventListener("resize", toggleScrollTopButton);
    toggleScrollTopButton();
}

function setText(selector, value) {
    const element = document.querySelector(selector);

    if (element) {
        element.textContent = value;
    }
}
