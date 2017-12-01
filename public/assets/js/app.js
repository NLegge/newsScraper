$(document).on("click", "#scrape", function() {
  // Run a GET request to scrape website
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).done(function () {
    // Log the response
    console.log("Scrape Complete");
    // Reload
    location.reload();
  });
});