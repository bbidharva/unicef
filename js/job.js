
// Get the modal
let jobapplication = document.getElementById("job-modal");
// Get the button that opens the modal
let SubmitBtn = document.getElementById("job-submit");

// Get the <span> element that closes the modal
let closeBtn = document.getElementById('popup-close')

// When the user clicks the button, open the modal 
SubmitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    jobapplication.style.display = "block";
})

closeBtn.addEventListener('click', function(event) {
    event.preventDefault();
    jobapplication.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    jobapplication.style.display = "none";
  }
}
