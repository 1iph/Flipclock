const hourTens = document.getElementById('hour-tens');
const hourOnes = document.getElementById('hour-ones');
const minuteTens = document.getElementById('minute-tens');
const minuteOnes = document.getElementById('minute-ones');
const secondTens = document.getElementById('second-tens');
const secondOnes = document.getElementById('second-ones');
const amPmElement = document.getElementById('am-pm');

function updateClock() {
    const now = new Date();
    
    const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    
    let hours = pacificTime.getHours();
    const minutes = pacificTime.getMinutes();
    const seconds = pacificTime.getSeconds();
    
   
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
   
    const hourTensDigit = Math.floor(hours / 10);
    const hourOnesDigit = hours % 10;
    const minuteTensDigit = Math.floor(minutes / 10);
    const minuteOnesDigit = minutes % 10;
    const secondTensDigit = Math.floor(seconds / 10);
    const secondOnesDigit = seconds % 10;

  
    if (hourTensDigit === 0) {
        hourTens.classList.remove('visible');
    } else {
        hourTens.classList.add('visible');
    }

   
    updateCard(hourTens, hourTensDigit);
    updateCard(hourOnes, hourOnesDigit);
    updateCard(minuteTens, minuteTensDigit);
    updateCard(minuteOnes, minuteOnesDigit);
    updateCard(secondTens, secondTensDigit);
    updateCard(secondOnes, secondOnesDigit);
    
    // Update AM/PM
    if (amPmElement.textContent !== ampm) {
        amPmElement.textContent = ampm;
    }
}

// Function to update a single card
function updateCard(card, newValue) {
    const front = card.querySelector('.flip-card-front');
    const back = card.querySelector('.flip-card-back');
    
    if (front.textContent != newValue) {
        // Only animate if the value changes
        back.textContent = newValue;
        card.classList.add('flipping');
        
        // After animation completes, reset for next flip
        setTimeout(() => {
            card.classList.remove('flipping');
            front.textContent = newValue;
        }, 500);
    }
}
updateClock();

setInterval(updateClock, 1000);
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { 
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { 
            document.documentElement.msRequestFullscreen();
        }
    }
}

// Function to exit fullscreen mode
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
    }
}

// Hide navbar and toggle fullscreen buttons
function handleFullscreenChange() {
    const navbar = document.getElementById('navbar');
    const fullscreen = document.getElementById('fullscreen-button');
    const hidefullscreen = document.getElementById('hide-fullscreen-button');

    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreen || document.msFullscreenElement) {
        navbar.style.display = 'none';  // Hide navbar in fullscreen
        fullscreen.style.display = 'none';
        hidefullscreen.style.display = 'block';
    } else {
        navbar.style.display = 'flex';  // Show navbar when exiting fullscreen
        fullscreen.style.display = 'block';
        hidefullscreen.style.display = 'none';
    }
}

// Add event listeners for fullscreen changes
document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("mozfullscreenchange", handleFullscreenChange);
document.addEventListener("msfullscreenchange", handleFullscreenChange);

// Add event listener to hidefullscreen button
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('fullscreen-button').addEventListener("click", toggleFullscreen);
    document.getElementById('hide-fullscreen-button').addEventListener("click", exitFullscreen);
});

