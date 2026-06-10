document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('countriesContent');
  const statsEl   = document.getElementById('countriesStats');
  if (!container) return;

  container.innerHTML = spinner();

  try {
    const countries = await dataService.getCountries();

    if (!countries.length) {
      container.innerHTML = emptyMsg('No country data found yet.');
      return;
    }

    // Update stats
    if (statsEl) {
      const totalTrips = countries.reduce((s, c) => s + c.trips.length, 0);
      statsEl.textContent = `${countries.length} countries · ${totalTrips} trips`;
    }

    // Group by continent
    const byCont = {};
    countries.forEach(c => {
      const cont = c.continent || 'Other';
      if (!byCont[cont]) byCont[cont] = [];
      byCont[cont].push(c);
    });

    // Sort continents, then countries within each
    const contOrder = ['Europe', 'Asia', 'Americas', 'South America', 'North America', 'Africa', 'Oceania', 'Other'];
    const sortedConts = Object.keys(byCont).sort((a, b) => {
      const ia = contOrder.findIndex(c => a.toLowerCase().includes(c.toLowerCase()));
      const ib = contOrder.findIndex(c => b.toLowerCase().includes(c.toLowerCase()));
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });

    const html = sortedConts.map(cont => {
      const cols = byCont[cont];
      const dotClass = continentDotClass(cont);

      const cards = cols.map(country => {
        const trips = country.trips;
        const gradient = continentBannerClass(country.continent)
          .replace('trip-card-banner-', '');
        return `
          <div class="country-card">
            <div class="country-card-banner" style="background:var(--grad-${gradient})"></div>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem">
              <div class="country-card-name">${escapeHTML(country.name)}</div>
              <div class="country-trips-count">${trips.length}</div>
            </div>
            <div class="country-card-meta">${trips.length} trip${trips.length !== 1 ? 's' : ''}</div>
            <div class="country-card-trips">
              ${trips.map(t => `
                <a href="trip.html?id=${encodeURIComponent(t.trip_id)}" class="country-trip-link">
                  → ${escapeHTML(t.trip_name)}
                  <span class="badge badge-status-${statusClass(t.status)}">${statusLabel(t.status)}</span>
                </a>`).join('')}
            </div>
          </div>`;
      }).join('');

      return `
        <div class="continent-group">
          <div class="continent-group-header">
            <div class="continent-dot ${dotClass}"></div>
            <div class="continent-group-title">${escapeHTML(cont)}</div>
            <div class="continent-group-count">${cols.length} countr${cols.length !== 1 ? 'ies' : 'y'}</div>
          </div>
          <div class="countries-grid">${cards}</div>
        </div>`;
    }).join('');

    container.innerHTML = html;
  } catch (e) {
    container.innerHTML = errorMsg('Could not load countries data.');
  }
});
