$(document).ready(function () {

    let config = {
    apiKey: "AIzaSyCpJ9Hdlfy7jAsrEgxcvWRvOhJsdPj4pyk",
    authDomain: "train-79fd1.firebaseapp.com",
    databaseURL: "https://train-79fd1.firebaseio.com",
    projectId: "train-79fd1",
    storageBucket: "",
    messagingSenderId: "397422251253"
    };
    firebase.initializeApp(config);

    let database = firebase.database();

    $("#addTrain").on("click", function (event) {
        event.preventDefault();

        let trainName = $("#trainName").val().trim();
        let destination = $("#destination").val().trim();
        let firstTrain = $("#firstTrain").val().trim();
        let freq = $("#interval").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: freq
        });
    });

    database.ref().on("child_added", function (childSnapshot) {

        var newTrain = childSnapshot.val().trainName;
        var newLocation = childSnapshot.val().destination;
        var newFirstTrain = childSnapshot.val().firstTrain;
        var newFreq = childSnapshot.val().frequency;
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");
    
        // Current Time
        var currentTime = moment();
    
        // Difference between the times
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    
        // Time apart (remainder)
        var tRemainder = diffTime % newFreq;
    
        // Minute(s) Until Train
        var tMinutesTillTrain = newFreq - tRemainder;
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("HH:mm");
    
        // Display On Page
        $("#display").append(
          ' <tr><td>' + newTrain +
          ' </td><td>' + newLocation +
          ' </td><td>' + newFreq +
          ' </td><td>' + catchTrain +
          ' </td><td>' + tMinutesTillTrain + ' </td></tr>');
    
        // Clear input fields
        $("#trainName, #destination, #firstTrain, #interval").val("");
        return false;
      },
        //Handle the errors
        function (errorObject) {
        });
    
    }); //end document ready

