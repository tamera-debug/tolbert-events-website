// tolbert events - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('menu-toggle--open');
      nav.classList.toggle('nav--open');
      document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('menu-toggle--open');
        nav.classList.remove('nav--open');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Header scroll behavior
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.observe-fade').forEach(el => {
    observer.observe(el);
  });
  
  // Set current year in footer
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Active nav link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });
  
});
