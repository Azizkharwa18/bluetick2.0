// Authentication JavaScript for Bluetick

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'flex';
    }
}

// Password visibility toggle
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const toggleButton = passwordField.parentElement.querySelector('.password-toggle i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.classList.remove('fa-eye');
        toggleButton.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleButton.classList.remove('fa-eye-slash');
        toggleButton.classList.add('fa-eye');
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('.toast-icon');
    const messageElement = toast.querySelector('.toast-message');
    
    // Set message
    messageElement.textContent = message;
    
    // Set icon and styles based on type
    toast.className = `toast toast-${type}`;
    
    switch (type) {
        case 'success':
            icon.className = 'toast-icon fas fa-check-circle';
            break;
        case 'error':
            icon.className = 'toast-icon fas fa-exclamation-circle';
            break;
        case 'warning':
            icon.className = 'toast-icon fas fa-exclamation-triangle';
            break;
        default:
            icon.className = 'toast-icon fas fa-info-circle';
    }
    
    // Show toast
    toast.classList.add('toast-show');
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 4000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone);
}

// Password strength checker
function checkPasswordStrength(password) {
    const requirements = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /\d/.test(password)
    };
    
    const score = Object.values(requirements).filter(Boolean).length;
    
    return {
        score,
        requirements,
        strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong'
    };
}

// Update password strength indicator
function updatePasswordStrength(password) {
    const strengthCheck = checkPasswordStrength(password);
    const strengthBar = document.getElementById('passwordStrength');
    
    if (strengthBar) {
        const percentage = (strengthCheck.score / 4) * 100;
        strengthBar.style.width = `${percentage}%`;
        
        // Update color based on strength
        if (strengthCheck.strength === 'weak') {
            strengthBar.className = 'password-strength-fill strength-weak';
        } else if (strengthCheck.strength === 'medium') {
            strengthBar.className = 'password-strength-fill strength-medium';
        } else {
            strengthBar.className = 'password-strength-fill strength-strong';
        }
        
        // Update requirement indicators
        Object.entries(strengthCheck.requirements).forEach(([key, met]) => {
            const element = document.getElementById(`req-${key}`);
            if (element) {
                const icon = element.querySelector('i');
                if (met) {
                    element.classList.add('requirement-met');
                    icon.className = 'fas fa-check';
                } else {
                    element.classList.remove('requirement-met');
                    icon.className = 'fas fa-times';
                }
            }
        });
    }
}

// Login form handler
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Basic validation
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.auth-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Mock login success
        if (email === 'demo@bluetick.in' && password === 'password123') {
            showToast('Login successful! Redirecting to dashboard...', 'success');
            setTimeout(() => {
                // In a real app, this would redirect to dashboard
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showToast('Invalid email or password. Try demo@bluetick.in with password123', 'error');
        }
    }, 1500);
}

// Signup form handler
function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form data
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const company = formData.get('company');
    const businessType = formData.get('businessType');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');
    
    // Validation
    if (!firstName || !lastName) {
        showToast('Please enter your full name', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    if (!company) {
        showToast('Please enter your company name', 'error');
        return;
    }
    
    if (!businessType) {
        showToast('Please select your business type', 'error');
        return;
    }
    
    const passwordCheck = checkPasswordStrength(password);
    if (passwordCheck.score < 3) {
        showToast('Please create a stronger password', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (!terms) {
        showToast('Please accept the Terms of Service', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.auth-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Mock signup success
        showToast('Account created successfully! Please check your email to verify your account.', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }, 2000);
}

// Google OAuth handlers (mock implementations)
function handleGoogleLogin() {
    showToast('Google Sign-In would be integrated here', 'info');
}

function handleGoogleSignup() {
    showToast('Google Sign-Up would be integrated here', 'info');
}

// Form validation helpers
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    switch (fieldType) {
        case 'email':
            return isValidEmail(value);
        case 'tel':
            return isValidPhone(value);
        case 'password':
            return value.length >= 8;
        default:
            return value.length > 0;
    }
}

// Real-time form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('.auth-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!validateField(this)) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error') && validateField(this)) {
                    this.classList.remove('error');
                }
            });
        });
    });
}

// Password strength monitoring
function setupPasswordStrengthMonitor() {
    const passwordField = document.getElementById('password');
    
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    setupPasswordStrengthMonitor();
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('mobileMenu').style.display = 'none';
        });
    });
    
    // Add click handler to close toast
    const toast = document.getElementById('toast');
    if (toast) {
        toast.addEventListener('click', function() {
            this.classList.remove('toast-show');
        });
    }
});