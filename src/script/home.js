window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			
		} else {
			window.location.href = "../index.html";
		}
	});
}

// takes new profile data and updates the database
function updateProfile() {
	var username = document.getElementById('username').value;
	var firstname = document.getElementById('firstname').value;
	var lastname = document.getElementById('lastname').value;
	var street = document.getElementById('street').value;
	var city = document.getElementById('city').value;
	var stateProvinceRegion = document.getElementById('stateProvinceRegion').value;
	var zip = document.getElementById('zip').value;
	var profilePic = document.getElementById('profilePic').value;
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