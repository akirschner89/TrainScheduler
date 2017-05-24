      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBVKX7L-BINh-MfVd3a3EMouJLMEltW4X4",
        authDomain: "trainscheduler-1f129.firebaseapp.com",
        databaseURL: "https://trainscheduler-1f129.firebaseio.com",
        projectId: "trainscheduler-1f129",
        storageBucket: "trainscheduler-1f129.appspot.com",
        messagingSenderId: "891505634929"
      };
      firebase.initializeApp(config);   // Initialize Firebase

  // Create a variable to reference the database
  var database = firebase.database();


  // Capture submission info



  $("#submit").on("click", function() {
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    // Log our inputs to see if the app is working

    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    // console.log(moment("firstTrain", "hmm").format("HH:mm"));
    database.ref().push({

      name: name,
      destination: destination,
      arrival: firstTrain,
      frequency_min: frequency,
      
    });

  });

  // Fetch our data from Firebase and display as html on app.
  database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().arrival);
      console.log(childSnapshot.val().frequency_min);

      var trainTime = moment(childSnapshot.val().arrival,"HH:mma");
      var currentTime = moment();
      // var currentTimeFormatted = currentTime.format("HH:mma");
      var minDiff = trainTime.diff(currentTime, "minutes");

      console.log(trainTime.format("HH:mma"));
      console.log(currentTime.format("HH:mma"));
      // console.log(trainTime.diff(currentTime, "minutes"));
      console.log(minDiff);

// to compensate for negative minutes - get the same time in the next 24 hours to display
      if (minDiff < 0) {
        minDiff = minDiff + 1440;
        console.log(minDiff);
      };



      // full list of items to the table
      $(".table").append("<tr class='table-row'><td class='name'> " + childSnapshot.val().name +
        " </td><td class='destination'> " + childSnapshot.val().destination +
        " </td><td class='frequency'> " + childSnapshot.val().frequency_min +
        " </td><td class='arrival'> " + childSnapshot.val().arrival + 
        " </td><td class='minutes'> " + minDiff + "</td></tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



  // TODO

  // can update minutes displayed by using setInterval for every 60 seconds = update the HTML with my function to find the difference between arrival value in fyrebase vs current time

// can add update buttons and remove buttons - each with their own on."click" functions - update should also push to fyrebase