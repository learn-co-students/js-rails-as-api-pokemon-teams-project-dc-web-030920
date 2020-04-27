const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM loaded');

    fetchTrainers();

});

function fetchTrainers(){

    fetch(TRAINERS_URL)
    .then((response) => {
       return response.json()
    })
    .then((trainersArray) => {
       return trainersArray.forEach(trainer => renderTrainers(trainer))
    })
}

function renderTrainers(trainer){
    const div = document.createElement('div')
    div.className = 'card'
    div.setAttribute('data-id', trainer.id )
    div.innerText = trainer.name
    const submitBtn = document.createElement('button')
    submitBtn.setAttribute('data-trainer-id', trainer.id )
    submitBtn.innerText = 'Add Pokemon'
    const ul = document.createElement('ul')       
                                        //need to pass in event "e" to be used in deletePokemon() 
                                                            //passing through ul from renderTrainers()
    submitBtn.addEventListener('click', (e) => addPokemon(e, ul))

        trainer.pokemons.forEach( (pokemon) => { 
            const li = document.createElement('li')
            const releaseBtn = document.createElement('button')
            releaseBtn.className = 'release'
            releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            ul.appendChild(li)
            li.append(releaseBtn)
            releaseBtn.addEventListener('click', deletePokemon)
        })

    div.appendChild(ul)
    const main = document.querySelector('main')
    main.appendChild(div)
    div.append(submitBtn)

}

function deletePokemon(e){
    e.preventDefault()
    const id = e.target.attributes[1].value
    fetch(`${POKEMONS_URL}/${id}`, {
        method: "DELETE"
    })
    e.target.parentNode.remove()
}
                    //passing through ul from renderTrainers()
function addPokemon(e, ul){
//want to add another pokem to the list. ONLY IF, they do not already have 6 pokemon
    e.preventDefault()
    if(e.target.parentNode.children[0].children.length  >= 6 === false) {
        let pokemonObj = { 
            trainer_id: parseInt(e.target.parentNode.children[1].attributes[0].value)
        }

        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(pokemonObj)
        })
        .then ((response) => { 
            return response.json()
        })
        .then((pokemon) => {            //passing through ul from renderTrainers()
           return renderPokemon(pokemon, ul)
        })
    }
    else { 
        return alert("Cannot add more, trainer has too many Pokemon")
    }
}
                            //passing through ul from renderTrainers()
function renderPokemon(pokemon, ul){
    
    const li = document.createElement('li')
    const releaseBtn = document.createElement('button')
    releaseBtn.className = 'release'
    releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    ul.appendChild(li)
    li.append(releaseBtn)
}


