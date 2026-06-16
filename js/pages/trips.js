let allTrips = [];
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', async () => {
  const grid  = document.getElementById('tripsGrid');
  if (!grid) return;

  grid.innerHTML = spinner();

  try {
    allTrips = await dataService.getTrips();
    populateFilters();
    const urlQ = new URLSearchParams(window.location.search).get('q');
    if (urlQ) {
      const searchEl = document.getElementById('searchInput');
      if (searchEl) searchEl.value = urlQ;
    }
    render();
  } catch (e) {
    grid.innerHTML = errorMsg('Could not load trips. Check your connection or data source.');
  }

  document.getElementById('searchInput')?.addEventListener('input',  render);
  document.getElementById('filterContinent')?.addEventListener('change', render);
  document.getElementById('filterStatus')?.addEventListener('change', render);
  document.getElementById('filterType')?.addEventListener('change', render);
  document.getElementById('sortBy')?.addEventListener('change', render);

  document.getElementById('viewGrid')?.addEventListener('click', () => {
    currentView = 'grid';
    document.getElementById('viewGrid').classList.add('active');
    document.getElementById('viewTimeline').classList.remove('active');
    document.getElementById('tripsGrid').className = 'trips-grid';
    render();
  });
  document.getElementById('viewTimeline')?.addEventListener('click', () => {
    currentView = 'timeline';
    document.getElementById('viewTimeline').classList.add('active');
    document.getElementById('viewGrid').classList.remove('active');
    document.getElementById('tripsGrid').className = 'trips-timeline';
    render();
  });
});

function populateFilters() {
  const continents = [...new Set(allTrips.map(t => t.continent).filter(Boolean))].sort();
  const statuses   = [...new Set(allTrips.map(t => t.status).filter(Boolean))].sort();
  const types      = [...new Set(allTrips.map(t => t.type).filter(Boolean))].sort();

  fillSelect('filterContinent', continents);
  fillSelect('filterStatus',   statuses);
  fillSelect('filterType',     types);
}

function fillSelect(id, values) {
  const el = document.getElementById(id);
  if (!el) return;
  values.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v; opt.textContent = v;
    el.appendChild(opt);
  });
}

function render() {
  const q    = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const cont = document.getElementById('filterContinent')?.value || '';
  const stat = document.getElementById('filterStatus')?.value || '';
  const type = document.getElementById('filterType')?.value || '';
  const sort = document.getElementById('sortBy')?.value || 'default';

  let result = allTrips.filter(t => {
    const haystack = [t.trip_name, t.country_region, t.continent, t.type, t.notes].join(' ').toLowerCase();
    if (q && !haystack.includes(q)) return false;
    if (cont && t.continent !== cont) return false;
    if (stat && t.status !== stat)   return false;
    if (type && t.type !== type)     return false;
    return true;
  });

  if (sort === 'name-az')    result.sort((a, b) => (a.trip_name || '').localeCompare(b.trip_name || ''));
  if (sort === 'name-za')    result.sort((a, b) => (b.trip_name || '').localeCompare(a.trip_name || ''));
  if (sort === 'duration')   result.sort((a, b) => (parseInt(b.duration_days) || 0) - (parseInt(a.duration_days) || 0));
  if (sort === 'date-new')   result.sort((a, b) => new Date(b.start_date || 0) - new Date(a.start_date || 0));
  if (sort === 'date-old')   result.sort((a, b) => new Date(a.start_date || 0) - new Date(b.start_date || 0));

  const grid  = document.getElementById('tripsGrid');
  const count = document.getElementById('tripsCount');

  if (count) count.textContent = `${result.length} trip${result.length !== 1 ? 's' : ''} found`;

  if (!result.length) {
    grid.innerHTML = `<div class="no-results"><div class="no-results-icon">🔍</div><p>No trips match your filters.</p></div>`;
    return;
  }

  if (currentView === 'timeline') {
    grid.innerHTML = renderTimeline(result);
  } else {
    grid.innerHTML = result.map(buildTripCard).join('');
  }
}

function renderTimeline(trips) {
  const byYear = {};
  trips.forEach(t => {
    let year = 'Upcoming';
    if (t.start_date) {
      const d = new Date(t.start_date);
      if (!isNaN(d)) year = String(d.getFullYear());
    }
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(t);
  });

  const years = Object.keys(byYear).sort((a, b) => {
    if (a === 'Upcoming') return -1;
    if (b === 'Upcoming') return 1;
    return Number(b) - Number(a);
  });

  return years.map(year => `
    <div class="tl-year">
      <div class="tl-year-header">
        <span class="tl-year-label">${year}</span>
        <span class="tl-year-count">${byYear[year].length} trip${byYear[year].length !== 1 ? 's' : ''}</span>
      </div>
      <div class="tl-items">
        ${byYear[year].map(t => {
          const sc  = statusClass(t.status);
          const sl  = statusLabel(t.status);
          const flag = getTripFlag(t);
          const dates = [t.start_date && formatDateShort(t.start_date), t.end_date && formatDateShort(t.end_date)]
            .filter(Boolean).join(' – ');
          return `
            <a href="trip.html?id=${encodeURIComponent(t.trip_id)}" class="tl-item">
              <div class="tl-item-flag">${flag}</div>
              <div class="tl-item-content">
                <div class="tl-item-name">${escapeHTML(t.trip_name)}</div>
                <div class="tl-item-meta">
                  ${t.continent ? `<span>${escapeHTML(t.continent)}</span>` : ''}
                  ${t.duration_days ? `<span>📅 ${t.duration_days} days</span>` : ''}
                  ${dates ? `<span>${dates}</span>` : ''}
                </div>
              </div>
              <div class="tl-item-right">
                <span class="badge badge-status-${sc}">${sl}</span>
                ${t.type ? `<span class="tl-item-type">${escapeHTML(t.type)}</span>` : ''}
              </div>
            </a>`;
        }).join('')}
      </div>
    </div>`).join('');
}
