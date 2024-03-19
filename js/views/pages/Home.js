// Instantiate API
import PokemonProvider from "./../../services/PokemonProvider.js";

export default class Home {

    async render() {
        let pokemons = await PokemonProvider.fetchPokemons(3)
        let html = pokemons.map(pokemon =>
            /*html*/`
            <div class="col">
            <div class="card shadow-sm">
                <div class="card-body">
                    <p class="card-text">${pokemon.description ? pokemon.description.slice(0, 100) : ''}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <a href="#/pokemons/${pokemon.numeroPokedex}" class="btn btn-sm btn-outline-secondary">+ détail sur ${pokemon.nom}</a>
                        </div>
                        <small class="text-body-secondary">${pokemon.numeroPokedex}</small>
                    </div>
                </div>
            </div>
            </div>
            `
        ).join('\n ');
        
        return /*html*/`
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Articles example</h1>
                        <p class="lead text-body-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, aliquid voluptas sit aperiam quis architecto quaerat vel ratione placeat delectus repellendus cum animi sequi amet corporis minima ab, nisi at!</p>
                        <p>
                            <a href="" class="btn btn-primary my-2">Main call to action</a>
                            <a href="" class="btn btn-secondary my-2">Secondary action</a>
                        </p>
                    </div>
                </div>
            </section>
            <h2>Les 3 premiers articles</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${html}
            </div>
        `;
    }
}