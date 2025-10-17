// assets/js/landing.js

// Fungsi untuk membuat partikel
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Ukuran acak
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posisi awal acak
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Waktu animasi acak
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Delay acak
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Musik latar
function initMusic() {
    const musicToggle = document.getElementById('musicToggle');
    let audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            musicToggle.style.background = 'rgba(255, 255, 255, 0.2)';
        } else {
            audio.play().catch(e => {
                console.log("Autoplay diblokir, klik tombol untuk memutar musik");
            });
            isPlaying = true;
            musicToggle.style.background = 'rgba(255, 215, 0, 0.3)';
        }
    });
}

// Typewriter effect untuk nama tamu
function initTypewriter() {
    const guestName = document.querySelector('.guest-name');
    if (!guestName) return;
    
    const originalText = guestName.textContent;
    guestName.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            guestName.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Mulai efek ketikan setelah animasi fade in selesai
    setTimeout(typeWriter, 2500);
}

// Initialize semua fungsi ketika DOM siap
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initMusic();
    initTypewriter();
});