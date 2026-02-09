// Sweet messages to display
const messages = [
    "You're the most beautiful person I know 💕",
    "Your smile lights up my entire world ✨",
    "I love the way you laugh 😊",
    "You're incredibly kind-hearted 💖",
    "Your presence makes everything better 🌟",
    "You deserve all the happiness 🎀",
    "You're absolutely stunning 💗",
    "Your heart is pure gold ✨",
    "You make me want to be better 💪",
    "You're one of a kind 👑",
    "Your eyes are mesmerizing 💫",
    "You inspire me every day 🌸",
    "You're a ray of sunshine ☀️",
    "Your strength is amazing 💪",
    "You deserve the world 🌍",
    "You're absolutely amazing 🌟",
    "I admire you so much 💕",
    "You're my definition of beautiful 💖",
    "Keep that beautiful smile going 😊",
    "You're going to be okay... and you'll be great 💕"
];

let currentMessageIndex = 0;
let isPlaying = false;

function startMessages() {
    if (isPlaying) return;
    isPlaying = true;
    
    currentMessageIndex = 0;
    createConfetti();
    showNextMessage();
}

function showNextMessage() {
    if (currentMessageIndex < messages.length) {
        displayPopup(messages[currentMessageIndex]);
        currentMessageIndex++;
        setTimeout(showNextMessage, 2500); // Show next message after 2.5 seconds
    } else {
        // Final message
        setTimeout(() => {
            displayFinalMessage();
            isPlaying = false;
        }, 2000);
    }
}

function displayPopup(message) {
    const container = document.getElementById('popup-container');
    
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.innerHTML = `
        <span class="popup-close" onclick="this.parentElement.remove()">×</span>
        ${message}
    `;
    
    // Random position
    const randomX = Math.random() * (window.innerWidth - 300);
    const randomY = Math.random() * (window.innerHeight - 200) + 100;
    
    popup.style.left = randomX + 'px';
    popup.style.top = randomY + 'px';
    
    // Slight rotation
    popup.style.transform = `rotate(${Math.random() * 6 - 3}deg) scale(1)`;
    
    container.appendChild(popup);
    
    // Auto-remove after 2 seconds
    setTimeout(() => {
        popup.style.animation = 'popIn 0.5s reverse forwards';
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}

function displayFinalMessage() {
    const container = document.getElementById('popup-container');
    
    const finalPopup = document.createElement('div');
    finalPopup.className = 'popup-message';
    finalPopup.style.fontSize = '2em';
    finalPopup.style.padding = '50px 60px';
    finalPopup.innerHTML = `
        <span class="popup-close" onclick="location.reload()">×</span>
        <div style="margin-bottom: 15px;">You are amazing 🌟</div>
        <div style="font-size: 0.7em; color: #dda0dd;">Click to restart</div>
    `;
    
    finalPopup.style.left = (window.innerWidth / 2 - 200) + 'px';
    finalPopup.style.top = (window.innerHeight / 2 - 100) + 'px';
    finalPopup.style.zIndex = '25';
    
    finalPopup.onclick = () => {
        location.reload();
    };
    
    container.appendChild(finalPopup);
    
    // Create big confetti burst
    createConfettiBurst();
}

function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['pink', 'purple', 'light-pink', 'lavender'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 3;
        
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.animation = `confettiFall ${duration}s ease-in forwards`;
        confetti.style.animationDelay = delay + 's';
        
        container.appendChild(confetti);
    }
}

function createConfettiBurst() {
    const container = document.querySelector('.confetti-container');
    const colors = ['pink', 'purple', 'light-pink', 'lavender'];
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        confetti.style.left = (window.innerWidth / 2) + 'px';
        confetti.style.top = (window.innerHeight / 2) + 'px';
        
        const angle = (i / 80) * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        
        const endX = startX + vx * 100;
        const endY = startY + vy * 100;
        
        confetti.style.animation = `none`;
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        
        container.appendChild(confetti);
        
        // Use requestAnimationFrame for smooth burst animation
        animateConfettiBurst(confetti, startX, startY, endX, endY, 1000);
    }
}

function animateConfettiBurst(element, startX, startY, endX, endY, duration) {
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const x = startX + (endX - startX) * progress;
        const y = startY + (endY - startY) * progress + (progress * progress * 100); // gravity
        
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.opacity = 1 - progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.remove();
        }
    }
    
    animate();
}

// Add animation for confetti falling
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Allow clicking anywhere to start
document.addEventListener('click', (e) => {
    if (e.target.matches('.start-btn') || e.target.parentElement.matches('.start-btn')) {
        return;
    }
    // Optional: Allow clicking anywhere to start
    // startMessages();
});
