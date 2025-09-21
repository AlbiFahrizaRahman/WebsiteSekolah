// Multi-page functionality
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update active navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.querySelectorAll(`.nav-link[href="#${pageId}"]`).forEach(link => {
        link.classList.add('active');
    });

    // If it's a subpage, also activate the parent menu
    if (pageId === 'profil-siswa' || pageId === 'profil-guru') {
        document.querySelector('.nav-link[href="#profil"]').classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Trigger animations for the new page
    setTimeout(observeElements, 100);
}

// Mobile Menu Toggle with improved animation
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');
const overlay = document.querySelector('.overlay');
const body = document.body;
const closeMenu = document.querySelector('.close-menu');

// Toggle mobile menu
function toggleMenu() {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('active');
    overlay.classList.toggle('active');

    // Prevent body scrolling when menu is open
    if (navMobile.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

// Mobile submenu toggle
const submenuToggles = document.querySelectorAll('.submenu-toggle');
submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const submenu = this.nextElementSibling;
        const icon = this.querySelector('.fa-chevron-down');

        submenu.classList.toggle('active');
        icon.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
    });
});

// Mobile menu links
const mobileLinks = document.querySelectorAll('.nav-mobile a:not(.submenu-toggle)');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
    });
});

// Form Validation - Upgraded
const formUpgraded = document.getElementById('suggestionFormUpgraded');

if (formUpgraded) {
    formUpgraded.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name validation
        const nameInput = document.getElementById('name-upgraded');
        const nameError = nameInput.nextElementSibling;

        if (nameInput.value.trim() === '') {
            nameInput.classList.add('error');
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameInput.classList.remove('error');
            nameError.style.display = 'none';
        }

        // Email validation
        const emailInput = document.getElementById('email-upgraded');
        const emailError = emailInput.nextElementSibling;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add('error');
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailInput.classList.remove('error');
            emailError.style.display = 'none';
        }

        // Message validation
        const messageInput = document.getElementById('message-upgraded');
        const messageError = messageInput.nextElementSibling;

        if (messageInput.value.trim() === '') {
            messageInput.classList.add('error');
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageInput.classList.remove('error');
            messageError.style.display = 'none';
        }

        if (isValid) {
            // Save to localStorage if remember me is checked
            const rememberCheckbox = document.getElementById('remember-upgraded');
            if (rememberCheckbox.checked) {
                localStorage.setItem('contactFormName', nameInput.value);
                localStorage.setItem('contactFormEmail', emailInput.value);
            } else {
                localStorage.removeItem('contactFormName');
                localStorage.removeItem('contactFormEmail');
            }
            
            showToast('success', 'Pesan Terkirim!', 'Terima kasih atas saran Anda. Kami akan meninjau pesan Anda segera.');
            formUpgraded.reset();
        }
    });
}

// Scroll Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
function observeElements() {
    const animatedElements = document.querySelectorAll('.routine-card, .mission-item, .student-card, .teacher-card, .extracurricular-card, .map-img, .vision-card, .goal-card, .gallery-item, .news-card, .contact-form-upgraded');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize the first page
document.addEventListener('DOMContentLoaded', function() {
    showPage('beranda');

    // Add animation to hero elements
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .btn, .hero-img');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // Initial observation of elements
    observeElements();

    // Load saved form data if exists
    const savedName = localStorage.getItem('contactFormName');
    const savedEmail = localStorage.getItem('contactFormEmail');
    
    if (savedName) {
        const nameInput = document.getElementById('name-upgraded');
        if (nameInput) nameInput.value = savedName;
    }
    
    if (savedEmail) {
        const emailInput = document.getElementById('email-upgraded');
        if (emailInput) emailInput.value = savedEmail;
        
        const rememberCheckbox = document.getElementById('remember-upgraded');
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    // Check if easter egg was previously unlocked
    if (localStorage.getItem('EasterEggUnlocked') === 'true') {
        unlockGameFeature();
    }
});

// Close menu when clicking outside on mobile
document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMobile.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (navMobile.classList.contains('active') && !isClickInsideMenu && !isClickOnHamburger) {
        toggleMenu();
    }
});

// Handle escape key to close menu
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navMobile.classList.contains('active')) {
        toggleMenu();
    }
});

// Add pulse animation to some elements
function addPulseAnimation() {
    const elementsToPulse = document.querySelectorAll('.btn, .social-icon');
    elementsToPulse.forEach(el => {
        el.classList.add('pulse');
    });
}

// Debounce function untuk optimasi performa
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimasi scroll event dengan debounce
const optimizedScroll = debounce(function() {
    // Kode yang berhubungan dengan scroll
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Run after page load
window.addEventListener('load', addPulseAnimation);

// ============================
// EASTER EGG FUNCTIONALITY - UPGRADED
// ============================

let clickCount = 0;
let lastClickTime = 0;
const logo = document.getElementById('logo-click');
const toastContainer = document.getElementById('toastContainer');
const gameNavItems = document.querySelectorAll('.game-nav-item');
const gamePanel = document.getElementById('gamePanel');
const gamePreview = document.getElementById('gamePreview');
const gameFrame = document.getElementById('gameFrame');
const gamePreviewTitle = document.getElementById('gamePreviewTitle');
const socialNote = document.getElementById('socialNote');

// Social media URLs
const socialUrls = {
    tiktok: 'https://www.tiktok.com/@smpn3haurwangi.official?_t=ZS-8zngK163pwK&_r=1',
    facebook: '#',
    instagram: 'https://www.instagram.com/smpn3haurwangi?igsh=MTIyM3Q2dWRjenQ0',
    youtube: 'https://youtube.com/@smpnegeri3haurwangi944'
};

let currentSocialPlatform = '';

// Function to show toast notification - Upgraded
function showToast(type, title, message) {
    // Remove any existing toasts
    const existingToasts = toastContainer.querySelectorAll('.toast');
    existingToasts.forEach(toast => {
        toastContainer.removeChild(toast);
    });

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'easter-egg' ? 'easter-egg-unlocked' : ''}`;
    
    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'easter-egg') icon = 'fas fa-gamepad';
    
    toast.innerHTML = `
        <i class="${icon} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.classList.remove('show')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toastContainer.contains(toast)) {
                toastContainer.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Function to handle logo clicks for easter egg
function handleLogoClick() {
    const currentTime = new Date().getTime();
    
    // Reset count if more than 1 second has passed since last click
    if (currentTime - lastClickTime > 1000) {
        clickCount = 0;
    }
    
    clickCount++;
    lastClickTime = currentTime;
    
    // Show notification only if not already unlocked
    if (localStorage.getItem('EasterEggUnlocked') !== 'true') {
        showToast('info', 'Klik Logo', `Clicked ${clickCount}`);
    }
    
    // Check if user has clicked 5 times in a row
    if (clickCount === 5) {
        // Check if already unlocked
        if (localStorage.getItem('EasterEggUnlocked') === 'true') {
            showToast('easter-egg', 'Easter Egg', 'Kamu sudah membuka easter egg nya!', true);
        } else {
            showToast('easter-egg', 'Easter Egg Terbuka!', 'Fitur game telah ditambahkan ke navigasi.', true);
            
            // Unlock the game feature
            unlockGameFeature();
        }
        
        // Reset count
        clickCount = 0;
    }
}

// Function to unlock the game feature
function unlockGameFeature() {
    // Show game icon in navigation
    gameNavItems.forEach(item => {
        item.classList.add('unlocked');
    });
    
    // Save to localStorage to remember the unlocked state
    localStorage.setItem('EasterEggUnlocked', 'true');
    localStorage.setItem('EasterEggUnlockedAt', new Date().toISOString());
}

// Function to show game panel
function showGamePanel() {
    // Check if easter egg is unlocked
    if (localStorage.getItem('EasterEggUnlocked') !== 'true') {
        showToast('info', 'Akses Ditolak', 'Fitur game belum terbuka.');
        return;
    }
    
    gamePanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to hide game panel
function hideGamePanel() {
    gamePanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Function to open a game
function openGame(gameType) {
    let gameUrl, gameName;
    
    if (gameType === 'snake') {
        gameUrl = 'https://piyush97.github.io/snake-game/';
        gameName = 'Snake Game';
    } else if (gameType === 'flappy') {
        gameUrl = 'https://codehz.github.io/FlappyBird/';
        gameName = 'Flappy Bird';
    }
    
    // Set iframe source and title
    gameFrame.src = gameUrl;
    gamePreviewTitle.textContent = gameName;
    
    // Show game preview
    gamePreview.classList.add('active');
    hideGamePanel();
}

// Function to close the game preview
function closeGame() {
    gamePreview.classList.remove('active');
    gameFrame.src = '';
}

// Function to show social media note
function showSocialNote(platform, platformName, iconClass) {
    currentSocialPlatform = platform;
    
    // Update note content
    document.getElementById('socialNotePlatform').innerHTML = `
        <i class="${iconClass}"></i>
        <span>${platformName}</span>
    `;
    
    // Show note
    socialNote.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to hide social note
function hideSocialNote() {
    socialNote.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentSocialPlatform = '';
}

// Function to continue to social media
function continueToSocial() {
    if (currentSocialPlatform && socialUrls[currentSocialPlatform]) {
        window.open(socialUrls[currentSocialPlatform], '_blank');
    }
    hideSocialNote();
}

// Add event listener to logo
logo.addEventListener('click', function(e) {
    e.preventDefault();
    handleLogoClick();
});

// Close panels when clicking outside
overlay.addEventListener('click', function() {
    if (gamePanel.classList.contains('active')) {
        hideGamePanel();
    }
    if (socialNote.classList.contains('active')) {
        hideSocialNote();
    }
});

// Close game preview with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (gamePreview.classList.contains('active')) {
            closeGame();
        }
        if (socialNote.classList.contains('active')) {
            hideSocialNote();
        }
        if (gamePanel.classList.contains('active')) {
            hideGamePanel();
        }
    }
});

// Reset Data Functionality
function showResetConfirmation() {
    const resetConfirmation = document.getElementById('resetConfirmation');
    resetConfirmation.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideResetConfirmation() {
    const resetConfirmation = document.getElementById('resetConfirmation');
    resetConfirmation.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function resetData() {
    // Clear localStorage
    localStorage.removeItem('contactFormName');
    localStorage.removeItem('contactFormEmail');
    localStorage.removeItem('EasterEggUnlocked');
    localStorage.removeItem('EasterEggUnlockedAt');
    
    // Reset form if on contact page
    if (document.getElementById('kontak').classList.contains('active')) {
        const formUpgraded = document.getElementById('suggestionFormUpgraded');
        if (formUpgraded) formUpgraded.reset();
        
        const rememberCheckbox = document.getElementById('remember-upgraded');
        if (rememberCheckbox) rememberCheckbox.checked = false;
    }
    
    // Lock game feature if unlocked
    const gameNavItems = document.querySelectorAll('.game-nav-item');
    gameNavItems.forEach(item => {
        item.classList.remove('unlocked');
    });
    
    // Show success message
    showToast('success', 'Reset Berhasil', 'Semua data telah direset dari browser ini.');
    
    // Hide confirmation modal
    hideResetConfirmation();
}

// Teacher scroll functionality
function scrollTeachers(direction) {
    const teacherScroll = document.getElementById('teacherScroll');
    const scrollAmount = 320; // Width of one card + gap
    
    if (direction === 'left') {
        teacherScroll.scrollLeft -= scrollAmount;
    } else {
        teacherScroll.scrollLeft += scrollAmount;
    }
}

// Prevent scroll propagation from teacher scroll to the main page
document.addEventListener('DOMContentLoaded', function() {
    const teacherScroll = document.getElementById('teacherScroll');
    
    if (teacherScroll) {
        teacherScroll.addEventListener('wheel', function(e) {
            // Only prevent default if we're scrolling horizontally
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // For touch devices
        let touchStartX = 0;
        let touchScrollLeft = 0;
        
        teacherScroll.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchScrollLeft = teacherScroll.scrollLeft;
        }, { passive: true });
        
        teacherScroll.addEventListener('touchmove', function(e) {
            if (!touchStartX) return;
            
            const touchX = e.touches[0].clientX;
            const walk = (touchStartX - touchX) * 2; // Scroll speed
            
            teacherScroll.scrollLeft = touchScrollLeft + walk;
        }, { passive: true });
    }
});
