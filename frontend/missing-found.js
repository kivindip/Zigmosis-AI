// ===============================
// Load Missing & Found Pets
// ===============================

console.log("MY LATEST JAVASCRIPT FILE");
// Containers

const missingContainer =
document.getElementById("missingContainer");


const foundContainer =
document.getElementById("foundContainer");


// ===============================
// LOAD MISSING PETS
// ===============================

const missingPets =
    JSON.parse(localStorage.getItem("missingPets")) || [];

missingPets.forEach(pet => {
    missingContainer.innerHTML += `
        <div class="pet-card">

            <img
                src="${pet.image
                    ? (pet.image.startsWith('data:image/')
                        ? pet.image
                        : 'images/' + pet.image)
                    : ''}"
                alt="${pet.name || 'Pet'}"
                class="pet-card-image"
            >

            <div class="pet-content">

                <span class="badge missing">Missing</span>

                <h3>${pet.name || 'Unknown Pet'}</h3>

                <p>🐾 ${pet.breed || ''}</p>
                <p>Age: ${pet.age || ''}</p>
                <p>${pet.location || ''}</p>
                <p>${pet.date || ''}</p>
                <p>Owner: ${pet.ownerName || pet.owner_name || 'Not provided'}</p>

                <div class="card-buttons">
                    <button class="view-btn"
                        onclick="viewPet(${pet.id}, 'missing')">
                        View Details
                    </button>

                    <button class="seen-btn"
                        onclick="seenPet(${pet.id}, 'missing')">
                        I've Seen This Pet
                    </button>
                </div>

            </div>
        </div>
    `;
});


 // ===============================
 // LOAD FOUND PETS
 // ===============================

const foundPets =
    JSON.parse(localStorage.getItem("foundPets")) || [];

foundPets.forEach(pet => {

    const imageSrc = pet.image
        ? (pet.image.startsWith("data:image/")
            ? pet.image
            : pet.image.startsWith("http://") ||
              pet.image.startsWith("https://") ||
              pet.image.startsWith("images/") ||
              pet.image.startsWith("/")
                ? pet.image
                : "images/" + pet.image)
        : "";

    foundContainer.innerHTML += `
        <div class="pet-card">

            <img
                src="${imageSrc}"
                alt="${pet.name || pet.petName || 'Found Pet'}"
                class="pet-card-image"
                onerror="this.style.display='none'"
            >

            <div class="pet-content">

                <span class="badge found">Found</span>

                <h3>${pet.name || pet.petName || "Found Pet"}</h3>

                <p>${pet.location || ""}</p>
                <p>${pet.date || ""}</p>
                <p>Finder: ${pet.finderName || "Not provided"}</p>
                <p>${pet.description || ""}</p>

                <div class="card-buttons">

                    <button
                        class="view-btn"
                        onclick="viewPet(${pet.id}, 'found')">
                        View Details
                    </button>

                    <button
                        class="seen-btn"
                        onclick="seenPet(${pet.id}, 'found')">
                        This Is My Pet
                    </button>

                </div>
            </div>
        </div>
    `;
});


// ===============================
// VIEW DETAILS
// ===============================


function viewPet(id,type){


let pets;


if(type === "missing"){

    pets = missingPets;

}

else{

    pets = foundPets;

}



const selected =
pets.find(
pet => pet.id === id
);



localStorage.setItem(
"selectedPet",
JSON.stringify(selected)
);



window.location.href =
"pet-details.html";


}


function filterPets() {
    const searchText = document.getElementById("petSearch").value.trim().toLowerCase();
    const location = document.getElementById("locationFilter").value.toLowerCase();
    const breed = document.getElementById("breedFilter").value.toLowerCase();
    const sortOrder = document.getElementById("sortFilter").value;

    let visibleCount = 0;

    const missingContainer = document.getElementById("missingContainer");
const foundContainer = document.getElementById("foundContainer");

const containers = [missingContainer, foundContainer];

    containers.forEach(container => {
        if (!container) return;

        const cards = Array.from(container.querySelectorAll(".pet-card"));

        // Filter pets by name, location, and breed
        cards.forEach(card => {
            const text = card.innerText.toLowerCase();

            const matchesName = !searchText || text.includes(searchText);
            const matchesLocation = !location || text.includes(location);
            const matchesBreed = !breed || text.includes(breed);

            const matches = matchesName && matchesLocation && matchesBreed;

            card.style.display = matches ? "" : "none";

            if (matches) visibleCount++;
        });

        // Sort pets by date when Latest or Oldest is selected
          
if (sortOrder !== "all") {
    function getDate(card) {
        const match = card.innerText.match(
            /(?:Missing|Found):?\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i
        );

        if (!match) return null;

        const timestamp = new Date(match[1]).getTime();

        return Number.isNaN(timestamp) ? null : timestamp;
    }

    cards.sort((a, b) => {
        const dateA = getDate(a);
        const dateB = getDate(b);

        if (dateA === null && dateB === null) return 0;
        if (dateA === null) return 1;
        if (dateB === null) return -1;

        return sortOrder === "oldest"
            ? dateA - dateB
            : dateB - dateA;
    });
}


        // Put the cards back in the selected order
        cards.forEach(card => container.appendChild(card));
    });

    // Show a message when no pets match
    let message = document.getElementById("noResults");

    if (!message) {
        message = document.createElement("p");
        message.id = "noResults";
        message.textContent = "No results found.";
        message.style.textAlign = "center";
        message.style.display = "none";

        document.querySelector(".search-section")
            .insertAdjacentElement("afterend", message);
    }

    message.style.display = visibleCount === 0 ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const accountIcon = document.getElementById("accountIcon");
    const accountDropdown = document.getElementById("accountDropdown");

    if (!accountIcon || !accountDropdown) {
        console.log("Account icon or dropdown was not found.");
        return;
    }

    accountIcon.addEventListener("click", function (event) {
        event.stopPropagation();

        accountDropdown.hidden = !accountDropdown.hidden;

        accountIcon.setAttribute(
            "aria-expanded",
            String(!accountDropdown.hidden)
        );
    });

    document.addEventListener("click", function () {
        accountDropdown.hidden = true;
        accountIcon.setAttribute("aria-expanded", "false");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const petSearch = document.getElementById("petSearch");
    const locationFilter = document.getElementById("locationFilter");
    const breedFilter = document.getElementById("breedFilter");
    const sortFilter = document.getElementById("sortFilter");

    if (searchButton) {
        searchButton.addEventListener("click", filterPets);
    }

    if (petSearch) {
        petSearch.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                filterPets();
            }
        });
    }

    [locationFilter, breedFilter, sortFilter].forEach(function (filter) {
        if (filter) {
            filter.addEventListener("change", filterPets);
        }
    });
});

document.addEventListener("DOMContentLoaded", async function () {
    const logoutButton = document.getElementById("logoutButton");

    if (!logoutButton) return;

    const { data, error } = await window.supabase
        .createClient(
            "https://lqjfyqaqmtxzoqfchblm.supabase.co",
            "sb_publishable_sC7fhI-_S-Ch4Y2alTur-w_nEdY_1Yq"
        )
        .auth.getSession();

    if (error) {
        console.error("Session check failed:", error);
        return;
    }

    if (!data.session) return;

    logoutButton.hidden = false;

    logoutButton.addEventListener("click", async function () {
        event.preventDefault();
        logoutButton.disabled = true;

        const { error } = await window.supabase
            .createClient(
                "https://lqjfyqaqmtxzoqfchblm.supabase.co",
                "sb_publishable_sC7fhI-_S-Ch4Y2alTur-w_nEdY_1Yq"
            )
            .auth.signOut();

        if (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
            logoutButton.disabled = false;
            return;
        }

        window.location.href = "login.html";
    });
});