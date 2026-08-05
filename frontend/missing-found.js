// ===============================
// Load Missing & Found Pets
// ===============================


// Containers

const missingContainer =
document.getElementById("missingContainer");


const foundContainer =
document.getElementById("foundContainer");



// ===============================
// LOAD MISSING PETS
// ===============================

const missingPets =
JSON.parse(
localStorage.getItem("missingPets")
) || [];



missingPets.forEach(pet => {


missingContainer.innerHTML += `

<div class="pet-card">

<img src="images/${pet.image}">


<div class="pet-content">

<span class="badge missing">
Missing
</span>


<h3>
${pet.name}
</h3>


<p>
🐾 ${pet.breed}
</p>


<p>
Age: ${pet.age}
</p>


<p>
 ${pet.location}
</p>


<p>
 ${pet.date}
</p>

<div class="card-buttons">

<button 
class="view-btn"
onclick="viewPet(${pet.id},'missing')">

View Details

</button>


<button 
class="seen-btn"
onclick="seenPet(${pet.id},'missing')">

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
JSON.parse(
localStorage.getItem("foundPets")
) || [];



foundPets.forEach(pet => {


foundContainer.innerHTML += `


<div class="pet-card">


<img src="images/${pet.image}">


<div class="pet-content">


<span class="badge found">
Found
</span>



<h3>
Found Pet
</h3>



<p>
 ${pet.location}
</p>


<p>
 ${pet.date}
</p>


<p>
${pet.description}
</p>


<div class="card-buttons">

<button 
class="view-btn"
onclick="viewPet(${pet.id},'found')">

View Details

</button>


<button 
class="seen-btn"
onclick="seenPet(${pet.id},'found')">

I've Seen This Pet

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