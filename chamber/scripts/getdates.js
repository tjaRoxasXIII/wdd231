const currentYear = new Date().getFullYear();

const lastModified = new Date(document.lastModified);

document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").innerHTML = document.lastModified;