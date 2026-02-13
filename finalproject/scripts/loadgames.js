import gameData from '../data/games.json' with { type: 'json' };
let libraryGames = [...gameData.games];
let userRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
let lifetimeHours = 0;

const loadGames = () => {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = "";
    lifetimeHours = 0;

    libraryGames.forEach(game => {
        const gameItem = document.createElement('div');
        const gameImage = document.createElement('img');
        const gameTitle = document.createElement('h3');
        const hoursPlayed = document.createElement('p');
        const stars = document.createElement('div');

        gameImage.alt = `${game.name} header image`;
        gameImage.src = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`;
        gameTitle.textContent = game.name;
        hoursPlayed.textContent = `Hours Played: ${Math.floor(game.playtime_forever / 60)}`;
        lifetimeHours += game.playtime_forever / 60;

        stars.classList.add('star-rating');

        for (let i = 5; i >= 1; i--) {
            const star = document.createElement("span");
            star.textContent = "★";
            star.dataset.value = i;
            star.dataset.appid = game.appid;

            if (userRatings[game.appid] >= i) {
                star.classList.add("rated");
            }

            star.addEventListener("click", () => {
                userRatings[game.appid] = i;
                localStorage.setItem("userRatings", JSON.stringify(userRatings));
                updateStarDisplay(game.appid);
            });

            stars.appendChild(star);
        }

        gameItem.appendChild(gameImage);
        gameItem.appendChild(gameTitle);
        gameItem.appendChild(hoursPlayed);
        gameItem.appendChild(stars);
        gameList.appendChild(gameItem);
    });

    localStorage.setItem("userRatings", JSON.stringify(userRatings));
    updateLifetimeHours();
};

function updateLifetimeHours() {
    const lifetimeHoursElement = document.getElementById("lifetime-hours");
    lifetimeHoursElement.textContent = `Total Lifetime Hours Played: ${Math.floor(lifetimeHours)}`;
}

function updateStarDisplay(appid) {
    const stars = document.querySelectorAll(`[data-appid="${appid}"]`);
    const rating = userRatings[appid];

    stars.forEach(star => {
        const value = Number(star.dataset.value);
        star.classList.toggle("rated", value <= rating);
    });
}


function sortLibrary(selector) {
    switch (selector) {
        case "name":
            libraryGames.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            libraryGames.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "hours":
            libraryGames.sort((a, b) => (b.playtime_forever || 0) - (a.playtime_forever || 0));
            break;
        default:
            libraryGames = [...gameData.games];
    }

    loadGames();
}

const clearAllRatings = () => {
    userRatings = {};
    localStorage.setItem("userRatings", JSON.stringify(userRatings));

    document.querySelectorAll(".star-rating span").forEach(star => {
        star.classList.remove("rated");
    });
};

document.getElementById("search").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    const filtered = libraryGames.filter(g => g.name.toLowerCase().includes(q));

    const container = document.getElementById("game-list");
    container.innerHTML = "";

    filtered.forEach(game => {
        const item = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h3");
        const stars = document.createElement("div");

        img.src = game.header_image;
        img.alt = game.name;
        title.textContent = game.name;

        stars.classList.add("star-rating");

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.textContent = "★";
            star.dataset.value = i;
            star.dataset.appid = game.appid;

            if (userRatings[game.appid] >= i) {
                star.classList.add("rated");
            }

            star.addEventListener("click", () => {
                userRatings[game.appid] = i;
                localStorage.setItem("userRatings", JSON.stringify(userRatings));
                loadGames();
            });

            stars.appendChild(star);
        }

        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(stars);
        container.appendChild(item);
    });
});

document.getElementById("sorting-options").addEventListener("change", e => {
    sortLibrary(e.target.value);
});

document.getElementById("clear-ratings").addEventListener("click", clearAllRatings);

loadGames();

