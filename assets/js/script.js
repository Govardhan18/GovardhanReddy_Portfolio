function initAOS() {
  const elementsToAnimate = document.querySelectorAll('[data-aos]');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
}

// Handle navbar scrolling behavior
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Handle active navigation links based on scroll position
function handleActiveNavLinks() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSectionId = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Transform hamburger to X
    const bars = document.querySelectorAll('.menu-toggle .bar');
    bars[0].classList.toggle('animate-bar-1');
    bars[1].classList.toggle('animate-bar-2');
    bars[2].classList.toggle('animate-bar-3');
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.nav-links .nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      const bars = document.querySelectorAll('.menu-toggle .bar');
      bars[0].classList.remove('animate-bar-1');
      bars[1].classList.remove('animate-bar-2');
      bars[2].classList.remove('animate-bar-3');
    });
  });
}

// Handle custom cursor
function handleCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (window.innerWidth < 992) {
    return; // Don't enable custom cursor on mobile devices
  }
  
  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, input, textarea, .timeline-item');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('cursor-hover');
      cursorOutline.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('cursor-hover');
      cursorOutline.classList.remove('cursor-hover');
    });
  });
}

// Handle skill items hover effects
function handleSkillsAnimation() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('skill-hover');
    });
    
    item.addEventListener('mouseleave', () => {
      item.classList.remove('skill-hover');
    });
  });
}

// Handle form submission
function handleContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Simulate API call delay
      setTimeout(() => {
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        
        console.log('Form submitted:', formObject);
        
        // Reset form
        contactForm.reset();
        
        // Show success message (in a real application, you'd implement proper feedback)
        alert('Message sent successfully! (Note: This is a demo simulation)');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add CSS animations for bar animation
function addMenuToggleStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .animate-bar-1 {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .animate-bar-2 {
      opacity: 0;
    }
    
    .animate-bar-3 {
      transform: rotate(-45deg) translate(7px, -7px);
    }
    
    .cursor-hover {
      transform: scale(1.5);
      opacity: 0.5;
    }
    
    .skill-hover {
      transform: translateY(-10px);
    }
  `;
  document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add menu toggle styles
  addMenuToggleStyles();
  
  // Initialize scroll animations
  initAOS();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Setup mobile menu
  toggleMobileMenu();
  
  // Setup custom cursor
  handleCustomCursor();
  
  // Setup skills animations
  handleSkillsAnimation();
  
  // Setup contact form
  handleContactForm();
  
  // Add scroll event listeners
  window.addEventListener('scroll', function() {
    handleNavbarScroll();
    handleActiveNavLinks();
  });
  
  // Trigger once on load
  handleNavbarScroll();
  handleActiveNavLinks();
});