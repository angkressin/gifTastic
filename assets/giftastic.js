$(document).ready(function() {

  var topics = ["excited", "mad", "whatever"]

  $('.btn-success').tooltip({
    trigger: 'click',
  });

  function setTooltip(btn, message) {
    $(btn).tooltip('enable')
      .attr('data-original-title', message)
      .tooltip('show')
      .tooltip('disable')
  }

  function hideTooltip(btn) {
    setTimeout(function() {
      $(btn).tooltip('hide')
    }, 1000)
  }

  var clipboard = new Clipboard('.btn-success')
  // checks if items have been copied
  clipboard.on('success', function(e) {
    console.info('Action:', e.action)
    console.info('Text:', e.text)
    console.info('Trigger:', e.trigger)
    setTooltip(e.trigger, 'Copied!');
    hideTooltip(e.trigger);
    e.clearSelection()
  })
  clipboard.on('error', function(e) {
    console.error('Action:', e.action)
    console.error('Trigger:', e.trigger)
    setTooltip(e.trigger, 'Failed!');
    hideTooltip(e.trigger);
  })

  // Function for displaying buttons
  function renderButtons() {
    // Deleting the topics prior to adding new emotions
    $(".buttonsDisplay").empty()
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>")
      // Adding a class to button
      a.addClass("emotionButtons")
      // Adding a data-attribute
      a.attr("data-name", topics[i])
      // Providing the initial button text
      a.text(topics[i])
      // Adding the button to the buttonsDisplay div
      $(".buttonsDisplay").append(a)
    }
    $(".clearButton").addClass("btn btn-primary btn-sm")
    $(".clearButton").text("Clear GIFs")
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
          var responseItem = response.data[i]
          var gifCard = $("<div>").addClass("card mb-2 mr-3")
          // Retrieving the URL for the image
          var src, imgURLStill
          src = imgURLStill = responseItem.images.fixed_height_still.url
          var imgURLAnimate = responseItem.images.fixed_height.url
          // console.log("images", imgURL)
          var image = $("<img>").addClass("gif card-img-top").attr({
            src: src,
            still: imgURLStill,
            animate: imgURLAnimate,
            state: "still"
          })
          var embedURL = responseItem.url
          // Appending the image
          gifCard.append(image)
          // Storing the rating data
          var rating = responseItem.rating
          console.log("ratings", rating)
          // creating a div for the card
          var cardBody = $("<div>").addClass("card-body")
          // append to gifCard
          gifCard.append(cardBody)
          // Creating an element to have the rating displayed
          var ratingText = $("<div>").text("Rating: " + rating).addClass("card-title")
          // Displaying the rating
          cardBody.append(ratingText)
          var embedButton = $("<button>")
          var buttonText = $("<p>")
          buttonText.append("Copy Gif ")
          var linkIcon = $("<span>").addClass("fa fa-link")
          buttonText.append(linkIcon)
          embedButton.append(buttonText)
          embedButton.addClass("btn-success")
          embedButton.attr("data-clipboard-text", embedURL)
          // Display the embed button
          cardBody.append(embedButton)
          // Putting the entire gif above the previous topics
          $(".gifsDisplay").prepend(gifCard)
        }
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
      })
  }

  // This function handles events where the add button is clicked
  $(".btn-outline-success").on("click", function(event) {
    event.preventDefault()
    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim()
    // Adding topics from the textbox to our array
    if (topic == "") {
      alert("please enter an emotion")
    } else {
      topics.push(topic)
      // Calling renderButtons which handles the processing of topics array
      renderButtons()
    }
  });

  // function handles events where the undo button is clicked
  $(".btn-outline-danger").on("click", function(event) {
    event.preventDefault()
    // remove recently added topic
    if (topics.length > 3) {
      topics.pop()
    }
    renderButtons()
  })

  //function handles clearing all the gifs
  $(".clearButton").on("click", function() {
    $(".gifsDisplay").empty()
  })

  // Adding a click event listener to all elements with a class of "emotionButtons"
  $(document).on("click", ".emotionButtons", displayGifs)

  renderButtons()

});
