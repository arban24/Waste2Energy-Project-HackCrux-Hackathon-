/**
 * Waste to Energy Website JavaScript
 * Handles interactivity, animations, dark mode, and calculator functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Elements
    const modeToggle = document.querySelector('.mode-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const techCards = document.querySelectorAll('.tech-card');
    const calculateBtn = document.getElementById('calculate-btn');
    const contactForm = document.getElementById('contact-form');
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    
    console.log('Hero buttons found:', heroButtons.length);
    
    // Fix any CSS z-index issues programmatically and ensure all buttons are clickable
    document.querySelectorAll('.btn-primary, .btn-secondary, .read-more, .hero-buttons a, .case-study-card a').forEach(element => {
        element.style.position = 'relative';
        element.style.zIndex = '15';
        element.style.cursor = 'pointer';
    });
    
    // Specifically fix hero buttons
    heroButtons.forEach(button => {
        button.style.zIndex = '20';
        button.style.position = 'relative';
        button.style.pointerEvents = 'auto';
        console.log('Fixed hero button:', button.textContent.trim());
    });
    
    // Initialize Leaflet Map for Case Studies
    initMap();
    
    // Event Listeners
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateEnergy);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Add click event listeners to tech cards
    techCards.forEach(card => {
        console.log('Adding click event to tech card:', card.querySelector('h3').textContent);
        
        card.addEventListener('click', function(e) {
            const techType = this.getAttribute('data-tech');
            // You can expand this to show detailed info about each technology
            console.log('Technology clicked:', techType);
            
            // Find the read more link in this card and simulate click
            const readMoreLink = this.querySelector('.read-more');
            if (readMoreLink) {
                readMoreLink.click();
            }
        });
        
        // Make sure read more links work correctly
        const readMoreLink = card.querySelector('.read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering the card click event
                console.log('Read more clicked for:', card.getAttribute('data-tech'));
                // Add your read more functionality here
            });
        }
    });
    
    // Scroll Event Listener for Animations
    window.addEventListener('scroll', revealOnScroll);
    
    // Run initial animation check
    revealOnScroll();
    
    // Smooth scrolling for anchor links with enhanced click handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                console.log('Scrolling to:', targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            } else {
                console.warn('Target element not found:', targetId);
            }
        });
    });
    
    // Direct click handler for hero buttons to ensure they work
    heroButtons.forEach(button => {
        console.log('Adding direct click event to hero button:', button.textContent.trim());
        
        button.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            console.log('Hero button clicked directly, target:', targetId);
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            } else {
                console.warn('Target element not found for hero button:', targetId);
            }
            
            return false; // Prevent default and stop propagation
        };
    });
    
    // Make case study buttons clickable
    document.querySelectorAll('.case-study-card .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent triggering the card click event
            
            // Find the case study ID from the parent card's ID
            const cardId = this.closest('.case-study-card').id;
            const caseStudyId = cardId.replace('case-study-', '');
            
            console.log(`Opening full case study for case study ${caseStudyId}`);
            // Add functionality to open full case study details
        });
    });
    
    // Initialize circular economy animation observer
    initAnimationObserver();
});

/**
 * Toggle Dark Mode
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Toggle icon
    const icon = document.querySelector('.mode-toggle i');
    const wavePath = document.querySelector('.wave-divider svg path');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        
        // Set wave color for dark mode
        if (wavePath) {
            wavePath.setAttribute('fill', '#1a2639'); // Dark background color
            wavePath.setAttribute('fill-opacity', '1');
            console.log('Wave color set to dark mode');
        }
        
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        
        // Reset wave color for light mode
        if (wavePath) {
            wavePath.setAttribute('fill', '#ffffff'); // White background color
            wavePath.setAttribute('fill-opacity', '1');
            console.log('Wave color set to light mode');
        }
        
        localStorage.setItem('darkMode', 'disabled');
    }
}

/**
 * Check if Dark Mode was previously enabled
 */
function checkDarkMode() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('.mode-toggle i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        
        // Set wave color for dark mode
        setTimeout(() => {
            const wavePath = document.querySelector('.wave-divider svg path');
            if (wavePath) {
                wavePath.setAttribute('fill', '#1a2639'); // Dark background color
                wavePath.setAttribute('fill-opacity', '1');
                console.log('Wave color set to dark mode on page load');
            }
        }, 100); // Add a short delay to ensure DOM is fully loaded
    }
}

// Run dark mode check on page load
checkDarkMode();

/**
 * Toggle Mobile Menu
 */
function toggleMenu() {
    navLinks.classList.toggle('active');
}

/**
 * Reveal Elements on Scroll
 */
function revealOnScroll() {
    const reveals = document.querySelectorAll('.tech-card, .infographic-step, .blog-card, .result-card, .calculator-visualization, .info-image, .info-text');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('animate-fade-in');
        }
    });
}

/**
 * Initialize Animation Observer for Circular Economy Section
 */
function initAnimationObserver() {
    const additionalInfoContent = document.querySelector('.additional-info-content');
    
    if (!additionalInfoContent) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(additionalInfoContent);
}

/**
 * Initialize Leaflet Map for Case Studies
 */
function initMap() {
    const mapContainer = document.getElementById('case-study-map');
    
    if (!mapContainer) return;
    
    // Load CSS for Leaflet
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(leafletCSS);
    
    // Create map with center point
    const map = L.map('case-study-map').setView([20, 0], 2);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Define case study locations
    const locations = [
        {
            id: 1,
            name: "Copenhagen Waste-to-Energy Plant",
            lat: 55.6761,
            lng: 12.5683
        },
        {
            id: 2,
            name: "Singapore Tuas WTE Facility",
            lat: 1.3521,
            lng: 103.8198
        },
        {
            id: 3,
            name: "Osaka Great Waste Facility",
            lat: 34.6937,
            lng: 135.5023
        }
    ];
    
    // Custom icon for markers
    const wasteIcon = L.icon({
        iconUrl: 'images/mark.png',
        iconSize: [30, 40],
        iconAnchor: [15, 40],
        popupAnchor: [0, -40]
    });
    
    // Add markers to map
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng], {icon: wasteIcon}).addTo(map);
        
        marker.bindPopup(location.name);
        
        marker.on('click', function() {
            showCaseStudy(location.id);
        });
    });
}

/**
 * Show Case Study Information
 */
function showCaseStudy(id) {
    // Hide all case study cards
    document.querySelectorAll('.case-study-card').forEach(card => {
        card.classList.add('hidden');
    });
    
    // Show selected case study
    const selectedCard = document.getElementById(`case-study-${id}`);
    if (selectedCard) {
        selectedCard.classList.remove('hidden');
        
        // Add event listener to the case study button if it exists
        const caseStudyBtn = selectedCard.querySelector('.btn-secondary');
        if (caseStudyBtn) {
            caseStudyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Opening full case study for case study ${id}`);
                // Add your case study button functionality here
                // For example, open a modal with more details or navigate to a detailed page
            });
        }
    }
}

/**
 * Calculate Energy from Waste
 */
function calculateEnergy() {
    // Get input values
    const wasteType = document.getElementById('waste-type').value;
    const wasteAmount = parseFloat(document.getElementById('waste-amount').value);
    const conversionMethod = document.getElementById('conversion-method').value;
    
    // Energy factors (MWh per ton) based on waste type and conversion method
    const energyFactors = {
        municipal: {
            incineration: 0.5,
            anaerobic: 0.3,
            gasification: 0.7,
            pyrolysis: 0.6
        },
        organic: {
            incineration: 0.3,
            anaerobic: 0.4,
            gasification: 0.5,
            pyrolysis: 0.4
        },
        agricultural: {
            incineration: 0.4,
            anaerobic: 0.5,
            gasification: 0.6,
            pyrolysis: 0.5
        },
        industrial: {
            incineration: 0.6,
            anaerobic: 0.2,
            gasification: 0.8,
            pyrolysis: 0.7
        }
    };
    
    // Calculate energy output
    const energyOutput = wasteAmount * energyFactors[wasteType][conversionMethod];
    
    // Calculate CO2 reduction (rough estimate - 0.5 tons per MWh)
    const co2Reduction = energyOutput * 0.5;
    
    // Calculate homes powered (assume 4 MWh per home per year)
    const homesPowered = Math.round(energyOutput / 4);
    
    // Update results
    document.getElementById('energy-output').textContent = `${energyOutput.toFixed(2)} MWh`;
    document.getElementById('co2-reduction').textContent = `${co2Reduction.toFixed(2)} tons`;
    document.getElementById('homes-powered').textContent = `${homesPowered} homes`;
    
    // Animate results
    animateResults();
    
    // Animate calculator visualization
    const calculatorVisualization = document.querySelector('.calculator-visualization');
    if (calculatorVisualization) {
        calculatorVisualization.classList.add('pulse-animation');
        setTimeout(() => {
            calculatorVisualization.classList.remove('pulse-animation');
        }, 1000);
    }
}

/**
 * Animate Calculator Results
 */
function animateResults() {
    const results = document.querySelectorAll('.result-card');
    
    results.forEach(result => {
        result.classList.add('highlight');
        setTimeout(() => {
            result.classList.remove('highlight');
        }, 1000);
    });
}

/**
 * Handle Contact Form Submission
 */
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, this would send data to a server
    // For now, just show an alert
    alert(`Thank you ${name}! Your message has been received. We will contact you soon.`);
    
    // Reset form
    e.target.reset();
} 