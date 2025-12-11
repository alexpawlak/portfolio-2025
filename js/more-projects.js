document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isNested = path.includes('/projects/');
  const base = isNested ? '../../' : '';

  // Catalog of available single project pages
  const projects = [
    {
      key: 'oxford-city-guide',
      title: 'Oxford City Guide',
      href: `${base}projects/oxford-city-guide/oxford-city-guide.html`,
      img: `${base}images/photos/portraits/oxford-city-guide/oxford-city-guide.png`,
      alt: 'Oxford City Guide'
    },
    {
      key: 'sfr-business-portal',
      title: 'SFR Business Client Portal',
      href: `${base}projects/sfr-business-portal/sfr-business-portal.html`,
      img: `${base}images/sfr-business/sfr-business-portal.png`,
      alt: 'SFR Business Portal'
    },
    {
      key: 'iot',
      title: 'IoT Platform',
      href: `${base}projects/iot/iot.html`,
      img: `${base}images/live-objects.png`,
      alt: 'IoT Platform'
    },
    {
      key: 'grand-paris',
      title: 'Grand Paris Express',
      href: `${base}projects/grand-paris/grand-paris.html`,
      img: `${base}images/grand-paris-express/grand-paris-express-header.png`,
      alt: 'Grand Paris Express'
    },
    {
      key: 'e-commerce',
      title: 'E‑commerce Redesign',
      href: `${base}projects/e-commerce/e-commerce.html`,
      img: `${base}images/e-commerce.png`,
      alt: 'E‑commerce'
    },
    {
      key: 'navigation-system',
      title: 'Navigation System',
      href: `${base}projects/navigation-system/navigation-system.html`,
      img: `${base}images/navigation.png`,
      alt: 'Navigation System'
    }
  ];

  // Determine current project key by folder name
  let currentKey = null;
  const match = path.match(/\/projects\/([^\/]+)\//);
  if (match) currentKey = match[1];

  // Filter out current project
  const index = projects.findIndex(p => p.key === currentKey);
  let ordered = projects.slice();
  if (index >= 0) {
    ordered = projects.slice(index + 1).concat(projects.slice(0, index));
  }
  const suggestions = ordered.filter(p => p.key !== currentKey).slice(0, 3);

  // Build component
  const container = document.createElement('div');
  container.className = 'container section-block more-projects';
  container.innerHTML = `
    <div class="row">
      <div class="col-12 d-flex justify-content-between align-items-center mb-3">
        <h2 class="mb-0">More projects</h2>
        <a class="btn btn-outline-success" href="${base}projects.html">See all projects</a>
      </div>
    </div>
    <div class="row g-4">
      ${suggestions.map(p => `
        <div class="col-12 col-md-4">
          <a href="${p.href}" class="text-decoration-none">
            <div class="card border-0 bg-transparent">
              <img src="${p.img}" class="card-img-top" alt="${p.alt}">
              <div class="card-body px-0">
                <h5 class="card-title">${p.title}</h5>
              </div>
            </div>
          </a>
        </div>
      `).join('')}
    </div>
    <div class="row mt-3 d-sm-none">
      <div class="col-12 text-center">
        <a class="btn btn-outline-success" href="${base}projects.html">See all projects</a>
      </div>
    </div>
  `;

  // Append before end of body
  document.body.appendChild(container);
});