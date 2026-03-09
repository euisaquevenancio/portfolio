// Capturando o nome da página atual
let currentPath = window.location.pathname;
let lastIndex = currentPath.split("/").length - 1;
currentPath = currentPath.split("/")[lastIndex];

const actualYear = new Date().getFullYear();
document.querySelector("#currentYear").textContent = actualYear;