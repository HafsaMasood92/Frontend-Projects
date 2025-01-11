const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8eb3cab3f98de02dcb3c5be3ae76e4dc';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=8eb3cab3f98de02dcb3c5be3ae76e4dc';

const main = document.getElementById("section");
const search = document.getElementById("query");
const form = document.getElementById("form");

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            main.innerHTML = ''; // Clear previous content

            const movieGrid = document.createElement('div');
            movieGrid.setAttribute('class', 'movie-grid'); // Movie grid container

            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.src = IMG_PATH + element.poster_path;

                const title = document.createElement('h3');
                title.textContent = element.title;

                div_card.appendChild(image);
                div_card.appendChild(title);

                movieGrid.appendChild(div_card); // Append each card to the grid
            });

            main.appendChild(movieGrid); // Append the grid to the main container
        })
        .catch(error => console.error("Error fetching data:", error));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value.trim();
    if (searchItem) {
        returnMovies(SEARCHAPI + "&query=" + encodeURIComponent(searchItem));
        search.value = ""; // Clear search field
    }
});

// Call the function initially to load popular movies
returnMovies(APILINK);
