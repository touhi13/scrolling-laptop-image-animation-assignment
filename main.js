// Get the laptop image element
const laptopImage = document.getElementById('image');

// Calculate the total scrollable height based on the height of a single image
const totalScrollHeight = laptopImage.offsetHeight / 2;

// Calculate the scroll position thresholds based on the total scrollable height
const thresholds = Array.from(Array(83).keys()).map(index => (index + 1) * (totalScrollHeight / 83));

// Generate the image sequence array
const imageSequence = Array.from(Array(83).keys()).map(index => {
  const imageNumber = String(index + 1).padStart(4, '0');
  return `./images/83/${imageNumber}.jpg`;
});

// Function to handle scrolling and apply folding/unfolding
function handleScroll() {
  // Calculate the scroll position
  const scrollPosition = window.scrollY;

  // Find the index of the current threshold
  const currentThresholdIndex = thresholds.findIndex(threshold => scrollPosition <= threshold);

  // If the scroll position exceeds all thresholds, use the last index
  const currentIndex = currentThresholdIndex !== -1 ? currentThresholdIndex : thresholds.length;

  // Get the corresponding image path based on the threshold index
  const imagePath = imageSequence[currentIndex];

  // Update the image source based on the current threshold index
  laptopImage.src = imagePath;
}

let animationFrameId;

// Function to handle scroll events
function handleScrollEvent() {
  const scrollPosition = window.scrollY;

  if (scrollPosition <= totalScrollHeight) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(handleScroll);
  }
}

// Attach the scroll event listener to the totalScrollHeight area only
window.addEventListener('scroll', handleScrollEvent);
