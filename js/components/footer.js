function renderFooter() {
  const user = getCurrentUser();
  const year = new Date().getFullYear();

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <span class="footer-title">${user.displayName}</span>
          <p class="footer-tagline">${user.tagline}</p>
        </div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="trips.html">Trips</a>
          <a href="route-builder.html">Route Builder</a>
          <a href="countries.html">Countries</a>
          <a href="map.html">Map</a>
          <a href="search.html">Search</a>
        </div>
        <div class="footer-meta">
          <p>Part of the YourIntineryPlan ecosystem</p>
          <p class="footer-copy">&copy; ${year} ${user.displayName}</p>
        </div>
      </div>
    </footer>`);
}

document.addEventListener('DOMContentLoaded', renderFooter);
