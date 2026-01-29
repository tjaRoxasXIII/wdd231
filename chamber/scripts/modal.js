const membershipData = {
    np: {
        title: "NP Membership Benefits",
        benefits: [
            "No membership fee",
            "Access to networking events",
            "Basic directory listing"
        ]
    },
    bronze: {
        title: "Bronze Membership Benefits",
        benefits: [
            "Access to networking events",
            "Basic directory listing",
            "Event discounts",
            "Access to training workshops"
        ]
    },
    silver: {
        title: "Silver Membership Benefits",
        benefits: [
            "Access to networking events",
            "Basic directory listing",
            "Event discounts",
            "Access to training workshops",
            "Priority event registration",
            "Spotlight rotation on homepage"
        ]
    },
    gold: {
        title: "Gold Membership Benefits",
        benefits: [
            "Access to networking events",
            "Basic directory listing",
            "Event discounts",
            "Access to training workshops",
            "Priority event registration",
            "Spotlight rotation on homepage",
            "Exclusive networking events",
            "Additional advertising placement"
        ]
    }
};

const dialog = document.getElementById("membershipModal");
const title = document.getElementById("modalTitle");
const modalList = document.getElementById("modalList");

document.querySelectorAll(".modal-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const key = link.dataset.modal;
        const data = membershipData[key];

        title.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)} Membership Benefits`;

        modalList.innerHTML = "";
        data.benefits.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            modalList.appendChild(li);
        });

        dialog.showPopover();
    });
});

document.querySelector(".close").addEventListener("click", () => {
    dialog.hidePopover();
});