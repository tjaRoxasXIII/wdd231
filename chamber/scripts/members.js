const url = 'data/members.json';

const cards = document.querySelector('#cards');

async function getMembertData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.members);
    displayMembers(data.members);
}

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        let companyName = document.createElement('h2');
        let companyImage = document.createElement('img');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let level = document.createElement('p');
        let site = document.createElement('a');
        let globe = document.createElement('span');

        companyImage.setAttribute('src', member.imageUrl);
        companyImage.setAttribute('alt', `The company logo for ${member.companyName}`);
        companyImage.setAttribute('loading', 'lazy');
        companyImage.setAttribute('width', '340');
        companyImage.setAttribute('height', '440');

        site.setAttribute('href', member.site)

        companyName.textContent = member.companyName;
        address.innerHTML = `<i class="fa-solid fa-map-location"></i> : ${member.address}`;
        phoneNumber.innerHTML = `<i class="fa-solid fa-phone"></i> : ${member.phone}`;
        
        globe.innerHTML = `<i class="fa-solid fa-globe"></i> : `;
        site.append(globe);
        site.append(`${member.site}`);
        
        if (member.level === 1) {
            level.innerHTML = `<i class="fa-solid fa-star" style="color: #cd7f32;"></i> : Member`;
        } else if (member.level === 2) {
            level.innerHTML = `<i class="fa-solid fa-star" style="color: #c0c0c0;"></i> : Silver Member`;
        } else if (member.level === 3) {
            level.innerHTML = `<i class="fa-solid fa-star" style="color: #ffd700;"></i> : Gold Member`;
        }

        level.setAttribute('class', 'level');

        card.appendChild(companyImage);
        card.appendChild(companyName);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(site);
        card.appendChild(level);

        cards.appendChild(card);

    })
}

getMembertData();