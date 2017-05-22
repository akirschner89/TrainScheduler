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
    // Don't refresh the page!
    event.preventDefault();

    var name = $("#employeeName").val().trim();
    var role = $("#role").val().trim();
    var date = $("#startDate").val().trim();
    var rate = $("#monthlyRate").val().trim();

    // Log our inputs to see if the app is working

    console.log(name);
    console.log(role);
    console.log(date);
    console.log(rate);
    console.log(moment(date).format("X"));

    var monthToDate = moment(date).


    //Diplays the input information on Firebase

    database.ref().push({

      rate: rate,
      date: date,
      role: role,
      name: name
    });

  });

  // Fetch our data from Firebase and display as html on app.

  database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().email);
      console.log(childSnapshot.val().age);
      console.log(childSnapshot.val().comment);
      console.log(childSnapshot.val().joinDate);

      // full list of items to the well
      $(".table").append("<tr class='table-row'><td id='name'> " + childSnapshot.val().name +
        " </td><td id='email'> " + childSnapshot.val().role +
        " </td><td id='age'> " + childSnapshot.val().date +
        " </td><td id='comment'> " + childSnapshot.val().rate + " </td></tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {    //   // Change the HTML to reflect
    //   $("#name-display").html(snapshot.val().name);
    //   $("#email-display").html(snapshot.val().email);
    //   $("#age-display").html(snapshot.val().age);
    //   $("#comment-display").html(snapshot.val().comment);
    // });