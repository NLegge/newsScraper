$(document).on("click", "#scrape", function() {
  // Run a GET request to scrape website
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).done(function () {

    $.getJSON("/articles", function (data) {
      // For each one
      console.log(data);
      for (let i = 0; i < 20; i++) {
        // Display article data on the page
        $("#articles").append(
          "<div class='list-group'>" + 
            "<span class='list-group-item list-group-item-action flex-column align-items-start'>" +
              "<div class= 'd-flex w-100 justify-content-between'>" + 
                "<a href='" + data[i].URL + "'><h5 class='mb-1'>" + data[i].Headline + "</h5></a>" + 
                "<button type='button' class='btn btn-dark btn-sm' id='save'> Save </button>" +
              "</div>" + 
              "<p class='mb-1'>" + data[i].Summary + "</p>" + 
            "</span>" + 
          "</div>"
        );
      }
    });
  });
});

$(document).on("click", "#save", function() {
  $.ajax({
    method: "GET",
    url: "/markSaved/"
  }).done(function () {
    alert("Article Saved");
  });
});