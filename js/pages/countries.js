const CONTINENT_TOTALS = { Europe: 44, Asia: 48, Africa: 54, Americas: 35, Oceania: 14 };
const CONTINENT_COLORS = {
  Europe:   '#3b82f6',
  Asia:     '#ef4444',
  Africa:   '#f59e0b',
  Americas: '#10b981',
  Oceania:  '#8b5cf6',
};

function simplifyContinent(raw) {
  const c = (raw || '').toLowerCase();
  if (c.includes('europe'))  return 'Europe';
  if (c.includes('asia'))    return 'Asia';
  if (c.includes('africa'))  return 'Africa';
  if (c.includes('ocean') || c.includes('australia')) return 'Oceania';
  if (c.includes('america') || c.includes('caribbean')) return 'Americas';
  return 'Other';
}

function buildBreakdown(visited) {
  const counts = {};
  visited.filter(c => c.status === 'visited').forEach(c => {
    const cont = simplifyContinent(c.continent);
    counts[cont] = (counts[cont] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = sorted[0]?.[1] || 1;
  const totalVisited = sorted.reduce((s, [, n]) => s + n, 0);

  return `
    <div class="continent-breakdown">
      <div class="breakdown-header">
        <h2 class="breakdown-title">Continents Explored</h2>
        <span class="breakdown-total">${totalVisited} countries visited in total</span>
      </div>
      <div class="breakdown-bars">
        ${sorted.map(([cont, count]) => {
          const total  = CONTINENT_TOTALS[cont] || count;
          const pct    = Math.round(count / total * 100);
          const barW   = Math.round(count / maxCount * 100);
          const color  = CONTINENT_COLORS[cont] || '#64748b';
          return `
            <div class="breakdown-row">
              <div class="breakdown-label">
                <span class="breakdown-cont-dot" style="background:${color}"></span>
                <span class="breakdown-cont-name">${cont}</span>
              </div>
              <div class="breakdown-bar-wrap">
                <div class="breakdown-bar" style="width:${barW}%;background:${color}"></div>
              </div>
              <span class="breakdown-stats">${count} <span class="breakdown-of">/ ~${total}</span></span>
              <span class="breakdown-pct">${pct}%</span>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const container  = document.getElementById('countriesContent');
  const statsEl    = document.getElementById('countriesStats');
  const breakdownEl = document.getElementById('continentBreakdown');
  if (!container) return;

  container.innerHTML = spinner();

  try {
    const [countries, visited] = await Promise.all([
      dataService.getCountries(),
      dataService.getCountriesVisited(),
    ]);

    if (breakdownEl && visited.length) {
      breakdownEl.innerHTML = buildBreakdown(visited);
    }

    if (!countries.length) {
      container.innerHTML = emptyMsg('No country data found yet.');
      return;
    }

    // Update stats
    if (statsEl) {
      const visitedCount = visited.filter(c => c.status === 'visited').length || countries.length;
      const totalTrips   = countries.reduce((s, c) => s + c.trips.length, 0);
      statsEl.textContent = `${visitedCount} countries visited · ${totalTrips} trips`;
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
