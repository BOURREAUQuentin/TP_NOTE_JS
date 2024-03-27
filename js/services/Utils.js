const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function generateStars(rating) {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const emptyStars = totalStars - fullStars;

    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star star" data-value="' + (i + 1) + '"></i>'; // Ajout d'un attribut data-value
    }

    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star star" data-value="' + (fullStars + i + 1) + '"></i>'; // Ajout d'un attribut data-value
    }

    return starsHTML;
}

export default Utils;
export { generateStars };