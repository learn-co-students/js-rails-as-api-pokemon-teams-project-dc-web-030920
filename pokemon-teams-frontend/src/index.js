const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
    fetchTrainers()

})

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => data.forEach(trainer => {
        renderTrainer(trainer)
    }))
}

function renderTrainer(trainer){
    //targets main section of html
    
    let mainPage = document.querySelector("main")
    
    //creates trainer div/card  
    let trainerElement = document.createElement("div")
    trainerElement.className = "card"


    //adds trainer name in P tag 
    let p = document.createElement("p")
    p.innerText = trainer.name 

    //create add pokemon button 
    let addPokemon = document.createElement("button")
    addPokemon.innerText = "Add Pokemon"
    addPokemon.addEventListener("click", addNewPokemon)

    //creates list
    let ul = document.createElement("ul")
    trainerElement.id = trainer.id
    addPokemon.id = trainer.id
    

    
    trainerElement.append(p, addPokemon, ul)
    mainPage.append(trainerElement)
    
    trainer.pokemons.forEach(pokemon => {
        renderPokemon(pokemon)
    })
    
}


function renderPokemon(pokemon) {
    console.log("Yep, hit it")
    let div = document.getElementById(pokemon.trainer_id)
    let ul = div.querySelector("ul")
    let count = ul.getElementsByTagName("li").length
   
    let li = document.createElement('li')
    let releaseBtn = document.createElement("button")
    releaseBtn.innerText = "Release"

    releaseBtn.setAttribute('pokemon-id', pokemon.id )
    releaseBtn.addEventListener("click", removePokemon)
    li.innerText = pokemon.nickname
    
    li.appendChild(releaseBtn) 
    ul.append(li)
    
    
}

function addNewPokemon(event){
    let trainerId = parseInt(event.target.id)
    let data = {
        trainer_id: trainerId
    }

    console.log("Yep, hit it")
    let div = document.getElementById(trainerId)
    let ul = div.querySelector("ul")
    let count = ul.getElementsByTagName("li").length


    
    //fetch new random pokemon

    if (count < 7){
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
      .then(pokemon => {
    console.log("successfully create a new pokemon", pokemon)
    renderPokemon(pokemon)
  })
 }else{
     alert("noo")
 }

}

function removePokemon(event){
    let pokemonId = parseInt(event.target.getAttribute("pokemon-id"))

    let data = {
        id: parseInt(event.target.getAttribute("pokemon-id"))
    }
    //fetch new random pokemon
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    let li = event.target.parentElement
    li.remove()
    
}
    
