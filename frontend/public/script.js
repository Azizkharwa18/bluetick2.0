// Bluetick Landing Page JavaScript

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'flex';
    }
}

// Smooth scrolling functions
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToPricing() {
    document.getElementById('pricing').scrollIntoView({
        behavior: 'smooth'
    });
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        business: formData.get('business'),
        volume: formData.get('volume')
    };
    
    // Show success message (in a real app, this would send to backend)
    alert('Thank you for your interest! Our team will contact you within 24 hours to set up your free trial.');
    
    // Reset form
    event.target.reset();
    
    // Log form data for demo purposes
    console.log('Form submitted with data:', data);
}

// Add click handlers for WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp contact buttons
    const whatsappButtons = document.querySelectorAll('[href="#whatsapp-chat"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const message = encodeURIComponent('Hi! I\'m interested in Bluetick WhatsApp bulk messaging service. Can you help me get started?');
            window.open(`https://wa.me/918888888888?text=${message}`, '_blank');
        });
    });
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('mobileMenu').style.display = 'none';
        });
    });
    
    // Add scroll event listener for navbar background
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.nav-header');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });
    
    // Add intersection observer for animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .pricing-card, .contact-method');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add pricing calculator functionality
function calculatePricing() {
    // This could be expanded to show pricing calculator
    console.log('Pricing calculator functionality can be added here');
}

// Add demo functionality for buttons
function startFreeTrial() {
    scrollToContact();
}

function viewPricing() {
    scrollToPricing();
}

// Handle contact method clicks
document.addEventListener('DOMContentLoaded', function() {
    // Email support
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const subject = encodeURIComponent('Bluetick Inquiry - WhatsApp Bulk Messaging');
            const body = encodeURIComponent('Hi, I\'m interested in learning more about Bluetick WhatsApp bulk messaging service. Please provide more information about pricing and features.');
            this.href = `mailto:support@bluetick.in?subject=${subject}&body=${body}`;
        });
    });
    
    // Phone support
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click tracking or other functionality here
            console.log('Phone support clicked');
        });
    });
});

// Add form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-light)';
        }
    });
    
    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#ff6b6b';
            isValid = false;
        }
    }
    
    // Phone validation
    const phoneField = form.querySelector('[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
        if (!phoneRegex.test(phoneField.value)) {
            phoneField.style.borderColor = '#ff6b6b';
            isValid = false;
        }
    }
    
    return isValid;
}

// Enhanced form submission with validation
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    
    if (!validateForm(form)) {
        alert('Please fill in all required fields correctly.');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
            alert('Thank you for your interest! Our team will contact you within 24 hours to set up your free trial.');
        }, 2000);
    }, 1000);
}