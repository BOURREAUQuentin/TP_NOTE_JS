import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonFavoris {

    async render () {
        // Récupérer les favoris depuis le stockage local
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let pokemons = [];

        // Récupérer les détails de chaque pokémon favori
        for (let favoriteId of favorites) {
            let pokemon = await PokemonProvider.getPokemon(favoriteId);
            pokemons.push(pokemon);
        }

        let view =  /*html*/`
            <h2>Vos pokémons favoris</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ pokemons.map(pokemon => 
                    /*html*/`
                    <div class="col">
                    <div class="card shadow-sm">
                        <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.nom}">
                        <div class="card-body">
                            <p class="card-text">${pokemon.description ? pokemon.description.slice(0,120) : ''}...</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <a href="#/pokemons/${pokemon.id}" class="btn btn-sm btn-outline-secondary"><i class="fas fa-eye"></i> Voir ${pokemon.nom}</a>
                                </div>
                                <small class="text-body-secondary">Numéro pokédex : ${pokemon.id}</small>
                            </div>
                        </div>
                    </div>
                    </div>
                    `
                    ).join('\n ')
                }
            </div>
        `;

        return view;
    }
}
