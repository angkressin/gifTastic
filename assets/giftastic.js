$(document).ready(function() {

var topics = ["happy", "excited", "mad"]


// Function for displaying buttons
  function renderButtons() {
    // Deleting the topics prior to adding new emotions
    $(".buttonsDisplay").empty();
    for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");
    // Adding a class to button
    a.addClass("emotionButtons");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttonsDisplay div
    $(".buttonsDisplay").append(a);
    }
  }

  function displayGifs() {
  var topic = $(this).attr("data-name");
  var apiKey = "c53joLLbg3ynFne2G75lRe2CvmdOFBuH"
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=10"
  console.log(queryURL)
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
        console.log(response)
        for (var i = 0; i < 10; i++) {
          var gifImage = $("<div class='gif'>");
          // Storing the rating data
          var rating = response.data[i].rating;
          // Creating an element to have the rating displayed
          var ratingText = $("<p>").text("Rating: " + rating);
          // Displaying the rating
          gifImage.append(ratingText);
          // Retrieving the URL for the image
          var imgURL = response.data[i].images.fixed_height_still;
          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          // Appending the image
          gifImage.append(image);
          //gifImage = image.append(ratingText)
          // Putting the entire gif above the previous topics
          $(".gifsDisplay").prepend(gifImage);
        }
      })
}

// This function handles events where the add button is clicked
      $(".btn").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();
        // Adding topics from the textbox to our array
        topics.push(topic);
        // Calling renderButtons which handles the processing of topics array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "emotionButtons"
      $(document).on("click", ".emotionButtons", displayGifs);

renderButtons()

});
