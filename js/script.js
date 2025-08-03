// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navigation height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation Background on Scroll
const navigation = document.querySelector('.navigation');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navigation.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navigation.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
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

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Apply staggered fade-in to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Typing Effect for Hero Subtitle (Optional Enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--color-black);
    }
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Lazy Loading for Images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(highlightNavigation, 100));

// Accessibility: Focus management for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.focus();
    }
});

// Print styles - Remove animations when printing
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('*').forEach(el => {
        el.style.transition = 'none';
        el.style.animation = 'none';
    });
});

// Create CS-themed animations
function initCSAnimations() {
    // Binary Rain Effect
    createBinaryRain();
}

function createBinaryRain() {
    const binaryContainer = document.getElementById('binaryRain');
    if (!binaryContainer) return;
    
    const columns = 15;
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.classList.add('binary-column');
        
        // Generate binary string
        let binaryString = '';
        for (let j = 0; j < 50; j++) {
            binaryString += Math.random() > 0.5 ? '1' : '0';
            binaryString += Math.random() > 0.8 ? ' ' : '';
        }
        
        column.textContent = binaryString;
        column.style.left = `${(i / columns) * 100}%`;
        column.style.animationDelay = `${Math.random() * 20}s`;
        column.style.animationDuration = `${15 + Math.random() * 10}s`;
        
        binaryContainer.appendChild(column);
    }
}

function createNetworkVisualization() {
    const networkContainer = document.getElementById('networkContainer');
    if (!networkContainer) return;
    
    const nodes = [];
    const nodeCount = 8;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.classList.add('network-node');
        
        const x = 20 + Math.random() * 60;
        const y = 20 + Math.random() * 60;
        
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        node.style.animationDelay = `${Math.random() * 4}s`;
        
        networkContainer.appendChild(node);
        nodes.push({ element: node, x, y });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.6) { // Create connection with 40% probability
                const line = document.createElement('div');
                line.classList.add('network-line');
                
                const node1 = nodes[i];
                const node2 = nodes[j];
                
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                line.style.width = `${distance}%`;
                line.style.left = `${node1.x}%`;
                line.style.top = `${node1.y}%`;
                line.style.transform = `rotate(${angle}deg)`;
                line.style.animationDelay = `${Math.random() * 8}s`;
                
                networkContainer.appendChild(line);
            }
        }
    }
}

// Initialize CS animations on load
window.addEventListener('DOMContentLoaded', initCSAnimations);