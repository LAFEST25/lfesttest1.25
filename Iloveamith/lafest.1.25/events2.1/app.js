let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
let showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}

seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
        updateBackButtonVisibility();
    }
});

// Fix for event 5 "SEE MORE" button not working
const event5SeeMore = document.querySelector('.item:nth-child(5) .seeMore');
if (event5SeeMore) {
    event5SeeMore.onclick = function() {
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
}
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
    updateBackButtonVisibility();
}

// Function to update the visibility of the "See All" button
function updateBackButtonVisibility() {
    // Show backButton only if carousel has 'showDetail' class
    if (carousel.classList.contains('showDetail')) {
        backButton.style.display = 'block';
    } else {
        backButton.style.display = 'none';
    }
}

// Initial check
updateBackButtonVisibility();

// Update visibility on slider change
const originalShowSlider = showSlider;
showSlider = function(type) {
    originalShowSlider(type);
    updateBackButtonVisibility();
};

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

carousel.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    if (touchEndX < touchStartX - 50) {
        showSlider('next');
    }
    if (touchEndX > touchStartX + 50) {
        showSlider('prev');
    }
}

// Disable image dragging and right-click context menu on images
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', e => e.preventDefault());

    // Add click event to images to toggle detail view like seeMore buttons
    img.addEventListener('click', () => {
        if (carousel.classList.contains('showDetail')) {
            // If in detail view, go back to "See All"
            carousel.classList.remove('showDetail');
        } else {
            // If not in detail view, show detail view
            carousel.classList.remove('next', 'prev');
            carousel.classList.add('showDetail');
        }
        updateBackButtonVisibility();
    });
});

// Add arrow key navigation for events and Escape key to close detail view
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        showSlider('prev');
    } else if (event.key === 'ArrowRight') {
        showSlider('next');
    } else if (event.key === 'Escape') {
        if (carousel.classList.contains('showDetail')) {
            carousel.classList.remove('showDetail');
            updateBackButtonVisibility();
        }
    }
});
