var globalUser = null;
var userData = null;

window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			globalUser = user;

            // initialize empty database info if user data doesn't already exist
            console.log("shit: " + initUser(user));
            if (initUser(user) === 0) {
            	console.log("after");
            	// initialize empty user database info
            	var ref = firebase.database().ref().child("user");
            	var data = {
	                email: 					user.email,
	                username: 				'%20',
	                firstName: 				'%20',
	                lastName: 				'%20',
	                street: 				'%20',
	                city: 					'%20',
	                stateProvinceRegion: 	'%20',
	                zip: 					'%20',
	                profilePic: 			'%20',
	                ratingSum: 				'0',
	                ratingCount: 			'0',
	                state: 					'incomplete-profile',
	                interests:              '%20',
	                friendo:                '%20'
            	}

            	ref.child(user.uid).set(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
                	console.log("New user detected; created new database info.");
            	}, function(error) {
                	console.log(error); 
            	});
            }

            //get 'user' data to populate the profile page
            var ref = firebase.database().ref().child("user");
			ref.on('value', function(snapshot) {
				// cycle through each 'user'
    			snapshot.forEach(function(childSnapshot) {

    				// get each 'user's data
      				var childData = childSnapshot.val();
      				userData = childData;

      				// if this is the corrct user, put data where it belongs in the profile area
      				if (user.email.valueOf() == childData.email.valueOf()) {
      					document.getElementById('up-username').value 			= (childData.username.valueOf() == "%20")? 				"" : childData.username;
      					document.getElementById('up-firstname').value 			= (childData.firstName.valueOf() == "%20")? 			"" : childData.firstName;
      					document.getElementById('up-lastname').value 			= (childData.lastName.valueOf() == "%20")? 				"" : childData.lastName;
      					document.getElementById('up-street').value 				= (childData.street.valueOf() == "%20")? 				"" : childData.street;
      					document.getElementById('up-city').value 				= (childData.city.valueOf() == "%20")? 					"" : childData.city;
      					document.getElementById('up-stateProvinceRegion').value = (childData.stateProvinceRegion.valueOf() == "%20")? 	"" : childData.stateProvinceRegion;
      					document.getElementById('up-zip').value 				= (childData.zip.valueOf() == "%20")? 					"" : childData.zip;
      					document.getElementById('profilePic').src 				= (childData.profilePic.valueOf() == "%20")? 			"../resources/profile pics/silhouette.jpg" : childData.profilePic;
      					document.getElementById('up-profilepic').value          = (childData.profilePic.valueOf() == "%20")?			"" : childData.profilePic;
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

function doesUserExist(user, databaseUser){
	return new Promise(function(resolve, reject){
		if(user.email.valueOf() === databaseUser.email.valueOf()){
			resolve(true);
		} else {
			resolve(false);
		}
	})
}

function initUser(user){
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

// takes new profile data and updates the database
function updateProfile() {
	// Update user data 
	var username 				= document.getElementById('up-username').value;
	var firstname 				= document.getElementById('up-firstname').value;
	var lastname 				= document.getElementById('up-lastname').value;
	var street 					= document.getElementById('up-street').value;
	var city 					= document.getElementById('up-city').value;
	var stateProvinceRegion 	= document.getElementById('up-stateProvinceRegion').value;
	var zip 					= document.getElementById('up-zip').value;
	var profilePic 				= document.getElementById('up-profilepic').value;

	var data = {
	    email: 					globalUser.email,
	    username: 				username,
	    firstName: 				firstname,
	    lastName: 				lastname,
	    street: 				street,
	    city: 					city,
	    stateProvinceRegion: 	stateProvinceRegion,
	    zip: 					zip,
	    profilePic:             profilePic,
	    state:                  (isGiftWorthy() === 0)? 'incomplete-profile' : 'profile-complete'
    }

	var ref = firebase.database().ref().child("user");

    ref.child(globalUser.uid).update(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
        console.log("Updated profile info.");
    }, function(error) {
        console.log(error); 
    });
}

function updateInterests () {
	// update user interests
	var interests = document.getElementById('interests').value;

	var data = {
		interests: interests
	}

	var ref = firebase.database().ref().child("user");

    ref.child(globalUser.uid).update(data).then(function(ref) {//use 'child' and 'set' combination to save data in your own generated key
        console.log("Updated profile info.");
        window.location.href = "status.html";
    }, function(error) {
        console.log(error); 
    });
}

// returns 1 if all profile info is good, 0 if otherwise
function isGiftWorthy () {
	var username 				= 	document.getElementById('up-username').value;
	var firstName 				=	document.getElementById('up-firstname').value;
	var lastName 				= 	document.getElementById('up-lastname').value;
	var street 					= 	document.getElementById('up-street').value;
	var city 					= 	document.getElementById('up-city').value;
	var stateProvinceRegion 	= 	document.getElementById('up-stateProvinceRegion').value;
	var zip 					= 	document.getElementById('up-zip').value;
	var profilePic 				= 	document.getElementById('profilePic').src;

	if (username.valueOf() 				== "" ||
		firstName.valueOf() 			== "" ||
		lastName.valueOf() 				== "" ||
		street.valueOf() 				== "" ||
		city.valueOf() 					== "" ||
		stateProvinceRegion.valueOf() 	== "" ||
		zip.valueOf() 					== "" ||
		profilePic.valueOf() 			== "../resources/profile pics/silhouette.jpg"	) {
			console.log("Not gift worthy.");
			return 0;
	}

	console.log("Is gift worthy.");
	return 1;
}

function match () {
	var popup = document.getElementById("myPopup");
	if (isGiftWorthy() === 0) {
		popup.innerHTML="Profile is incomplete!";
		return;
	}
	popup.innerHTML="We will notify you when you get a match!";   
}