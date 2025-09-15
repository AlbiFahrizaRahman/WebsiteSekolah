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

// Form Validation
const form = document.getElementById('suggestionForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Name validation
        const nameInput = document.getElementById('name');
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
        const emailInput = document.getElementById('email');
        const emailError = emailInput.nextElementSibling;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(emailInput.value)) {
            email extreme.classList.add('error');
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailInput.classList.remove('error');
            emailError.style.display = 'none';
        }
        
        // Message validation
        const messageInput = document.getElementById('message');
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
            alert('Pesan Anda telah berhasil dikirim!');
            form.reset();
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
    const animatedElements = document.querySelectorAll('.routine-card, .mission-item, .student-card, .teacher-card, .extracurricular-card, .map-img, .vision-card, .goal-card, .gallery-item, .news-card, .contact-form');
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