window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			window.location.href = "page/home.html";
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
}