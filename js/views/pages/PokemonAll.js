import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6; // Nombre de Pokémon par page
        this.totalPages = 0; // Nombre total de pages
        this.allPokemons = []; // Liste complète de tous les pokémons
    }

    async render() {
        // Récupérer tous les pokémons une seule fois lors du premier rendu
        if (this.allPokemons.length === 0) {
            this.allPokemons = await PokemonProvider.fetchPokemons();
            this.totalPages = Math.ceil(this.allPokemons.length / this.limit);
        }

        // Obtenir les pokémons de la page actuelle en fonction de la pagination
        const startIndex = (this.currentPage - 1) * this.limit;
        const endIndex = startIndex + this.limit;
        const pokemons = this.allPokemons.slice(startIndex, endIndex);

        // Gestion de l'affichage de la balise de page précédente
        let previousHref = `#/pokemons/page/${this.currentPage - 1}`;
        let previousLink = `<a href="${previousHref}">Page ${this.currentPage - 1}</a>`;
        // Si on est sur la 1ère page, on n'affiche pas la balise
        if (this.currentPage === 1) {
            previousLink = ``;
        }

        // Gestion de l'affichage de la balise de page suivante
        let nextHref = `#/pokemons/page/${this.currentPage + 1}`;
        let nextLink = `<a href="${nextHref}">Page ${this.currentPage + 1}</a>`;
        // Si on est sur la dernière page, on n'affiche pas la balise
        if (this.currentPage === this.totalPages) {
            nextLink = ``;
        }
    
        let view = /*html*/`
            <h2>Tous les pokémons</h2>
            <h6>Page ${this.currentPage} / ${this.totalPages}</h6>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ pokemons.map(pokemon => 
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
                ).join('\n ')}
            </div>
            <div class="pagination">
                ${previousLink}
                ${nextLink}
            </div>
        `;
        return view;
    }
}
