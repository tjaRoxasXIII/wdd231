const url = 'data/members.json';

const cards = document.querySelector('#spotlight');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.members);

    spotlightMembers(data.members);
}

const spotlightMembers = (members) => {
    let spotlightCount = getRandomInt(2, 3);
    let filteredMembers = members.filter(member => member.level > 1);

    if (filteredMembers.length < 3) {
            filteredMembers.forEach((member) => {
                buildCards(member);
            })
        }

    else {
        let memberList = [];

        while (memberList.length < spotlightCount) {
            let randomIndex = Math.floor(Math.random() * filteredMembers.length);
            let profile = filteredMembers[randomIndex];

            if (!memberList.includes(profile)) {
                memberList.push(profile);
            }
        }

        memberList.forEach(member => buildCards(member))
    }
}



function buildCards(member) {
        let card = document.createElement('section');
        let companyName = document.createElement('h2');
        let companyImage = document.createElement('img');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let level = document.createElement('p');
        let site = document.createElement('a');
        let globe = document.createElement('span');
        let weblink = document.createElement('div');

        companyImage.setAttribute('src', member.imageUrl);
        companyImage.setAttribute('alt', `The company logo for ${member.companyName}`);
        companyImage.setAttribute('loading', 'lazy');
        companyImage.setAttribute('width', '340');
        companyImage.setAttribute('height', '440');

        site.setAttribute('href', member.site);
        site.innerHTML = `${member.site}`

        companyName.textContent = member.companyName;
        address.innerHTML = `<i class="fa-solid fa-map-location"></i> : ${member.address}`;
        phoneNumber.innerHTML = `<i class="fa-solid fa-phone"></i> : ${member.phone}`;
        
        globe.innerHTML = `<i class="fa-solid fa-globe"></i> : `;
        weblink.append(globe);
        weblink.append(site);
        
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
        card.appendChild(weblink);
        card.appendChild(level);

        cards.appendChild(card);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

getMemberData();