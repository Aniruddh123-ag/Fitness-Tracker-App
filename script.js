// Smooth Scrolling for Navigation Links
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

// Handle Newsletter Subscription
function handleSubscribe(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        // Show success message
        showNotification('Thank you for subscribing! Check your email for updates.', 'success');
        event.target.reset();
        
        // Simulate API call
        console.log('Newsletter subscription:', email);
    }
}

// Handle Contact Form Submission
function handleContact(event) {
    event.preventDefault();
    const formData = {
        name: event.target.querySelector('input[type="text"]').value,
        email: event.target.querySelector('input[type="email"]').value,
        message: event.target.querySelector('textarea').value
    };
    
    if (formData.name && formData.email && formData.message) {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        event.target.reset();
        
        // Simulate API call
        console.log('Contact form data:', formData);
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '500',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease',
        maxWidth: '400px'
    });
    
    if (type === 'success') {
        notification.style.backgroundColor = '#51CF66';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#FF6B6B';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#4ECDC4';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards, pricing cards, and other elements
document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fade-in-up animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#FF6B6B';
        } else {
            link.style.color = 'white';
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Button Click Feedback
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Add visual feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// Counter Animation for Stats (if needed)
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Prevent multiple form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn.disabled) {
            e.preventDefault();
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '';
            submitBtn.style.cursor = '';
        }, 2000);
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);

// Console message for developers
console.log('%cWelcome to FitTrack! 💪', 'color: #FF6B6B; font-size: 20px; font-weight: bold;');
console.log('%cYour personal fitness companion', 'color: #4ECDC4; font-size: 14px;');
