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
        let paginationLinks = '';
    
        // Ajout du lien vers la page précédente
        paginationLinks += `<li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                                <a class="page-link" href="#/pokemons/page/${this.currentPage - 1}" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>`;
    
        // Boucle pour chaque page disponible
        for (let page = 1; page <= this.totalPages; page++) {
            paginationLinks += `<li class="page-item ${this.currentPage === page ? 'active' : ''}">
                                    <a class="page-link" href="#/pokemons/page/${page}">${page}</a>
                                </li>`;
        }
    
        // Ajout du lien vers la page suivante
        paginationLinks += `<li class="page-item ${this.currentPage === this.totalPages ? 'disabled' : ''}">
                                <a class="page-link" href="#/pokemons/page/${this.currentPage + 1}" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>`;
    
        return `<nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        ${paginationLinks}
                    </ul>
                </nav>`;
    }
    
}
