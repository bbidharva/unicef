document.addEventListener('DOMContentLoaded', () => {
  // Elements to animate
  const heroTitle = document.querySelector('.hero-content h1');
  const heroText = document.querySelector('.hero-content p');
  const heroButtons = document.querySelector('.hero-btn');
  const sectionHeadings = document.querySelectorAll('.mission-content h2, .achievement-content h2, .purpose h2, .join-us h2, .case-studies h2, .latest-news-heading');
  
  // Immediately trigger animation for hero section on page load
  setTimeout(() => {
    if (heroTitle) heroTitle.classList.add('fade-in');
    if (heroText) heroText.classList.add('fade-in');
    if (heroButtons) heroButtons.classList.add('fade-in');
  }, 300); // Small delay for better effect after page load
  
  // Create intersection observer for section headings
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-heading');
        headingObserver.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: '-10px 0px' // Small offset for better timing
  });
  
  // Observe all section headings
  sectionHeadings.forEach(heading => {
    headingObserver.observe(heading);
  });
  
  // Optional: Add scroll-based parallax effect to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) { // Only apply effect when hero is visible
        // Create parallax effect on background
        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
      }
    });
  }
});

// Additional animation for stats section (works with your existing count-up script)
document.addEventListener('DOMContentLoaded', () => {
  // Animate stats items when they come into view
  const statItems = document.querySelectorAll('.stat-item');
  
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add staggered animation to each stat item
        const statItems = entry.target.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 150); // 150ms delay between each item
        });
        
        statObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-20px 0px'
  });
  
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    // First set initial state with JavaScript
    statItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });
    
    statObserver.observe(statsSection);
  }
});

// The most important part:
if (heroTitle) {
  heroTitle.style.opacity = '1';
  heroTitle.style.transform = 'none';
}

// Same for other elements...