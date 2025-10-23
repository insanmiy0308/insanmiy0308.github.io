// Debug function to log errors and info
function debugLog(message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data || '');
}

// Main initialization function
function init() {
    try {
        debugLog('Initializing website...');
        
        const starsContainer = document.getElementById('stars-container');
        if (!starsContainer) {
            throw new Error('Stars container element not found');
        }
        
        const starsCount = 350; // Number of stars
        debugLog(`Creating ${starsCount} stars...`);
        
        // Create stars
        for (let i = 0; i < starsCount; i++) {
            createStar(starsContainer);
        }
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                debugLog('Window resized, regenerating stars...');
                // Remove existing stars
                while (starsContainer.firstChild) {
                    starsContainer.removeChild(starsContainer.firstChild);
                }
                // Create new stars
                for (let i = 0; i < starsCount; i++) {
                    createStar(starsContainer);
                }
            }, 200);
        });
        
        // Add hover effect to text
        const name = document.querySelector('.name');
        const subtitle = document.querySelector('.subtitle');
        
        if (name && subtitle) {
            name.addEventListener('mouseenter', () => {
                debugLog('Name hovered');
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            });
            
            name.addEventListener('mouseleave', () => {
                debugLog('Name hover ended');
                subtitle.style.opacity = '0.9';
            });
        } else {
            debugLog('Warning: Name or subtitle elements not found', { name, subtitle });
        }
        
        debugLog('Website initialization complete');
    } catch (error) {
        console.error('Error during initialization:', error);
        debugLog('Initialization failed', { error: error.message, stack: error.stack });
    }
}

function createStar(container) {
    try {
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
        
        container.appendChild(star);
    } catch (error) {
        console.error('Error creating star:', error);
        debugLog('Failed to create star', { error: error.message });
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    debugLog('DOM fully loaded, starting initialization...');
    init();
});

// Log any unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    debugLog('Unhandled Promise Rejection', { 
        reason: event.reason?.message || 'Unknown error',
        stack: event.reason?.stack
    });
});
