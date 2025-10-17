// assets/js/home.js

// Create better floating particles (petals effect)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size - lebih kecil dan variatif
        const size = Math.random() * 6 + 2; // 2px to 8px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position - mulai dari berbagai posisi
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Random animation duration - lebih lambat dan variatif
        const duration = Math.random() * 20 + 20; // 20s to 40s
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay - lebih tersebar
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        // Better random color - subtle white variations
        const opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
        particle.style.background = `rgba(255, 255, 255, ${opacity})`;
        
        // Add slight blur effect for softer look
        particle.style.filter = 'blur(0.5px)';
        
        // Random rotation
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Better animation with easing
        particle.style.animationTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
        
        particlesContainer.appendChild(particle);
    }
}

// Countdown Timer untuk 09 April 2025
function initCountdown() {
    function updateCountdown() {
        const weddingDate = new Date('April 09, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Simpan Tanggal ke Kalender
function initSaveDate() {
    const saveDateBtn = document.querySelector('.save-date-btn');
    if (saveDateBtn) {
        saveDateBtn.addEventListener('click', function() {
            const eventDate = new Date('2025-04-09');
            const eventTitle = 'Pernikahan Gung Gus & Sonia';
            const eventDescription = 'Pawiwahan Gung Gus & Sonia';
            const eventLocation = 'Lihat undangan untuk detail lokasi';
            
            const startDate = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
            const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, '');
            
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDate}/${endDate}&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
            
            window.open(googleCalendarUrl, '_blank');
        });
    }
}

// Kontrol Video
function initVideoControl() {
    const videoControl = document.getElementById('videoControl');
    const video = document.getElementById('bgVideo');
    
    if (videoControl && video) {
        videoControl.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                videoControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                videoControl.style.background = 'rgba(255, 255, 255, 0.25)';
            } else {
                video.muted = true;
                videoControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
                videoControl.style.background = 'rgba(255, 255, 255, 0.15)';
            }
        });
    }
}

// Smooth Scroll Functionality
function initSmoothScroll() {
    // Enable smooth scrolling untuk seluruh halaman
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Click scroll indicator untuk scroll ke bawah
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize semua fungsi ketika DOM siap
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initCountdown();
    initSaveDate();
    initVideoControl();
    initSmoothScroll();
    
    // Recreate particles jika ada resize
    window.addEventListener('resize', function() {
        createParticles();
    });
});

// Optional: Add intersection observer untuk efek saat scroll
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe semua sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
}

// Panggil initScrollEffects jika ada sections
document.addEventListener('DOMContentLoaded', function() {
    // ... fungsi lainnya ...
    
    // Jika ada sections, init scroll effects
    if (document.querySelector('.page-section')) {
        initScrollEffects();
    }
});