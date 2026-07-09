function renderNavbar() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const user = getCurrentUser();

  const links = [
    { href: 'index.html',    label: 'Home' },
    { href: 'trips.html',    label: 'Trips' },
    { href: 'route-builder.html', label: 'Route Builder' },
    { href: 'countries.html',label: 'Countries' },
    { href: 'map.html',      label: 'Map' },
  ];

  const SUBPAGES = {
    'trips.html':    ['trip.html', 'itinerary.html'],
    'route-builder.html': [],
    'countries.html': [],
    'map.html':      [],
  };

  const linksHTML = links.map(l => {
    const isHome   = l.href === 'index.html' && (page === '' || page === 'index.html');
    const isDirect = page === l.href;
    const isSub    = (SUBPAGES[l.href] || []).includes(page);
    const active   = isHome || isDirect || isSub ? ' active' : '';
    return `<a href="${l.href}" class="nav-link${active}">${l.label}</a>`;
  }).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="navbar">
      <div class="nav-container">
        <a href="index.html" class="nav-brand">
          <svg class="nav-logo" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
          </svg>
          <span class="nav-title">${user.displayName}</span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
        <div class="nav-menu" id="navMenu">${linksHTML}</div>
      </div>
    </nav>`);

  document.getElementById('navToggle').addEventListener('click', function () {
    document.getElementById('navMenu').classList.toggle('open');
    this.classList.toggle('open');
  });
}

document.addEventListener('DOMContentLoaded', renderNavbar);
