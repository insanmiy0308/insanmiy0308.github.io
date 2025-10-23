document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.getElementById('stars-container');
    const starsCount = 150; // Number of stars
    
    // Create stars
    for (let i = 0; i < starsCount; i++) {
        createStar();
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Remove existing stars
        while (starsContainer.firstChild) {
            starsContainer.removeChild(starsContainer.firstChild);
        }
        // Create new stars
        for (let i = 0; i < starsCount; i++) {
            createStar();
        }
    });
    
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation delay and duration
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        
        // Apply styles
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        // Random opacity for variety
        star.style.opacity = Math.random() * 0.5 + 0.2;
        
        starsContainer.appendChild(star);
    }
    
    // Add hover effect to text
    const name = document.querySelector('.name');
    const subtitle = document.querySelector('.subtitle');
    
    name.addEventListener('mouseenter', () => {
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
    });
    
    name.addEventListener('mouseleave', () => {
        subtitle.style.opacity = '0.9';
    });
});
