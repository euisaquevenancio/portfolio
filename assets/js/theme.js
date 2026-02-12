// Obtém os dados da sessionStorage
let storagedTheme = sessionStorage.getItem("theme");
if (storagedTheme === null) {
    // Salva os dados na sessionStorage
    sessionStorage.setItem("theme", "light");
    storagedTheme = "light";
}

changeTheme(storagedTheme);

const themeOptions = document.querySelectorAll(".theme-option");
// Adiciona a lógica de alteração de tema nos elementos
themeOptions.forEach(function(option) {
    option.addEventListener("click", function() {
        if (!this.classList.contains("active")) {
            if (document.body.classList.contains(document.querySelectorAll(".theme-option.active")[0].dataset.theme)) {
                document.body.classList.remove(document.querySelectorAll(".theme-option.active")[0].dataset.theme);
                document.body.classList.remove(document.querySelectorAll(".theme-option.active")[1].dataset.theme);
            }

            sessionStorage.setItem("theme", this.dataset.theme);
            storagedTheme = this.dataset.theme;
            changeTheme(this.dataset.theme);
        }
    });
});

//
function changeTheme(theme) {
    document.querySelectorAll(".theme-option.active").forEach(option => {
        option.classList.remove("active");
    });

    let selectedThemeOptions = document.querySelectorAll(".theme-option[data-theme='" + theme + "']");
    selectedThemeOptions.forEach(option => {
        option.classList.add("active");
    });

    let actualTheme = document.querySelector("#actualTheme");
    actualTheme.textContent = selectedThemeOptions[0].textContent;

    let actualThemeMobile = document.querySelector("#actualThemeMobile");
    actualThemeMobile.textContent = selectedThemeOptions[0].textContent;

    document.body.classList.add(theme);

    // Página "Habilidades"
    if (currentPath == "project.html") {
        document.querySelector("#portfolio img").src = "assets/img/mockup/portfolio-mockup-" + theme + "-" + storagedLanguage +".png";
        document.querySelector("#whoIsThatChampion img").src = "assets/img/mockup/witc-mockup-" + theme + "-" + storagedLanguage +".png";
        document.querySelector("#whoIsThatChampionAPI img").src = "assets/img/mockup/witca-mockup-" + theme + "-" + storagedLanguage +".png";

        if (storagedLanguage == "pt-br") {
            document.querySelector("#radarPraiaGrande img").src = "assets/img/mockup/radarpg-mockup-" + theme +"-1.png";
        } else {
            document.querySelector("#radarPraiaGrande img").src = "assets/img/mockup/radarpg-mockup-" + theme +"-2.png";
        }

        document.querySelector("#calculator img").src = "assets/img/mockup/calculator-mockup-" + theme + "-" + storagedLanguage +".png";
        document.querySelector("#fluxosul img").src = "assets/img/mockup/fluxosul-mockup-" + theme + "-" + storagedLanguage +".png";
    }
}