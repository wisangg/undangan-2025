/// ==================== //
// WEDDING WEBSITE JS - CLEAN VERSION
// ==================== //

// Initialize everything after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) {
        document.body.classList.add('loaded');
        initAll();
        return;
    }
    
    const minLoadTime = 1500;
    const loadStart = Date.now();
    
    window.addEventListener('load', function() {
        const loadTime = Date.now() - loadStart;
        const remainingTime = Math.max(0, minLoadTime - loadTime);
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.classList.add('loaded');
            initAll();
        }, remainingTime);
    });
});

function initAll() {
    initTouchOptimizations();
    initSmoothScrolling();
    initHeaderEffects();
    initBackgroundSlideshow();
    initGalleryInteractions();
    initCountdownTimer();
    initCleanAnimations(); // ✅ UPDATED - Clean version
    initRSVPForm();
    initDynamicEventSelection();
}

// Touch device optimizations
function initTouchOptimizations() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Effects
function initHeaderEffects() {
    const header = document.querySelector('.minimal-header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        header.style.opacity = scrollY > 100 ? '0.7' : '1';
        
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Background Slideshow - CLEAN VERSION
function initBackgroundSlideshow() {
    const bgLayers = document.querySelectorAll('.bg-layer');
    if (bgLayers.length === 0) return;

    let currentIndex = 0;
    let isAnimating = false;

    function preloadImages() {
        const images = [
            'images/photo1.jpg',
            'images/photo2.jpg', 
            'images/photo3.jpg',
            'images/photo4.jpg'
        ];
        
        let loadedCount = 0;
        const totalImages = images.length;

        images.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    console.log('🎨 All background images loaded');
                    startSlideshow();
                }
            };
            img.src = src;
        });
    }

    function startSlideshow() {
        // Set initial active layer
        bgLayers[0].classList.add('active');
        bgLayers[0].style.opacity = '1';
        bgLayers[0].style.transform = 'scale(1)';

        // Auto slideshow setiap 5 detik - NO SCROLL TRIGGERS
        setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 5000);
    }

    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;

        const currentLayer = bgLayers[currentIndex];
        const nextIndex = (currentIndex + 1) % bgLayers.length;
        const nextLayer = bgLayers[nextIndex];

        // Reset next layer position
        nextLayer.style.opacity = '0';
        nextLayer.style.transform = 'scale(1.1)';
        nextLayer.classList.add('active');

        // GSAP animation
        const tl = gsap.timeline({
            onComplete: () => {
                currentLayer.classList.remove('active');
                currentIndex = nextIndex;
                isAnimating = false;
            }
        });

        tl.to(currentLayer, {
            opacity: 0,
            scale: 1.1,
            duration: 2,
            ease: "power2.inOut"
        }, 0);

        tl.to(nextLayer, {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power2.inOut"
        }, 0);
    }

    preloadImages();
}

// ✅ CLEAN ANIMATIONS - NO CONFLICTS
function initCleanAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded - using fallback animations');
        initFallbackAnimations();
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // 1. HERO ANIMATIONS ONLY - No conflicts here
    const heroSection = document.querySelector('.wedding-hero');
    if (heroSection) {
        gsap.timeline()
            .from('.wedding-intro', {
                opacity: 0, y: 50, duration: 1, ease: "power2.out"
            })
            .from('.couple-name', {
                opacity: 0, y: 80, duration: 1.2, ease: "power2.out"
            }, "-=0.5")
            .from('.wedding-date', {
                opacity: 0, y: 30, duration: 1, ease: "power2.out"
            }, "-=0.3")
            .from('.scroll-indicator', {
                opacity: 0, duration: 0.8, ease: "power2.out"
            });
    }

    // 2. COUPLE SECTION - ONE ANIMATION ONLY
    const coupleSection = document.querySelector('.couple-section');
    if (coupleSection) {
        gsap.from('.couple-section .profile-card', {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.couple-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // 3. STORY SECTION - ONE ANIMATION ONLY  
    const storySection = document.querySelector('.story-section');
    if (storySection) {
        gsap.from('.timeline-item', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.story-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // 4. GALLERY SECTION - ONE ANIMATION ONLY
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        gsap.from('.gallery-item', {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: '.gallery-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // 5. EVENTS SECTION - ONE ANIMATION ONLY
    const eventsSection = document.querySelector('.events-section');
    if (eventsSection) {
        gsap.from('.event-card', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.events-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // 6. RSVP SECTION - ONE ANIMATION ONLY
    const rsvpSection = document.querySelector('.rsvp-section');
    if (rsvpSection) {
        gsap.from('.rsvp-form', {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.rsvp-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
    }
}

// Fallback animations
function initFallbackAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Hanya element utama saja - no duplicates
    const elementsToAnimate = [
        '.profile-card',
        '.timeline-item', 
        '.gallery-item',
        '.event-card',
        '.rsvp-form'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    });
}

// Gallery Interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems.length) return;
    
    let isAnimating = false;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (isAnimating) return;
            isAnimating = true;
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                isAnimating = false;
            }, 200);
        });

        if (window.matchMedia('(hover: hover)').matches) {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
    });
}

// Countdown Timer
function initCountdownTimer() {
    const countdownContainer = document.querySelector('.wedding-date');
    if (!countdownContainer) return;
    
    function updateCountdown() {
        const weddingDate = new Date('2024-06-15T08:00:00+07:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            if (!countdownContainer.dataset.original) {
                countdownContainer.dataset.original = countdownContainer.textContent;
            }
            
            if (days <= 30) {
                countdownContainer.innerHTML = `
                    ${countdownContainer.dataset.original}<br>
                    <small style="font-size: 0.7em; opacity: 0.8;">
                        ${days} Hari ${hours} Jam ${minutes} Menit
                    </small>
                `;
            }
        } else {
            countdownContainer.innerHTML = `
                ${countdownContainer.dataset.original}<br>
                <small style="font-size: 0.7em; opacity: 0.8;">
                    🎉 Hari Bahagia Telah Tiba! 🎉
                </small>
            `;
        }
    }
    
    setInterval(updateCountdown, 60000);
    updateCountdown();
}

// Dynamic Event Selection
function initDynamicEventSelection() {
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const eventSelection = document.getElementById('event-selection');
    
    if (!attendanceRadios.length || !eventSelection) return;
    
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                eventSelection.style.display = 'block';
                gsap.fromTo(eventSelection, 
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
            } else {
                gsap.to(eventSelection, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        eventSelection.style.display = 'none';
                    }
                });
            }
        });
    });
}

// RSVP Form Handler
function initRSVPForm() {
    const rsvpForm = document.getElementById('wedding-rsvp');
    if (!rsvpForm) return;
    
    // Load saved form data
    const savedFormData = localStorage.getItem('wedding-rsvp-data');
    if (savedFormData) {
        try {
            const formData = JSON.parse(savedFormData);
            Object.keys(formData).forEach(key => {
                const input = rsvpForm.querySelector(`[name="${key}"]`);
                if (input) {
                    if (input.type === 'radio' || input.type === 'checkbox') {
                        if (input.value === formData[key]) {
                            input.checked = true;
                        }
                    } else {
                        input.value = formData[key];
                    }
                }
            });
        } catch (e) {
            console.log('No saved form data');
        }
    }
    
    // Auto-save form data
    rsvpForm.addEventListener('input', function() {
        const formData = new FormData(this);
        const data = {};
        
        const attendance = rsvpForm.querySelector('input[name="attendance"]:checked');
        if (attendance) data.attendance = attendance.value;
        
        ['full_name', 'email', 'phone', 'guest_count', 'message'].forEach(field => {
            const input = rsvpForm.querySelector(`[name="${field}"]`);
            if (input) data[field] = input.value;
        });
        
        const events = [];
        rsvpForm.querySelectorAll('input[name="events[]"]:checked').forEach(checkbox => {
            events.push(checkbox.value);
        });
        data.events = events;
        
        localStorage.setItem('wedding-rsvp-data', JSON.stringify(data));
    });
    
    // Form submission
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[name="full_name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const phone = this.querySelector('input[name="phone"]').value.trim();
        const attendance = this.querySelector('input[name="attendance"]:checked');
        const guestCount = this.querySelector('input[name="guest_count"]').value;
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        // Validation
        if (!name) {
            showFormMessage('Mohon masukkan nama lengkap Anda', 'error');
            highlightInvalidField(this.querySelector('input[name="full_name"]'));
            return;
        }
        
        if (!attendance) {
            showFormMessage('Mohon konfirmasi kehadiran Anda', 'error');
            return;
        }

        if (email && !isValidEmail(email)) {
            showFormMessage('Mohon masukkan alamat email yang valid', 'error');
            highlightInvalidField(this.querySelector('input[name="email"]'));
            return;
        }
        
        if (!phone || phone.length < 10) {
            showFormMessage('Mohon masukkan nomor WhatsApp yang valid', 'error');
            highlightInvalidField(this.querySelector('input[name="phone"]'));
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-rsvp');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        if (btnText && btnLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        }
        
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            const successDiv = document.getElementById('rsvp-success');
            const rsvpSection = document.querySelector('.rsvp-section .container');
            
            if (successDiv && rsvpSection) {
                rsvpForm.style.display = 'none';
                successDiv.style.display = 'block';
                
                const personalizedMsg = attendance.value === 'yes' 
                    ? `Terima kasih ${name}! Kami tidak sabar bertemu dengan Anda di hari bahagia kami! 💖`
                    : `Terima kasih ${name} atas konfirmasinya. Doa dan ucapan Anda sangat berarti bagi kami. 🙏`;
                
                successDiv.querySelector('p:last-child').textContent = personalizedMsg;
                
                if (attendance.value === 'yes') {
                    createCelebrationEffect();
                }
            }
            
            localStorage.removeItem('wedding-rsvp-data');
            
        }, 2000);
    });
}

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function highlightInvalidField(field) {
    field.style.borderColor = '#dc3545';
    field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    setTimeout(() => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }, 3000);
}

function showFormMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message alert alert-${type === 'error' ? 'danger' : 'success'} mt-3`;
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${message}</span>
            <button class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    const rsvpForm = document.getElementById('wedding-rsvp');
    if (rsvpForm) rsvpForm.parentNode.insertBefore(messageDiv, rsvpForm.nextSibling);
    
    const removeTime = type === 'success' ? 8000 : 5000;
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-20px)';
            messageDiv.style.transition = 'all 0.5s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) messageDiv.remove();
            }, 500);
        }
    }, removeTime);
}

function createCelebrationEffect() {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        pointer-events: none; z-index: 10000;
    `;
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: absolute; font-size: ${20 + Math.random() * 20}px;
            left: ${Math.random() * 100}%; top: 100%;
            animation: floatUp ${2 + Math.random() * 2}s ease-in forwards;
        `;
        celebration.appendChild(heart);
    }
    
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 3000);
}

// Add CSS for floatUp animation if not exists
if (!document.querySelector('#floatUp-animation')) {
    const style = document.createElement('style');
    style.id = 'floatUp-animation';
    style.textContent = `
        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

console.log('🎉 Wedding website enhanced successfully!');
console.log('💖 Gung Gus & Sonia - 15.06.2024');