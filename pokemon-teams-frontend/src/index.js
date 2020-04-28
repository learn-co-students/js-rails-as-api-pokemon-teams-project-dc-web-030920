const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function () {


  fetchTrainers()
})

function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainerArray => {
      trainerArray.forEach(trainer => renderTrainer(trainer))
    })
}

function renderPokemon(pokemon,ulNode){

  let pokemonLi = document.createElement("li")
  pokemonLi.innerText = pokemon.nickname

  let releaseBtn = document.createElement('button')
  releaseBtn.classList.add("release")
  releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
  releaseBtn.innerText = "Release"
  pokemonLi.append(releaseBtn)
  ulNode.append(pokemonLi)
  releaseBtn.addEventListener("click", releasePoke)

}

function renderTrainer(trainer) {

  let container = document.createElement("div")
  container.classList.add("card")
  container.setAttribute('data-id', trainer.id)

  let main = document.querySelector("main")

  let name = document.createElement("p")
  name.innerText = trainer.name

  let btn = document.createElement("button")
  btn.setAttribute('data-trainer-id', trainer.id)
  btn.innerText = 'Add Pokemon!'
  btn.addEventListener("click", addPoke)



  let pokemonList = document.createElement('ul')

  trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, pokemonList)
  )

  main.append(container)
  container.append(name, btn, pokemonList)
}

function addPoke(event) {
  let trainer = event.target.getAttribute('data-trainer-id')

  let div = event.target.parentElement
  let ul = div.querySelector("ul")
  let numberPoke = div.querySelectorAll("li").length
  
    if (numberPoke < 6) {
      fetch(POKEMONS_URL,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          trainer_id: trainer
        }) 
      }).then(response => response.json())
      .then(newPokemon=>renderPokemon(newPokemon, ul)) 
    }
}

function releasePoke(event){
  let pokemonId = event.target.getAttribute('data-pokemon-id')
  let lilDelete = event.target.parentElement
  lilDelete.remove()
  
  fetch(`http://localhost:3000/pokemons/${pokemonId}`,{
  method: "DELETE",
})


}

