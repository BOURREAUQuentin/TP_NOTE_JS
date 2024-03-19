import Utils from '../../services/Utils.js';
import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonShow {
    async render() {
        let request = Utils.parseRequestURL();
        let pokemon = await PokemonProvider.getPokemon(request.id);
        let typesData = await PokemonProvider.fetchTypes();
        
        // Création d'une map (dictionnaire) des id de type avec leurs noms correspondants
        const typeMap = {};
        typesData.forEach(type => {
            typeMap[type.id] = type.nomType;
        });
        
        // Conversion des id de types en noms de types pour les types du Pokémon
        const typeNames = pokemon.types.map(typeId => typeMap[typeId]);
        
        // Conversion des id de types en noms de types pour les faiblesses du Pokémon
        const weaknessesNames = pokemon.faiblesses.map(typeId => typeMap[typeId]);
        
        // Conversion des id de types en noms de types pour les résistances du Pokémon
        const resistancesNames = pokemon.résistances.map(typeId => typeMap[typeId]);
        
        let view = /*html*/`
            <section class="section">
                <h1> Numéro dans le pokédex : ${pokemon.id}</h1>
                <p> Nom : ${pokemon.nom} </p>
                <p> Description : ${pokemon.description} </p>
                <p> Types : ${typeNames.join(', ')} </p>
                <p> Taille : ${pokemon.taille} </p>
                <p> Poids : ${pokemon.poids} </p>
                <p> Taux de capture : ${pokemon.taux_capture} </p>
                <p> Faiblesses : ${weaknessesNames.join(', ')} </p>
                <p> Résistances : ${resistancesNames.join(', ')} </p>
                <p> Capacités spéciales : ${pokemon.capacités_spéciales.join(', ')} </p>
                <p> Localisation : ${pokemon.localisation.join(', ')} </p>
                <p> Cri : ${pokemon.cri} </p>
            </section>
            <p><a href="/">Retour à l'accueil</a></p>
            <p><a href="#/pokemons">Retour à tous les pokémons</a></p>
        `;
        
        return view;
    }
}
