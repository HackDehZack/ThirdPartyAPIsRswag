$(function () {
  // Add a listener for click events on the save button
  $(document).on("click", ".saveBtn", function() {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });


  // Apply the past, present, or future class to each time block
  var currentHour = dayjs().format("H");
  $(".time-block").each(function() {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

   // Get user input from local storage and set the values
   $(".time-block").each(function() {
    var timeBlockId = $(this).attr("id");
    var savedInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(savedInput);
  });






  

  // TODO: Add code to display the current date in the header of the page.
});
