import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonSearch {
    async render() {
        let searchText = document.getElementById('searchInput');
        console.log(searchText.textContent);
        let results = await PokemonProvider.search(searchText.textContent);
        let view =  /*html*/`
            <h2>Résultats de la recherche contenant : ${ searchText.textContent}</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ results.map(pokemon => 
                    /*html*/`
                    <div class="col">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <p class="card-text">${pokemon.description ? pokemon.description.slice(0,100) : ''}</p>
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
                    ).join('\n ')
                }
            </div>
        `
        return view
    }
}
