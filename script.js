// JavaScript for the Movie Recommendation App

// Event listener for form submission
document.getElementById('preferences-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get user preferences from form inputs
    var genre = document.getElementById('genre-select').value;
    var rating = document.getElementById('rating-select').value;
  
    // Fetch movie recommendations based on user preferences
    fetchRecommendations(genre, rating);
  });
  
  // Function to fetch movie recommendations
  function fetchRecommendations(genre, rating) {
    // API Endpoint for movie recommendations
    var apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=f40bd3fd2213331f1f00b0fcc2a1de79&sort_by=popularity.desc&with_genres=${genre}&vote_average.gte=${rating}`;
  
    // Make an API request to fetch movie recommendations
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Process the fetched movie data and generate recommendations
        displayRecommendations(data.results);
      })
      .catch(function(error) {
        console.log('Error fetching movie recommendations:', error);
      });
  }
  
  // Function to display movie recommendations on the webpage
  function displayRecommendations(movies) {
    var recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.innerHTML = ''; // Clear previous recommendations
  
    // Generate movie cards for each recommendation
    movies.forEach(function(movie) {
      var movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
  
      var img = document.createElement('img');
      img.src = 'https://image.tmdb.org/t/p/w200' + movie.poster_path; // Get the movie poster image URL
      img.alt = movie.title;
  
      var title = document.createElement('h3');
      title.textContent = movie.title;
  
      var rating = document.createElement('p');
      rating.textContent = 'Rating: ' + movie.vote_average;
  
      movieCard.appendChild(img);
      movieCard.appendChild(title);
      movieCard.appendChild(rating);
  
      recommendationsContainer.appendChild(movieCard);
    });
  }
  
  