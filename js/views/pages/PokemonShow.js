import Utils from '../../services/Utils.js';
import PokemonProvider from '../../services/PokemonProvider.js';

export default class PokemonShow {
    async render() {
        let request = Utils.parseRequestURL();
        let pokemon = await PokemonProvider.getPokemon(request.id);
        let typesData = await PokemonProvider.fetchTypes();

        // Vérifier si le Pokémon est déjà en favoris
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let isFavorite = favorites.includes(pokemon.id);

        // Afficher le texte du bouton en fonction de l'état des favoris
        let buttonText = isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris';

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
                <h2> Nom : ${pokemon.nom} </h2>
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
            <button id="toggleFavoris">${buttonText}</button>
            <p><a href="/">Retour à l'accueil</a></p>
            <p><a href="#/pokemons/page/1">Retour à tous les pokémons</a></p>
        `;

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
        } else {
            // le pokémon n'est pas en favori, donc l'ajouter
            favorites.push(pokemonId);
        }

        // mise à jour des favoris dans le stockage local
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // mise à jour du libellé du bouton en fonction de l'état actuel des favoris
        toggleFavoriteButton.textContent = index !== -1 ? 'Ajouter en favoris' : 'Retirer des favoris';
    }
}
