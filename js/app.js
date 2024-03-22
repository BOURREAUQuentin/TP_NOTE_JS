import Home from './views/pages/Home.js';
import PokemonAll from './views/pages/PokemonAll.js';
import PokemonShow from './views/pages/PokemonShow.js';
import PokemonFavoris from './views/pages/PokemonFavoris.js';
import PokemonSearch from './views/pages/PokemonSearch.js';
import About from './views/pages/About.js';
import Error404 from './views/pages/Error404.js';

import Utils from './services/Utils.js';

// Liste des routes autorisées
const routes = {
    '/'                     : Home
    , '/about'              : About
    , '/pokemons/page/:id'           : PokemonAll
    , '/pokemons/:id'       : PokemonShow
    , '/favoris'       : PokemonFavoris
    , '/search'       : PokemonSearch
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const content = null || document.querySelector('#content');

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = request.resource === 'pokemons' && request.id === 'page' ? '/pokemons/page/:id' : (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404

    if (page instanceof PokemonAll){
        page.currentPage = parseInt(request.verb); // on charge la currentPage de l'url de la page actuelle
    }

    console.log(parsedURL);
    console.log(page);
    console.log(request);

    content.innerHTML = await page.render();

    if (page instanceof PokemonShow) {
        const toggleFavorisButton = document.getElementById('toggleFavoris');
        toggleFavorisButton.addEventListener('click', () => page.toggleFavori(toggleFavorisButton));
    }

    if (page instanceof PokemonSearch) {
        // ajoute un evenement pour voir si le bouton Rechercher est de nouveau cliqué donc il faut recharger la nouvelle page
        let searchLink = document.querySelector('a[href="#/search"]');
        if (searchLink) {
            searchLink.addEventListener('click', () => window.location.reload());
        }
    }
}

// Fonction pour aller à la page précédente
function previousPage() {
    const currentPage = parseInt(Utils.parseRequestURL().id);
    if (currentPage > 1) {
        window.location.hash = `#/pokemons/page/${currentPage - 1}`;
    }
}

// Fonction pour aller à la page suivante
function nextPage() {
    const currentPage = parseInt(Utils.parseRequestURL().id);
    window.location.hash = `#/pokemons/page/${currentPage + 1}`;
}

// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);