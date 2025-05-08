// newsletter-signup.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the newsletter form elements
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    const signupButton = document.querySelector('.newsletter-form button');
    
    // Add click event listener to the signup button
    if (signupButton) {
      signupButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate the email
        if (validateEmail()) {
          // If validation passes, show success message
          showSuccessMessage();
          // Clear the input field
          emailInput.value = '';
        }
      });
    }
    
    // Validate email format
    function validateEmail() {
      const email = emailInput.value.trim();
      
      // Check if empty
      if (email === '') {
        showError('Please enter your email address');
        return false;
      }
      
      // Simple check for @ symbol and domain
      if (!email.includes('@') || !email.includes('.')) {
        showError('Please enter a valid email address');
        return false;
      }
      
      // Remove any existing error
      removeError();
      return true;
    }
    
    // Show error message
    function showError(message) {
      // Remove any existing error or success message
      removeMessages();
      
      // Create error message
      const errorElement = document.createElement('div');
      errorElement.className = 'newsletter-error';
      errorElement.textContent = message;
      errorElement.style.color = '#e74c3c';
      errorElement.style.fontSize = '14px';
      errorElement.style.marginTop = '5px';
      
      // Add red border to input
      emailInput.style.borderColor = '#e74c3c';
      
      // Insert error message after the form
      newsletterForm.insertAdjacentElement('afterend', errorElement);
    }
    
    // Remove error message
    function removeError() {
      const errorElement = document.querySelector('.newsletter-error');
      if (errorElement) {
        errorElement.remove();
      }
      emailInput.style.borderColor = '';
    }
    
    // Show success message
    function showSuccessMessage() {
      // Remove any existing error or success message
      removeMessages();
      
      // Create success message
      const successElement = document.createElement('div');
      successElement.className = 'newsletter-success';
      successElement.textContent = 'Thank you for subscribing to our newsletter!';
      successElement.style.color = '#00aeef';
      successElement.style.fontSize = '14px';
      successElement.style.marginTop = '5px';
      
      // Add green border to input
      emailInput.style.borderColor = '#00aeef';
      
      // Insert success message after the form
      newsletterForm.insertAdjacentElement('afterend', successElement);
      
      // Remove success message after 3 seconds
      setTimeout(function() {
        removeMessages();
      }, 3000);
    }
    
    // Remove all message elements
    function removeMessages() {
      const errorElement = document.querySelector('.newsletter-error');
      const successElement = document.querySelector('.newsletter-success');
      
      if (errorElement) {
        errorElement.remove();
      }
      
      if (successElement) {
        successElement.remove();
      }
      
      emailInput.style.borderColor = '';
    }
    
    // Add input event listener to remove error when typing
    if (emailInput) {
      emailInput.addEventListener('input', function() {
        removeMessages();
      });
    }
  });