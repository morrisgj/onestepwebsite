// Wait for DOM to fully load before running
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSlideshow();
    initSmoothScrolling();
    initModal();
    initNavAnimation();
    initScrollReveal();
    initDarkMode();
    initBackToTop();
    initMobileNav();
    
    // Add a dynamic greeting based on time of day
    displayGreeting();
  });
  
  // Slideshow functionality
  function initSlideshow() {
    const slideshow = document.getElementById('slideshow');
    if (!slideshow) return;
    
    const images = slideshow.querySelectorAll('img');
    const prevBtn = slideshow.querySelector('.prev');
    const nextBtn = slideshow.querySelector('.next');
    const dots = slideshow.querySelectorAll('.dot');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize the slideshow
    function showSlide(index) {
      // Remove active class from all images and dots
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current image and dot
      images[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }
    
    // Set up event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = images.length - 1;
        showSlide(newIndex);
        resetInterval();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= images.length) newIndex = 0;
        showSlide(newIndex);
        resetInterval();
      });
    }
    
    // Add click events to dots
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showSlide(index);
        resetInterval();
      });
    });
    
    // Auto-advance slides
    function startInterval() {
      slideInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= images.length) newIndex = 0;
        showSlide(newIndex);
      }, 5000); // Change slide every 5 seconds
    }
    
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }
    
    // Initialize first slide and start autoplay
    showSlide(0);
    startInterval();
    
    // Pause slideshow when user hovers over it
    slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slideshow.addEventListener('mouseleave', startInterval);
  }
  
  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Mobile Navigation
  function initMobileNav() {
    const nav = document.querySelector('nav');
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.classList.add('hamburger');
    hamburgerBtn.innerHTML = '☰';
    
    if (nav && !document.querySelector('.hamburger')) {
      nav.appendChild(hamburgerBtn);
      
      hamburgerBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Change hamburger to X when open
        hamburgerBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
      });
      
      // Close mobile menu when clicking on a link
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          hamburgerBtn.innerHTML = '☰';
        });
      });
    }
  }
  
  // Modal functionality
  function initModal() {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('infoBtn');
    const closeBtn = document.querySelector('.close');
    
    if (!modal || !btn) return;
    
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
      // Add entering animation class
      modal.querySelector('.modal-content').classList.add('modal-enter');
    });
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal();
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
      }
    });
    
    function closeModal() {
      const modalContent = modal.querySelector('.modal-content');
      modalContent.classList.remove('modal-enter');
      modalContent.style.opacity = '0';
      modalContent.style.transform = 'translateY(-50px)';
      
      setTimeout(() => {
        modal.style.display = 'none';
        // Reset the styles for next opening
        modalContent.style.opacity = '';
        modalContent.style.transform = '';
      }, 300);
    }
  }
  
  // Animated navigation highlight
  function initNavAnimation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (!link.classList.contains('selected')) {
          link.classList.add('nav-hover');
        }
      });
      
      link.addEventListener('mouseleave', () => {
        link.classList.remove('nav-hover');
      });
    });
  }
  
  // Reveal elements on scroll
  function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll('h2, p, ul, .card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elementsToReveal.forEach(element => {
      element.classList.add('reveal-element');
      observer.observe(element);
    });
  }
  
  // Back to top button functionality
  function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show button when scrolling down
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  
  // Accessibility helper for screen readers
  function announceToScreenReaders(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 3000);
  }
  // Enhanced Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
  });
  
  function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    // Create logo container for better mobile layout
    const logo = nav.querySelector('.logo');
    if (logo) {
      const logoContainer = document.createElement('div');
      logoContainer.classList.add('logo-container');
      // Move the logo into the container
      nav.insertBefore(logoContainer, nav.firstChild);
      logoContainer.appendChild(logo);
    }
    
    // Add hamburger menu for mobile
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.classList.add('hamburger');
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
    hamburgerBtn.innerHTML = '☰';
    
    // Add hamburger button to logo container or nav
    const logoContainer = nav.querySelector('.logo-container');
    if (logoContainer) {
      logoContainer.appendChild(hamburgerBtn);
    } else if (!document.querySelector('.hamburger')) {
      nav.insertBefore(hamburgerBtn, nav.querySelector('ul'));
    }
    
    // Toggle mobile menu
    hamburgerBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      // Change hamburger to X when open
      hamburgerBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
      // Announce to screen readers
      const isExpanded = nav.classList.contains('active');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 800) {
          nav.classList.remove('active');
          hamburgerBtn.innerHTML = '☰';
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
    
    // Add dropdown functionality for submenu items
    const dropdownLinks = nav.querySelectorAll('.dropdown > a');
    dropdownLinks.forEach(link => {
      // Add dropdown indicator
      link.innerHTML += ' <span class="dropdown-arrow">▼</span>';
      
      // For mobile: toggle submenu on click
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 800) {
          e.preventDefault();
          const parent = link.parentElement;
          parent.classList.toggle('active');
          
          // Toggle arrow direction
          const arrow = link.querySelector('.dropdown-arrow');
          if (arrow) {
            arrow.innerHTML = parent.classList.contains('active') ? '▲' : '▼';
          }
        }
      });
    });
    
    // Add scroll effect for sticky navigation
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
    
    // Set active nav item based on current page
    setActiveNavItem();
  }
  
  // Set the active navigation item based on current URL
  function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav li a');
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === '/' && linkHref === 'index.html')) {
        link.parentElement.classList.add('selected');
      } else {
        link.parentElement.classList.remove('selected');
        link.parentElement.classList.remove('active');
      }
    });
  }