// Initialize Firebase
var config = {
    apiKey: "AIzaSyCjXEfRKkocpCqdO3Amtj92_at3MGPGY_Y",
    authDomain: "chatitup-a4f8b.firebaseapp.com",
    databaseURL: "https://chatitup-a4f8b.firebaseio.com",
    storageBucket: "chatitup-a4f8b.appspot.com",
};
firebase.initializeApp(config);

// get a refrence to the database
const database = firebase.database();
