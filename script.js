// Enhanced Navigation and Page Transitions - MOBILE HAMBURGER FIXED
document.addEventListener('DOMContentLoaded', function() {
    // Page loading animation
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(pageLoader);

    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.remove();
            }, 500);
        }, 500);
    });

    // Add page transition class to main content
    const mainContent = document.querySelector('body');
    if (mainContent) {
        mainContent.classList.add('page-transition');
        
        setTimeout(() => {
            mainContent.classList.add('loaded');
        }, 100);
    }

    // COMPLETELY REWRITTEN Mobile menu toggle - FIXED FOR MOBILE
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // State tracking
    let isMenuOpen = false;
    let isToggling = false;

    // Create mobile menu overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-menu-overlay';
    mobileOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(mobileOverlay);

    function openMobileMenu() {
        if (isToggling) return;
        isToggling = true;
        
        console.log('Opening mobile menu');
        isMenuOpen = true;
        
        if (hamburger) hamburger.classList.add('active');
        if (navMenu) navMenu.classList.add('active');
        mobileOverlay.style.opacity = '1';
        mobileOverlay.style.visibility = 'visible';
        body.style.overflow = 'hidden';
        
        setTimeout(() => {
            isToggling = false;
        }, 100);
    }

    function closeMobileMenu() {
        if (isToggling) return;
        isToggling = true;
        
        console.log('Closing mobile menu');
        isMenuOpen = false;
        
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        mobileOverlay.style.opacity = '0';
        mobileOverlay.style.visibility = 'hidden';
        body.style.overflow = '';
        
        setTimeout(() => {
            isToggling = false;
        }, 100);
    }

    // Hamburger click handler with debouncing
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            console.log('Hamburger clicked, current state:', isMenuOpen);
            
            if (isToggling) {
                console.log('Still toggling, ignoring click');
                return;
            }
            
            if (isMenuOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Prevent any other events on hamburger
        hamburger.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        });
        
        hamburger.addEventListener('touchend', function(e) {
            e.stopPropagation();
        });
    }

    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Overlay clicked');
        if (isMenuOpen) {
            closeMobileMenu();
        }
    });

    // Prevent clicks inside navMenu from closing the menu
    if (navMenu) {
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Nav menu clicked, preventing close');
        });
        
        navMenu.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        });
    }

    // Handle nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetPage = link.getAttribute('href');
            console.log('Nav link clicked:', targetPage);
            
            // Always close menu when link is clicked
            if (isMenuOpen) {
                closeMobileMenu();
            }
            
            // Handle different link types
            if (targetPage && targetPage.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(targetPage);
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            } else if (targetPage && !targetPage.startsWith('javascript:')) {
                // For regular page navigation
                if (mainContent) {
                    mainContent.classList.remove('loaded');
                }
                // Let the browser handle the navigation
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('Escape pressed, closing menu');
            closeMobileMenu();
        }
    });

    // MODIFIED: More specific document click handler
    document.addEventListener('click', function(e) {
        // Only handle if menu is open
        if (!isMenuOpen || isToggling) return;
        
        // Don't close if clicking on hamburger, nav menu, or their children
        if (hamburger && hamburger.contains(e.target)) return;
        if (navMenu && navMenu.contains(e.target)) return;
        if (mobileOverlay.contains(e.target)) return;
        
        console.log('Document clicked outside menu, closing');
        closeMobileMenu();
    }, true); // Use capture phase

    // Additional touch event handling for mobile
    document.addEventListener('touchstart', function(e) {
        if (!isMenuOpen || isToggling) return;
        
        // Don't close if touching hamburger, nav menu, or overlay
        if (hamburger && hamburger.contains(e.target)) return;
        if (navMenu && navMenu.contains(e.target)) return;
        if (mobileOverlay.contains(e.target)) return;
        
        console.log('Touch outside menu, closing');
        closeMobileMenu();
    }, { passive: true });

    // Smooth scrolling for anchor links
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

    // Enhanced navbar background on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }

            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        }
    });

    // Enhanced Portfolio filtering with smooth animations
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach((item, index) => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, index * 100);
                } else {
                    const categories = item.getAttribute('data-category');
                    if (categories && categories.split(' ').includes(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        }, index * 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8) translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Enhanced FAQ accordion with smooth animations
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items with smooth animation
                faqItems.forEach(faqItem => {
                    if (faqItem !== item) {
                        faqItem.classList.remove('active');
                    }
                });
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });

    // Enhanced form handling with better UX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Basic validation
                if (!data.firstName || !data.lastName || !data.email || !data.service || !data.message) {
                    showNotification('Please fill in all required fields.', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Simulate form submission with delay
                setTimeout(() => {
                    showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    // Enhanced newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitBtn) return;
            
            const email = emailInput.value;
            const originalText = submitBtn.textContent;
            
            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // Enhanced video placeholder interactions
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                showNotification('Video player coming soon!', 'info');
            }, 150);
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .featured-item, .testimonial-card, .team-member, .value-card, .client-card, .result-card, .contact-card, .upcoming-project-card, .bts-item');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Enhanced counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-item h3, .result-card h3');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            const suffix = element.textContent.includes('%') ? '%' : element.textContent.includes('+') ? '+' : '';
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.textContent;
                const target = parseInt(number.replace(/[^\d]/g, ''));
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Enhanced parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements .element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.01}deg)`;
        });
    });

    // Enhanced hover effects
    const interactiveCards = document.querySelectorAll('.service-card, .portfolio-item, .team-member, .value-card, .client-card, .result-card, .testimonial-card, .upcoming-project-card, .bts-item, .contact-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced section reveal animations
    const revealSections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    `;

    const notificationContent = notification.querySelector('.notification-content');
    if (notificationContent) {
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
    }

    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            transition: transform 0.2s ease;
        `;

        // Enhanced close button functionality
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            setTimeout(() => {
                notification.remove();
            }, 400);
        });

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.transform = 'scale(1.2)';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.transform = 'scale(1)';
        });
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }
    }, 5000);
}

// Enhanced scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Enhanced scroll to top button
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (window.scrollY > 300) {
        if (!scrollTopBtn) {
            const btn = document.createElement('button');
            btn.className = 'scroll-top';
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: linear-gradient(45deg, #ffd700, #ffed4e);
                color: #000;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                box-shadow: 0 4px 20px rgba(255,215,0,0.3);
                transition: all 0.3s ease;
                z-index: 1000;
                opacity: 0;
                transform: scale(0.8);
            `;
            
            btn.addEventListener('click', scrollToTop);
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.1)';
                this.style.boxShadow = '0 6px 25px rgba(255,215,0,0.4)';
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 20px rgba(255,215,0,0.3)';
            });
            
            document.body.appendChild(btn);
            
            // Animate in
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
            }, 100);
        }
    } else {
        if (scrollTopBtn) {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                scrollTopBtn.remove();
            }, 300);
        }
    }
});

// Enhanced tooltips
function initTooltips() {
    const serviceTags = document.querySelectorAll('.service-tag');
    serviceTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.textContent;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.9);
                color: #ffd700;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.8rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,215,0,0.2);
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
            
            this.tooltip = tooltip;
        });
        
        tag.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.style.opacity = '0';
                this.tooltip.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    if (this.tooltip) {
                        this.tooltip.remove();
                        this.tooltip = null;
                    }
                }, 300);
            }
        });
    });
}

// Initialize tooltips when DOM is loaded
document.addEventListener('DOMContentLoaded', initTooltips);
