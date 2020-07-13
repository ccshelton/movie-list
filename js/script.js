$(document).ready(function(){
  $('#search-submit').click(function() {
    let input = $('#search-title').val();
    searchMovies(input);
  })
});

function searchMovies(input) {
  let key = input.split("+");
    $.ajax({
      url: 'http://www.omdbapi.com/?apikey=1852560f&t='+key,
        data: {
          format: 'json'
        },
        dataType: 'jsonp',
        success: function(data) {
          showSearchResults(data);
          console.log(data);
        },
        type: 'GET'
    });
}

function showSearchResults(results) {
    $("#search-results").html(
      `
        <div class="movie-card">
          <img src="${results.Poster}" class="poster">
          <div class="details">
              <p class="title">${results.Title}</p>
              <ul class="rating-list">
                  <li class="rating raing-imdb"><span>imdb: </span>${results.Ratings[0].Value} |</li>
                  <li class="rating raing-rotten"><span>rotten: </span>${results.Ratings[1].Value} | </li>
                  <li class="rating raing-metacritic"><span>meta: </span>${results.Ratings[2].Value}</li>
              </ul>
              <p class="description">${results.Plot}</p>
              <a href="#">See more</a>
          </div>
          <div class="card-actions">
            <button class="button button-secondary">Add to list</button>
          </div>
        </div>
      `
    );
}
