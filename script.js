// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and quality cards
document.querySelectorAll('.feature-card, .quality-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Button click animations
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Billboard-style slideshow functionality
const screenshots = document.querySelectorAll('.app-screenshot');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let isTransitioning = false;

function showSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const previousSlide = currentSlide;
    currentSlide = index;
    
    // Remove all transition classes
    screenshots.forEach(screenshot => {
        screenshot.classList.remove('entering', 'exiting', 'next');
    });
    
    // Set up the new image to fade in
    screenshots[currentSlide].classList.add('next');
    
    // Start crossfade transition
    setTimeout(() => {
        // Fade out current image
        if (screenshots[previousSlide]) {
            screenshots[previousSlide].classList.add('exiting');
            screenshots[previousSlide].classList.remove('active');
        }
        
        // Fade in new image
        screenshots[currentSlide].classList.add('entering');
        screenshots[currentSlide].classList.remove('next');
        
        // Complete transition
        setTimeout(() => {
            screenshots[currentSlide].classList.remove('entering');
            screenshots[currentSlide].classList.add('active');
            
            // Clean up previous slide
            if (screenshots[previousSlide]) {
                screenshots[previousSlide].classList.remove('exiting');
            }
            
            isTransitioning = false;
        }, 1200);
    }, 50);
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % screenshots.length;
    showSlide(nextIndex);
}

// Auto-advance slides every 3 seconds with billboard effect
let slideshowInterval = setInterval(() => {
    if (!isTransitioning) {
        nextSlide();
    }
}, 3000);

// Click on dots to navigate
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (!isTransitioning && index !== currentSlide) {
            showSlide(index);
        }
    });
});

// Add hover pause functionality
const slideshowContainer = document.querySelector('.screenshot-slideshow');

function startSlideshow() {
    slideshowInterval = setInterval(() => {
        if (!isTransitioning) {
            nextSlide();
        }
    }, 3000);
}

function pauseSlideshow() {
    clearInterval(slideshowInterval);
}

// Pause on hover for better user experience
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', pauseSlideshow);
    slideshowContainer.addEventListener('mouseleave', startSlideshow);
}

// Initialize first slide with entrance animation
if (screenshots.length > 0) {
    setTimeout(() => {
        screenshots[0].classList.add('active');
    }, 500);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Form handling for waitlist (if you add a form later)
function handleWaitlistSignup(email) {
    // This would integrate with your backend
    console.log('Waitlist signup:', email);
    alert('Thank you for joining the waitlist! We\'ll notify you when Outline launches.');
}

// Add some interactive elements to the phone mockup
const articleCard = document.querySelector('.article-card');
if (articleCard) {
    articleCard.addEventListener('click', () => {
        articleCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            articleCard.style.transform = 'scale(1)';
        }, 150);
    });
}

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #dc2626, #ef4444);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
}); 