$(document).ready(function () {

    //Initialize Firebase
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

    //Add train on button click
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

        let newTrain = childSnapshot.val().trainName;
        let newLocation = childSnapshot.val().destination;
        let newFirstTrain = childSnapshot.val().firstTrain;
        let newFreq = childSnapshot.val().frequency;

        //Setting up the time
        let startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

        let currentTime = moment();

        let diffTime = moment().diff(moment(startTimeConverted), "minutes");

        let tRemainder = diffTime % newFreq;

        let tMinutesTillTrain = newFreq - tRemainder;

        let nextTrain = moment().add(tMinutesTillTrain, "minutes");

        let catchTrain = moment(nextTrain).format("HH:mm");

        // Display On Page
        $("#display").append(
            "<tr><td>" + newTrain +
            "</td><td>" + newLocation +
            "</td><td>" + newFreq +
            "</td><td>" + catchTrain +
            "</td><td>" + tMinutesTillTrain + "</td></tr>");

        // Clear input fields
        $("#trainName, #destination, #firstTrain, #interval").val("");
        return false;
    },
        //Handle the errors
        function (errorObject) {
        });

}); 
