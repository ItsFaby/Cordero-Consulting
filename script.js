// ========================================
// MOBILE NAVIGATION
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ========================================
// PORTFOLIO FILTERS
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            formMessage.textContent = '¡Mensaje enviado exitosamente! Te responderé pronto.';
            formMessage.className = 'form-message success';

            // Reset form
            contactForm.reset();

            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);

            // Log form data (for development)
            console.log('Form submitted:', formData);

            // TODO: Replace with actual form submission logic
            // Example: Send to email service, database, or backend API
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                formMessage.textContent = '¡Mensaje enviado exitosamente!';
                formMessage.className = 'form-message success';
                contactForm.reset();
            })
            .catch(error => {
                formMessage.textContent = 'Error al enviar el mensaje. Por favor intenta de nuevo.';
                formMessage.className = 'form-message error';
            });
            */
        }, 1500);
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

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

// Observe service cards, portfolio items, etc.
document.querySelectorAll('.service-card, .portfolio-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScroll = currentScroll;
});

// ========================================
// SERVICES CAROUSEL
// ========================================

const track = document.querySelector('.services-carousel-track');
const slides = Array.from(document.querySelectorAll('.service-card'));
const nextButton = document.querySelector('.carousel-button-next');
const prevButton = document.querySelector('.carousel-button-prev');
const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));

if (track && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Move to slide function
    const moveToSlide = (slideIndex) => {
        track.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
        updateIndicators();
    };

    // Update indicators
    const updateIndicators = () => {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    };

    // Next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                moveToSlide(currentSlide + 1);
            } else {
                moveToSlide(0); // Loop back to first slide
            }
        });
    }

    // Previous button
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                moveToSlide(currentSlide - 1);
            } else {
                moveToSlide(totalSlides - 1); // Loop to last slide
            }
        });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevButton?.click();
        } else if (e.key === 'ArrowRight') {
            nextButton?.click();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const trackContainer = document.querySelector('.services-carousel-track-container');

    if (trackContainer) {
        trackContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        trackContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextButton?.click();
            } else {
                // Swipe right - previous slide
                prevButton?.click();
            }
        }
    };

    // Auto-play (optional - uncomment to enable)
    /*
    const autoPlayInterval = 5000; // 5 seconds
    let autoPlay = setInterval(() => {
        nextButton?.click();
    }, autoPlayInterval);

    // Pause auto-play on hover
    trackContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    trackContainer.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            nextButton?.click();
        }, autoPlayInterval);
    });
    */
}

// ========================================
// INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Cordero Consulting website loaded successfully');

    // Add active class to current page in navigation
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
});
