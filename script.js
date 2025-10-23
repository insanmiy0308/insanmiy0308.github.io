// Create blinking stars effect
document.addEventListener('DOMContentLoaded', function() {
    const starfield = document.querySelector('.starfield');
    const numberOfStars = 100;

    // Create stars
    for (let i = 0; i < numberOfStars; i++) {
        createStar(starfield);
    }
});

function createStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size between 1-4 pixels
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    // Random position
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Random animation duration between 1-3 seconds
    const duration = Math.random() * 2 + 1;
    star.style.animationDuration = duration + 's';
    
    container.appendChild(star);
}

// Add some shooting stars occasionally
function createShootingStar() {
    const starfield = document.querySelector('.starfield');
    const shootingStar = document.createElement('div');
    
    shootingStar.style.position = 'absolute';
    shootingStar.style.width = '4px';
    shootingStar.style.height = '4px';
    shootingStar.style.backgroundColor = '#ffffff';
    shootingStar.style.borderRadius = '50%';
    shootingStar.style.left = '-10px';
    shootingStar.style.top = Math.random() * 50 + '%';
    shootingStar.style.boxShadow = '0 0 10px #ffffff';
    
    starfield.appendChild(shootingStar);
    
    // Animate shooting star
    const animation = shootingStar.animate([
        { transform: 'translateX(0px)', opacity: 1 },
        { transform: `translateX(${window.innerWidth + 100}px)`, opacity: 0 }
    ], {
        duration: 2000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        starfield.removeChild(shootingStar);
    };
}

// Create shooting stars every 5-10 seconds
setInterval(() => {
    if (Math.random() < 0.3) { // 30% chance every interval
        createShootingStar();
    }
}, 7000);
