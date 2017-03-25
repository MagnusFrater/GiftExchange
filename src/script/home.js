window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
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
                ratingCount: '0'

            }
            ref.child(user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                console.log("Saved");
            }, function(error) {
                console.log(error); 
            });
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

	if (username.valueOf() == 'null' 			||
		firstName.valueOf() == 'null' 			||
		lastName.valueOf() == 'null' 			||
		street.valueOf() == 'null' 				||
		city.valueOf() == 'null' 				||
		stateProvinceRegion.valueOf() == 'null' ||
		zip.valueOf() == 'null' 				||
		profilePic.valueOf() == 'null') {
			return 0;
	}

	return 1;
}