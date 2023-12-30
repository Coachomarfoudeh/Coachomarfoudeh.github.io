let exercisesData; // Store exercises data globally

// Define the searchExercise function before using it
function searchExercise(input) {
  const exerciseDetails = $("#exerciseDetails");
  exerciseDetails.html("");

  const filteredExercises = exercisesData.filter((exercise) =>
    exercise.name.toLowerCase() === input.toLowerCase()
  );

  if (filteredExercises.length > 0) {
    filteredExercises.forEach((exercise) => {
      const exerciseDiv = $("<div>").addClass("exercise");

      $("<h2>").text(exercise.name).appendTo(exerciseDiv);
      $("<p>").text(exercise.description).appendTo(exerciseDiv);

      const exerciseVideo = $("<iframe>").attr({
        src: exercise.video,
        width: "560",
        height: "315",
        title: "Exercise Video",
        allowfullscreen: true,
      });
      exerciseVideo.appendTo(exerciseDiv);

      exerciseDiv.appendTo(exerciseDetails);
    });
  } else {
    exerciseDetails.html("<p>No exercises found.</p>");
  }
}

$(document).ready(function () {
  // Load exercises data from JSON file
  $.getJSON("exercises.json", function (data) {
    exercisesData = data.exercises;

    $("#exerciseInput").autocomplete({
      source: exercisesData.map((exercise) => exercise.name),
      minLength: 2,
      select: function (event, ui) {
        searchExercise(ui.item.value);
      },
    });

    // Event listener for pressing Enter key
    $("#exerciseInput").on("keypress", function (event) {
      if (event.keyCode === 13) {
        searchExercise($(this).val());
      }
    });
  });

  // Event listener for the search button
  $("button").on("click", function () {
    const userInput = $("#exerciseInput").val();
    searchExercise(userInput);
  });
});
