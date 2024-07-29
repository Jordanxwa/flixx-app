const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
  },
  api: {
    apiKey: '38ca880edab85fd1b68b2391d7937ed0',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

// Display Movies
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
// Display Shows
const displayPopularShows = async () => {
  // fetching popular movie prop endpoint
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    // If movie has image, show it, else show default no image
    div.innerHTML = `
    <div>
          <a href="tv-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Date: ${show.first_air_date}</small>
            </p>
          </div>
        </div>`;

    document.querySelector('#popular-shows').appendChild(div);
  });
};

// Display Movie Details
const displayMovieDetails = async () => {
  const movieID = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieID}`);

  // Overlay for BG image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
          <div>
            <img
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date:${movie.release_date}</p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name} </span>`)
            .join(', ')}</div>
        </div>
      </div>
  `;
  document.querySelector('#movie-details').appendChild(div);
};

// Display Show Details
const displayShowDetails = async () => {
  const showID = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showID}`);

  // Overlay for BG image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
    <div class="details-top">
          <div>
            <img
             <a href="show-details.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
         </a>
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Last Episode To Air:</span> ${
              show.last_episode_to_air.name
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<span>${company.name} </span>`)
            .join(', ')}</div>
        </div>
      </div>
  `;
  document.querySelector('#show-details').appendChild(div);
};

// Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
};

// Make Request to search
const searchAPIData = async () => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
  );

  const data = await response.json();

  hideSpinner();

  return data;
};

// Display BG on Details page
const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.background = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.3';

  // Check Type
  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
};

// Display Slider Movies
const displaySlider = async () => {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" />
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
              1
            )} / 10
          </h4>
        `;
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
};

// Search Movies and Shows
const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page } = await searchAPIData();

    if (results.length === 0) {
      showAlert('No Results Found', 'error');
      return;
    }
    displaySearchResults(results);
    // clear search input
    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term', 'error');
  }
};

const displaySearchResults = (results) => {
  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    // If movie has image, show it, else show default no image
    div.innerHTML = `
    <div>
          <a href="${global.search.type}-details.html?id=${result.id}">
            ${
              result.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${
                global.search.type === 'movie' ? result.title : result.name
              }"
            />`
                : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${
                global.search.type === 'movie' ? result.title : result.name
              }"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === 'movie' ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === 'movie'
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
        </div>`;

    document.querySelector('#search-results').appendChild(div);
  });
};

// Swiper attributes
const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
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

const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

// Show alert
const showAlert = (msg, className) => {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(msg));
  document.querySelector('#alert').appendChild(alertEl);

  // Remove after 3 sec
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
};

const addCommasToNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Init app
const init = () => {
  // Router funcs for vanilla JS
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      displaySlider();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);
