$(function () {
  // Function to save the schedule data to localStorage
  function saveSchedule() {
    var scheduleData = {};
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var userInput = $(this).find(".description").val();
      scheduleData[timeBlockId] = userInput;
    });
    localStorage.setItem("schedule", JSON.stringify(scheduleData));
  }

  // Add a listener for click events on the save button
  $(document).on("click", ".saveBtn", function() {
    saveSchedule();
  });

  // Function to load the schedule data from localStorage
  function loadSchedule() {
    var scheduleData = JSON.parse(localStorage.getItem("schedule"));

    if (scheduleData) {
      $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedInput = scheduleData[timeBlockId];
        $(this).find(".description").val(savedInput);
      });
    }
  }

  // Apply the past, present, or future class to each time block
  var currentHour = dayjs().format("H");
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Call the loadSchedule function when the page is loaded
  loadSchedule();

  // Display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});