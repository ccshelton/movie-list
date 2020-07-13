$(document).ready(function(){
  $('#search-submit').click(function() {
    let input = $('#search-input-title').val();
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
                  <li class="rating raing-imdb">${results.Ratings[0].Value} |</li>
                  <li class="rating raing-rotten">${results.Ratings[1].Value} | </li>
                  <li class="rating raing-metacritic">${results.Ratings[2].Value}</li>
              </ul>
              <p class="description">${results.Plot}</p>
              <a href="#">See more</a>
          </div>
          <div class="card-actions">
              <button class="add">Add to list</button>
          </div>
        </div>
      `
    );
}
