// Starfield with Parallax Effect
class Starfield {
    constructor(containerId, starCount = 500) {
        this.container = document.getElementById(containerId);
        this.starCount = starCount;
        this.stars = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        if (!this.container) {
            console.error('Container element not found');
            return;
        }
        
        this.init();
    }
    
    init() {
        // Create stars
        for (let i = 0; i < this.starCount; i++) {
            this.createStar();
        }
        
        // Mouse move effect
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 200);
        });
        
        // Initial animation frame
        this.animate();
    }
    
    createStar() {
        const star = document.createElement('div');
        const layer = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
        
        star.className = `star layer-${layer}`;
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const z = Math.random() * 100; // Depth
        
        // Store star data for animation
        const starData = {
            element: star,
            x,
            y,
            z,
            speed: 0.1 + Math.random() * 0.1, // Base movement speed
            layer
        };
        
        // Initial position
        this.positionStar(starData);
        
        // Add to DOM and store reference
        this.container.appendChild(star);
        this.stars.push(starData);
    }
    
    positionStar(star) {
        // Apply parallax effect based on mouse position and depth
        const x = star.x + (this.mouseX * star.layer * 0.1);
        const y = star.y + (this.mouseY * star.layer * 0.1);
        
        // Apply 3D transform for depth
        const transform = `translate3d(${x}%, ${y}%, 0) scale(${1 + (star.layer * 0.2)})`;
        
        star.element.style.transform = transform;
        star.element.style.opacity = 0.2 + (star.layer * 0.2);
    }
    
    onMouseMove(event) {
        // Normalize mouse position to -1 to 1 range
        this.mouseX = (event.clientX - this.windowHalfX) / this.windowHalfX;
        this.mouseY = (event.clientY - this.windowHalfY) / this.windowHalfY;
    }
    
    handleResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update each star's position
        this.stars.forEach(star => {
            // Subtle movement based on depth
            star.x += star.speed * 0.05;
            
            // Reset star position if it moves off screen
            if (star.x > 100) {
                star.x = -5;
                star.y = Math.random() * 100;
            }
            
            this.positionStar(star);
        });
    }
}

// Text hover effects
function initHoverEffects() {
    const name = document.querySelector('.name');
    const subtitle = document.querySelector('.subtitle');
    
    if (name && subtitle) {
        name.addEventListener('mousemove', (e) => {
            const rect = name.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            name.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0) scale(1.02)';
        });
        
        name.addEventListener('mouseleave', () => {
            name.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            subtitle.style.opacity = '0.9';
            subtitle.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(10, 10, 26, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 10, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize starfield
    new Starfield('stars-container');

    // Initialize hover effects
    initHoverEffects();

    // Initialize portfolio features
    initSmoothScrolling();
    initHeaderScroll();
    initScrollAnimations();
});
