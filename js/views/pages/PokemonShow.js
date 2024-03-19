import Utils        from '../../services/Utils.js'
import PokemonProvider from "./../../services/PokemonProvider.js";

export default class PokemonShow {
    async render () {
        let request = Utils.parseRequestURL()
        let pokemon = await PokemonProvider.getPokemon(request.id)
        
        return /*html*/`
            <section class="section">
                <h1> Numéro dans le pokédex : ${pokemon.numeroPokedex}</h1>
                <p> Nom : ${pokemon.nom} </p>
                <p> Description : ${pokemon.description} </p>
            </section>
            <p><a href="/">back to home</a></p>
            <p><a href="#/pokemons">back to all pokemons</a></p>
        `
    }
}

