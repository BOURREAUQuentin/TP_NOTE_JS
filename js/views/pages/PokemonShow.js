import Utils from '../../services/Utils.js';
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
        
        function generateStars(rating) {
            const totalStars = 5;
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 !== 0;
            const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);
        
            let starsHTML = '';
            
            for (let i = 0; i < fullStars; i++) {
                starsHTML += '<i class="fas fa-star"></i>';
            }
            
            if (halfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            
            for (let i = 0; i < emptyStars; i++) {
                starsHTML += '<i class="far fa-star"></i>';
            }
            
            return starsHTML;
        }
        const noteStars = generateStars(this.pokemon.note);

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
        
        return view;
    }
}
