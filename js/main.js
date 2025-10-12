// ==========================================
// Preloader
// ==========================================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// ==========================================
// Particles.js Configuration
// ==========================================

particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#3b82f6'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ==========================================
// GSAP Setup & Registration
// ==========================================

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// Theme Toggle
// ==========================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==========================================
// Mobile Navigation
// ==========================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');

    // Animate hamburger
    const spans = mobileToggle.querySelectorAll('span');
    if (mobileToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');

        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==========================================
// Navbar Scroll Effect
// ==========================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==========================================
// Active Navigation Link on Scroll
// ==========================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
});

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Scroll to Top Button
// ==========================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// GSAP Animations
// ==========================================

// Hero section animations with stagger effect
gsap.from('.greeting', {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.2
});

gsap.from('.name', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out',
    delay: 0.4
});

gsap.from('.hero-subtitle', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out',
    delay: 0.6
});

gsap.from('.hero-tagline', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.8
});

gsap.from('.hero-cta .btn', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    delay: 1
});

gsap.from('.hero-visual', {
    opacity: 0,
    scale: 0.8,
    rotation: 10,
    duration: 1.2,
    ease: 'elastic.out(1, 0.5)',
    delay: 0.5
});

// Animate sections on scroll with scale effect
gsap.utils.toArray('.section').forEach(section => {
    const title = section.querySelector('.section-title');
    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.5,
            y: 30,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    }
});

// Animate skill categories with rotation
gsap.utils.toArray('.skill-category').forEach((category, index) => {
    gsap.from(category, {
        scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        rotation: 5,
        scale: 0.9,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'back.out(1.7)'
    });

    // Animate skill tags within each category
    const tags = category.querySelectorAll('.skill-tag');
    gsap.from(tags, {
        scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.05,
        delay: index * 0.15 + 0.3,
        ease: 'back.out(1.7)'
    });
});

// Animate project cards with flip effect
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 60,
        rotationX: -15,
        scale: 0.9,
        duration: 0.9,
        delay: index * 0.2,
        ease: 'power3.out'
    });

    // Add parallax effect on scroll
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -30
    });
});

// Animate about stats with bounce
gsap.utils.toArray('.stat-item').forEach((stat, index) => {
    gsap.from(stat, {
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0,
        y: 100,
        rotation: 360,
        duration: 1,
        delay: index * 0.2,
        ease: 'elastic.out(1, 0.5)'
    });
});

// Animate timeline items
gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power2.out'
    });
});

// Animate contact form
gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: 'power2.out'
});

// Animate contact methods
gsap.utils.toArray('.contact-method').forEach((method, index) => {
    gsap.from(method, {
        scrollTrigger: {
            trigger: '.contact-methods',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
    });
});

// ==========================================
// Counter Animation for Stats
// ==========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is in view
ScrollTrigger.create({
    trigger: '.about-stats',
    start: 'top 80%',
    once: true,
    onEnter: () => {
        const statItems = document.querySelectorAll('.stat-item h3');
        statItems.forEach(item => {
            const text = item.textContent;
            if (text === '∞') return; // Skip infinity symbol
            const target = parseInt(text);
            if (!isNaN(target)) {
                item.textContent = '0+';
                animateCounter(item, target);
            }
        });
    }
});

// ==========================================
// Contact Form Handler
// ==========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    submitBtn.disabled = true;

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            formMessage.textContent = result.message || 'Message sent successfully! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        formMessage.textContent = error.message || 'Oops! Something went wrong. Please try again.';
        formMessage.className = 'form-message error';
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// ==========================================
// Resume Download Handler
// ==========================================

const resumeBtn = document.getElementById('resumeBtn');

resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // You can replace this with actual resume download link
    alert('Resume download will be available soon! For now, please connect with me on LinkedIn.');

    // Uncomment this when you have a resume file
    // window.open('/resume.pdf', '_blank');
});

// ==========================================
// Typing Effect for Hero Tagline (Optional Enhancement)
// ==========================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// const tagline = document.querySelector('.hero-tagline');
// const taglineText = tagline.textContent;
// setTimeout(() => {
//     typeWriter(tagline, taglineText, 30);
// }, 1000);

// ==========================================
// Parallax Effect for Hero Section
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');

    if (hero && window.innerWidth > 768) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ==========================================
// Cursor Trail Effect (Optional Enhancement)
// ==========================================

let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return; // Disable on mobile

    cursorTrail.push({ x: e.clientX, y: e.clientY });

    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ==========================================
// Easter Egg: Konami Code
// ==========================================

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Add fun animation or effect
    document.body.style.animation = 'rainbow 2s linear infinite';

    setTimeout(() => {
        document.body.style.animation = 'none';
    }, 5000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ==========================================
// Mouse Cursor Effect (Custom Cursor)
// ==========================================

let cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let cursorDot = document.createElement('div');
cursorDot.className = 'custom-cursor-dot';
document.body.appendChild(cursorDot);

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 40px;
        height: 40px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
        opacity: 0;
    }
    .custom-cursor-dot {
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    }
    .custom-cursor.active {
        transform: scale(1.5);
        border-color: var(--secondary-color);
    }
    @media (max-width: 768px) {
        .custom-cursor, .custom-cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursor.style.transform = 'translate(-50%, -50%)';

    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    cursorDot.style.transform = 'translate(-50%, -50%)';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effects
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ==========================================
// Form Validation Enhancement
// ==========================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'var(--error-color)';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = 'var(--error-color)';
    }
});

// ==========================================
// Performance Optimization: Lazy Loading
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Console Message (Fun Easter Egg)
// ==========================================

console.log('%c👋 Hello, curious developer!', 'font-size: 20px; color: #3b82f6; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #8b5cf6;');
console.log('%chttps://www.linkedin.com/in/antonio-michael', 'font-size: 12px; color: #06b6d4;');

// ==========================================
// Analytics Helper (Placeholder)
// ==========================================

function trackEvent(eventName, eventData = {}) {
    // Replace with your analytics implementation
    // Example: gtag('event', eventName, eventData);
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const btnText = e.target.textContent.trim();
        trackEvent('button_click', { button_name: btnText });
    });
});

// ==========================================
// Print Styles Helper
// ==========================================

window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});
