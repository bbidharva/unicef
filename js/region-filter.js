// region-filter.js

document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.getElementById('filter-input');
    const filterDropdown = document.querySelector('.filter-dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Toggle dropdown when clicking on the filter input
    filterInput.addEventListener('click', function() {
      filterDropdown.classList.toggle('show');
    });
    
    // Select item when clicked
    dropdownItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove selected class from all items
        dropdownItems.forEach(i => i.classList.remove('selected'));
        
        // Add selected class to clicked item
        this.classList.add('selected');
        
        // Update input value with selected item text
        filterInput.value = this.getAttribute('data-value');
        
        // Hide dropdown
        filterDropdown.classList.remove('show');
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!filterInput.contains(event.target) && !filterDropdown.contains(event.target)) {
        filterDropdown.classList.remove('show');
      }
    });
  });