// tracking-validation.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the tracking form elements
    const trackingInput = document.querySelector('.tracking-input');
    const trackButton = document.querySelector('.track-button');
    const trackingForm = document.querySelector('.tracking-form');
    
    // Add click event listener to the track button
    if (trackButton) {
      trackButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate the tracking number
        if (validateTrackingNumber()) {
          // If validation passes, show success message
          showSuccessMessage();
          
          // Clear the input field
          setTimeout(function() {
            trackingInput.value = '';
            removeMessages();
          }, 3000);
        }
      });
    }
    
    // Validate tracking number format
    function validateTrackingNumber() {
      const trackingNumber = trackingInput.value.trim();
      
      // Check if empty
      if (trackingNumber === '') {
        showError('Please enter your donation ID');
        return false;
      }
      
      // Check if it's a number (we accept both integers and numbers with decimal places)
      if (!/^\d+$/.test(trackingNumber)) {
        showError('Please enter a valid donation ID (numbers only)');
        return false;
      }
      
      // Check length (assuming donation IDs are between 6-10 digits)
      if (trackingNumber.length < 6 || trackingNumber.length > 10) {
        showError('Donation ID should be between 6-10 digits');
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
      errorElement.className = 'tracking-error';
      errorElement.textContent = message;
      errorElement.style.color = '#e74c3c';
      errorElement.style.fontSize = '14px';
      errorElement.style.marginTop = '5px';
      errorElement.style.marginBottom = '15px';
      
      // Add red border to input
      trackingInput.style.borderColor = '#e74c3c';
      
      // Insert error message after the input container
      const inputContainer = document.querySelector('.input-container');
      inputContainer.insertAdjacentElement('afterend', errorElement);
    }
    
    // Remove error message
    function removeError() {
      const errorElement = document.querySelector('.tracking-error');
      if (errorElement) {
        errorElement.remove();
      }
      trackingInput.style.borderColor = '';
    }
    
    // Show success message
    function showSuccessMessage() {
      // Remove any existing messages
      removeMessages();
      
      // Create success message
      const successElement = document.createElement('div');
      successElement.className = 'tracking-success';
      successElement.textContent = 'Tracking your donation...';
      successElement.style.color = '#2ecc71';
      successElement.style.fontSize = '14px';
      successElement.style.marginTop = '5px';
      successElement.style.marginBottom = '15px';
      
      // Add green border to input
      trackingInput.style.borderColor = '#2ecc71';
      
      // Insert success message after the input container
      const inputContainer = document.querySelector('.input-container');
      inputContainer.insertAdjacentElement('afterend', successElement);
    }
    
    // Remove all message elements
    function removeMessages() {
      const errorElement = document.querySelector('.tracking-error');
      const successElement = document.querySelector('.tracking-success');
      
      if (errorElement) {
        errorElement.remove();
      }
      
      if (successElement) {
        successElement.remove();
      }
      
      trackingInput.style.borderColor = '';
    }
    
    // Add input event listener to remove error when typing
    if (trackingInput) {
      trackingInput.addEventListener('input', function() {
        removeMessages();
        
        // Auto-format: remove any non-digit characters as they type
        this.value = this.value.replace(/\D/g, '');
      });
    }
  });