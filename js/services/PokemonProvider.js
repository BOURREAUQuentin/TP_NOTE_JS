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
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT_POKEMONS}?q=${term}`, options);
            const json = await response.json();
            return json;
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
}