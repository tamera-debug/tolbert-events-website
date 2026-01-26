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
  
  // Form submission handling (will connect to Make.com)
  const contactForm = document.getElementById('contact-form');
  const signupForm = document.getElementById('signup-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = 'sending...';
      submitBtn.disabled = true;
      
      // Collect form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        // Replace this URL with your Make.com webhook URL
        const webhookUrl = contactForm.dataset.webhook || '';
        
        if (webhookUrl) {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });
          
          if (response.ok) {
            showFormSuccess(contactForm, 'Thank you! I\'ll respond within 2 business days.');
          } else {
            throw new Error('Form submission failed');
          }
        } else {
          // Demo mode - just show success
          console.log('Form data:', data);
          showFormSuccess(contactForm, 'Thank you! I\'ll respond within 2 business days.');
        }
      } catch (error) {
        console.error('Form error:', error);
        showFormError(contactForm, 'Something went wrong. Please email hello@tolbertevents.com directly.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = signupForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'subscribing...';
      submitBtn.disabled = true;
      
      const formData = new FormData(signupForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const webhookUrl = signupForm.dataset.webhook || '';
        
        if (webhookUrl) {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
          
          if (response.ok) {
            showFormSuccess(signupForm, 'You\'re subscribed! Check your inbox for a welcome email.');
          } else {
            throw new Error('Signup failed');
          }
        } else {
          console.log('Signup data:', data);
          showFormSuccess(signupForm, 'You\'re subscribed! Check your inbox for a welcome email.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        showFormError(signupForm, 'Something went wrong. Please try again.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  function showFormSuccess(form, message) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message form-message--success';
    successDiv.style.cssText = 'padding: 1rem; background: #E8F5E9; color: #2E7D32; border-radius: 4px; margin-top: 1rem; text-align: center;';
    successDiv.textContent = message;
    form.appendChild(successDiv);
    form.reset();
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }
  
  function showFormError(form, message) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message form-message--error';
    errorDiv.style.cssText = 'padding: 1rem; background: #FFEBEE; color: #C62828; border-radius: 4px; margin-top: 1rem; text-align: center;';
    errorDiv.textContent = message;
    form.appendChild(errorDiv);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
  
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
