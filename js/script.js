$(document).ready(function(){
  $('#search-submit').click(function() {
    searchMovies();
  });

  $('#search-title').keypress(function() {
    if ( event.which == 13 ) {
      searchMovies();
    }
  });
});

function searchMovies() {
  let input = $('#search-title').val();
  let key = input.split(" ").join("+");
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
              <ul class="card-list">
                  <li class="rating"><span>imdb: ${results.Ratings[0].Value} </span> |</li>
                  <li class="rating"><span>rotten: ${results.Ratings[1].Value} </span> | </li>
                  <li class="rating"><span>meta: ${results.Ratings[2].Value}</span></li>
              </ul>
              <p class="description">${results.Plot}</p>              
              <ul class="card-list">
                <li>released: ${results.Year} | </li>
                <li>runtime: ${results.Runtime}</li>
              </ul>
              <div class="action-bar">
                <button class="button button-primary">Add to list</button>
                <a href="https://www.youtube.com/results?search_query=${results.Title.split(" ").join("+")}" target="_blank">
                  <button class="button button-secondary">Search Youtube</button>
                </a>
              </div>
          </div>
        </div>
      `
    );
}
