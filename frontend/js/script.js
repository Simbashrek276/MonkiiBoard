// MonkiiBoard JavaScript

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupDropdowns();
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
