// MonkiiBoard JavaScript

// Global function to add fade-in classes to elements
function addFadeInToElements() {
    // Add fade-in-up to all sections that don't have animation classes
    document.querySelectorAll('section').forEach((section, index) => {
        if (!section.classList.contains('fade-in-up') && 
            !section.classList.contains('fade-in') && 
            !section.classList.contains('hero-section')) {
            section.classList.add('fade-in-up');
        }
    });

    // Add fade-in-up to common content containers
    document.querySelectorAll('.container > *:not(.fade-in-up):not(.fade-in):not([class*="fade"])').forEach((el, index) => {
        if (el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
            el.classList.add('fade-in-up');
        }
    });

    // Add fade-in-up to all .project-card elements on projects page
    document.querySelectorAll('.project-card').forEach((card, index) => {
        if (!card.classList.contains('fade-in-up')) {
            card.classList.add('fade-in-up', `stagger-${(index % 6) + 1}`);
        }
    });

    // Add fade-in-up to all .product-card elements on shop page  
    document.querySelectorAll('.product-card').forEach((card, index) => {
        if (!card.classList.contains('fade-in-up')) {
            card.classList.add('fade-in-up', `stagger-${(index % 6) + 1}`);
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Auto-add fade-in classes to elements
    addFadeInToElements();
    
    setupDropdowns();
    addFadeInToElements(); // Call the global function here
    // Hero section animation on load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        const heroImages = document.querySelector('.hero-images');
        if (heroContent) heroContent.classList.add('loaded');
        if (heroImages) heroImages.classList.add('loaded');
    }, 100);

    // Create Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after animation triggers
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Section headers with staggered animations
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Animated Counter for Startup Stats
    const animateCounter = (element, target, duration = 2000) => {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.ceil(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }, 16);
    };

    // Observe startup highlights for counter animation
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.highlight-number[data-target]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    counter.removeAttribute('data-target'); // Prevent re-animation
                });
                highlightObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const startupHighlights = document.querySelector('.startup-highlights-grid');
    if (startupHighlights) {
        highlightObserver.observe(startupHighlights);
    }
});

function setupDropdowns() {
    // Login dropdown hover functionality
    const loginWrapper = document.querySelector('.login-wrapper');
    const loginDropdown = document.querySelector('.login-dropdown');
    
    if (loginWrapper && loginDropdown) {
        loginWrapper.addEventListener('mouseenter', function() {
            loginDropdown.style.opacity = '1';
            loginDropdown.style.visibility = 'visible';
            loginDropdown.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        loginWrapper.addEventListener('mouseleave', function() {
            loginDropdown.style.opacity = '0';
            loginDropdown.style.visibility = 'hidden';
            loginDropdown.style.transform = 'translateX(-50%) translateY(-10px)';
        });
    }
    
    // Navigation dropdowns
    const menuWrappers = document.querySelectorAll('.menu-btn-wrapper');
    menuWrappers.forEach(wrapper => {
        const dropdown = wrapper.querySelector('.nav-dropdown');
        if (dropdown) {
            wrapper.addEventListener('mouseenter', function() {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateX(-50%) translateY(0)';
            });
            
            wrapper.addEventListener('mouseleave', function() {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
            });
        }
    });
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add to Cart notification for unavailable products
function addToCart(productName) {
    alert('⚠️ Product Currently Unavailable\n\n"' + productName + '" cannot be added to cart at this time.\n\nOnline purchasing will be available soon. Thank you for your patience!');
}
