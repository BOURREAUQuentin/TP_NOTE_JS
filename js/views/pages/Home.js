// Instantiate API
import PokemonProvider from "./../../services/PokemonProvider.js";

export default class Home {

    async render() {
        let pokemons = await PokemonProvider.fetchPokemons(3)
        let html = pokemons.map(pokemon =>
            /*html*/`
            <div class="col">
            <div class="card shadow-sm">
                <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.nom}">
                <div class="card-body">
                    <p class="card-text">${pokemon.description ? pokemon.description.slice(0, 100) : ''}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <a href="#/pokemons/${pokemon.id}" class="btn btn-sm btn-outline-secondary">+ détails sur ${pokemon.nom}</a>
                        </div>
                        <small class="text-body-secondary">Numéro pokédex : ${pokemon.id}</small>
                    </div>
                </div>
            </div>
            </div>
            `
        ).join('\n ');
        
        return /*html*/`
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Bienvenue sur le site Poképedia</h1>
                        <p class="lead text-body-secondary">Poképedia est une encyclopédie en ligne complète dédiée à l'univers des Pokémon. Notre site offre une multitude de ressources et d'informations pour les fans de tous âges et de tous niveaux d'expérience. Que vous soyez un joueur passionné, un collectionneur de cartes Pokémon, un fan de l'anime ou simplement curieux de découvrir cet univers captivant, Poképedia est l'endroit idéal pour explorer et en apprendre davantage sur vos créatures préférées.</p>
                    </div>
                </div>
            </section>
            <h2>Les 3 premiers pokémons</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${html}
            </div>
        `;
    }
}