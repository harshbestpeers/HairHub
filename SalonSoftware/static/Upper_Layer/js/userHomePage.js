// Get modal element
var modal = document.getElementById("profileModal");

// Get open modal button
var openModal = document.getElementById("openModal");

// Get close button
var closeBtn = document.getElementsByClassName("close")[0];

// Open modal event
openModal.onclick = function() {
    modal.style.display = "block";
}

// Close modal event
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close modal if user clicks outside of the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
