  var config = {
    apiKey: "AIzaSyDo_6nT4DoCiu5OBsJ05UHv3M2GJKxjh-A",
    authDomain: "gift-exchange-e0c13.firebaseapp.com",
    databaseURL: "https://gift-exchange-e0c13.firebaseio.com",
    storageBucket: "gift-exchange-e0c13.appspot.com",
    messagingSenderId: "89308391419"
  };
  firebase.initializeApp(config);

  // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}