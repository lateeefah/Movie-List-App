const STORAGE_KEY = 'moviesApp.movies';
//load saved movies from localstorage; if none, start with []
let movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

console.log(movies)

// getting DOM nodes
// const movieInput = document.getElementById("movieInput");
const movieTitleInput = document.getElementById('movieTitle');
const movieYearInput = document.getElementById('movieYear')
const addMovieBtn = document.getElementById("addMovieBtn");
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");


// Add movie
addMovieBtn.addEventListener("click", () => {
  const movieName = movieInput.value.trim();
  if (!movieName) return;              //if search box is empty
    movies.push({ title: movieName }); //add movie
    movieInput.value = "";             //n then clear input box
    saveMovies();                   //itll be added despite refresh
    renderMovies();                 //show the movie searched 
    handleSearch(); 
    movieInput.focus();               //ux (css)
  });


// Render all movies
function renderMovies() {
  movieList.innerHTML = "";    // clears existing movie list
  movies.forEach((movie, index) => {
                    // create list
    const li = document.createElement("li"); 
    li.className = 'movie-item';

    // left: title + year
    const meta = document.createElement('div');
    meta.className = 'movie-meta';

                    // title span
    const titleSpan = document.createElement('span');
    titleSpan.className = 'movie.title';
    titleSpan.textContent = movie.title;

    meta.appendChild(titleSpan);

    //if...............

                   // delete btn
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';

                   //delete action
    delBtn.addEventListener('click', () => {
        movies.splice(index, 1);      //remove selected movie 
        saveMovies();                 // save changes made on movie
        renderMovies();          //re-render the list
        handleSearch();          // update curent search result 
    });

    // assemble everything
    li.appendChild(titleSpan);
    li.appendChild(delBtn);
    movieList.appendChild(li);    
  });
}

// Search movies
searchInput.addEventListener("input", () => {
  let query = searchInput.value.toLowerCase();
  let filtered = movies.filter(m => m.title.toLowerCase().includes(query));

  searchResults.innerHTML = "";
  filtered.forEach(movie => {
    let li = document.createElement("li");
    li.textContent = movie.title;
    searchResults.appendChild(li);
  });
});


function saveMovies() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    // convert movies array to string n save under the storage key
}

// add movie with enter key
movieInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addMovieBtn.click();
});

// search 
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim(); //info typed by user
    searchResults.innerHTML = '';  //clear old search results

    if (!query) return; //nth to show when query/search box is empty

    const filtered = movies.filter(m => m.title.toLowerCase().includes(query)); //checks if query matches with every movie available

    filtered.forEach(movie => {
        const li = document.createElement('li');

        li.textContent = movie.title; //create a list of possible result
        
        searchResults.appendChild(li); //add them to searchResults
    });
}

searchInput.addEventListener('input', handleSearch);//searches for matches

//initial render on page load
renderMovies();

