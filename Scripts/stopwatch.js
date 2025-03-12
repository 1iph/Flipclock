// Get control buttons
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

// Stopwatch variables
let startTime;
let elapsedTime = 0;
let stopwatchInterval;
let isRunning = false;

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuLinks = document.querySelector('.menu-links');

menuToggle.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Function to start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10); // Update every 10ms for smooth milliseconds
        isRunning = true;
        
        // Update button states
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true;
    }
}

// Function to stop the stopwatch
function stopStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        
        // Update button states
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
    }
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay(0, 0, 0, 0);
    
    // Update button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
}

// Function to update the stopwatch display
function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    
    // Calculate hours, minutes, seconds, and milliseconds
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10); // Only showing hundredths and tenths
    
    updateDisplay(hours, minutes, seconds, milliseconds);
}

// Function to update the display
function updateDisplay(hours, minutes, seconds, milliseconds) {
    // Format the hours
    const hourTensDigit = Math.floor(hours / 10);
    const hourOnesDigit = hours % 10;
    
    // Format the minutes
    const minuteTensDigit = Math.floor(minutes / 10);
    const minuteOnesDigit = minutes % 10;
    
    // Format the seconds
    const secondTensDigit = Math.floor(seconds / 10);
    const secondOnesDigit = seconds % 10;
    
    // Format milliseconds
    const msHundredsDigit = Math.floor(milliseconds / 10);
    const msTensDigit = milliseconds % 10;
    
    // Update the cards
    updateCard(hourTens, hourTensDigit);
    updateCard(hourOnes, hourOnesDigit);
    updateCard(minuteTens, minuteTensDigit);
    updateCard(minuteOnes, minuteOnesDigit);
    updateCard(secondTens, secondTensDigit);
    updateCard(secondOnes, secondOnesDigit);
    updateCard(msHundreds, msHundredsDigit);
    updateCard(msTens, msTensDigit);
}

// Function to update a single card
function updateCard(card, newValue) {
    const front = card.querySelector('.flip-card-front, .milliseconds-card-front');
    const back = card.querySelector('.flip-card-back, .milliseconds-card-back');
    
    if (front.textContent != newValue) {
        // Only animate if the value changes
        back.textContent = newValue;
        card.classList.add('flipping');
        
        // After animation completes, reset for next flip
        setTimeout(() => {
            card.classList.remove('flipping');
            front.textContent = newValue;
        }, card.classList.contains('milliseconds-card') ? 300 : 500);
    }
}

// Initialize the display
updateDisplay(0, 0, 0, 0);