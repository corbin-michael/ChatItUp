var app = angular.module("barstoolBets", ["firebase"]);

app.controller("signUpCtrl", function($scope, $firebaseArray) {
    $scope.signUpUser = function signUpUser() {
        var $email = $scope.email;
        var $firstName = $scope.firstName;
        var $lastName = $scope.lastName;
        var $userName = $scope.userName;
        var $password = $scope.password;

        firebase.auth().createUserWithEmailAndPassword($email, $password).then(function(user){
            database.ref('/users').child(user.uid).set({
                email       : $email,
                firstName   : $firstName,
                lastName    : $lastName,
                userName    : $userName,
                uid         : user.uid
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

        $scope.email = "";
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.userName = "";
        $scope.password = "";
    }
});

app.controller("friendsCtrl", function($scope, $firebaseArray) {
    var dbRef = database.ref().child('users');
    var compAllUsers = [];
    var compAllFriends = [];

    $scope.allUsers = $firebaseArray(dbRef);
    auth.onAuthStateChanged(function(user) {
        if ( user ) {
            $scope.currentDudeID = user.uid;
            $scope.useremail = user.email;
        } else {
            $scope.currentDudeID = null;
        }
    });

    $scope.addNewFriend = function(friendUID, friendFN, friendLN, friendE, friendU) {
        auth.onAuthStateChanged(function(user) {
            database.ref().child('users').child(user.uid).child('myFriends').push({
                friendID        : friendUID,
                friendFirstName : friendFN,
                friendLastName  : friendLN,
                friendEmail     : friendE,
                friendUserName  : friendU
            });
        });
    }

    auth.onAuthStateChanged(function(user) {
        var friendRef = database.ref().child('users').child(user.uid).child('myFriends');

        var arrayFriends = $firebaseArray(friendRef);
        var everyUser = $firebaseArray(dbRef);

        angular.forEach(arrayFriends, function(value1, key1) {
            angular.forEach(everyUser, function(value2, key2) {
                if ( value1.friendID != value2.uid ) {
                    console.log(value2.uid);
                } else {
                    console.log("hey");
                }
            });
        });
        // dbRef.once('value').then(function(snapshot){
        //     snapshot.forEach(function(data){
        //         compAllUsers.$add(data.key);
        //     });
        // });
        // friendRef.once('value').then(function(snapshot) {
        //     snapshot.forEach(function(data){
        //         compAllFriends.$add(data.val().friendID);
        //     });
        // });

        $scope.allFriends = arrayFriends;
        // $scope.everyUser = everyUser;

        $scope.deleteFriend = function(key) {
            arrayFriends.$remove(key);
        }
    });

});



// app.controller("createFriendGroup", function($scope, $firebaseArray) {
//     var dbRef = database.ref().child('/friendGroups');
//
//     $scope.createGroup = function() {
//         database.ref('friendGroups/').push({
//
//         });
//     }
// });

// app.controller("userInfoCtrl", function($scope, $firebaseObject) {
//     var file = $scope.profilePic;
//     console.log(file);
// });
