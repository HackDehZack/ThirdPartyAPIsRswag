$(function () {
  // Store schedule data for multiple days in an object
  var scheduleData = {};

  // Function to save the schedule data to localStorage
  function saveSchedule() {
    localStorage.setItem("schedule", JSON.stringify(scheduleData));
  }
//remember ID's
  // Add a listener for click events on the save button
  $(document).on("click", ".saveBtn", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    scheduleData[timeBlockId] = userInput;
    saveSchedule();
  });

  // Function to load the schedule data from localStorage
  function loadSchedule() {
    var savedSchedule = JSON.parse(localStorage.getItem("schedule"));
    scheduleData = savedSchedule || {};
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      $(this).find(".description").val(scheduleData[timeBlockId]);
    });
  }

  // Apply the past, present, or future class to each time block
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
      $(this).toggleClass("past", timeBlockHour < currentHour);
      $(this).toggleClass("present", timeBlockHour === currentHour);
      $(this).toggleClass("future", timeBlockHour > currentHour);
    });
  }

  // Call the loadSchedule and updateTimeBlocks functions when the page is loaded
  loadSchedule();
  updateTimeBlocks();

  // Display the current date in the header of the page
  function updateCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }
  updateCurrentDate();

  // Function to navigate to the next day
  function goToNextDay() {
    var nextDay = dayjs().add(1, 'day');
    scheduleData = {};
    $(".time-block").find(".description").val("");
    updateCurrentDate();
    updateTimeBlocks();
  }

  // Add a click event listener to the next day button
  $(document).on("click", "#nextDayBtn", function () {
    goToNextDay();
  });
});
