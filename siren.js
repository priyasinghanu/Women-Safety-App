// Get references to elements
const sirenBtn = document.getElementById('siren-btn');
const modalOverlay = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('close-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const sirenAudio = document.getElementById('siren-audio');
const modal = document.querySelector('.modal');

// Show the modal pop-up
function showModal() {
  modalOverlay.style.display = 'flex';
}

// Hide the modal and stop the siren if playing
function hideModal() {
  modalOverlay.style.display = 'none';
  stopSiren();
}

// Function to start the siren
function startSiren() {
  sirenAudio.play();
  // Add a glowing effect to the start button
  startBtn.classList.add('active');
  // Optionally, add a class to the modal to further emphasize emergency mode
  modal.classList.add('siren-active');
}

// Function to stop the siren
function stopSiren() {
  sirenAudio.pause();
  sirenAudio.currentTime = 0;
  // Remove the glowing effect and modal highlight
  startBtn.classList.remove('active');
//   stopBtn.classList.add('active');  
  modal.classList.remove('siren-active');
}

// Event listeners
sirenBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', hideModal);

// Close the modal if clicking outside the modal content
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    hideModal();
  }
});

// Start and Stop functionality on modal buttons
startBtn.addEventListener('click', startSiren);
stopBtn.addEventListener('click', stopSiren);




// 2nd methond
{/* <script>
// Get references to elements
const sirenBtn = document.getElementById("siren-btn");
const modalOverlay = document.getElementById("modal-overlay");
const closeBtn = document.getElementById("close-btn");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const sirenAudio = document.getElementById("siren-audio");

// Show the modal pop-up
function showModal() {
  modalOverlay.style.display = "flex";
}

// Hide the modal and stop the siren if playing
function hideModal() {
  modalOverlay.style.display = "none";
  sirenAudio.pause();
  sirenAudio.currentTime = 0;
}

// Event listeners
sirenBtn.addEventListener("click", showModal);
closeBtn.addEventListener("click", hideModal);

// Close the modal if clicking outside the modal content
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    hideModal();
  }
});

// Start and Stop functionality
startBtn.addEventListener("click", () => {
  // Start the siren sound (it will loop until stopped)
  sirenAudio.play();
});

stopBtn.addEventListener("click", () => {
  sirenAudio.pause();
  sirenAudio.currentTime = 0;
});
</script>  */}