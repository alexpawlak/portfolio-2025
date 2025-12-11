// Load navbar.html into all pages
document.addEventListener('DOMContentLoaded', function() {
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Determine the correct path to navbar file based on current page depth
  let navbarPath = 'navbar.html';
  
  // Use special navbar for about page
  if (currentPage === 'about.html') {
    navbarPath = 'navbar-about.html';
  }
  
  // If we're in a subdirectory (like projects/grand-paris/), adjust the path
  if (window.location.pathname.includes('/projects/')) {
    navbarPath = '../../navbar-nested.html';
  }
  
  // Fetch and inject the navbar
  fetch(navbarPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load navbar');
      }
      return response.text();
    })
    .then(html => {
      const navContainer = document.getElementById('navbar-container');
      if (navContainer) {
        navContainer.innerHTML = html;
        
        // Highlight current page in navbar
        highlightCurrentPage();
      }
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
    });
});

// Function to add active class to current page link
function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
