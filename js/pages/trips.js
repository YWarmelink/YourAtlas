let allTrips = [];

document.addEventListener('DOMContentLoaded', async () => {
  const grid  = document.getElementById('tripsGrid');
  const count = document.getElementById('tripsCount');
  if (!grid) return;

  grid.innerHTML = spinner();

  try {
    allTrips = await dataService.getTrips();
    populateFilters();
    render();
  } catch (e) {
    grid.innerHTML = errorMsg('Could not load trips. Check your connection or data source.');
  }

  document.getElementById('searchInput')?.addEventListener('input',  render);
  document.getElementById('filterContinent')?.addEventListener('change', render);
  document.getElementById('filterStatus')?.addEventListener('change', render);
  document.getElementById('filterType')?.addEventListener('change', render);
  document.getElementById('sortBy')?.addEventListener('change', render);
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

  grid.innerHTML = result.map(buildTripCard).join('');
}
