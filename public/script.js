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
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'nuevo'
        };

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        formMessage.style.display = 'block';

        try {
            // Guardar en Firestore
            await db.collection('contactMessages').add(formData);

            // Show success message
            formMessage.textContent = '¡Mensaje enviado exitosamente! Te responderé pronto.';
            formMessage.className = 'form-message success';

            // Reset form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);

            console.log('Mensaje guardado exitosamente en Firestore');

        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            formMessage.textContent = 'Error al enviar el mensaje. Por favor intenta de nuevo.';
            formMessage.className = 'form-message error';
        } finally {
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
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
// SERVICES - Carousel removed, now using horizontal cards grid
// ========================================

// ========================================
// PORTFOLIO MODAL
// ========================================

const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const expandButtons = document.querySelectorAll('.expand-btn');

// Project data with images
const projectData = {
    'bokaracas': {
        images: ['images/CAS1.png', 'images/CAS2.png'],
        placeholder: '🐍',
        bgClass: 'design-bg'
    },
    'kommi': {
        images: ['images/5.png', 'images/6.png'],
        placeholder: '🐸',
        bgClass: 'design-bg'
    },
    'f1': {
        images: ['images/7.png', 'images/8.png'],
        placeholder: '🏎️',
        bgClass: 'data-bg'
    },
    'automation': {
        images: ['images/BD1.png', 'images/BD2.png'],
        placeholder: '⚙️',
        bgClass: 'data-bg'
    },
    'agrosmart': {
        images: ['images/11.png', 'images/12.png'],
        placeholder: '🔒',
        bgClass: 'innovation-bg'
    },
    'ecopack': {
        images: ['images/14.png', 'images/15.png'],
        placeholder: '♻️',
        bgClass: 'innovation-bg'
    },
    // Legacy projects (kept for backward compatibility)
    'docking': {
        images: ['images/docking-1.svg', 'images/docking-2.svg', 'images/docking-3.svg'],
        placeholder: '🧬',
        bgClass: 'biotech-bg'
    },
    'microbioma': {
        images: ['images/microbioma-1.svg', 'images/microbioma-2.svg'],
        placeholder: '🔬',
        bgClass: 'biotech-bg'
    },
    'happiness': {
        images: ['images/happiness-1.svg', 'images/happiness-2.svg', 'images/happiness-3.svg'],
        placeholder: '🌍',
        bgClass: 'data-bg'
    }
};

if (expandButtons.length > 0) {
    expandButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const portfolioContent = this.closest('.portfolio-content');
            const portfolioItem = this.closest('.portfolio-item');

            // Get project details
            const tag = portfolioContent.querySelector('.portfolio-tag').textContent;
            const title = portfolioContent.querySelector('h3').textContent;
            const details = portfolioContent.querySelector('.portfolio-details').innerHTML;
            const meta = portfolioContent.querySelector('.portfolio-meta').innerHTML;

            // Determine which project this is
            let projectKey = '';
            if (title.includes('Identidad Visual para Cerveza Artesanal')) projectKey = 'bokaracas';
            else if (title.includes('Branding basado en investigación de mercado')) projectKey = 'kommi';
            else if (title.includes('Sistema Predictivo de Machine Learning')) projectKey = 'f1';
            else if (title.includes('Pipeline Automatizado') || title.includes('Automatizado')) projectKey = 'automation';
            else if (title.includes('Prototipado UX') || title.includes('Seguridad Personal')) projectKey = 'agrosmart';
            else if (title.includes('levantamiento de capital') || title.includes('Estrategia de levantamiento')) projectKey = 'ecopack';
            // Legacy support
            else if (title.includes('Prototipado Molecular') || title.includes('Docking')) projectKey = 'docking';
            else if (title.includes('Microbiomas') || title.includes('Microbioma')) projectKey = 'microbioma';
            else if (title.includes('Bienestar Global') || title.includes('Happiness')) projectKey = 'happiness';

            // Populate modal
            document.querySelector('.modal-tag').textContent = tag;
            document.querySelector('.modal-title').textContent = title;
            document.querySelector('.modal-description').innerHTML = details;
            document.querySelector('.modal-meta').innerHTML = meta;

            // Populate images
            const modalImages = document.querySelector('.modal-images');
            modalImages.innerHTML = '';

            if (projectKey && projectData[projectKey]) {
                const project = projectData[projectKey];
                project.images.forEach(imgSrc => {
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'modal-image';
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = title;
                    imageDiv.appendChild(img);
                    modalImages.appendChild(imageDiv);
                });
            }

            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

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
