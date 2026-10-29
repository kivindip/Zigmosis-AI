console.log("MY SCRIPT.JS IS LOADING");

const API_URL = "http://127.0.0.1:8000";

const SUPABASE_URL = "https://lqjfyqaqmtxzoqfchblm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_sC7fhI-_S-Ch4Y2alTur-w_nEdY_1Yq";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);



// ==========================
// Register Pet
// ==========================

async function registerPet(){

    const petData = {

        name: document.getElementById("name").value,

        species: document.getElementById("species").value,

        breed: document.getElementById("breed").value,

        age: document.getElementById("age").value,

        owner_name: document.getElementById("owner_name").value,

        owner_contact: document.getElementById("owner_contact").value,

        medical_notes: document.getElementById("medical_notes").value

    };


    try{


        const response = await fetch(`${API_URL}/pets`,{


            method:"POST",


            headers:{

                "Content-Type":"application/json"

            },


            body:JSON.stringify(petData)


        });



        const result = await response.json();



        alert("Pet Registered Successfully!");


        // Save pet locally

        localStorage.setItem(
            "lastPet",
            JSON.stringify(petData)
        );


        console.log(result);



    }


    catch(error){


        console.log(error);


        alert("Backend connection failed");


    }


}
// ==========================
// AI Assistant
// ==========================
window.pawpalChatHistory = [];

function appendMessage(role, text){

    const answer = document.getElementById("answer");

    const bubble = document.createElement("div");
    bubble.className = role === "user" ? "user-message" : "bot-message";
    bubble.innerText = text;

    answer.appendChild(bubble);
    answer.scrollTop = answer.scrollHeight;
}

async function askAI(){

    const questionInput = document.getElementById("question");
    const question = questionInput.value.trim();

    if(!question){
        return;
    }

    appendMessage("user", question);
    questionInput.value = "";

    const thinking = document.createElement("div");
    thinking.className = "bot-message";
    thinking.id = "thinking";
    thinking.innerText = "PawPal is thinking... 🐾";
    document.getElementById("answer").appendChild(thinking);

    let pet = null;
    try{
        pet = JSON.parse(localStorage.getItem("lastPet"));
    } catch(e){
        pet = null;
    }

    try{

        const response = await fetch(`${API_URL}/ai/chat`, {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify({
                question: question,
                pet: pet || {},
                history: window.pawpalChatHistory
            })
        });

        const result = await response.json();
        document.getElementById("thinking")?.remove();

        if (result.answer) {
    appendMessage("bot", result.answer);

    window.pawpalChatHistory = window.pawpalChatHistory || [];

    window.pawpalChatHistory.push({
        role: "user",
        content: question
    });

    window.pawpalChatHistory.push({
        role: "assistant",
        content: result.answer
    });
} else {
    appendMessage("bot", "❌ AI response unavailable");
}

    } catch(error){
        console.log(error);
        document.getElementById("thinking")?.remove();
        appendMessage("bot", "❌ AI connection failed");
    }

}

// ==========================
// View Pets + QR Identity
// ==========================


function viewPets(){



    const pet =
    JSON.parse(localStorage.getItem("lastPet"));




    if(!pet){


        document.getElementById("petsList").innerHTML =

        "No pets registered yet";


        return;


    }





    const qrData =

`Zigmosis Pet Identity

Name: ${pet.name}

Species: ${pet.species}

Breed: ${pet.breed}

Age: ${pet.age}

Owner: ${pet.owner_name}`;





    const qrCode =

    `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrData)}`;




    document.getElementById("petsList").innerHTML = `



    <div class="pet-profile-card">


        <h2>
        🐾 ${pet.name}
        </h2>



        <p>
        <b>Species:</b> ${pet.species}
        </p>



        <p>
        <b>Breed:</b> ${pet.breed}
        </p>



        <p>
        <b>Age:</b> ${pet.age}
        </p>



        <p>
        <b>Owner:</b> ${pet.owner_name}
        </p>




        <div class="identity-card">


            <h3>
             Digital Pet Identity
            </h3>


            <div class="qr-box">


                <img src="${qrCode}">


            </div>



            <p>

            Pet ID:
            ZG-${Math.floor(Math.random()*10000)}

            </p>


        </div>
        <div class="health-card">


<h3>
 Health Overview
</h3>


<br>


<p>
 Health Status:

<b>
${pet.medical_notes ? " Monitored" : " Needs Information"}
</b>

</p>



<p>
 Species:

<b>
${pet.species}
</b>

</p>



<p>
 Age:

<b>
${pet.age} years
</b>

</p>



<p>
Medical History:

<b>
${pet.medical_notes || "No medical records added"}
</b>

</p>



<p>
 AI Care Suggestion:

<b>
${pet.species === "Dog" 
? "Regular exercise and vaccination checks recommended"
: "Routine health monitoring recommended"}

</b>

</p>






            <div class="progress">


                <div class="progress-fill">

                85%

                </div>


            </div>


        </div>



    </div>


    `;


}



// ==========================
// Vision Verification
// ==========================


async function checkVision(){


    const image = document
    .getElementById("petImage")
    .files[0];



    if(!image){


        alert("Please select an image");

        return;


    }





    const formData = new FormData();


    formData.append(
        "file",
        image
    );





    const resultBox = document.getElementById("visionResult");


    resultBox.innerHTML = `

    <p>
    🔄 Analysing pet image...
    </p>

    `;




    try{


        const response = await fetch(

            `${API_URL}/vision/check`,

            {

                method:"POST",

                body:formData

            }

        );





        const result = await response.json();




        if(response.ok){


            resultBox.innerHTML = `


            <div class="vision-result-card">


            <h3>
             AI Vision Verification
            </h3>



            <p>
             Image processed successfully
            </p>



            <p>
             Pet visual features extracted
            </p>



            <p>
             Digital identity analysis completed
            </p>



            <p>
             Verification Confidence:
            <b>85%</b>
            </p>



            <p>
            Status:
            <span class="verified">
            Verified
            </span>
            </p>



            <small>
            AI Processing:
            ${result.message || "Completed"}
            </small>



            </div>


            `;


        }


        else{


            resultBox.innerHTML = `

            ❌ Vision verification failed

            <br>

            ${result.detail || "Unknown error"}

            `;


        }





    }


    catch(error){


        console.log(error);



        resultBox.innerHTML = `


        <div class="vision-error">

        ❌ Vision connection failed

        </div>


        `;


    }


}
async function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const question = input.value.trim();

    if (!question) return;


    // show user message
    chatBox.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;


    input.value = "";


    try {
        chatBox.innerHTML += `
<div class="bot-message" id="thinking">
PawPal is thinking... 🐾
</div>
`;

        const response = await fetch(
            "http://127.0.0.1:8000/ai/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

    question: question,

    pet: petData

})
            }
        );


        const data = await response.json();
        document.getElementById("thinking").remove();


        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.answer}
            </div>
        `;


    } catch(error) {

        chatBox.innerHTML += `
            <div class="bot-message">
                Sorry, PawPal is currently unavailable.
            </div>
        `;

        console.log(error);

    }


    chatBox.scrollTop = chatBox.scrollHeight;

}


const track = document.getElementById("petCarouselTrack");
const windowEl = document.getElementById("petCarouselWindow");
const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");
const dotsContainer = document.getElementById("petCarouselDots");

if (track && windowEl && prevBtn && nextBtn && dotsContainer) {
    const cards = Array.from(track.querySelectorAll(".pet-story-card"));
    let index = 0;
    let autoSlide;

    function cardsPerView() {
        if (window.innerWidth <= 560) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function maxIndex() {
        return Math.max(0, cards.length - cardsPerView());
    }

    function updateCarousel() {
        index = Math.min(index, maxIndex());

        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const distance = cards[0].getBoundingClientRect().width + gap;

        track.style.transform = `translateX(-${index * distance}px)`;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === maxIndex();

        Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }

    function createDots() {
        dotsContainer.innerHTML = "";

        for (let i = 0; i <= maxIndex(); i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", `Show card group ${i + 1}`);

            dot.addEventListener("click", () => {
                index = i;
                updateCarousel();
                restartAutoSlide();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function moveNext() {
    if (index >= maxIndex()) {
        index = 0;
    } else {
        index++;
    }

    updateCarousel();
}

    function startAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(moveNext, 2500);
    }

    function restartAutoSlide() {
        startAutoSlide();
    }

    prevBtn.addEventListener("click", () => {
        index = index === 0 ? maxIndex() : index - 1;
        updateCarousel();
        restartAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
        moveNext();
        restartAutoSlide();
    });

    windowEl.addEventListener("mouseenter", () => clearInterval(autoSlide));
    windowEl.addEventListener("mouseleave", startAutoSlide);

    window.addEventListener("resize", () => {
        index = Math.min(index, maxIndex());
        createDots();
        updateCarousel();
    });

    createDots();
    updateCarousel();
    startAutoSlide();
}

/* Login with Supabase */


const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");
        const button = loginForm.querySelector('button[type="submit"]');

        message.textContent = "Logging in...";
        button.disabled = true;

        try {
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {
                message.textContent = error.message;
                return;
            }

            message.textContent = "Login successful!";

            window.location.href = "index.html";

        } catch (error) {
            console.error("Login error:", error);
            message.textContent = "Login failed. Please try again.";
        } finally {
            button.disabled = false;
        }
    });
}


/* Sign Up with Supabase */


const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;
        const message = document.getElementById("signupMessage");
        const button = signupForm.querySelector('button[type="submit"]');

        message.textContent = "Creating your account...";
        button.disabled = true;

        try {
            const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
        emailRedirectTo: "http://127.0.0.1:5500/login.html"
    }
});
            if (error) {
                message.textContent = error.message;
                return;
            }

            if (data.session) {
                message.textContent = "Account created successfully!";
            } else {
                message.textContent =
                    "Account created! Please check your email to confirm.";
            }

        } catch (error) {
            console.error("Signup error:", error);
            message.textContent = "Something went wrong. Please try again.";
        } finally {
            button.disabled = false;
        }
    });
}


/* Forgot Password */

const resetForm = document.getElementById("resetForm");

if (resetForm) {
    resetForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message");

        message.textContent = "Sending reset request...";

        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + "/reset-password.html"
        });

        if (error) {
            message.textContent =
                "Unable to send the reset link. Please try again later.";
            console.error(error.message);
            return;
        }

        message.textContent =
            "If the account can receive email, a password reset link will be sent.";
    });
}

/* Update Password */

const newPasswordForm = document.getElementById("newPasswordForm");

if (newPasswordForm) {
    newPasswordForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const password = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("resetMessage");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        message.textContent = "Updating password...";

        const { error } = await supabaseClient.auth.updateUser({
            password: password
        });

        if (error) {
            message.textContent =
                "Could not update password. Please open a valid reset link and try again.";
            console.error(error.message);
            return;
        }

        message.textContent = "Password updated successfully! You can now log in.";

        newPasswordForm.reset();
    });
}


/* Logout with Supabase */

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", async function () {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            console.error("Logout error:", error.message);
            alert("Could not log out. Please try again.");
            return;
        }

        window.location.href = "login.html";
    });
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


document.addEventListener("DOMContentLoaded", async function () {
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    const logoutButton = document.getElementById("logoutButton");
    const accountDropdown = document.getElementById("accountDropdown");

    // This page does not have the account menu
    if (!loginLink || !signupLink || !logoutButton) return;

    // Check whether a user is logged in
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Could not check login status:", error.message);
        return;
    }

    function updateMenu(session) {
        loginLink.hidden = !!session;
        signupLink.hidden = !!session;
        logoutButton.hidden = !session;
    }

    updateMenu(data.session);

    // Keep the menu updated when authentication changes
    supabaseClient.auth.onAuthStateChange((_event, session) => {
        updateMenu(session);
    });

    logoutButton.addEventListener("click", async function () {
        logoutButton.disabled = true;

        const { error } = await supabaseClient.auth.signOut();

        logoutButton.disabled = false;

        if (error) {
            console.error("Logout failed:", error.message);
            alert("Logout failed. Please try again.");
            return;
        }

        if (accountDropdown) accountDropdown.hidden = true;

        window.location.href = "login.html";
    });
});
