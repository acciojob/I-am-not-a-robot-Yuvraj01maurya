//your code here
document.addEventListener("DOMContentLoaded", function() {
  const images = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");
  let selectedImages = [];

  // Function to render images
  function renderImages() {
    // Array to hold image classes
    const classes = ['img1', 'img2', 'img3', 'img4', 'img5'];
    // Randomly select one class to repeat
    const repeatedClass = classes[Math.floor(Math.random() * classes.length)];
    // Shuffle classes array
    classes.sort(() => Math.random() - 0.5);

    // Clear previous images
    images.innerHTML = '';
    // Render images
    classes.forEach(className => {
      const img = document.createElement('img');
      img.classList.add(className);
      img.src = `https://picsum.photos/200/300?random=${Math.random()}`;
      img.addEventListener('click', () => handleClick(img, className, repeatedClass));
      images.appendChild(img);
    });
  }

  // Function to handle image click
  function handleClick(img, className, repeatedClass) {
    if (selectedImages.length < 2 && !selectedImages.includes(className)) {
      img.classList.add('selected');
      selectedImages.push(className);
    }

    if (selectedImages.length === 2) {
      resetButton.style.display = 'block';
      verifyButton.style.display = 'block';
    }
  }

  // Function to reset state
  function resetState() {
    selectedImages = [];
    const selectedImgs = document.querySelectorAll('.selected');
    selectedImgs.forEach(img => img.classList.remove('selected'));
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.style.display = 'none';
  }

  // Function to verify selection
  function verifySelection() {
    if (selectedImages[0] === selectedImages[1]) {
      para.innerText = "You are a human. Congratulations!";
    } else {
      para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    para.style.display = 'block';
    verifyButton.style.display = 'none';
  }

  // Event listeners
  resetButton.addEventListener('click', resetState);
  verifyButton.addEventListener('click', verifySelection);

  // Initial render
  renderImages();
});
