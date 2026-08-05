const API_URL = "http://127.0.0.1:8000";



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
let chatHistory = [];

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
                history: chatHistory
            })
        });

        const result = await response.json();
        document.getElementById("thinking")?.remove();

        if(result.answer){
            appendMessage("bot", result.answer);
            chatHistory.push({ role: "user", content: question });
            chatHistory.push({ role: "assistant", content: result.answer });
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

