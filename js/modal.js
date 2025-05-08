// Get the modal
let modal = document.getElementById("donate-modal");

// Get the button that opens the modal
let donateBtn = document.getElementById("donate-button");

// Get the <span> element that closes the modal
let closeBtn = document.getElementById('close-btn')

// When the user clicks the button, open the modal 
donateBtn.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = "block";
})

closeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
