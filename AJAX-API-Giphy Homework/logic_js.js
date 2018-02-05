//script for giphy
$(document).ready(function() {
    console.log("ready!");


    //create array of superheros set to topics -homework instructions
    var topics = ["Black Widow", "Wonder Woman", "Black Panther", "Thor", "Iron Man"];
    console.log(topics);
    //function that displays data from array on buttons
    function displayButtons() {
        //clearing button view prior to creating any new buttons
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            //creating a button on html storing in variable Button
            var Button = $("<button>");
            //adding id of action to button
            Button.addClass("hero");
            //adding styling to the button 
            Button.addClass("btn btn-primary");
            //adding attribute data
            Button.attr("data-name", topics[i]);
            //adding the text of the hero and appending to button
            Button.text(topics[i]);
            $("#buttons-view").append(Button);
            console.log("Button");
        }

    }
    displayButtons();
    // empty gif 
    //$("#buttons-view").empty();


    //use document.onclick to listen for click events on the hero class defined in function
    $(document).on("click", ".hero", function(event) {
            event.preventDefault();
            var hero = $(this).attr("data-name");
            renderGifs(hero);

        })
        //function for creating text in submit form button
    $("#addName").on("click", function(event) {
        event.preventDefault();
        var newName = $("#name-input").val().trim();
        //adding the newName to the topics array
        topics.push(newName);
        displayButtons();
    })

    // Constructing a URL to search Giphy for the name of the hero/topic in the array
    function renderGifs(hero) {
        $("#gifs-appear-here").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            hero + "&api_key=htLcL8PbrOd2kX2p4mdCy8knOWUciK2Y&limit=10";
        console.log(queryURL);
        console.log(hero);
        //Performing our AJAX GET request
        //for giphy api
        $.ajax({
            url: queryURL,
            method: "GET"
        })


        // After the data comes back from the API
        .done(function(response) {

            //check in console
            console.log(response);

            // Storing an array of api results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div with the class "item" & boostrap columns to use bootstrap grid:
                    var gif = $("<div class='item col-lg-3 col-md-3 col-sm-4 col-xs-12'>");
                    // Storing the result item's rating
                    var rating = $("<p>").text("Rating: " + results[i].rating);
                    results[i].rating;
                    // pulling rating of gif
                    //var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    //gif.append(gif);
                    // Creating an image tag
                    var hero = $("<img src=\"" + results[i].images.original_still.url + "\">");
                    // Appending the superhero we created to the "gif" div we created
                    gif.append(hero);
                    gif.append(rating);
                    // Prepending the gif to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gif);

                }
            }
        })
    }
});
//function to click on image and play animated gif
// $('img').on("click", function() {
//         function pausePlayGifs() {
//             var state = $(this).attr("data-state");
//             if (state === "still") {
//                 $(this).attr("src", $(this).attr("data-animate"));
//                 $(this).attr("data-state", "animate");
//             } else {
//                 $(this).attr("src", $(this).attr("data-still"));
//                 $(this).attr("data-state", "still");
//             }
//         }
//     }

//     }
// })