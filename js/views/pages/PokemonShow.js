import Utils from '../../services/Utils.js';
import { generateStars } from '../../services/Utils.js';
import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonShow {
    constructor() {
        this.pokemon = null;
    }

    async render() {
        let request = Utils.parseRequestURL();
        this.pokemon = await PokemonProvider.getPokemon(request.id);
        let typesData = await PokemonProvider.fetchTypes();

        // Vérifier si le Pokémon est déjà en favoris
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let isFavorite = favorites.includes(this.pokemon.id);

        // Afficher le texte du bouton en fonction de l'état des favoris
        let buttonText = isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris';

        // Création d'une map (dictionnaire) des id de type avec leurs noms correspondants
        const typeMap = {};
        typesData.forEach(type => {
            typeMap[type.id] = type.nomType;
        });

        const typeNames = this.pokemon.types.map(typeId => typeMap[typeId]);
        const weaknessesNames = this.pokemon.faiblesses.map(typeId => typeMap[typeId]);
        const resistancesNames = this.pokemon.résistances.map(typeId => typeMap[typeId]);
        const noteStars = generateStars(this.pokemon.note);

        let view = /*html*/`
            <section class="section">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${this.pokemon.image}" class="card-img-top" alt="${this.pokemon.nom}">
                    </div>
                    <div class="col-md-6">
                        <h1> Numéro dans le pokédex : ${this.pokemon.id}</h1>
                        <h2> Nom : ${this.pokemon.nom} </h2>
                        <p> Description : ${this.pokemon.description} </p>
                        <h3>Statistiques de base</h3>
                        <div class="stats">
                            <div>PV : ${this.pokemon.stats_base.PV} <i class="fas fa-heart"></i></div>
                            <div>Attaque : ${this.pokemon.stats_base.Attaque} <i class="fas fa-fist-raised"></i></div>
                            <div>Défense : ${this.pokemon.stats_base.Défense} <i class="fas fa-shield-alt"></i></div>
                            <div>Vitesse : ${this.pokemon.stats_base.Vitesse} <i class="fas fa-running"></i></div>
                        </div>
                        <p> Types : ${typeNames.join(', ')} </p>
                        <p> Taille : ${this.pokemon.taille} </p>
                        <p> Poids : ${this.pokemon.poids} </p>
                        <p> Taux de capture : ${this.pokemon.taux_capture} </p>
                        <p> Faiblesses : ${weaknessesNames.join(', ')} </p>
                        <p> Résistances : ${resistancesNames.join(', ')} </p>
                        <p> Capacités spéciales : ${this.pokemon.capacités_spéciales.join(', ')} </p>
                        <p> Localisation : ${this.pokemon.localisation.join(', ')} </p>
                        <p> Cri : ${this.pokemon.cri} </p>
                        <div id="note">
                            ${noteStars}
                        </div>
                    </div>
                </div>
            </section>
            <a id="toggleFavoris" class="btn btn-sm btn-outline-secondary">${buttonText}</a>
            <a href="/" class="btn btn-sm btn-outline-secondary"><i class="fas fa-home"></i> Accueil</a>
            <a href="#/pokemons/page/1" class="btn btn-sm btn-outline-secondary"><i class="fas fa-paw"></i> Tous les pokémons</a>
        `;
        setTimeout(() => {
            this.handleStarClick(view);
        }, 0);
        return view;
    }

    handleStarClick() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const value = index + 1;
                PokemonProvider.changeRating(this.pokemon.id, value);
                location.reload();
            });
        });
        return view;
    }

    async toggleFavori(toggleFavoriteButton) {
        let request = Utils.parseRequestURL();
        let pokemonId = request.id;

        // récupère les favoris actuels depuis le stockage local
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // vérifie si le Pokémon est déjà en favori
        let index = favorites.indexOf(pokemonId);
        if (index !== -1) {
            // le pokémon est déjà en favori, donc le supprimer
            favorites.splice(index, 1);
        }
        else {
            // le pokémon n'est pas en favori, donc l'ajouter
            favorites.push(pokemonId);
        }

        // mise à jour des favoris dans le stockage local
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // mise à jour du libellé du bouton en fonction de l'état actuel des favoris
        toggleFavoriteButton.textContent = index !== -1 ? 'Ajouter en favoris' : 'Retirer des favoris';
    }
}
