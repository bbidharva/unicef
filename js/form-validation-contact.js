// form-validation-contact.js

document.addEventListener('DOMContentLoaded', function() {
  // Get the form elements
  const submitButton = document.getElementById('contact-submit');
  const formInputs = document.querySelectorAll('.form-input, .form-textarea');
  const modal = document.getElementById('contact-modal');
  
  // Add click event listener to the submit button
  if (submitButton) {
    submitButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Validate the form
      if (validateForm()) {
        // If validation passes, show the thank you modal
        if (modal) {
          modal.style.display = 'flex';
        }
      }
    });
  }
  
  // Main validation function
  function validateForm() {
    let isValid = true;
    
    // Check all required inputs
    formInputs.forEach(input => {
      if (input.value.trim() === '') {
        showError(input, 'This field is required');
        isValid = false;
      } else {
        removeError(input);
        
        // Email validation
        if (input.type === 'email' || input.id === 'email') {
          if (!input.value.includes('@') || !input.value.includes('.')) {
            showError(input, 'Please enter a valid email');
            isValid = false;
          }
        }
        
        // Phone number validation
        if (input.id === 'contact') {
          const phoneNumber = input.value.replace(/\D/g, '');
          if (phoneNumber.length < 10) {
            showError(input, 'Please enter a valid phone number');
            isValid = false;
          }
        }
      }
    });
    
    return isValid;
  }
  
  // Function to show error 
  function showError(input, message) {
    // Remove any existing error
    removeError(input);
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    
    // Add red border to input
    input.style.borderColor = '#e74c3c';
    
    // Insert error message after input
    input.parentElement.appendChild(errorElement);
  }
  
  // Function to remove error
  function removeError(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
    input.style.borderColor = '';
  }
  
  // Add input event listeners for real-time validation
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      // Remove error when user types
      removeError(input);
      
      // Phone number formatting
      if (input.id === 'contact') {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 0) {
          if (value.length <= 3) {
            value = value;
          } else if (value.length <= 6) {
            value = value.substring(0, 3) + '-' + value.substring(3);
          } else {
            value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, 10);
          }
        }
        input.value = value;
      }
    });
  });
  
  // Close button for modal
  const closeBtn = document.getElementById('close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (modal && e.target === modal) {
      modal.style.display = 'none';
    }
  });
});