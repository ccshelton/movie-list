$(document).ready(function(){
  $('#search-submit').click(function() {
    let input = $('#search-title').val();
    searchMovies(input);
  });

  $('#assign-movie').click(function() {
    let movie = $("#movie-result").data("movie");
    let bracket_pos = 'bracket'+$("#bracket-select").val();
    
    localStorage.setItem(bracket_pos, movie);
    
  })
});

function searchMovies(input) {
  let key = input.split("+");
    $.ajax({
      url: 'https://www.omdbapi.com/?apikey=1852560f&t='+key,
        data: {
          format: 'json'
        },
        dataType: 'jsonp',
        success: function(data) {
          showSearchResults(data);
        },
        type: 'GET'
    });
}

function showSearchResults(results) {
    $("#search-results").html(
      `
        <div class="movie-card" id="movie-result" data-movie="${results.Title}">
          <img src="${results.Poster}" class="poster">
          <div class="details">
              <p class="title">${results.Title}</p>
              <ul class="rating-list">
                  <li class="rating raing-imdb"><span>imdb: </span>${results.Ratings[0].Value} |</li>
                  <li class="rating raing-rotten"><span>rotten: </span>${results.Ratings[1].Value} | </li>
                  <li class="rating raing-metacritic"><span>meta: </span>${results.Ratings[2].Value}</li>
              </ul>
              <p class="description">${results.Plot}</p>
          </div>
        </div>
      `
    );
}
