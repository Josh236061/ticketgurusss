$(document).ready(function() {  //initializes .js <script>

    $("#sesarchBtn").on("click", function(){
        event.preventDefault();
        var city = $("#location").val().trim();
        var genre = $('select').val();

        inputQuery(city, genre);


    })

    function inputQuery (city, genre) {
        var ticketMasterAPI = "GzXQkPNDt7ZVTo3fbAmXPspPozArApCc";
        var page = 0; //page number, starts from 0
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city="+city+"&classificationName="+genre+"&size=10&page="+page+"&apikey="+ ticketMasterAPI;

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                //empty out previous query after each search event button press
                $(".results").empty();

                var resultsHeader= $("<h4>").attr("class", "results-header")
                resultsHeader.text("Events Happening:");
                $(".results").append(resultsHeader)
                $(".results").append($("<hr>"));

                //display event name on page
                for(var i = 0; i < 10; i++) {
                    var createButtons = $("<li>");
                    var createLine = $("<hr>");
                    var getName = response._embedded.events[i].name //use loop to place in placeholder as clickeable links
                    createButtons.addClass("resultsBtn");
                    createButtons.attr({"city": city, "keyword": getName}); //set the keyword to the query to pull specific event(s) information
                    createButtons.text(getName);
                    $(".results").append(createButtons,createLine);
                }

            })
    }




})