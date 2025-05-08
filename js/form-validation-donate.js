// form-validation-donate.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the form elements
    const donateButton = document.getElementById('donate-button');
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    const modal = document.getElementById('donate-modal');
    
    // Add click event listener to the donate button
    if (donateButton) {
      donateButton.addEventListener('click', function(e) {
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
        // Skip validation for the message textarea
        if (input.placeholder === "Cheers") {
          return;
        }
        
        if (input.value.trim() === '') {
          showError(input, 'This field is required');
          isValid = false;
        } else {
          removeError(input);
          
          // Simple specific validations
          if (input.type === 'email') {
            if (!input.value.includes('@') || !input.value.includes('.')) {
              showError(input, 'Please enter a valid email');
              isValid = false;
            }
          }
          
          // Donation amount validation
          if (input.placeholder === '$') {
            const amount = input.value.replace('$', '').trim();
            if (isNaN(amount) || parseFloat(amount) <= 0) {
              showError(input, 'Please enter a valid amount');
              isValid = false;
            }
          }
          
          // Card number validation
          if (input.placeholder === '**** **** **** ****') {
            const cardNumber = input.value.replace(/\s/g, '');
            if (cardNumber.length < 13 || isNaN(cardNumber)) {
              showError(input, 'Please enter a valid card number');
              isValid = false;
            }
          }
          
          // Expiry date validation
          if (input.placeholder === 'MM/YY') {
            if (!input.value.includes('/')) {
              showError(input, 'Use format MM/YY');
              isValid = false;
            }
          }
          
          // CVV validation
          if (input.classList.contains('small')) {
            if (input.value.length < 3 || isNaN(input.value)) {
              showError(input, 'Enter 3-4 digits');
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
        
        // Card number formatting
        if (input.placeholder === '**** **** **** ****') {
          let value = input.value.replace(/\D/g, '');
          value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
          value = value.substring(0, 19);
          input.value = value;
        }
        
        // MM/YY formatting
        if (input.placeholder === 'MM/YY') {
          let value = input.value.replace(/\D/g, '');
          if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
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
