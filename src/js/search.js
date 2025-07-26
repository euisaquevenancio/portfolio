const INPUT_SEARCH = document.querySelector("#input-search");
const ERROR_MESSAGE = document.querySelector("#projects .container-fluid #error-message");
const SEARCH_SPAN = document.querySelectorAll("#projects .container-fluid #error-message span")[1];

INPUT_SEARCH.addEventListener("input", function () {
    let isAnyProjectVisible  = false;
    const SEARCH_TEXT = this.value.trim().toLowerCase();
    const PROJECTS = document.querySelectorAll(".project");
    SEARCH_SPAN.textContent = this.value;

    for (let project of PROJECTS) {
        const TITLE = project.querySelector("h3").textContent;

        if (TITLE.toLowerCase().startsWith(SEARCH_TEXT)) {
            project.style.display = "flex";
            isAnyProjectVisible = true;
        } else {
            project.style.display = "none";
        }
    }

    if (isAnyProjectVisible) {
        if (ERROR_MESSAGE.style.display == "block") {
            ERROR_MESSAGE.style.display = "none";
        }
    } else {
        ERROR_MESSAGE.style.display = "block";
    }
});