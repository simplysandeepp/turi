// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetSection = document.querySelector(targetId); // Find the target section
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'start' // Align to the top of the section
            });
        }
    });
});

// ===== Meditation Timer =====
const startButton = document.querySelector('.start-button');
const timerDisplay = document.createElement('div'); // Create a timer display element
timerDisplay.className = 'timer-display';
timerDisplay.style.display = 'none'; // Hide it initially
document.querySelector('.practice').appendChild(timerDisplay);

let timerInterval;
let timeLeft = 600; // 10 minutes in seconds

// Function to format time (MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to start the timer
function startTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
    timerDisplay.style.display = 'block'; // Show the timer
    startButton.textContent = 'Pause'; // Change button text

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Time’s up! 🎉';
            startButton.textContent = 'Restart';
            timeLeft = 600; // Reset timer
        }
    }, 1000); // Update every second
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    startButton.textContent = 'Resume';
}

// Toggle between start, pause, and resume
startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Begin Session' || startButton.textContent === 'Restart') {
        startTimer();
    } else if (startButton.textContent === 'Pause') {
        pauseTimer();
    } else if (startButton.textContent === 'Resume') {
        startTimer();
    }
});

// ===== Highlight Current Section in Navigation =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    // Find the current section in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    // Highlight the corresponding navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// ===== Add a Simple Confetti Effect on Timer Completion =====
function createConfetti() {
    const confettiCount = 100;
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000); // Remove confetti after 5 seconds
}

// Trigger confetti when timer completes
timerDisplay.addEventListener('DOMSubtreeModified', () => {
    if (timerDisplay.textContent === 'Time’s up! 🎉') {
        createConfetti();
    }
});