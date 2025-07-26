const OFFCANVAS = document.querySelector("header .offcanvas");
const OFFCANVAS_LINKS = document.querySelectorAll("header .offcanvas .offcanvas-body .nav-item:not(.dropdown)");

// Fazendo com que o offcanvas (sidebar) seja fechado sempre que um link for clicado
OFFCANVAS_LINKS.forEach((offcanvasLink) => {
    offcanvasLink.addEventListener("click", function () {
        if (!offcanvasLink.classList.contains("active")) {
            const BS_OFFCANVAS = bootstrap.Offcanvas.getInstance(OFFCANVAS);
            BS_OFFCANVAS.hide();
        }
    });
});


// Função de easing para suavizar a rolagem
function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
}

// Rolar suavemente até a posição desejada
function smoothScrollTo(targetPosition) {
    const START_POSITION = window.scrollY;
    const DISTANCE = targetPosition - START_POSITION;
    const DURATION = 1300;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;

        const TIME_ELAPSED = currentTime - startTime;
        const PROGRESS = Math.min(TIME_ELAPSED / DURATION, 1);
        const EASING_VALUE = easeOutCubic(PROGRESS);
        window.scrollTo(0, START_POSITION + DISTANCE * EASING_VALUE);

        if (TIME_ELAPSED < DURATION) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Evento de clique nos links do menu
NAV_LINKS.forEach((link, i) => {
    link.onclick = function () {
        scrollAction(i);
    };
});

// Todas as seções
const ABOUT_ME_SECTION = document.querySelector("#about-me");
const SKILLS_SECTION = document.querySelector("#skills");
const PROJECTS_SECTION = document.querySelector("#projects");
const CERTIFICATIONS_SECTION = document.querySelector("#certifications");
const ALL_SECTIONS = [ABOUT_ME_SECTION, SKILLS_SECTION, PROJECTS_SECTION, CERTIFICATIONS_SECTION];

// Ações ao clicar nos links da navbar
function scrollAction(navLinkIndex) {
    const ABOUT_ME_SECTION_HEIGHT = ABOUT_ME_SECTION.clientHeight;
    const SKILLS_SECTION_HEIGHT = SKILLS_SECTION.clientHeight;
    const PROJECTS_SECTION_HEIGHT = PROJECTS_SECTION.clientHeight;

    const DISTANCE_TO_SKILLS = ABOUT_ME_SECTION_HEIGHT + 180;
    const DISTANCE_TO_PROJECTS = DISTANCE_TO_SKILLS + SKILLS_SECTION_HEIGHT + 90;
    const DISTANCE_TO_CERTIFICATIONS = DISTANCE_TO_PROJECTS + PROJECTS_SECTION_HEIGHT + 90;

    switch (navLinkIndex) {
        case 0:
        case 4:
            smoothScrollTo(0);
            break;
        case 1:
        case 5:
            smoothScrollTo(DISTANCE_TO_SKILLS - 200);
            break;
        case 2:
        case 6:
            smoothScrollTo(DISTANCE_TO_PROJECTS - 280);
            break;
        case 3:
        case 7:
            smoothScrollTo(DISTANCE_TO_CERTIFICATIONS - 380);
            break;
    }
}

// IntersectionObserver callback
function callback(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ativa link da navbar
            if (entry.target.id === "about-me") {
                NAV_LINKS[0].classList.add("active");
                NAV_LINKS[4].classList.add("active");
            } else if (entry.target.id === "skills") {
                NAV_LINKS[1].classList.add("active");
                NAV_LINKS[5].classList.add("active");
            } else if (entry.target.id == "projects" || entry.target.classList.contains("project")) {
                if (!NAV_LINKS[2].classList.contains("active") || !NAV_LINKS[6].classList.contains("active")) {
                    NAV_LINKS[2].classList.add("active");
                    NAV_LINKS[6].classList.add("active");
                }
            } else if (entry.target.id === "certifications" || entry.target.classList.contains("certification") || entry.target.id === "footer") {
                if (!NAV_LINKS[3].classList.contains("active") || !NAV_LINKS[7].classList.contains("active")) {
                    NAV_LINKS[3].classList.add("active");
                    NAV_LINKS[7].classList.add("active");
                }
            }
        } else {
            // Remove classe ativa da navbar
            if (entry.target.id === "about-me") {
                NAV_LINKS[0].classList.remove("active");
                NAV_LINKS[4].classList.remove("active");
            } else if (entry.target.id === "skills") {
                NAV_LINKS[1].classList.remove("active");
                NAV_LINKS[5].classList.remove("active");
            } else if (entry.target.id === "projects") {
                NAV_LINKS[2].classList.remove("active");
                NAV_LINKS[6].classList.remove("active");
            } else if (entry.target.id === "certifications" || entry.target.id === "footer") {
                NAV_LINKS[3].classList.remove("active");
                NAV_LINKS[7].classList.remove("active");
            }

            if (entry.target.classList.contains("project")) {
                const ANY_VISIBLE = Array.from(document.querySelectorAll(".project")).some(el => {
                    const rect = el.getBoundingClientRect();
                    return (
                        rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                    );
                });

                if (!ANY_VISIBLE && (NAV_LINKS[2].classList.contains("active") || NAV_LINKS[6].classList.contains("active"))) {
                    NAV_LINKS[2].classList.remove("active");
                    NAV_LINKS[6].classList.remove("active");
                }
            }

            if (entry.target.classList.contains("certification")) {
                const ANY_VISIBLE = Array.from(document.querySelectorAll(".certification")).some(el => {
                    const rect = el.getBoundingClientRect();
                    return (
                        rect.top >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                    );
                });

                if (!ANY_VISIBLE && (NAV_LINKS[3].classList.contains("active") || NAV_LINKS[7].classList.contains("active"))) {
                    NAV_LINKS[3].classList.remove("active");
                    NAV_LINKS[7].classList.remove("active");
                }
            }
        }
    });
}

// Inicializa o observer
const OBSERVER = new IntersectionObserver(callback, {
    threshold: [0.5, 0.7, 0.9],
});

ALL_SECTIONS.forEach(section => OBSERVER.observe(section));

// Observa cada projeto individual
const ALL_PROJECTS = document.querySelectorAll(".project");
ALL_PROJECTS.forEach(
    project => OBSERVER.observe(project)
);

// Observa cada certificado individual
const ALL_CERTIFICATIONS = document.querySelectorAll(".certification");
ALL_CERTIFICATIONS.forEach(
    certification => OBSERVER.observe(certification)
);