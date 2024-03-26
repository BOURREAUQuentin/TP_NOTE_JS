import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonFiltre {
    constructor() {
        this.idFiltre = 0;
    }

    async render() {
        let pokemonFiltres = await PokemonProvider.filtre(this.idFiltre);
        console.log(pokemonFiltres);
        let filtre = await PokemonProvider.getType(this.idFiltre);

        let view =  /*html*/`
            <h2>Résultats de la recherche avec le filtre : ${filtre.nomType}</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ pokemonFiltres.length > 0 ? 
                    pokemonFiltres.map(pokemon => 
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
                    ).join('\n ') :
                    '<h6>Aucun pokémon trouvé !</h6>'
                }
            </div>
            <p><a href="/">Retour à l'accueil</a></p>
            <p><a href="#/pokemons/page/1">Retour à tous les pokémons</a></p>
        `;
        return view;
    }
}