import { ENDPOINT_POKEMONS, ENDPOINT_TYPES } from '../config.js'

export default class PokemonProvider {

    static fetchPokemons = async (limit = 10) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT_POKEMONS}?_limit=${limit}`, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting documents', err)
       }
    }

    static getPokemon = async (id) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT_POKEMONS}/` + id, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Error getting pokemon', err)
       }
    }

    static search = async (term) => {
        try {
            const allPokemons = await this.fetchPokemons();
    
            // filtre les pokémons en fonction de la chaîne de recherche
            const pokemonsSearch = allPokemons.filter(pokemon => {
                return pokemon.nom.toLowerCase().includes(term.toLowerCase());
            });
    
            return pokemonsSearch;
        } catch (err) {
            console.log('Error searching pokemons', err);
            return [];
        }
    }

    static fetchTypes = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT_TYPES}`, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting types', err);
        }
    }

    static getType = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT_TYPES}/` + id, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error getting type', err);
        }
    }

    static changeRating = async (id, rating) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note: rating })
        };
        try {
            const response = await fetch(`${ENDPOINT_POKEMONS}/` + id, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error updating rating', err);
        }
    }
    
    static filtre = async (idType) => {
        try {
            const allPokemons = await this.fetchPokemons();
            const type = await this.getType(idType);
    
            // Liste des id de pokémons correspondant au type spécifié
            const pokemonIds = type.listePokemonsType;
    
            // Convertir les id de pokémons en objets de pokémons complets
            const pokemonsFiltres = allPokemons.filter(pokemon => pokemonIds.includes(pokemon.id));
    
            return pokemonsFiltres;
        } catch (err) {
            console.log('Error filtering pokemons', err);
            return [];
        }
    }

    static changeRating = async (id, rating) => {
        const options = {
            method: 'PATCH', // maj partielle de la ressource
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note: rating })
        };
    
        console.log(JSON.stringify({ note: rating }));
        console.log(options);
    
        try {
            const response = await fetch(`${ENDPOINT_POKEMONS}/${id}`, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Error updating rating', err);
            throw err; // Propager l'erreur pour qu'elle soit gérée ailleurs si nécessaire
        }
    }
    
}