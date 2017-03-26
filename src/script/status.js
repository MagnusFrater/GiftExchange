var globalUser = null;
var globalFriendo = null;

window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {

			globalUser = user;
			checkIfMatched(user);
			injectFirstModal(user);

			var ref = firebase.database().ref().child("user");
			ref.on('value', function(snapshot) {
				// cycle through each 'user'
    			snapshot.forEach(function(childSnapshot) {

    				// get each 'user's data
      				var childData = childSnapshot.val();

      				// if this is the corrct user, put data where it belongs in the profile area
      				if (user.email.valueOf() == childData.email.valueOf()) {
      					// save friendo's username
      					globalFriendo = childData.friendo;
      					updateFriendoInfo(childData.friendo);
      					injectSecondModal(childData.friendo);

      					// color check marks according to 'user' state
      					// change action button around depending on 'user' state
      					document.getElementById('status-1').innerHTML = ((childData.username.valueOf() == "%20")? '\'Username\'' : childData.username) + ": " + childData.state;

      					if (childData.state.valueOf() == "incomplete-profile") {
      						document.getElementById('x-1').style.color = "red";
      						document.getElementById('check1-1').style.color = "black";
      						document.getElementById('check2-1').style.color = "black";
      						document.getElementById('check3-1').style.color = "black";

      						document.getElementById('actionButton').innerHTML = "Finish your profile!";
      						document.getElementById('actionButton').disabled = true;
      					}

      					if (childData.state.valueOf() == "profile-complete") {
      						document.getElementById('x-1').style.color = "red";
      						document.getElementById('check1-1').style.color = "black";
      						document.getElementById('check2-1').style.color = "black";
      						document.getElementById('check3-1').style.color = "black";

      						document.getElementById('actionButton').innerHTML = "Look for friendo!";
      						document.getElementById('actionButton').disabled = false;
      					}

      					if (childData.state.valueOf() == "looking") {
      						document.getElementById('x-1').style.color = "red";
      						document.getElementById('check1-1').style.color = "black";
      						document.getElementById('check2-1').style.color = "black";
      						document.getElementById('check3-1').style.color = "black";

      						document.getElementById('actionButton').innerHTML = "Waiting for match...";
      						document.getElementById('actionButton').disabled = false;
      					}

      					if (childData.state.valueOf() == "matched") {
      						document.getElementById('x-1').style.color = "black";
      						document.getElementById('check1-1').style.color = "green";
      						document.getElementById('check2-1').style.color = "black";
      						document.getElementById('check3-1').style.color = "black";

      						document.getElementById('actionButton').innerHTML = "I sent my gift!";
      						document.getElementById('actionButton').disabled = false;
      					}

      					if (childData.state.valueOf() == "gift-sent") {
      						document.getElementById('x-1').style.color = "black";
      						document.getElementById('check1-1').style.color = "black";
      						document.getElementById('check2-1').style.color = "green";
      						document.getElementById('check3-1').style.color = "black";

      						document.getElementById('actionButton').innerHTML = "I received my gift!";
      						document.getElementById('actionButton').disabled = false;
      					}

      					if (childData.state.valueOf() == "gift-received") {
      						document.getElementById('x-1').style.color = "black";
      						document.getElementById('check1-1').style.color = "black";
      						document.getElementById('check2-1').style.color = "black";
      						document.getElementById('check3-1').style.color = "green";

      						document.getElementById('actionButton').innerHTML = "I'm ready to rate my friendo!";
      						document.getElementById('actionButton').disabled = false;
      					}

      					// set 'user's profile pic
      					document.getElementById('pic1').src = (childData.profilePic.valueOf() == "%20")? "../resources/profile pics/silhouette.jpg" : childData.profilePic;
      				}

      				console.log("Profile info pulled.");
    			});
			});

			updateFriendoInfo();

		} else {
			// if not logged in, go to index.html
			window.location.href = "../index.html";
		}
	});
}

// handles all 'actionButton' actions
// ie. matching friendo, gift sending, gift receiving, going to rate friendo, etc
function doAction () {
	var actionText = document.getElementById('actionButton').innerHTML;

	// handles readying you up for matching with a friendo
	if (actionText.valueOf() == "Look for friendo!") {
		findMatch();
	}

	// handles when you sent your gift
	if (actionText.valueOf() == "I sent my gift!") {
		updateState("gift-sent");
	}

	// handles when you received your gift
	if (actionText.valueOf() == "I received my gift!") {
		updateState("gift-received");
	}

	// handles when both parties received their gifts, and are ready to rate their friendo
	if (actionText.valueOf() == "I'm ready to rate my friendo!") {
		updateState("rate-friendo");

		window.location.href = "rating.html";
	}
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

// update 'friendo' database variable of current logged in user
function updateFriendo (friendo) {
	globalFriendo = friendo;

	var data = {
		friendo: 	friendo
	}

	var ref = firebase.database().ref().child("user");

    ref.child(globalUser.uid).update(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
        console.log("Updated user state.");

        if (document.getElementById('actionButton').innerHTML == "Waiting for match...") {
        	updateState("matched");
        }

        updateFriendoInfo(friendo);
    }, function(error) {
        console.log(error); 
    });
}

// once a friendo is found, put that shit (info) somewhere (someplace)
function updateFriendoInfo (friendo) {
	//console.log(friendo);

	if (friendo != null && friendo != "%20") {
		// put friendo's username below it's track
		document.getElementById('status-2').innerHTML = friendo.username;

		// get other friendo info
		var ref = firebase.database().ref().child("user");
		ref.on('value', function(snapshot) {
			// cycle through each 'user'
			snapshot.forEach(function(childSnapshot) {
				//console.log(childSnapshot);

				// get each 'user's data
					var childData = childSnapshot.val();

					// if this is the corrct user, put data where it belongs in the profile area
					if (friendo.email.valueOf() == childData.email.valueOf()) {



						document.getElementById('status-2').innerHTML = childData.username + ": " + childData.state;

      					if (childData.state.valueOf() == "incomplete-profile") {
      						document.getElementById('x-2').style.color = "red";
      						document.getElementById('check1-2').style.color = "black";
      						document.getElementById('check2-2').style.color = "black";
      						document.getElementById('check3-2').style.color = "black";
      					}

      					if (childData.state.valueOf() == "profile-complete") {
      						document.getElementById('x-2').style.color = "red";
      						document.getElementById('check1-2').style.color = "black";
      						document.getElementById('check2-2').style.color = "black";
      						document.getElementById('check3-2').style.color = "black";
      					}

      					if (childData.state.valueOf() == "looking") {
      						document.getElementById('x-2').style.color = "red";
      						document.getElementById('check1-2').style.color = "black";
      						document.getElementById('check2-2').style.color = "black";
      						document.getElementById('check3-2').style.color = "black";
      					}

      					if (childData.state.valueOf() == "matched") {
      						document.getElementById('x-2').style.color = "black";
      						document.getElementById('check1-2').style.color = "green";
      						document.getElementById('check2-2').style.color = "black";
      						document.getElementById('check3-2').style.color = "black";
      					}

      					if (childData.state.valueOf() == "gift-sent") {
      						document.getElementById('x-2').style.color = "black";
      						document.getElementById('check1-2').style.color = "black";
      						document.getElementById('check2-2').style.color = "green";
      						document.getElementById('check3-2').style.color = "black";
      					}

      					if (childData.state.valueOf() == "gift-received") {
      						document.getElementById('x-2').style.color = "black";
      						document.getElementById('check1-2').style.color = "black";
      						document.getElementById('check2-2').style.color = "black";
      						document.getElementById('check3-2').style.color = "green";
      					}

						document.getElementById('pic2').src = (childData.profilePic.valueOf() == "%20")? "../resources/profile pics/silhouette.jpg" : childData.profilePic;
					}

					console.log("Friendo profile info pulled.");
			});
		});
	}
}

// function for 'home page' button, sends you to home page
function toHome () {
	window.location.href = "home.html";
}

// looks through database for first user that is in the state 'looking', then matches them together
function searchForUnmatchedUser () {
	// search for unmatched user - user with the state 'looking'
    var ref = firebase.database().ref().child("user");
	ref.on('value', function(snapshot) {
		// cycle through each 'user'
		snapshot.forEach(function(childSnapshot) {

			// get each 'user's data
				var childData = childSnapshot.val();

				// if this is the corrct user, put data where it belongs in the profile area
				if (childData.email.valueOf() != globalUser.email.valueOf() &&
				 	childData.state.valueOf() == "looking") {

					var data = {
						username: childData.username,
						email: childData.email,
						state: childData.state,
						profilePic: childData.profilePic,
						interests: childData.interests,
						street: childData.street,
						city: childData.city,
						stateProvinceRegion: childData.stateProvinceRegion,
						zip: childData.zip
					}

					updateFriendo(data);
				}

				console.log("Profile info pulled.");
		});
	});
}

function checkIfMatched (user) {
	var ref = firebase.database().ref().child("user");
	ref.on('value', function(snapshot) {
		// cycle through each 'user'
		snapshot.forEach(function(childSnapshot) {

			// get each 'user's data
				var childData = childSnapshot.val();
				//console.log(childData);

				// if this is the corrct user, put data where it belongs in the profile area
				if (user.email.valueOf() != childData.email.valueOf() &&
					childData.friendo != "%20" &&
					user.email.valueOf() == childData.friendo.email.valueOf()) {

					var data = {
						username: childData.username,
						email: childData.email,
						state: childData.state,
						profilePic: childData.profilePic,
						interests: childData.interests,
						street: childData.street,
						city: childData.city,
						stateProvinceRegion: childData.stateProvinceRegion,
						zip: childData.zip
					}

					updateFriendo(data);
				}

				console.log("Profile info pulled.");
		});
	});
}

// handles looking for a friendo
function findMatch () {
	updateState("looking");

	searchForUnmatchedUser();
}

function injectFirstModal (user) {
	document.getElementById('username1').innerHTML = user.username;
	document.getElementById('interests1').innerHTML = user.interests;
	document.getElementById('street1').innerHTML = user.street;
	document.getElementById('city1').innerHTML = user.city;
	document.getElementById('spr1').innerHTML = user.stateProvinceRegion;
	document.getElementById('zip1').innerHTML = user.zip;
}

function injectSecondModal (friendo) {
	document.getElementById('username2').innerHTML = friendo.username;
	document.getElementById('interests2').innerHTML = friendo.interests;
	document.getElementById('street2').innerHTML = friendo.street;
	document.getElementById('city2').innerHTML = friendo.city;
	document.getElementById('spr2').innerHTML = friendo.stateProvinceRegion;
	document.getElementById('zip2').innerHTML = friendo.zip;
}

/*
function testDoesUserExist(user, databaseUser){
	return new Promise(function(resolve, reject){
		if(user.email.valueOf() === databaseUser.email.valueOf()){
			resolve(true);
		} else {
			resolve(false);
		}
	})
}

function testInitUser(user){
	var userstable = firebase.database().ref().child('user');
	userstable.on('value', function(snapshot){
		var promList = []
		snapshot.forEach(function(child){
			promList.push(doesUserExist(user, child.val()))
		});
		Promise
		.all(promList)
			.then(function(data){
				console.log(data);
				console.log(data.reduce(function(a, b) { return a + b; }, 0))
				return data.reduce(function(a, b) { return a + b; }, 0);
			});
	})
}

function testGetData(user){
	console.log('get data req');
	return new Promise(function(resolve, reject){
		// check if user data exists yet
    		var ref = firebase.database().ref().child("user");
			ref.on('value', function(snapshot) {
				var count = 0;
				// cycle through each 'user'
	    		snapshot.forEach(function(childSnapshot) {

	    			console.log("child: " + childSnapshot);

		    		// get each 'user's data
		      		var childData = childSnapshot.val();
		      		count++;
		      		// if this is the correct user, update found variable
		      		if (user.email.valueOf() === childData.email.valueOf()) {
		      			console.log("Found match for user email in database, returning true to 'user data exists'.");
		      			resolve(true);
		      		} else if(count === snapshot.length){
		      			console.log("Resolve false.");
		      			resolve(false);
		      		}
	    		});
			});
	});
}
*/