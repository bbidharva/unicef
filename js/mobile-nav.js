// mobile-nav.js - Add this file to your project

document.addEventListener('DOMContentLoaded', function() {
    // Get navigation elements
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navClose = document.querySelector('.nav-close');
    const body = document.body;
    
    // Function to open mobile menu
    function openNav() {
      navLinks.classList.add('active');
      body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }
    
    // Function to close mobile menu
    function closeNav() {
      navLinks.classList.remove('active');
      body.style.overflow = ''; // Restore scrolling
    }
    
    // Event listeners
    if (navToggle) {
      navToggle.addEventListener('click', openNav);
    }
    
    if (navClose) {
      navClose.addEventListener('click', closeNav);
    }
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', closeNav);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);
      
      if (navLinks.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
        closeNav();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 769 && navLinks.classList.contains('active')) {
        closeNav();
      }
    });
  });

  // Add the following code to your mobile-nav.js file

document.addEventListener('DOMContentLoaded', function() {
    // Get mobile search elements
    const mobileSearchButton = document.querySelector('.mobile-search-button');
    const mobileSearchInput = document.querySelector('.mobile-search-input');
    
    // Add event listener to mobile search button
    if (mobileSearchButton && mobileSearchInput) {
      mobileSearchButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate search input
        if (mobileSearchInput.value.trim() !== '') {
          // Redirect to search results page or perform search
          // You can modify this to match your actual search functionality
          window.location.href = `search-results.html?q=${encodeURIComponent(mobileSearchInput.value.trim())}`;
        } else {
          // Focus the input if empty
          mobileSearchInput.focus();
        }
      });
      
      // Handle Enter key press in the search input
      mobileSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          
          // Trigger the search button click
          mobileSearchButton.click();
        }
      });
    }
    
    // Existing mobile nav code...
    // You can keep the rest of your mobile-nav.js code below
  });