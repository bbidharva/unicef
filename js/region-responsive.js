// media-query-handler.js - Handles viewport changes and applies appropriate styles

document.addEventListener('DOMContentLoaded', function() {
    // Media query breakpoints
    const breakpoints = {
      mobile: 426,
      tablet: 769,
      laptop: 1024
    };
  
    // Function to handle viewport changes
    function handleViewportChange() {
      const viewportWidth = window.innerWidth;
      const body = document.body;
      
      // Remove all viewport classes first
      body.classList.remove('mobile-view', 'tablet-view', 'laptop-view', 'desktop-view');
      
      // Add appropriate class based on viewport width
      if (viewportWidth <= breakpoints.mobile) {
        body.classList.add('mobile-view');
        console.log('Mobile view active');
      } else if (viewportWidth <= breakpoints.tablet) {
        body.classList.add('tablet-view');
        console.log('Tablet view active');
      } else if (viewportWidth <= breakpoints.laptop) {
        body.classList.add('laptop-view');
        console.log('Laptop view active');
      } else {
        body.classList.add('desktop-view');
        console.log('Desktop view active');
      }
    }
    
    // Run on page load
    handleViewportChange();
    
    // Run when window is resized (with debounce for performance)
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleViewportChange, 250);
    });
  });