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

function editProfile() {
	var firstname = document.getElementById('su-firstname').value;
	  var lastname = document.getElementById('su-lastname').value;
	  var username = document.getElementById('su-username').value;
	  var address = document.getElementById('su-address').value;
}