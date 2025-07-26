if (document.querySelector(".theme-option.active")) {
    document.querySelector(".theme-option.active").classList.remove("active");
}

const CURRENT_THEME_DISPLAY = document.querySelector("#current-theme-display");
const THEME_DROPDOWN_OPTIONS = document.querySelectorAll(".theme-option");
let currentTheme = getSessionTheme();

updateThemeDisplay(currentTheme);

// Adicionando ação de mudança de idioma via dropdown
THEME_DROPDOWN_OPTIONS.forEach((dropdownOption) => {
    dropdownOption.addEventListener("click", function() {
        if (!dropdownOption.classList.contains("active")) {
            const PREVIOUS_SELECTED_DROPDOWN_OPTION = document.querySelector(".theme-option.active");
            PREVIOUS_SELECTED_DROPDOWN_OPTION.classList.remove("active");

            const DROPDOWN_OPTION_THEME = this.getAttribute("data-theme");
            changeTheme(DROPDOWN_OPTION_THEME);
        }
    });
});

// Captura o tema salvo na sessão
function getSessionTheme() {
    const SAVED_THEME = sessionStorage.getItem("current-theme");

    if (SAVED_THEME == null) {
        return "light";
    } else {
        return SAVED_THEME;
    }
}

// Altera o tema atual
function changeTheme(theme) {
    sessionStorage.setItem("current-theme", theme);
    updateThemeDisplay(theme);
}

// Atualiza o display do idioma atual
function updateThemeDisplay(theme) {
    const SELECTED_THEME_ELEMENT = document.querySelector(`[data-theme='${theme}']`);

    if (SELECTED_THEME_ELEMENT) {
        SELECTED_THEME_ELEMENT.classList.add("active");
        CURRENT_THEME_DISPLAY.textContent = SELECTED_THEME_ELEMENT.textContent;

        if (theme != "light") {
            document.body.classList.add(theme);
        } else {
            if (document.body.classList != "") {
                for (let i = 0; i < document.body.classList.length; i++) {
                    document.body.classList.remove(document.body.classList[i]);
                }
            }
        }
    } else {
        alert("O tema selecionado (" + theme + ") é inválido!");
    }
}