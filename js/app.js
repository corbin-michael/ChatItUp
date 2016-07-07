var app = angular.module("barstoolBets", ["firebase"]);

app.controller("signUpCtrl", function($scope, $firebaseArray) {
    $scope.signUpUser = function signUpUser() {
        var $email = $scope.email;
        var $password = $scope.password;

        firebase.auth().createUserWithEmailAndPassword($email, $password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });

        $scope.email = "";
        $scope.password = "";
    }
});

app.controller("blogPosts", function($scope, $firebaseArray) {
    var dbRef = database.ref().child('/blogEntries');

    $scope.blogEntries = $firebaseArray(dbRef);

    // submit a blog entry
    $scope.submitPost = function() {
        var timeStamp = new Date();

        database.ref('blogEntries/').push({
            post    : $scope.blogPost,
            time    : timeStamp.getTime()
        });

        $scope.blogPost = "";
    }
});

app.controller("userInfoCtrl", function($scope, $firebaseArray) {
    var storageRef = storage.ref();
    var file = $scope.profilePic;
    var firstName = $scope.firstName;
    var lastName = $scope.lastName;


    $scope.uploadUserInfo = function() {
        storageRef.child("userInfo/" + file).put(file);
    }
});
