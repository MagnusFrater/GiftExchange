var globalUser = null;

window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {

			globalUser = user;

			var ref = firebase.database().ref().child("user");
			ref.on('value', function(snapshot) {
				// cycle through each 'user'
    			snapshot.forEach(function(childSnapshot) {

    				// get each 'user's data
      				var childData = childSnapshot.val();

      				// if this is the corrct user, put data where it belongs in the profile area
      				if (user.email.valueOf() == childData.email.valueOf()) {
      					document.getElementById('pic').src = (childData.friendo.profilePic.valueOf() == "%20")? "../resources/profile pics/silhouette.jpg" : childData.friendo.profilePic;
      				}

      				console.log("Profile info pulled.");
    			});
			});

		} else {
			// if not logged in, go to index.html
			window.location.href = "../index.html";
		}
	});
}

function rateFriendo () {
	resetFriendo();
	updateState("profile-complete");
	//window.location.href = "home.html";
}

// updates currently logged in user's state
function updateState (state) {
	var data = {
		state: 	state
	}

	var ref = firebase.database().ref().child("user");

    ref.child(globalUser.uid).update(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
        console.log("Updated user state.");
    }, function(error) {
        console.log(error); 
    });
}

// resets 'friendo' database variable of current logged in user
function resetFriendo () {
	var data = {
		friendo: 	"%20"
	}

	var ref = firebase.database().ref().child("user");

	console.log(globalUser);

    ref.child(globalUser.uid).update(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
        
    }, function(error) {
        console.log(error); 
    });
}