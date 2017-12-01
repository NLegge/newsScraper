$(document).on("click", "#scrape", function() {
  // Run a GET request to scrape website
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).done(function () {

    $.getJSON("/articles", function (data) {
      // For each one
      for (let i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append(
          "<div class='list - group'></div><a href=" + data[i].URL + 
          "class='list - group - item list - group - item - action flex - column align - items - start'>" +
          "< div class= 'd-flex w-100 justify-content-between'><h5 class='mb-1'>" + data[i].Headline + 
          "</h5><small> 3 days ago</small></div><p class='mb-1'>" + data[i].Summary +
          "</p></a></div>");
      }
    });
  });
});