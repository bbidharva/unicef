
// Get the modal
let contacts = document.getElementById("contact-modal");

// Get the button that opens the modal
let SubmitBtn = document.getElementById("contact-submit");

// Get the <span> element that closes the modal
let closeBtn = document.getElementById('close-btn')

// When the user clicks the button, open the modal 
SubmitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    contacts.style.display = "block";
})

closeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    contacts.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    contacts.style.display = "none";
  }
}