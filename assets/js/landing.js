// assets/js/landing.js

// Fungsi untuk membuat partikel dengan GSAP
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.background = `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(212,185,150,0.4) 100%)`;
        particle.style.boxShadow = '0 0 15px rgba(255,255,255,0.5)';
        
        // Posisi awal random
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Animasi partikel dengan GSAP - floating random
        gsap.to(particle, {
            x: () => Math.random() * 200 - 100,
            y: () => Math.random() * 200 - 100,
            rotation: 360,
            duration: Math.random() * 10 + 10,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
        
        // Pulsating opacity
        gsap.to(particle, {
            opacity: () => Math.random() * 0.7 + 0.3,
            scale: () => Math.random() * 0.5 + 0.8,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
        
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

// ANIMASI TULISAN TANGAN UNTUK NAMA PASANGAN
function initHandwritingAnimation() {
    const coupleName = document.querySelector('.couple-name');
    const originalText = coupleName.textContent;
    
    // Force parent visible
    coupleName.style.opacity = '1';
    
    // Split text into characters
    coupleName.innerHTML = originalText.split('').map(char => 
        `<span class="char" style="opacity:0">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    
    // Timeline untuk animasi tulisan tangan
    const handwritingTL = gsap.timeline({ delay: 0.5 });
    
    // Typewriter effect
    handwritingTL.to('.char', {
        opacity: 1,
        y: 0,
        duration: 0.08,
        stagger: {
            amount: 1.5,
            from: "start",
            ease: "power2.out"
        }
    });
    
    // Breathing glow effect continuous
    handwritingTL.to('.couple-name', {
        textShadow: "2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(212,185,150,0.4)",
        duration: 0.8,
        ease: "power2.out"
    })
    .to('.couple-name', {
        textShadow: "2px 2px 4px rgba(0,0,0,0.3), 0 0 30px rgba(212,185,150,0.8), 0 0 40px rgba(212,185,150,0.3)",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
    }, "+=0.3");
}

// ANIMASI UTAMA DENGAN GSAP - ELEGANT & CLASSIC
function initGSAPAnimations() {
    // Main timeline
    const masterTL = gsap.timeline();
    
    // 1. Animasi judul "The Wedding of" - ELEGANT FADE IN
    masterTL.fromTo('.fade-in-text', 
        { 
            opacity: 0, 
            y: 40 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "power2.out" 
        }
    );
    
    // 2. Animasi tanggal - CLASSIC FADE
    masterTL.fromTo('.date-text',
        { 
            opacity: 0, 
            y: 30 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power2.out" 
        },
        "-=0.5"
    );
    
    // 3. Animasi guest info - SUBTLE RISE
    // Animasi untuk teks "Kepada Bapak/Ibu/Saudara/i"
    masterTL.fromTo('.guest-text',
        { 
            opacity: 0, 
            y: 20 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out" 
        },
        "-=0.3"
    );
    
    // Animasi untuk nama tamu
    masterTL.fromTo('.guest-name',
        { 
            opacity: 0, 
            y: 25 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power2.out" 
        },
        "-=0.2"
    );

    // 4. Animasi tombol - ELEGANT REVEAL WITH 3D EFFECT
    masterTL.fromTo('.cta-button',
        { 
            opacity: 0, 
            y: 50,
            scale: 0.8,
            rotationY: 90
        },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotationY: 0,
            duration: 1.5, 
            ease: "back.out(1.8)" 
        },
        "-=0.2"
    );
    
    // 5. Animasi music control - DELICATE APPEAR
    masterTL.fromTo('.music-control',
        { 
            opacity: 0, 
            scale: 0.8 
        },
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            ease: "power2.out" 
        },
        "-=0.1"
    );
}

// ANIMASI CONTINUOUS UNTUK TOMBOL - TANPA ANIMASI IKON
function initButtonAnimation() {
    // Hanya animasi tombol saja, tanpa ikon
    gsap.to('.cta-button', {
        backgroundColor: "rgba(212,185,150,0.3)",
        boxShadow: "0 0 30px rgba(212,185,150,0.6)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3
    });
}

// Initialize semua fungsi ketika DOM siap
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initMusic();
    initGSAPAnimations();
    initHandwritingAnimation();
    initButtonAnimation();
});