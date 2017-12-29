$(document).ready(function() {

  var topics = ["happy", "excited", "mad"]

  var apiKey = "c53joLLbg3ynFne2G75lRe2CvmdOFBuH"

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=" + apiKey + "&limit=10"

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
          var imgURL = response.data[0].images.fixed_height_still;
          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          // Appending the image
          gifImage.append(image);
          // Putting the entire movie above the previous movies
          $(".gifsDisplay").prepend(gifImage);
        }
      })
});
