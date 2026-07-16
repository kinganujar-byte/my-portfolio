const gallery = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentImageIndex = 0;
let filteredImages = [];

// Sample gallery images with captions
const images = [
    { id: 1, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop', caption: 'Mountain Peak' },
    { id: 2, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop', caption: 'Portrait' },
    { id: 3, url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=500&fit=crop', caption: 'Laptop' },
    { id: 4, url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=500&fit=crop', caption: 'Beach Waves' },
    { id: 5, url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e?w=500&h=500&fit=crop', caption: 'Nature Green' },
    { id: 6, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop', caption: 'Mountain Landscape' },
    { id: 7, url: 'https://images.unsplash.com/photo-1501785888041-af3ee9c470a0?w=500&h=500&fit=crop', caption: 'Sunset Beach' },
    { id: 8, url: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=500&h=500&fit=crop', caption: 'Urban City' },
    { id: 9, url: 'https://images.unsplash.com/photo-1503803492852-bfa81a1cce65?w=500&h=500&fit=crop', caption: 'Music Production' },
    { id: 10, url: 'https://images.unsplash.com/photo-1529505029769-ab9042dd153b?w=500&h=500&fit=crop', caption: 'Hiking Adventure' },
    { id: 11, url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop', caption: 'Beach Sand' },
    { id: 12, url: 'https://images.unsplash.com/photo-1486299967070-08de336d18f8?w=500&h=500&fit=crop', caption: 'Cloud Sky' }
];

// Event listeners
searchInput.addEventListener('input', filterImages);
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeLightbox();
});

function renderGallery(imagesToRender) {
    gallery.innerHTML = '';
    
    if (imagesToRender.length === 0) {
        gallery.innerHTML = '<div class="no-results">No images found. Try a different search.</div>';
        return;
    }

    imagesToRender.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${image.url}" alt="${image.caption}" loading="lazy">
            <div class="gallery-overlay">
                <div class="overlay-icon">🔍</div>
            </div>
        `;
        div.addEventListener('click', () => openLightbox(index, imagesToRender));
        gallery.appendChild(div);
    });
}

function filterImages() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredImages = images.filter(img => 
        img.caption.toLowerCase().includes(searchTerm)
    );
    renderGallery(filteredImages);
}

function openLightbox(index, imageArray) {
    currentImageIndex = index;
    filteredImages = imageArray;
    updateLightbox();
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function updateLightbox() {
    const image = filteredImages[currentImageIndex];
    lightboxImage.src = image.url;
    caption.textContent = image.caption;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightbox();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

// Initial render
renderGallery(images);
filteredImages = images;