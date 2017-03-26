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