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
}