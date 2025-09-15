window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var name = document.querySelector('.startup-name');
        var slogan = document.querySelector('.startup-slogan');
        if (name) name.classList.add('active');
        if (slogan) slogan.classList.add('active');
    }, 1000);

    // Check if user is logged in on page load
    checkAuthStatus();
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Modal Management Functions
function openLoginModal() {
    closeAllModals();
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function openRegisterModal() {
    closeAllModals();
    document.getElementById('register-modal').style.display = 'flex';
}

function closeRegisterModal() {
    document.getElementById('register-modal').style.display = 'none';
}

function openForgotPasswordModal() {
    closeAllModals();
    document.getElementById('forgot-password-modal').style.display = 'flex';
}

function closeForgotPasswordModal() {
    document.getElementById('forgot-password-modal').style.display = 'none';
}

function closeAllModals() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById('forgot-password-modal').style.display = 'none';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const forgotModal = document.getElementById('forgot-password-modal');
    
    if (event.target === loginModal) closeLoginModal();
    if (event.target === registerModal) closeRegisterModal();
    if (event.target === forgotModal) closeForgotPasswordModal();
});

// Password visibility toggle
function togglePassword(passwordId, iconId) {
    const passwordInput = document.getElementById(passwordId);
    const toggleIcon = document.getElementById(iconId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = 'assets/Images/UI/eye-password-show.svg'; 
        toggleIcon.alt = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = 'assets/Images/UI/eye-password-hide.svg';
        toggleIcon.alt = 'Show Password';
    }
}

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Authentication Functions (Mock for now - will connect to backend later)
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Validation
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Mock login - replace with actual API call later
    try {
        showNotification('Logging in...', 'info');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login
        const mockUser = {
            id: '1',
            email: email,
            firstName: 'John',
            lastName: 'Doe'
        };
        
        // Store user data
        if (rememberMe) {
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('authToken', 'mock-jwt-token');
        } else {
            sessionStorage.setItem('user', JSON.stringify(mockUser));
            sessionStorage.setItem('authToken', 'mock-jwt-token');
        }
        
        updateUIForLoggedInUser(mockUser);
        closeLoginModal();
        showNotification('Login successful! Welcome back!', 'success');
        
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please try again.', 'error');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('register-firstname').value;
    const lastName = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Validation
    if (!firstName.trim() || !lastName.trim()) {
        showNotification('Please enter your first and last name', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Mock registration - replace with actual API call later
    try {
        showNotification('Creating your account...', 'info');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock successful registration
        const mockUser = {
            id: '1',
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('authToken', 'mock-jwt-token');
        
        updateUIForLoggedInUser(mockUser);
        closeRegisterModal();
        showNotification(`Welcome to MonkiiBoard, ${firstName}!`, 'success');
        
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration failed. Please try again.', 'error');
    }
}

async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgot-email').value;
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Mock forgot password - replace with actual API call later
    try {
        showNotification('Sending reset link...', 'info');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        closeForgotPasswordModal();
        showNotification('Password reset link sent to your email!', 'success');
        
    } catch (error) {
        console.error('Forgot password error:', error);
        showNotification('Failed to send reset link. Please try again.', 'error');
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    updateUIForLoggedOutUser();
    showNotification('Logged out successfully', 'success');
}

function checkAuthStatus() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (token && user) {
        try {
            const userData = JSON.parse(user);
            updateUIForLoggedInUser(userData);
        } catch (error) {
            console.error('Error parsing user data:', error);
            logout();
        }
    }
}

function updateUIForLoggedInUser(user) {
    const loginButton = document.querySelector('.login-holder');
    if (loginButton) {
        loginButton.innerHTML = `
            <div class="user-menu" style="display: flex; align-items: center; gap: 10px; color: white;">
                <span class="user-name">Hello, ${user.firstName}!</span>
                <button class="logout-btn" onclick="logout()" style="
                    background: rgba(255, 187, 0, 0.9); 
                    color: black; 
                    border: none; 
                    padding: 5px 10px; 
                    border-radius: 4px; 
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 500;
                ">Logout</button>
            </div>
        `;
        loginButton.onclick = null; // Remove the modal opener
    }
}

function updateUIForLoggedOutUser() {
    const loginButton = document.querySelector('.login-holder');
    if (loginButton) {
        loginButton.innerHTML = `
            <img class="login" src="assets/Images/UI/white user outline.jpg" alt="Login">
        `;
        loginButton.onclick = openLoginModal;
    }
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        max-width: 300px;
        font-family: 'Roboto', sans-serif;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' : ''}
        ${type === 'error' ? 'background: linear-gradient(135deg, #f44336, #da190b);' : ''}
        ${type === 'info' ? 'background: linear-gradient(135deg, #2196F3, #0b7dda);' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}
