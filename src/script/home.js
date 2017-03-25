window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// if 'user' is brand new
			if (user.state < 1) {
				alert(1);
            	// initialize empty user database info
            	var ref = firebase.database().ref().child("user");
            	var data = {
	                email: user.email,
	                username: '%20',
	                firstName: '%20',
	                lastName: '%20',
	                street: '%20',
	                city: '%20',
	                stateProvinceRegion: '%20',
	                zip: '%20',
	                profilePic: '%20',
	                ratingSum: '0',
	                ratingCount: '0',
	                state: '1'
            	}

            	ref.child(user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                	console.log("Saved");
            	}, function(error) {
                	console.log(error); 
            	});
            } else {
            	// get data
            	var ref = firebase.database().ref().child("user");
				ref.on('value', function(snapshot) {
					// cycle through each 'user'
    				snapshot.forEach(function(childSnapshot) {

    					// get each 'user's data
      					var childData = childSnapshot.val();

      					// if this is the corrct user, put data where it belongs in the profile area
      					if (user.email.valueOf() == childData.email.valueOf()) {
      						document.getElementById('up-username').value = childData.username;
      						document.getElementById('up-firstname').value = childData.firstName;
      						document.getElementById('up-lastname').value = childData.lastName;
      						document.getElementById('up-street').value = childData.street;
      						document.getElementById('up-city').value = childData.city;
      						document.getElementById('up-stateProvinceRegion').value = childData.stateProvinceRegion;
      						document.getElementById('up-zip').value = childData.zip;
      					}
    				});
				});
            }
		} else {
			window.location.href = "../index.html";
		}
	});
}

// takes new profile data and updates the database
function updateProfile() {
	var username = document.getElementById('up-username').value;
	var firstname = document.getElementById('up-firstname').value;
	var lastname = document.getElementById('up-lastname').value;
	var street = document.getElementById('up-street').value;
	var city = document.getElementById('up-city').value;
	var stateProvinceRegion = document.getElementById('up-stateProvinceRegion').value;
	var zip = document.getElementById('up-zip').value;
	//var profilePic = document.getElementById('up-profilePic').value;

	console.log(user);
}

// returns 1 if all profile info is good, 0 if otherwise
function isGiftWorthy () {
	var username = document.getElementById('username').value;
	var firstname = document.getElementById('firstname').value;
	var lastname = document.getElementById('lastname').value;
	var street = document.getElementById('street').value;
	var city = document.getElementById('city').value;
	var stateProvinceRegion = document.getElementById('stateProvinceRegion').value;
	var zip = document.getElementById('zip').value;
	var profilePic = document.getElementById('profilePic').value;

	if (username.valueOf() == '%20' 			||
		firstName.valueOf() == '%20' 			||
		lastName.valueOf() == '%20' 			||
		street.valueOf() == '%20' 				||
		city.valueOf() == '%20' 				||
		stateProvinceRegion.valueOf() == '%20' 	||
		zip.valueOf() == '%20' 					||
		profilePic.valueOf() == '%20') {
			return 0;
	}

	return 1;
}