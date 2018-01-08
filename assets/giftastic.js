$(document).ready(function() {

  var topics = ["excited", "mad", "whatever"]


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
        for (var i = 0; i < response.data.length; i++) {
          var gifCard = $("<div class = 'card'>");
          // Storing the rating data
          var responseItem = response.data[i]
          var rating = responseItem.rating
          console.log("ratings", rating)
          // Creating an element to have the rating displayed
          var ratingText = $("<p>").text("Rating: " + rating)
          // Displaying the rating
          gifCard.append(ratingText)
          // Retrieving the URL for the image
          var imgURLStill = responseItem.images.fixed_height_still.url
          var imgURLAnimate = responseItem.images.fixed_height.url
          // console.log("images", imgURL)
          var image = $("<img>").addClass("gif card-img-top").attr({
            src: imgURLStill,
            still: imgURLStill,
            animate: imgURLAnimate,
            state: "still"
          })
          // Appending the image
          gifCard.append(image)
          // Putting the entire gif above the previous topics
          $(".gifsDisplay").prepend(gifCard)
          $(".gif").on("click", function() {
            var state = $(this).attr("state")
            if (state === "still") {
              $(this).attr("src", $(this).attr("animate"))
              $(this).attr("state", "animate")
              console.log("animate test")
            } else {
              $(this).attr("src", $(this).attr("still"))
              $(this).attr("state", "still")
              console.log("test if still is getting here")
            }
          })
        }
      })
  }

  // This function handles events where the add button is clicked
  $(".btn").on("click", function(event) {
    event.preventDefault()
    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim()
    // Adding topics from the textbox to our array
    topics.push(topic);
    // Calling renderButtons which handles the processing of topics array
    renderButtons()
  });

  // Adding a click event listener to all elements with a class of "emotionButtons"
  $(document).on("click", ".emotionButtons", displayGifs)

  renderButtons()

});
