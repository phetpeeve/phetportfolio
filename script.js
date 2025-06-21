// Simple styled popup
window.onload = function() {
    if (confirm("This website is under development.\nSome features may not work properly.\n- Japhet Balondo\n\nClick OK to continue.")) {
        // User clicked OK
    } else {
        // User clicked Cancel (you could redirect them if you want)
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('show');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const statusElement = document.getElementById('formStatus');
    
    // Show loading state
    statusElement.style.display = 'block';
    statusElement.textContent = 'Sending message...';
    statusElement.style.color = 'var(--text)';
    
    // Using FormSubmit.co for easy email handling
    fetch('https://formsubmit.co/ajax/balondojaphet@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        })
    })
    .then(response => response.json())
    .then(data => {
        statusElement.textContent = 'Message sent successfully!';
        statusElement.style.color = 'var(--primary)';
        form.reset();
        
        // Reset form labels
        document.querySelectorAll('.form-group label').forEach(label => {
            label.style.transform = '';
            label.style.color = '';
        });
    })
    .catch(error => {
        statusElement.textContent = 'Failed to send message. Please try again later or email me directly.';
        statusElement.style.color = 'var(--accent)';
    })
    .finally(() => {
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    });
});
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .about-content, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.project-card, .about-content, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
