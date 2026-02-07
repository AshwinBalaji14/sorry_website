// Audio Management
const bgMusic = document.getElementById('background-music');
const transitionSound = document.getElementById('transition-sound');
const spellCastSound = document.getElementById('spell-cast-sound');

// Track current scene
let currentScene = 0;

// Set up music
function initializeAudio() {
    bgMusic.src = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1331cec09d.mp3';
    bgMusic.volume = 0.15;
    transitionSound.volume = 0.5;
    spellCastSound.volume = 0.6;
    
    const playMusic = () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log('Music autoplay prevented'));
        }
        document.removeEventListener('click', playMusic);
        document.removeEventListener('keydown', playMusic);
    };
    
    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', playMusic);
}

// Play transition sound
function playTransitionSound() {
    transitionSound.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
    transitionSound.currentTime = 0;
    transitionSound.volume = 0.4;
    transitionSound.play().catch(e => console.log('Sound play failed'));
}

// Play spell cast sound
function playSpellCastSound() {
    spellCastSound.src = 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3';
    spellCastSound.currentTime = 0;
    spellCastSound.volume = 0.5;
    spellCastSound.play().catch(e => console.log('Sound play failed'));
}


// Function to move to next scene
function nextScene() {
    playTransitionSound();
    
    const screens = document.querySelectorAll('.screen');
    screens[currentScene].classList.remove('active');
    currentScene++;
    if (currentScene < screens.length) {
        screens[currentScene].classList.add('active');
    }
}

// Final incantation - complete the ritual
function finalIncantation() {
    const btn = event.target;
    btn.disabled = true;
    btn.textContent = '⚡ COMPLETING THE RITUAL... ⚡';

    playSpellCastSound();
    createPowerfulSpellEffect();

    setTimeout(() => {
        nextScene();
    }, 2000);
}

// Powerful spell effect
function createPowerfulSpellEffect() {
    const center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    // Create energy burst
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = '⚡';
            particle.style.position = 'fixed';
            particle.style.left = center.x + 'px';
            particle.style.top = center.y + 'px';
            particle.style.fontSize = '30px';
            particle.style.pointerEvents = 'none';
            particle.style.opacity = '1';
            particle.style.animation = `energyBurst 1s ease-out forwards`;
            particle.style.setProperty('--tx', Math.cos(i * Math.PI / 10) * 200 + 'px');
            particle.style.setProperty('--ty', Math.sin(i * Math.PI / 10) * 200 + 'px');

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }, i * 50);
    }

    // Create sparkles
    createSparkles(30);

    // Screen flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'radial-gradient(circle, rgba(255, 20, 147, 0.6), transparent)';
    flash.style.pointerEvents = 'none';
    flash.style.animation = 'spellFlash 1s ease-out forwards';
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 1000);
}

// Create multiple sparkles
function createSparkles(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '24px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = `sparkleFloat ${0.8 + Math.random() * 0.5}s ease-out forwards`;

            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 30);
    }
}

// Play final celebration
function playFinalCelebration() {
    const body = document.body;

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const emojis = ['✨', '💖', '🌹', '👑', '💫', '🪄', '🎀', '💗'];
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.fontSize = '20px';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s ease-in forwards`;
            confetti.style.zIndex = '-1';

            body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 40);
    }
}

// Add animations to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(0, -50px) scale(0.5);
        }
    }

    @keyframes celebrationPop {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0.3);
        }
    }

    @keyframes confettiFall {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
        }
    }

    @keyframes energyBurst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0.2);
        }
    }

    @keyframes spellFlash {
        0% {
            opacity: 0.8;
        }
        100% {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAudio();
    
    // Trigger celebration when success screen is shown
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            const successScreen = document.querySelector('.success-screen.active');
            if (successScreen) {
                playFinalCelebration();
                observer.disconnect();
            }
        });
    });

    const config = { attributes: true, attributeFilter: ['class'], subtree: true };
    observer.observe(document.querySelector('.container'), config);
});

// Letter Modal Functions
function openLetter() {
    const letterModal = document.getElementById('letterModal');
    const letterOverlay = document.getElementById('letterOverlay');
    
    // Trigger the animation
    letterModal.classList.add('active');
    letterOverlay.classList.add('active');
    
    // Play spell cast sound for dramatic effect
    playSpellCastSound();
}

function closeLetter() {
    const letterModal = document.getElementById('letterModal');
    const letterOverlay = document.getElementById('letterOverlay');
    
    letterModal.classList.remove('active');
    letterOverlay.classList.remove('active');
}

// Close letter when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLetter();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        nextScene();
    }
});
