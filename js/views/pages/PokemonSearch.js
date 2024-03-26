import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonSearch {
    async render() {
        let searchText = document.getElementById('searchInput');
        let pokemonSearch = await PokemonProvider.search(searchText.value);
        console.log(pokemonSearch);

        let view =  /*html*/`
            <h2>Résultats de la recherche contenant : ${ searchText.value}</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ pokemonSearch.length > 0 ? 
                    pokemonSearch.map(pokemon => 
                        /*html*/`
                        <div class="col">
                            <div class="card shadow-sm">
                                <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.nom}">
                                <div class="card-body">
                                    <p class="card-text">${pokemon.description ? pokemon.description.slice(0,100) : ''}...</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <a href="#/pokemons/${pokemon.id}" class="btn btn-sm btn-outline-secondary">Voir ${pokemon.nom}</a>
                                        </div>
                                        <small class="text-body-secondary">Numéro pokédex : ${pokemon.id}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    ).join('\n ') :
                    '<h6>Aucun pokémon trouvé !</h6>'
                }
            </div>
        `;
        return view;
    }
}
