// Load unified navbar.html into all pages with root-relative links
document.addEventListener('DOMContentLoaded', function() {
  const navbarPath = '/navbar.html';

  fetch(navbarPath)
    .then(response => {
      if (!response.ok) throw new Error('Failed to load navbar');
      return response.text();
    })
    .then(html => {
      const navContainer = document.getElementById('navbar-container');
      if (!navContainer) return;
      navContainer.innerHTML = html;

      // Conditionally add Photography link only on About page
      if (isAboutPage()) {
        insertPhotographyLink();
      }

      highlightCurrentPage();
    })
    .catch(error => console.error('Error loading navbar:', error));
});

function isAboutPage() {
  const path = window.location.pathname;
  return path.endsWith('/about.html') || path === '/about.html';
}

function insertPhotographyLink() {
  const aboutItem = document.getElementById('about-link-item');
  if (!aboutItem) return;

  const li = document.createElement('li');
  li.className = 'nav-item';
  const a = document.createElement('a');
  a.className = 'nav-link';
  a.href = '/photo_book.html';
  a.textContent = 'Photography';
  li.appendChild(a);

  // Insert before About link
  aboutItem.parentNode.insertBefore(li, aboutItem);
}

// Function to add active class to current page link (root-relative aware)
function highlightCurrentPage() {
  const currentPath = window.location.pathname || '/index.html';
  const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');

  navLinks.forEach(link => {
    try {
      const linkPath = new URL(link.href, window.location.origin).pathname || '/index.html';
      if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
        link.classList.add('active');
      }
    } catch (e) {
      // Ignore malformed URLs
    }
  });
}
