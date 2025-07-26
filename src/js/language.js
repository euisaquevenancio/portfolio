if (document.querySelector(".language-option.active")) {
    document.querySelector(".language-option.active").classList.remove("active");
}

const NAV_LINKS = document.querySelectorAll(".nav-link");
const PROJECTS = document.querySelectorAll(".project");
const CERTIFICATION = document.querySelectorAll(".certification");
//
const CURRENT_LANGUAGE_DISPLAY = document.querySelector("#current-language-display");
const LANGUAGE_DROPDOWN_OPTIONS = document.querySelectorAll(".language-option");
let currentLanguage = getSessionLocale();

updateLanguageDisplay(currentLanguage);

// Adicionando ação de mudança de idioma via dropdown
LANGUAGE_DROPDOWN_OPTIONS.forEach((dropdownOption) => {
    dropdownOption.addEventListener("click", function() {
        if (!dropdownOption.classList.contains("active")) {
            const PREVIOUS_SELECTED_DROPDOWN_OPTION = document.querySelector(".language-option.active");
            PREVIOUS_SELECTED_DROPDOWN_OPTION.classList.remove("active");

            const DROPDOWN_OPTION_THEME = this.getAttribute("data-locale");
            changeLocale(DROPDOWN_OPTION_THEME);
        }
    });
});

// Captura a sigla da localidade salva na sessão
function getSessionLocale() {
    const SAVED_LOCALE = sessionStorage.getItem("current-locale");

    if (SAVED_LOCALE == null) {
        return "pt-br";
    } else {
        return SAVED_LOCALE;
    }
}

// Troca a sigla da localidade
function changeLocale(locale) {
    sessionStorage.setItem("current-locale", locale);
    updateLanguageDisplay(locale);
}

// Atualiza o display do idioma atual
function updateLanguageDisplay(locale) {
    const SELECTED_LANGUAGE_ELEMENT = document.querySelector(`[data-locale='${locale}']`);

    if (SELECTED_LANGUAGE_ELEMENT) {
        fetch(`src/json/${locale}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar o arquivo JSON");
                }

                return response.json();
            })
            .then(languageData => {
                updatePageLanguage(languageData);
            })
            .catch(error => {
                console.error("Erro:", error);
            });

        SELECTED_LANGUAGE_ELEMENT.classList.add("active");
        CURRENT_LANGUAGE_DISPLAY.textContent = SELECTED_LANGUAGE_ELEMENT.textContent;
    } else {
        alert(`O idioma selecionado, "${locale}", é inválido!'`);
    }
}

//
function updatePageLanguage(languageData) {
    document.title = languageData["pageTitle"];

    THEME_DROPDOWN_OPTIONS[0].textContent = languageData["themeDropdownOption1"]
    THEME_DROPDOWN_OPTIONS[1].textContent = languageData["themeDropdownOption2"];
    CURRENT_THEME_DISPLAY.textContent = document.querySelector(".theme-option.active").textContent;

    NAV_LINKS[0].textContent = languageData["nav2Link1"];
    NAV_LINKS[1].textContent = languageData["nav2Link2"];
    NAV_LINKS[2].textContent = languageData["nav2Link3"];
    NAV_LINKS[3].textContent = languageData["nav2Link4"];
    // Offcanvas
    NAV_LINKS[4].textContent = languageData["nav2Link1"];
    NAV_LINKS[5].textContent = languageData["nav2Link2"];
    NAV_LINKS[6].textContent = languageData["nav2Link3"];
    NAV_LINKS[7].textContent = languageData["nav2Link4"];

    // Sobre mim
    document.querySelector("#about-me .container-fluid article h1").textContent = languageData["aboutMeTitle"];
    document.querySelector("#about-me .container-fluid article p").innerHTML = languageData["aboutMeText"];
    document.querySelector("#about-me .container-fluid article button").textContent = languageData["viewResumeButton"];

    // Projetos
    document.querySelector("#skills .container-fluid h2").textContent = languageData["skillsTitle"];
    document.querySelector("#projects .container-fluid h2").textContent = languageData["projectsTitle"];
    document.querySelector("#projects .container-fluid #search #input-search").placeholder = languageData["searchPlaceholder"];
    document.querySelectorAll("#projects .container-fluid #error-message span")[0].textContent = languageData["errorMessage"];
    //
    PROJECTS[0].querySelector("h3").textContent = languageData["project1Title"];
    PROJECTS[0].querySelector("h4").textContent = languageData["projectTag2"];
    PROJECTS[0].querySelectorAll("p")[0].textContent = languageData["project1Text1"];
    PROJECTS[0].querySelectorAll("p")[1].textContent = languageData["project1Text2"];
    PROJECTS[0].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor1"];
    PROJECTS[0].querySelector("button").textContent = languageData["projectButton1"];
    //
    PROJECTS[1].querySelector("h3").textContent = languageData["project2Title"];
    PROJECTS[1].querySelector("h4").textContent = languageData["projectTag1"];
    PROJECTS[1].querySelectorAll("p")[0].textContent = languageData["project2Text1"];
    PROJECTS[1].querySelectorAll("p")[1].textContent = languageData["project2Text2"];
    PROJECTS[1].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor1"];
    PROJECTS[1].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    PROJECTS[1].querySelectorAll("button")[1].textContent = languageData["projectButton3"];
    //
    PROJECTS[2].querySelector("h3").textContent = languageData["project3Title"];
    PROJECTS[2].querySelector("h4").textContent = languageData["projectTag2"];
    PROJECTS[2].querySelectorAll("p")[0].textContent = languageData["project3Text1"];
    PROJECTS[2].querySelectorAll("p")[1].textContent = languageData["project3Text2"];
    PROJECTS[2].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor1"];
    PROJECTS[2].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    PROJECTS[2].querySelectorAll("button")[1].textContent = languageData["projectButton2"];
    //
    PROJECTS[3].querySelector("h3").textContent = languageData["project4Title"];
    PROJECTS[3].querySelector("h4").textContent = languageData["projectTag2"];
    PROJECTS[3].querySelectorAll("p")[0].textContent = languageData["project4Text1"];
    PROJECTS[3].querySelectorAll("p")[1].textContent = languageData["project4Text2"];
    PROJECTS[3].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor2"];
    PROJECTS[3].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    //
    PROJECTS[4].querySelector("h3").textContent = languageData["project5Title"];
    PROJECTS[4].querySelector("h4").textContent = languageData["projectTag2"];
    PROJECTS[4].querySelectorAll("p")[0].textContent = languageData["project5Text1"];
    PROJECTS[4].querySelectorAll("p")[1].textContent = languageData["project5Text2"];
    PROJECTS[4].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor1"];
    PROJECTS[4].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    //
    PROJECTS[5].querySelector("h3").textContent = languageData["project6Title"];
    PROJECTS[5].querySelector("h4").textContent = languageData["projectTag3"];
    PROJECTS[5].querySelectorAll("p")[0].textContent = languageData["project6Text1"];
    PROJECTS[5].querySelectorAll("p")[1].textContent = languageData["project6Text2"];
    PROJECTS[5].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor2"];
    PROJECTS[5].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    //
    PROJECTS[6].querySelector("h3").textContent = languageData["project7Title"];
    PROJECTS[6].querySelector("h4").textContent = languageData["projectTag3"];
    PROJECTS[6].querySelectorAll("p")[0].textContent = languageData["project7Text1"];
    PROJECTS[6].querySelectorAll("p")[1].textContent = languageData["project7Text2"];
    PROJECTS[6].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor1"];
    PROJECTS[6].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    //
    PROJECTS[7].querySelector("h3").textContent = languageData["project8Title"];
    PROJECTS[7].querySelector("h4").textContent = languageData["projectTag3"];
    PROJECTS[7].querySelectorAll("p")[0].textContent = languageData["project8Text1"];
    PROJECTS[7].querySelectorAll("p")[1].textContent = languageData["project8Text2"];
    PROJECTS[7].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor1"];
    PROJECTS[7].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    //
    PROJECTS[8].querySelector("h3").textContent = languageData["project9Title"];
    PROJECTS[8].querySelector("h4").textContent = languageData["projectTag3"];
    PROJECTS[8].querySelectorAll("p")[0].textContent = languageData["project9Text1"];
    PROJECTS[8].querySelectorAll("p")[1].textContent = languageData["project9Text2"];
    PROJECTS[8].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor2"];
    PROJECTS[8].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    //
    PROJECTS[9].querySelector("h3").textContent = languageData["project10Title"];
    PROJECTS[9].querySelector("h4").textContent = languageData["projectTag3"];
    PROJECTS[9].querySelectorAll("p")[0].textContent = languageData["project10Text1"];
    PROJECTS[9].querySelectorAll("p")[1].textContent = languageData["project10Text2"];
    PROJECTS[9].querySelectorAll("p")[2].innerHTML = languageData["projectAuthor1"];
    PROJECTS[9].querySelectorAll("button")[0].textContent = languageData["projectButton1"];
    
    // Certificações
    document.querySelector("#certifications .container-fluid h2").textContent = languageData["certificationTitle"];
    CERTIFICATION[0].querySelectorAll("p")[0].textContent = languageData["certification1Date"];
    CERTIFICATION[0].querySelectorAll("p")[1].textContent = languageData["certification1Text"];
    //
    CERTIFICATION[1].querySelectorAll("p")[0].textContent = languageData["certification2Date"];
    CERTIFICATION[1].querySelectorAll("p")[1].textContent = languageData["certification2Text"];
    //
    CERTIFICATION[2].querySelectorAll("p")[0].textContent = languageData["certification3Date"];
    CERTIFICATION[2].querySelectorAll("p")[1].textContent = languageData["certification3Text"];
    //
    CERTIFICATION[3].querySelectorAll("p")[0].textContent = languageData["certification4Date"];
    CERTIFICATION[3].querySelectorAll("p")[1].textContent = languageData["certification4Text"];
    //
    CERTIFICATION[4].querySelectorAll("p")[0].textContent = languageData["certification5Date"];
    CERTIFICATION[4].querySelectorAll("p")[1].textContent = languageData["certification5Text"];
    //
    CERTIFICATION[5].querySelectorAll("p")[0].textContent = languageData["certification6Date"];
    CERTIFICATION[5].querySelectorAll("p")[1].textContent = languageData["certification6Text"];
    //
    CERTIFICATION[6].querySelectorAll("p")[0].textContent = languageData["certification7Date"];
    CERTIFICATION[6].querySelectorAll("p")[1].textContent = languageData["certification7Text"];
    //
    CERTIFICATION[7].querySelectorAll("p")[0].textContent = languageData["certification8Date"];
    CERTIFICATION[7].querySelectorAll("p")[1].textContent = languageData["certification8Text"];
}