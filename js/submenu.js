document.addEventListener('DOMContentLoaded', function() {
    const submenuNav = document.querySelector('.submenu-nav');
    const slideLeft = document.querySelector('.slide-left');
    const slideRight = document.querySelector('.slide-right');
    
    // Scroll amount (in pixels)
    const scrollAmount = 200;
    
    // Left slide button click handler
    slideLeft.addEventListener('click', () => {
        submenuNav.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Right slide button click handler
    slideRight.addEventListener('click', () => {
        submenuNav.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}); 