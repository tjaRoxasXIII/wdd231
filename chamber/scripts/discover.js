import { places } from "../data/places.mjs";

const container = document.querySelector("#discoverGrid");

function buildCard(place) {
    const card = document.createElement("section");
    card.classList.add("discover-card");

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.image; 
    img.alt = place.name;
    img.loading = "lazy";
    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.textContent = place.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";
    button.classList.add("learn-more");

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(button);

    return card;
}

function loadCards() {
    places.forEach(place => {
        const card = buildCard(place);
        container.appendChild(card);
    });
}

loadCards();