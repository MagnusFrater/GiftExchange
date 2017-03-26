window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			//window.location.href = "page/home.html";
		} else {
			
		}
	});
}

// signing up
function signup () {
	   var email = document.getElementById('su-email').value;
      var password = document.getElementById('su-password').value;
      var repassword = document.getElementById('su-repassword').value;

      if (password.valueOf() != repassword.valueOf()){
      	alert('Passwords don\'t match');
      	return;
      }

      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }

      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        var user = firebase.auth().currentUser;

        initUserData(user, email);

      }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });

      /*
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      */
}

function login () {

        var email = document.getElementById('lg-email').value;
        var password = document.getElementById('lg-password').value;

        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }

        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            // Success

            window.location.href = "page/home.html";
        }).catch(function(error) {
            // Error Handling

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('login').disabled = false;
            // [END_EXCLUDE]
        });
        
        /*
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('login').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      
      document.getElementById('login').disabled = true;
      */
}

// initialize user data on signup
function initUserData(user, email) {

    var data = {
        email:                email,
        username:             '%20',
        firstName:            '%20',
        lastName:             '%20',
        street:               '%20',
        city:                 '%20',
        stateProvinceRegion:  '%20',
        zip:                  '%20',
        profilePic:           '%20',
        ratingSum:            '0',
        ratingCount:          '0',
        state:                'incomplete-profile',
        interests:            '%20',
        friendo:              '%20'
    }

    var ref = firebase.database().ref().child("user");

    ref.child(user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
        console.log("Initialized user data.");

        window.location.href = "page/home.html";
    }, function(error) {
        console.log(error); 
    });
}