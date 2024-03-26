import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonAll {
    constructor() {
        this.currentPage = 1;
        this.limit = 6; // Nombre de Pokémon par page
        this.totalPages = 0; // Nombre total de pages
        this.allPokemons = []; // Liste complète de tous les pokémons
        this.types = []; // Liste des types de pokémons
    }

    async render() {
        if (this.allPokemons.length === 0) {
            this.allPokemons = await PokemonProvider.fetchPokemons();
            this.totalPages = Math.ceil(this.allPokemons.length / this.limit);
        }

        // Récupération des types de pokémons une seule fois lors du premier rendu
        if (this.types.length === 0) {
            this.types = await PokemonProvider.fetchTypes();
        }

        // Récupération des pokémons de la page actuelle en fonction de la pagination
        const startIndex = (this.currentPage - 1) * this.limit;
        const endIndex = startIndex + this.limit;
        let pokemons = this.allPokemons.slice(startIndex, endIndex);

        // Génération des boutons de filtrage par type
        const typeButtons = this.types.map(type => {
            return `<a class="btn btn-sm btn-outline-secondary" style="text-decoration:none;" href="#/pokemons/filtre/${type.id}">${type.nomType}</a>`;
        });

        let view = /*html*/`
            <h2>Tous les pokémons</h2>
            <h6>Page ${this.currentPage} / ${this.totalPages}</h6>
            <div>
                ${typeButtons.join('\n')}
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${pokemons.map(pokemon => 
                    /*html*/`
                    <div class="col">
                        <div class="card shadow-sm">
                            <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.nom}">
                            <div class="card-body">
                                <h3>${pokemon.nom}</h3>
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
                ).join('\n ')}
            </div>
            <div class="pagination">
                ${this.renderPagination()}
            </div>
        `;
        return view;
    }

    renderPagination() {
        // Gestion de l'affichage de la balise de page précédente
        let previousHref = `#/pokemons/page/${this.currentPage - 1}`;
        let previousLink = `<a class="btn btn-sm btn-outline-secondary" href="${previousHref}"><i class="fas fa-chevron-left"></i> Page ${this.currentPage - 1}</a>`;
        // Si on est sur la 1ère page, on n'affiche pas la balise
        if (this.currentPage === 1) {
            previousLink = ``;
        }

        // Gestion de l'affichage de la balise de page suivante
        let nextHref = `#/pokemons/page/${this.currentPage + 1}`;
        let nextLink = `<a class="btn btn-sm btn-outline-secondary" href="${nextHref}">Page ${this.currentPage + 1} <i class="fas fa-chevron-right"></i></a>`;
        // Si on est sur la dernière page, on n'affiche pas la balise
        if (this.currentPage === this.totalPages) {
            nextLink = ``;
        }

        return `${previousLink} ${nextLink}`;
    }
}
