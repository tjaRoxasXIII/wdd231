const messageElement = document.getElementById("visitMessage");

const lastVisit = Number(localStorage.getItem("lastvisit"));
const now = Date.now();

if (!lastVisit) {
    messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const differenceInMs = now - lastVisit;

    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    if (differenceInDays < 1) {
        messageElement.textContent = "Back so soon! Awesome!";
    } else if (differenceInDays === 1) {
        messageElement.textContent = "You last visited 1 day ago.";
    } else {
        messageElement.textContent = `You last visited ${differenceInDays} days ago.`;
    }
}

localStorage.setItem("lastvisit", now);