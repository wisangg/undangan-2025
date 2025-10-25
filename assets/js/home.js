// Initialize everything after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Initializing wedding website...");

  const preloader = document.querySelector(".preloader");
  const minLoadTime = 2000;
  const loadStart = Date.now();

  function completeLoading() {
    const loadTime = Date.now() - loadStart;
    const remainingTime = Math.max(0, minLoadTime - loadTime);

    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }
      document.body.classList.add("loaded");
      initAll();

      setTimeout(() => {
        if (preloader && preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 1000);
    }, remainingTime);
  }

  if (!preloader) {
    document.body.classList.add("loaded");
    initAll();
    return;
  }

  const loadTimeout = setTimeout(completeLoading, minLoadTime + 1000);

  window.addEventListener("load", function () {
    clearTimeout(loadTimeout);
    completeLoading();
  });
});

function initAll() {
  console.log("🎯 Initializing all features...");

  try {
    initTouchOptimizations();
    initSmoothScrolling();
    initHeaderEffects();
    initBackgroundSlideshow();
    initGalleryInteractions();
    initCountdownTimer();
    initCleanAnimations();
    initRSVPForm();
    initDynamicEventSelection();

    console.log("✅ All features initialized successfully");
  } catch (error) {
    console.error("❌ Error initializing features:", error);
    initFallbackAnimations();
  }
}

// Touch device optimizations
function initTouchOptimizations() {
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.body.classList.add("touch-device");
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = 80;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        history.pushState(null, null, href);
      }
    });
  });
}

// Header Effects
function initHeaderEffects() {
  const header = document.querySelector(".minimal-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      header.style.opacity = "0.8";
    } else {
      header.style.opacity = "1";
    }
  });
}

// Background Slideshow
function initBackgroundSlideshow() {
  const bgLayers = document.querySelectorAll(".bg-layer");
  if (bgLayers.length === 0) {
    console.log("❌ No background layers found");
    return;
  }

  let currentIndex = 0;
  let isAnimating = false;
  let slideshowInterval;

  function preloadImages() {
    const images = [
      "images/photo1.jpg",
      "images/photo2.jpg",
      "images/photo3.jpg",
      "images/photo4.jpg",
    ];

    let loadedCount = 0;
    const totalImages = images.length;

    images.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount++;
        console.log(`🖼️ Loaded image ${loadedCount}/${totalImages}: ${src}`);
        if (loadedCount === totalImages) {
          console.log("✅ All background images loaded");
          startSlideshow();
        }
      };
      img.src = src;
    });
  }

  function startSlideshow() {
    bgLayers[0].classList.add("active");

    if (slideshowInterval) clearInterval(slideshowInterval);

    slideshowInterval = setInterval(() => {
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

    nextLayer.style.opacity = "0";
    nextLayer.classList.add("active");

    setTimeout(() => {
      nextLayer.style.opacity = "1";
      nextLayer.style.transition = "opacity 2s ease-in-out";
    }, 50);

    currentLayer.style.opacity = "0";
    currentLayer.style.transition = "opacity 2s ease-in-out";

    setTimeout(() => {
      currentLayer.classList.remove("active");
      currentIndex = nextIndex;
      isAnimating = false;
    }, 2000);
  }

  preloadImages();
}

// Clean Animations
function initCleanAnimations() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded - using fallback animations");
    initFallbackAnimations();
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero animations
  const heroElements = [
    ".wedding-intro",
    ".couple-name",
    ".wedding-date",
    ".scroll-indicator",
  ];

  heroElements.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: index * 0.3,
        ease: "power2.out",
      });
    }
  });

  // Section animations
  if (typeof ScrollTrigger !== "undefined") {
    const sections = [
      { selector: ".couple-section", elements: ".container" },
      { selector: ".gallery-section", elements: ".gallery-item" },
      { selector: ".events-section", elements: ".event-card" },
      { selector: ".rsvp-section", elements: ".rsvp-form" },
    ];

    sections.forEach((section) => {
      const sectionEl = document.querySelector(section.selector);
      const elements = document.querySelectorAll(section.elements);

      if (sectionEl && elements.length > 0) {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section.selector,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    });
  } else {
    initFallbackAnimations();
  }
}

// Fallback animations
function initFallbackAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = [".gallery-item", ".event-card", ".rsvp-form"];

  elementsToAnimate.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.8s ease";
      observer.observe(el);
    });
  });
}

// Gallery Interactions
function initGalleryInteractions() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);
    });

    if (window.matchMedia("(hover: hover)").matches) {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
      });

      item.addEventListener("mouseleave", function () {
        this.style.transform = "";
      });
    }
  });
}

// Countdown Timer
function initCountdownTimer() {
  const countdownContainer = document.querySelector(".wedding-date");
  if (!countdownContainer) return;

  const weddingDate = new Date("2024-06-15T08:00:00+07:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      if (days <= 30) {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        if (!countdownContainer.dataset.original) {
          countdownContainer.dataset.original = countdownContainer.textContent;
        }

        countdownContainer.innerHTML = `
          ${countdownContainer.dataset.original}<br>
          <small style="font-size: 0.7em; opacity: 0.8;">
            ${days} Hari ${hours} Jam ${minutes} Menit
          </small>
        `;
      }
    } else {
      if (!countdownContainer.dataset.original) {
        countdownContainer.dataset.original = countdownContainer.textContent;
      }

      countdownContainer.innerHTML = `
        ${countdownContainer.dataset.original}<br>
        <small style="font-size: 0.7em; opacity: 0.8;">
          🎉 Hari Bahagia Telah Tiba! 🎉
        </small>
      `;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
}

// Dynamic Event Selection
function initDynamicEventSelection() {
  const attendanceRadios = document.querySelectorAll(
    'input[name="attendance"]'
  );
  const eventSelection = document.getElementById("event-selection");

  if (!attendanceRadios.length || !eventSelection) return;

  attendanceRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "yes") {
        eventSelection.style.display = "block";
        eventSelection.style.opacity = "0";

        setTimeout(() => {
          eventSelection.style.opacity = "1";
          eventSelection.style.transition = "opacity 0.5s ease";
        }, 10);
      } else {
        eventSelection.style.opacity = "0";
        eventSelection.style.transition = "opacity 0.3s ease";

        setTimeout(() => {
          eventSelection.style.display = "none";
        }, 300);
      }
    });
  });
}

// RSVP Form Handler
function initRSVPForm() {
  const rsvpForm = document.getElementById("wedding-rsvp");
  if (!rsvpForm) return;

  // Load saved form data
  try {
    const savedFormData = localStorage.getItem("wedding-rsvp-data");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      Object.keys(formData).forEach((key) => {
        const input = rsvpForm.querySelector(`[name="${key}"]`);
        if (input) {
          if (input.type === "radio") {
            if (input.value === formData[key]) {
              input.checked = true;
              input.dispatchEvent(new Event("change"));
            }
          } else if (input.type === "checkbox") {
            input.checked = formData[key].includes(input.value);
          } else {
            input.value = formData[key];
          }
        }
      });
    }
  } catch (e) {
    console.log("No valid saved form data");
  }

  // Auto-save form data
  rsvpForm.addEventListener("input", function () {
    const formData = {};

    ["full_name", "email", "phone", "guest_count", "message"].forEach(
      (field) => {
        const input = rsvpForm.querySelector(`[name="${field}"]`);
        if (input) formData[field] = input.value;
      }
    );

    const attendance = rsvpForm.querySelector(
      'input[name="attendance"]:checked'
    );
    if (attendance) formData.attendance = attendance.value;

    const events = [];
    rsvpForm
      .querySelectorAll('input[name="events[]"]:checked')
      .forEach((checkbox) => {
        events.push(checkbox.value);
      });
    formData.events = events;

    localStorage.setItem("wedding-rsvp-data", JSON.stringify(formData));
  });

  // Form submission
  rsvpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[name="full_name"]').value.trim();
    const phone = this.querySelector('input[name="phone"]').value.trim();
    const attendance = this.querySelector('input[name="attendance"]:checked');

    if (!name) {
      showFormMessage("Mohon masukkan nama lengkap Anda", "error");
      return;
    }

    if (!attendance) {
      showFormMessage("Mohon konfirmasi kehadiran Anda", "error");
      return;
    }

    if (!phone || phone.length < 10) {
      showFormMessage("Mohon masukkan nomor WhatsApp yang valid", "error");
      return;
    }

    const submitBtn = this.querySelector(".btn-rsvp");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    if (btnText && btnLoading) {
      btnText.style.display = "none";
      btnLoading.style.display = "flex";
    }

    submitBtn.disabled = true;

    setTimeout(() => {
      const successDiv = document.getElementById("rsvp-success");

      if (successDiv) {
        rsvpForm.style.display = "none";
        successDiv.style.display = "block";

        const message =
          attendance.value === "yes"
            ? `Terima kasih ${name}! Kami tidak sabar bertemu dengan Anda! 💖`
            : `Terima kasih ${name} atas konfirmasinya. Doa Anda sangat berarti! 🙏`;

        successDiv.querySelector("p:last-child").textContent = message;

        if (attendance.value === "yes") {
          createCelebrationEffect();
        }
      }

      localStorage.removeItem("wedding-rsvp-data");
    }, 1500);
  });
}

// Helper Functions
function showFormMessage(message, type) {
  const existingMessages = document.querySelectorAll(".form-message");
  existingMessages.forEach((msg) => msg.remove());

  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message alert alert-${
    type === "error" ? "danger" : "success"
  } mt-3`;
  messageDiv.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span>${message}</span>
      <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()">
        &times;
      </button>
    </div>
  `;

  const rsvpForm = document.getElementById("wedding-rsvp");
  if (rsvpForm) {
    rsvpForm.parentNode.insertBefore(messageDiv, rsvpForm);
  }

  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

function createCelebrationEffect() {
  const celebration = document.createElement("div");
  celebration.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 10000;
  `;

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.cssText = `
      position: absolute; font-size: ${20 + Math.random() * 20}px;
      left: ${Math.random() * 100}%; top: 100%;
      animation: floatUp ${2 + Math.random() * 2}s ease-in forwards;
    `;
    celebration.appendChild(heart);
  }

  document.body.appendChild(celebration);
  setTimeout(() => {
    if (celebration.parentNode) {
      celebration.parentNode.removeChild(celebration);
    }
  }, 3000);
}

// Add floatUp animation if not exists
if (!document.querySelector("#floatUp-animation")) {
  const style = document.createElement("style");
  style.id = "floatUp-animation";
  style.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

console.log("🎉 Wedding website enhanced successfully!");
console.log("💖 Gung Gus & Sonia - 15.06.2024");
