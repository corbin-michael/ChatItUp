var app = angular.module("barstoolBets", ["firebase"]);

app.controller("signUpCtrl", function($scope, $firebaseArray) {
    $scope.signUpUser = function signUpUser() {
        var $email = $scope.email;
        var $firstName = $scope.firstName;
        var $lastName = $scope.lastName;
        var $userName = $scope.userName;
        var $password = $scope.password;

        firebase.auth().createUserWithEmailAndPassword($email, $password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

        database.ref('/users').set({
            userInfo : {
                email : $email,
                firstName : $firstName,
                lastName  : $lastName,
                userName  : $userName,
                uid       : null
            }
        })

        $scope.email = "";
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.userName = "";
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

app.controller("addFriend", function($scope, $firebaseArray) {
    var dbRef = database.ref().child('/users');
    $scope.allUsers = $firebaseArray(dbRef);

    $scope.addNewFriend = function() {
        database.ref('myFriends').push({

        });
    }
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

auth.onAuthStateChanged(function(user) {
  if (user) {
    var dbUserRef = database.ref().child('/users/' + user.uid);
    var uidRef = user.uid;

    dbUserRef.set({
        userInfo : {
            uid : uidRef
        }
    });

    console.log(uidRef);
  } else {
    // No user is signed in.
    $('#welcome').html('Welcome, please sign in.');
  }
});
