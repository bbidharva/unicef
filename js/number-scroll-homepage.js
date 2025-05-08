// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Store the original values
    const statItems = document.querySelectorAll('.stat-item h3');
    const originalValues = [];
    
    statItems.forEach((item, index) => {
      // Store original text and numerical value
      const originalText = item.textContent.trim();
      originalValues[index] = {
        fullText: originalText,
        numericValue: parseFloat(originalText.replace(/[^\d.]/g, '')),
        suffix: getSuffix(originalText)
      };
      
      // Reset to zero with correct suffix
      item.textContent = `0${originalValues[index].suffix}`;
    });
    
    // Create intersection observer - this will trigger the animation ONLY when scrolled into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log("Achievement section is now visible - starting animation");
          // Find all stat items in this section
          const stats = entry.target.querySelectorAll('.stat-item h3');
          
          // Animate each stat
          stats.forEach((stat, index) => {
            animateValue(
              stat, 
              0, 
              originalValues[index].numericValue, 
              2000, 
              originalValues[index].suffix
            );
          });
          
          // Only animate once - this ensures the animation doesn't restart when scrolling back up
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25,  // Animation starts when 25% of the section is visible
      rootMargin: '-50px 0px'  // Small offset to make the trigger feel more natural
    });
    
    // Start observing the stats section
    const achievementsSection = document.querySelector('.achievements');
    if (achievementsSection) {
      // This is where the magic happens - we tell the observer to watch this section
      // The animation will ONLY trigger when this section is scrolled into view
      observer.observe(achievementsSection);
    }
    
    // No automatic animation - it will only happen on scroll
  });
  
  // Helper function to get suffix (x, %, +, etc.)
  function getSuffix(text) {
    if (text.includes('x')) return 'x';
    if (text.includes('%')) return '%';
    if (text.includes('+')) return '+';
    return '';
  }
  
  // Animation function
  function animateValue(element, start, end, duration, suffix) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = easeOutCubic(progress);
      const currentValue = Math.floor(start + easeProgress * (end - start));
      
      element.textContent = `${currentValue}${suffix}`;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }
  
  // Easing function
  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }