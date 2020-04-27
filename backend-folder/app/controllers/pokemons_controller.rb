class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all 
        render json: pokemons
    end

    def create
        pokemon = Pokemon.create!(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name, trainer_id: params['pokemon']['trainer_id'])
        render json: pokemon
    end
    
    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
    
    
end
