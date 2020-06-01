$(document).ready(function(){
    $.ajax({
        url: 'https://spreadsheets.google.com/feeds/cells/1I7-SxitCQz6tp9bFHPinoUEasiWCeI3v226WBdM_gCI/1/public/full?alt=json',
        data: {
            format: 'json'
        },
        dataType: 'jsonp',
        success: function(data) {
            let list = $('#movie-list');
            let arr = data.feed.entry;
            $.each(arr, function(index, value) {
                if (value.title.$t.charAt(0) == 'A') {
                    list.append(
                        '<p class="movie-list-item">'+arr[index].gs$cell.$t+'</p>'
                    );
                }
            });
        },
        type: 'GET'
    });

    $("#movie-list").on("click", ".movie-list-item", function() {
        addToSelected(this.textContent);
    });

    $("#selected-list").on("click", ".selected-movie", function() {
        $(this).remove();
    });

    $("#rand-select").click(function() {
        selectRandMovie();
    });

});

function addToSelected(movie) {
    let elements = document.getElementById('selected-list').children;
    if (elements.length < 4 ) {
        $('#selected-list').append(
            '<p class="selected-movie">'+movie+'</p>'
        );
    }
}

function selectRandMovie() {
    let elements = document.getElementById('selected-list').children;
    let outcome = Math.round(Math.random());
    if (elements.length > 2) {
        alert('You must eliminate your options down to 2');
    } else if (elements.length < 2 ) {
        alert('You must select 2 movies to randomly select from')
    } else {
        alert(elements.item(outcome).textContent);
    }
}
