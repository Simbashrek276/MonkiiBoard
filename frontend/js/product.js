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
const thumbnails = document.querySelectorAll('.thumbnail, .video-thumbnail');
const mainImage = document.querySelector('.main-image');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        // Check if it's a video thumbnail
        if (thumb.classList.contains('video-thumbnail')) {
            const videoSrc = thumb.querySelector('video source').src;
            
            // Hide background image and show video
            mainImage.style.backgroundImage = 'none';
            let mainVideo = mainImage.querySelector('.main-video');
            
            if (!mainVideo) {
                mainVideo = document.createElement('video');
                mainVideo.className = 'main-video';
                mainVideo.autoplay = true;
                mainVideo.loop = true;
                mainVideo.muted = true;
                mainVideo.playsInline = true;
                mainVideo.style.width = '100%';
                mainVideo.style.height = '100%';
                mainVideo.style.objectFit = 'cover';
                
                const source = document.createElement('source');
                source.src = videoSrc;
                source.type = 'video/mp4';
                
                mainVideo.appendChild(source);
                mainImage.appendChild(mainVideo);
            } else {
                mainVideo.querySelector('source').src = videoSrc;
                mainVideo.load();
                mainVideo.style.display = 'block';
            }
            mainVideo.play();
        } else {
            // Hide video and show background image
            const mainVideo = mainImage.querySelector('.main-video');
            if (mainVideo) {
                mainVideo.style.display = 'none';
                mainVideo.pause();
            }
            
            const newImage = thumb.style.backgroundImage;
            mainImage.style.backgroundImage = newImage;
        }
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