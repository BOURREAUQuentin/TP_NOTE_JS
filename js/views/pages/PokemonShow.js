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
        
        const typeMap = {};
        typesData.forEach(type => {
            typeMap[type.id] = type.nomType;
        });

        const typeNames = this.pokemon.types.map(typeId => typeMap[typeId]);
        const weaknessesNames = this.pokemon.faiblesses.map(typeId => typeMap[typeId]);
        const resistancesNames = this.pokemon.résistances.map(typeId => typeMap[typeId]);
        
        const noteStars = generateStars(this.pokemon.note); // Utiliser la note de l'objet plutôt que this.pokemon.note

        let view = /*html*/`
            <section class="section">
                <h1> Numéro dans le pokédex : ${this.pokemon.id}</h1>
                <h2> Nom : ${this.pokemon.nom} </h2>
                <p> Description : ${this.pokemon.description} </p>
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
            </section>
            <p><a href="/">Retour à l'accueil</a></p>
            <p><a href="#/pokemons">Retour à tous les pokémons</a></p>
        `;

    setTimeout(() => {
        this.handleStarClick();
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
    }
}
