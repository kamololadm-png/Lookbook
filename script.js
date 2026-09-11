// Grab all outfit cards
const outfitCards = document.querySelectorAll('.outfit-card');

// Grab the overlay and its inner pieces we need to update
const overlay = document.getElementById('lookbookOverlay');
const overlayImageLabel = document.getElementById('overlayImageLabel');
const overlayName = document.getElementById('overlayName');

outfitCards.forEach((card) => {
  card.addEventListener('click', () => {
    // Read this specific card's data straight out of its own markup
    const categoryName = card.querySelector('.outfit-name').textContent;

    // Push that data into the overlay's elements
    overlayImageLabel.textContent = categoryName;
    overlayName.textContent = categoryName;

    // Show the overlay
    overlay.classList.add('is-open');
  });
});

