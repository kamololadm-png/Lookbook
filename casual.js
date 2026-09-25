const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const zoomedImage = document.getElementById("zoomedImage");
const closeButton = document.getElementById("close");


// Open image
images.forEach(function(image) {
    image.addEventListener("click", function() {
        zoomedImage.src = image.src;
        lightbox.classList.add("active");
    });
});


// Close with X
closeButton.addEventListener("click", function() {
    lightbox.classList.remove("active");
});


// Close when clicking outside image
lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }
});


// Close with Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        lightbox.classList.remove("active");
    }
});
