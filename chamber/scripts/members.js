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
        let site = document.createElement('p');

        companyImage.setAttribute('src', member.imageUrl);
        companyImage.setAttribute('alt', `The company logo for ${member.companyName}`);
        companyImage.setAttribute('loading', 'lazy');
        companyImage.setAttribute('width', '340');
        companyImage.setAttribute('height', '440');

        companyName.textContent = member.companyName;
        address.textContent = member.address;
        phoneNumber.textContent = member.phone;
        level.textContent = member.level;
        site.textContent = member.site;

        card.appendChild(companyImage);
        card.appendChild(companyName);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(level);
        card.appendChild(site);

        cards.appendChild(card);

    })
}

getMembertData();