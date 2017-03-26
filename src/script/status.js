window.onload = function () {
	initApp();
}

function initApp () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {

		} else {
			// if not logged in, go to index.html
			window.location.href = "../index.html";
		}
	});
}

function findMatch () {
	
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