// Obtém os dados da sessionStorage
let storagedLanguage = sessionStorage.getItem("language");
if (storagedLanguage === null) {
    // Salva os dados na sessionStorage
    sessionStorage.setItem("language", "pt-br");
    storagedLanguage = "pt-br";
}

const navbarLinks = document.querySelectorAll("#navbarNav .nav-link");
changeLanguage(storagedLanguage);

const languageOptions = document.querySelectorAll(".language-option");
// Adiciona a lógica de alteração de idioma nos elementos
languageOptions.forEach(function(option) {
    option.addEventListener("click", function() {
        if (!this.classList.contains("active")) {
            sessionStorage.setItem("language", this.dataset.language);
            storagedLanguage = this.dataset.language;
            changeLanguage(this.dataset.language);
        }
    });
});

// Atualiza o idioma
async function changeLanguage(language) {
    document.querySelectorAll(".language-option.active").forEach(option => {
        option.classList.remove("active");
    });
    
    let selectedLanguageOptions = document.querySelectorAll(".language-option[data-language='" + language + "']");
    selectedLanguageOptions.forEach(option => {
        option.classList.add("active");
    });

    let actualLanguage = document.querySelector("#actualLanguage");
    actualLanguage.textContent = selectedLanguageOptions[0].textContent;

    let actualLanguageMobile = document.querySelector("#actualLanguageMobile");
    actualLanguageMobile.textContent = selectedLanguageOptions[0].textContent;

    // Buscando o arquivo do idioma selecionado
    const res = await fetch("assets/json/language-" + language + ".json");
    if (!res.ok) {
        throw new Error(res.status);
    }
    // Obtém o conteúdo do respectivo idioma
    const data = await res.json();

    // Cabeçalhos
    for (i = 0; i < data.themes.length; i++) {
        document.querySelectorAll("#firstNavbar .theme-option")[i].textContent = data.themes[i];
        document.querySelectorAll("#offcanvasRight .theme-option")[i].textContent = data.themes[i];
    }

    let actualTheme = document.querySelector("#actualTheme");
    actualTheme.textContent = document.querySelectorAll(".theme-option.active")[0].textContent;

    let actualThemeMobile = document.querySelector("#actualThemeMobile");
    actualThemeMobile.textContent = document.querySelectorAll(".theme-option.active")[0].textContent;

    for (i = 0; i < data.links.length; i++) {
        document.querySelectorAll("#secondNavbar .nav-link")[i].textContent = data.links[i];
        document.querySelectorAll("#offcanvasRight .nav-link")[2+i].textContent = data.links[i];
    }

    document.querySelector(".offcanvas-title").textContent = data.sidebarTitle;

    // Rodapé
    let copyright = document.querySelector("#copyright");
    copyright.textContent = data.copyright;

    // Página "Sobre mim"
    if (currentPath == "" || currentPath == "index.html") {
        document.querySelector("article h1").textContent = data.aboutMe.title;
        document.querySelector("article h5").textContent = data.aboutMe.subtitle;
        document.querySelector("article p").innerHTML = data.aboutMe.paragraph;
        document.querySelector("article button").textContent = data.aboutMe.downloadResume;
    }

    // Página "Habilidades"
    if (currentPath == "skill.html") {
        document.querySelector(".left h1").textContent = data.skill.title;
        document.querySelector("#skills p:nth-child(1)").innerHTML = data.skill.paragraph1;
        document.querySelector("#skills p:nth-child(2)").innerHTML = data.skill.paragraph2;
        document.querySelector("#skills p:nth-child(3)").innerHTML = data.skill.paragraph3;
        document.querySelector(".stack-container:nth-Child(4) h5").textContent = data.skill.subtitle1;
        document.querySelector(".stack-container:nth-Child(5) h5").textContent = data.skill.subtitle2;
    }

    // Página "Projetos"
    if (currentPath == "project.html") {
        document.querySelector(".container h1").textContent = data.project.title;

        document.querySelector("#portfolio h2").textContent = data.project.portfolio.title;
        document.querySelector("#portfolio p:nth-child(3)").textContent = data.project.portfolio.paragraph1;
        document.querySelector("#portfolio p:nth-child(4)").textContent = data.project.portfolio.paragraph2;
        document.querySelector("#portfolio img").src = "assets/img/mockup/portfolio-mockup-" + storagedTheme + "-" + language +".png";
        
        document.querySelector("#whoIsThatChampion p:nth-child(3)").textContent = data.project.witc.paragraph1;
        document.querySelector("#whoIsThatChampion p:nth-child(4)").textContent = data.project.witc.paragraph2;
        document.querySelector("#whoIsThatChampion img").src = "assets/img/mockup/witc-mockup-" + storagedTheme + "-" + language +".png";

        document.querySelector("#whoIsThatChampionAPI p:nth-child(3)").textContent = data.project.witc.paragraph1;
        document.querySelector("#whoIsThatChampionAPI p:nth-child(4)").textContent = data.project.witca.paragraph2;
        document.querySelector("#whoIsThatChampionAPI img").src = "assets/img/mockup/witca-mockup-" + storagedTheme + "-" + language +".png";
        
        document.querySelector("#radarPraiaGrande p:nth-child(3)").textContent = data.project.radarpg.paragraph1;
        document.querySelector("#radarPraiaGrande p:nth-child(4)").textContent = data.project.radarpg.paragraph2;
        if (language == "pt-br") {
            document.querySelector("#radarPraiaGrande img").src = "assets/img/mockup/radarpg-mockup-" + storagedTheme +"-1.png";
        } else {
            document.querySelector("#radarPraiaGrande img").src = "assets/img/mockup/radarpg-mockup-" + storagedTheme +"-2.png";
        }

        document.querySelector("#edusiga p:nth-child(3)").textContent = data.project.edusiga.paragraph;

        document.querySelector("#calculator h2").textContent = data.project.calculator.title;
        document.querySelector("#calculator p:nth-child(3)").textContent = data.project.calculator.paragraph1;
        document.querySelector("#calculator p:nth-child(4)").textContent = data.project.calculator.paragraph2;
        document.querySelector("#calculator img").src = "assets/img/mockup/calculator-mockup-" + storagedTheme + "-" + language +".png";

        document.querySelector("#fluxosul p:nth-child(3)").textContent = data.project.fluxosul.paragraph1;
        document.querySelector("#fluxosul p:nth-child(4)").textContent = data.project.fluxosul.paragraph2;
        document.querySelector("#fluxosul img").src = "assets/img/mockup/fluxosul-mockup-" + storagedTheme + "-" + language +".png";

        document.querySelectorAll(".view-project-button span").forEach(button => {
            button.textContent = data.project.viewProjectButton;
        });
        document.querySelectorAll(".github-button span").forEach(button => {
            button.textContent = data.project.githubButton;
        });
        document.querySelectorAll(".by span").forEach(span => {
            span.textContent = data.project.bySpan;
        });
        document.querySelectorAll(".created span").forEach(span => {
            span.textContent = data.project.createdSpan;
        });
    }
    
    // Página "Certificados"
    if (currentPath == "certificate.html") {
        document.querySelector(".container h1").textContent = data.certificate.title;

        document.querySelector("#aedds p").textContent = data.certificate.aedds.paragraph;
        document.querySelector("#aedds .type i").textContent = data.certificate.aedds.type;
        document.querySelector("#aedds .hour i").textContent = data.certificate.aedds.hour;

        document.querySelector("#teipi p").textContent = data.certificate.teipi.paragraph;
        document.querySelector("#teipi .type i").textContent = data.certificate.teipi.type;
        document.querySelector("#teipi .issue-date i").textContent = data.certificate.teipi.issueDate;
        document.querySelector("#teipi .hour i").textContent = data.certificate.teipi.hour;

        document.querySelector("#cod p").textContent = data.certificate.cod.paragraph;
        document.querySelector("#cod .type i").textContent = data.certificate.cod.type;
        document.querySelector("#cod .issue-date i").textContent = data.certificate.cod.issueDate;

        document.querySelector("#dfcfe p").textContent = data.certificate.dfcfe.paragraph;
        document.querySelector("#dfcfe .type i").textContent = data.certificate.dfcfe.type;
        document.querySelector("#dfcfe .issue-date i").textContent = data.certificate.dfcfe.issueDate;

        document.querySelector("#jdbaaceep p").textContent = data.certificate.jdbaaceep.paragraph;
        document.querySelector("#jdbaaceep .type i").textContent = data.certificate.jdbaaceep.type;
        document.querySelector("#jdbaaceep .issue-date i").textContent = data.certificate.jdbaaceep.issueDate;
        document.querySelector("#jdbaaceep .hour i").textContent = data.certificate.jdbaaceep.hour;

        document.querySelector("#mdj p").textContent = data.certificate.mdj.paragraph;
        document.querySelector("#mdj .type i").textContent = data.certificate.mdj.type;
        document.querySelector("#mdj .issue-date i").textContent = data.certificate.mdj.issueDate;
        document.querySelector("#mdj .hour i").textContent = data.certificate.mdj.hour;

        document.querySelector("#fdedd p").textContent = data.certificate.fdedd.paragraph;
        document.querySelector("#fdedd .type i").textContent = data.certificate.fdedd.type;
        document.querySelector("#fdedd .issue-date i").textContent = data.certificate.fdedd.issueDate;
        document.querySelector("#fdedd .hour i").textContent = data.certificate.fdedd.hour;

        document.querySelector("#mpbpbieds p").textContent = data.certificate.mpbpbieds.paragraph;
        document.querySelector("#mpbpbieds .type i").textContent = data.certificate.mpbpbieds.type;
        document.querySelector("#mpbpbieds .issue-date i").textContent = data.certificate.mpbpbieds.issueDate;
        document.querySelector("#mpbpbieds .hour i").textContent = data.certificate.mpbpbieds.hour;
        
        document.querySelector("#iaieatd p").textContent = data.certificate.iaieatd.paragraph;
        document.querySelector("#iaieatd .type i").textContent = data.certificate.iaieatd.type;
        document.querySelector("#iaieatd .issue-date i").textContent = data.certificate.iaieatd.issueDate;

        document.querySelector("#ic p").textContent = data.certificate.ic.paragraph;
        document.querySelector("#ic .type i").textContent = data.certificate.ic.type;
        document.querySelector("#ic .issue-date i").textContent = data.certificate.ic.issueDate;
        document.querySelector("#ic .hour i").textContent = data.certificate.ic.hour;

        document.querySelectorAll(".type span").forEach(span => {
            span.textContent = data.certificate.typeSpan;
        });
        document.querySelectorAll(".issue-date span").forEach(span => {
            span.textContent = data.certificate.issueDateSpan;
        });
        document.querySelectorAll(".hour span").forEach(span => {
            span.textContent = data.certificate.hourSpan;
        });

        document.querySelectorAll(".view-certificate-button span").forEach(button => {
            button.textContent = data.certificate.viewCertificateButton;
        });
    }
}