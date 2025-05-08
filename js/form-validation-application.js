// form-validation-application.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the form elements
    const submitButton = document.querySelector('.submit-btn');
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    const fileInput = document.querySelector('.file-input');
    
    // Add click event listener to the submit button
    if (submitButton) {
      submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate the form
        if (validateForm()) {
          // If validation passes, show success message or redirect
          alert('Application submitted successfully! We will contact you soon.');
          // Optional: redirect to another page
          // window.location.href = 'thank-you.html';
        }
      });
    }
    
    // Main validation function
    function validateForm() {
      let isValid = true;
      
      // Check all required inputs
      formInputs.forEach(input => {
        // Check if input is required
        if (input.hasAttribute('required') || input.classList.contains('required')) {
          if (input.value.trim() === '') {
            showError(input, 'This field is required');
            isValid = false;
          } else {
            removeError(input);
            
            // Email validation
            if (input.type === 'email') {
              if (!input.value.includes('@') || !input.value.includes('.')) {
                showError(input, 'Please enter a valid email');
                isValid = false;
              }
            }
            
            // Phone number validation
            if (input.type === 'tel') {
              const phoneNumber = input.value.replace(/\D/g, '');
              if (phoneNumber.length < 10) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
              }
            }
          }
        }
      });
      
      // Validate file upload if required
      if (fileInput && (fileInput.hasAttribute('required') || fileInput.classList.contains('required'))) {
        if (!fileInput.files || fileInput.files.length === 0) {
          showError(fileInput, 'Please upload your resume/CV');
          isValid = false;
        } else {
          removeError(fileInput);
          
          // Check file type
          const fileName = fileInput.files[0].name;
          const fileExtension = fileName.split('.').pop().toLowerCase();
          const allowedExtensions = ['pdf', 'doc', 'docx'];
          
          if (!allowedExtensions.includes(fileExtension)) {
            showError(fileInput, 'Please upload a PDF or Word document');
            isValid = false;
          }
        }
      }
      
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
      
      // Add red border to input or its parent container
      if (input.classList.contains('file-input')) {
        input.parentElement.style.borderColor = '#e74c3c';
      } else {
        input.style.borderColor = '#e74c3c';
      }
      
      // Insert error message after input or its container
      if (input.classList.contains('file-input')) {
        input.parentElement.parentElement.appendChild(errorElement);
      } else {
        input.parentElement.appendChild(errorElement);
      }
    }
    
    // Function to remove error
    function removeError(input) {
      let parentElement;
      
      if (input.classList.contains('file-input')) {
        parentElement = input.parentElement.parentElement;
        input.parentElement.style.borderColor = '';
      } else {
        parentElement = input.parentElement;
        input.style.borderColor = '';
      }
      
      const errorElement = parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
    }
    
    // Add input event listeners for real-time validation
    formInputs.forEach(input => {
      input.addEventListener('input', function() {
        // Remove error when user types
        removeError(input);
        
        // Phone number formatting
        if (input.type === 'tel') {
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
    
    // Add change event listener for file input
    if (fileInput) {
      fileInput.addEventListener('change', function() {
        removeError(fileInput);
        
        // Update file input label with file name
        const fileInputLabel = document.querySelector('.file-input-label');
        if (fileInputLabel && fileInput.files && fileInput.files.length > 0) {
          fileInputLabel.textContent = fileInput.files[0].name;
        }
      });
    }
  });