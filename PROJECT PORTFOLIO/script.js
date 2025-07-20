// Global variables
let scrollProgress = 0;
let lastScrollTop = 0;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeParticles();
    initializeTypingEffect();
    initializeSmoothScrolling();
});

// Initialize all animations
function initializeAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update scroll progress
        scrollProgress = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
        updateScrollProgress();
    });

    // Mobile menu toggle
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on nav links
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
                
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(element => {
        observer.observe(element);
    });

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(element => {
        observer.observe(element);
    });
}

// Skill bar animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        bar.setAttribute('data-target-width', width);
    });
}

function animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.progress-bar');
    const targetWidth = progressBar.getAttribute('data-target-width');
    
    setTimeout(() => {
        progressBar.style.width = targetWidth + '%';
        
        // Add shimmer effect
        progressBar.style.background = `
            linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%),
            linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)
        `;
        progressBar.style.backgroundSize = '100% 100%, 200% 100%';
        progressBar.style.animation = 'shimmer 2s ease-in-out';
    }, 200);
}

// Counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        counter.textContent = '0';
        counter.setAttribute('data-target', counter.getAttribute('data-count'));
    });
}

function animateCounter(statItem) {
    const counter = statItem.querySelector('.stat-number');
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

// Particle system
function initializeParticles() {
    const particleContainer = document.querySelector('.particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 15 + 's';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
}

// Enhanced typing effect
function initializeTypingEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    const text = typewriterElement.textContent;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenWords = 2000;
    
    let charIndex = 0;
    let isDeleting = false;
    
    typewriterElement.textContent = '';
    
    function type() {
        if (isDeleting) {
            typewriterElement.textContent = text.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = text.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === text.length) {
            setTimeout(() => {
                isDeleting = true;
                setTimeout(type, erasingSpeed);
            }, delayBetweenWords);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
        }
    }
    
    // Start typing effect after page load
    setTimeout(type, 1000);
}

// Smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll progress indicator
function updateScrollProgress() {
    // You can add a scroll progress bar here if needed
    // For now, we'll use it to trigger additional animations
    
    if (scrollProgress > 0.1) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });
});

// Contact form interactions (if you add a form later)
function initializeContactForm() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactType = this.querySelector('.contact-details strong').textContent;
            const contactValue = this.querySelector('.contact-details span').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Handle different contact types
            if (contactType.includes('Email')) {
                window.location.href = `mailto:${contactValue}`;
            } else if (contactType.includes('Phone')) {
                window.location.href = `tel:${contactValue}`;
            }
        });
    });
}

// Initialize contact interactions
document.addEventListener('DOMContentLoaded', initializeContactForm);

// Add custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item, .contact-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        document.querySelector('.swoop-in').style.opacity = '1';
        document.querySelector('.swoop-in').style.transform = 'translateY(0)';
    }, 300);
});

// Add CSS animations keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% { background-position: 0% 50%, -200% 50%; }
        100% { background-position: 0% 50%, 200% 50%; }
    }
    
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.3s ease;
        transform: translate(-50%, -50%);
    }
    
    .custom-cursor.hover {
        width: 40px;
        height: 40px;
        background: rgba(99, 102, 241, 0.3);
        border: 2px solid rgba(99, 102, 241, 0.8);
    }
    
    .loaded .hero-text h1 {
        animation: swoopIn 1.2s ease-out forwards;
    }
    
    .nav-links a.active {
        color: #6366f1;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);