// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Image thumbnail switching
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        const newImage = thumb.style.backgroundImage;
        mainImage.style.backgroundImage = newImage;
    });
});

// Option buttons
document.querySelectorAll('.option-group').forEach(group => {
    const buttons = group.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

// Quantity selector
const quantityInput = document.querySelector('.quantity-input');
const quantityBtns = document.querySelectorAll('.quantity-btn');

if (quantityBtns.length >= 2) {
    quantityBtns[0].addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    quantityBtns[1].addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
}