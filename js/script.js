const global = {
  currentPage: window.location.pathname,
};

const displayPopularMovies = async () => {
  // fetching popular movie prop endpoint
  const { results } = await fetchAPIData('movie/popular');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    // If movie has image, show it, else show default no image
    div.innerHTML = `
    <div>
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>`;

    document.querySelector('#popular-movies').appendChild(div);
  });
};

// Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_KEY = '38ca880edab85fd1b68b2391d7937ed0';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  return data;
};

// Highlight active link
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    // if the href is equal to the current page, add active class
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
};

// Init app
const init = () => {
  // Router funcs for vanilla JS
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('Shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
