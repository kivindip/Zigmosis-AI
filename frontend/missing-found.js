
const SUPABASE_URL = "https://lqjfyqaqmtxzoqfchblm.supabase.co";
const SUPABASE_KEY = "sb_publishable_sC7fhI-_S-Ch4Y2alTur-w_nEdY_1Yq";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

let missingPets = [];
let foundPets = [];

const missingContainer = document.getElementById("missingContainer");
const foundContainer = document.getElementById("foundContainer");

// Safely display text from database records
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

// Convert Supabase records to the format used by the website
function convertPet(report) {
    return {
        id: report.id,
        type: report.report_type,
        name: report.pet_name || "Found Pet",
        image: report.image_url || "",
        breed: report.breed || "",
        age: report.age || "",
        gender: report.gender || "",
        colour: report.colour || "",
        location: report.location || "",
        date: report.report_date || "",
        description: report.description || "",
        ownerName: report.owner_name || "",
        finderName: report.finder_name || "",
        contact: report.contact || "",
        reward: report.reward || "",
        collar: report.collar || "",
        user_id: report.user_id,
        created_at: report.created_at
    };
}

// Load shared reports from Supabase
async function loadPets() {
    if (missingContainer) missingContainer.innerHTML = "<p>Loading missing pets...</p>";
    if (foundContainer) foundContainer.innerHTML = "<p>Loading found pets...</p>";

    const { data, error } = await supabaseClient
        .from("pet_reports")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Could not load pet reports:", error);

        if (missingContainer) {
            missingContainer.innerHTML =
                "<p>Could not load missing pet reports. Please try again later.</p>";
        }

        if (foundContainer) {
            foundContainer.innerHTML =
                "<p>Could not load found pet reports. Please try again later.</p>";
        }

        return;
    }

    const reports = (data || []).map(convertPet);

    missingPets = reports.filter(pet => pet.type === "Missing");
    foundPets = reports.filter(pet => pet.type === "Found");

    renderMissingPets();
    renderFoundPets();
    filterPets();
}

// Display missing pet cards
function renderMissingPets() {
    if (!missingContainer) return;

    missingContainer.innerHTML = "";

    missingPets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "pet-card";

        const image = pet.image
            ? `<img src="${escapeHTML(pet.image)}"
                    alt="${escapeHTML(pet.name)}"
                    class="pet-card-image"
                    onerror="this.style.display='none'">`
            : "";

        card.innerHTML = `
            ${image}
            <div class="pet-content">
                <span class="badge missing">Missing</span>
                <h3>${escapeHTML(pet.name || "Unknown Pet")}</h3>
                <p>🐾 ${escapeHTML(pet.breed)}</p>
                <p>Age: ${escapeHTML(pet.age)}</p>
                <p>${escapeHTML(pet.location)}</p>
                <p>${escapeHTML(pet.date)}</p>
                <p>Owner: ${escapeHTML(pet.ownerName || "Not provided")}</p>

                <div class="card-buttons">
                    <button class="view-btn" type="button">View Details</button>
                    <button class="seen-btn" type="button">I've Seen This Pet</button>
                </div>
            </div>
        `;

        const buttons = card.querySelectorAll("button");

        buttons[0].addEventListener("click", () => {
            viewPet(pet.id, "missing");
        });

        buttons[1].addEventListener("click", () => {
            if (typeof seenPet === "function") {
                seenPet(pet.id, "missing");
            }
        });

        missingContainer.appendChild(card);
    });
}

// Display found pet cards
function renderFoundPets() {
    if (!foundContainer) return;

    foundContainer.innerHTML = "";

    foundPets.forEach(pet => {
        const card = document.createElement("div");
        card.className = "pet-card";

        const image = pet.image
            ? `<img src="${escapeHTML(pet.image)}"
                    alt="${escapeHTML(pet.name)}"
                    class="pet-card-image"
                    onerror="this.style.display='none'">`
            : "";

        card.innerHTML = `
            ${image}
            <div class="pet-content">
                <span class="badge found">Found</span>
                <h3>${escapeHTML(pet.name || "Found Pet")}</h3>
                <p>${escapeHTML(pet.location)}</p>
                <p>${escapeHTML(pet.date)}</p>
                <p>Finder: ${escapeHTML(pet.finderName || "Not provided")}</p>
                <p>${escapeHTML(pet.description)}</p>

                <div class="card-buttons">
                    <button class="view-btn" type="button">View Details</button>
                    <button class="seen-btn" type="button">This Is My Pet</button>
                </div>
            </div>
        `;

        const buttons = card.querySelectorAll("button");

        buttons[0].addEventListener("click", () => {
            viewPet(pet.id, "found");
        });

        buttons[1].addEventListener("click", () => {
            if (typeof seenPet === "function") {
                seenPet(pet.id, "found");
            }
        });

        foundContainer.appendChild(card);
    });
}

// Open the selected report
function viewPet(id, type) {
    const pets = type === "missing" ? missingPets : foundPets;
    const selected = pets.find(pet => String(pet.id) === String(id));

    if (!selected) {
        alert("This pet report could not be found.");
        return;
    }

    localStorage.setItem("selectedPet", JSON.stringify(selected));
    window.location.href = "pet-details.html";
}

// Search, filter and sort the displayed cards
function filterPets() {
    const searchInput = document.getElementById("petSearch");
    const locationInput = document.getElementById("locationFilter");
    const breedInput = document.getElementById("breedFilter");
    const sortInput = document.getElementById("sortFilter");

    const searchText = searchInput?.value.trim().toLowerCase() || "";
    const location = locationInput?.value.toLowerCase() || "";
    const breed = breedInput?.value.toLowerCase() || "";
    const sortOrder = sortInput?.value || "all";

    let visibleCount = 0;

    [missingContainer, foundContainer].forEach(container => {
        if (!container) return;

        const cards = Array.from(container.querySelectorAll(".pet-card"));

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();

            const matches =
                (!searchText || text.includes(searchText)) &&
                (!location || text.includes(location)) &&
                (!breed || text.includes(breed));

            card.style.display = matches ? "" : "none";

            if (matches) visibleCount++;
        });

        if (sortOrder !== "all") {
            cards.sort((a, b) => {
                const petA = findPetForCard(a, container);
                const petB = findPetForCard(b, container);

                const dateA = petA?.created_at
                    ? new Date(petA.created_at).getTime()
                    : 0;

                const dateB = petB?.created_at
                    ? new Date(petB.created_at).getTime()
                    : 0;

                return sortOrder === "oldest"
                    ? dateA - dateB
                    : dateB - dateA;
            });

            cards.forEach(card => container.appendChild(card));
        }
    });

    let message = document.getElementById("noResults");

    if (!message) {
        message = document.createElement("p");
        message.id = "noResults";
        message.textContent = "No results found.";
        message.style.textAlign = "center";

        const searchSection = document.querySelector(".search-section");

        if (searchSection) {
            searchSection.insertAdjacentElement("afterend", message);
        }
    }

    message.style.display = visibleCount === 0 ? "block" : "none";
}

function findPetForCard(card, container) {
    const index = Array.from(container.querySelectorAll(".pet-card")).indexOf(card);
    const pets = container === missingContainer ? missingPets : foundPets;
    return pets[index];
}

// Account dropdown and page controls
document.addEventListener("DOMContentLoaded", async function () {
    const accountIcon = document.getElementById("accountIcon");
    const accountDropdown = document.getElementById("accountDropdown");

    if (accountIcon && accountDropdown) {
        accountIcon.addEventListener("click", function (event) {
            event.stopPropagation();
            accountDropdown.hidden = !accountDropdown.hidden;
            accountIcon.setAttribute("aria-expanded", String(!accountDropdown.hidden));
        });

        document.addEventListener("click", function () {
            accountDropdown.hidden = true;
            accountIcon.setAttribute("aria-expanded", "false");
        });

        accountDropdown.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    }

    const searchButton = document.getElementById("searchButton");
    const petSearch = document.getElementById("petSearch");

    searchButton?.addEventListener("click", filterPets);

    petSearch?.addEventListener("keydown", function (event) {
        if (event.key === "Enter") filterPets();
    });

    ["locationFilter", "breedFilter", "sortFilter"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", filterPets);
    });

    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        const { data, error } = await supabaseClient.auth.getSession();

        if (error) {
            console.error("Session check failed:", error);
        } else if (data.session) {
            logoutButton.hidden = false;

            logoutButton.addEventListener("click", async function (event) {
                event.preventDefault();
                logoutButton.disabled = true;

                const { error: logoutError } =
                    await supabaseClient.auth.signOut();

                if (logoutError) {
                    console.error("Logout failed:", logoutError);
                    alert("Logout failed. Please try again.");
                    logoutButton.disabled = false;
                    return;
                }

                window.location.href = "login.html";
            });
        }
    }
});

loadPets();
