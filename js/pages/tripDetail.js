document.addEventListener('DOMContentLoaded', async () => {
  const id = getURLParam('id');
  if (!id) { renderNotFound(); return; }

  renderSkeleton();

  try {
    const [trip, items, notes] = await Promise.all([
      dataService.getTripById(id),
      dataService.getTripItems(id),
      dataService.getTripNotes(id),
    ]);

    if (!trip) { renderNotFound(); return; }

    renderHeader(trip);
    renderOverview(trip);
    renderItinerary(items);
    renderNotes(notes);
    renderSidebar(trip, items, notes);
    document.title = `${trip.trip_name} | Youri's Travel Atlas`;
  } catch (e) {
    document.getElementById('tripApp').innerHTML = errorMsg('Could not load trip data.');
  }
});

function renderSkeleton() {
  document.getElementById('tripApp').innerHTML = spinner();
}

function renderNotFound() {
  document.getElementById('tripApp').innerHTML = `
    <div class="error-message" style="padding:5rem 1rem">
      <span class="error-icon">🗺️</span>
      <p>Trip not found. <a href="trips.html" style="color:var(--atlas-blue)">Back to all trips</a></p>
    </div>`;
}

function renderHeader(trip) {
  const app = document.getElementById('tripApp');
  const bannerClass = continentBannerClass(trip.continent);
  const sc = statusClass(trip.status);
  const sl = statusLabel(trip.status);
  const datesStr = [trip.start_date && formatDate(trip.start_date), trip.end_date && formatDate(trip.end_date)]
    .filter(Boolean).join(' – ');

  app.innerHTML = `
    <div class="trip-detail-header">
      <div class="trip-detail-banner ${bannerClass}" style="height:200px">
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(15,27,45,.85) 0%,transparent 70%);z-index:0"></div>
      </div>
      <div class="trip-detail-header-inner" style="position:relative;z-index:1">
        <a href="trips.html" class="back-link">← All Trips</a>
        <div class="trip-detail-title">${escapeHTML(trip.trip_name)}</div>
        <div class="trip-detail-tags">
          <span class="badge badge-status-${sc}">${sl}</span>
          ${trip.continent ? `<span class="badge badge-continent">${escapeHTML(trip.continent)}</span>` : ''}
          ${trip.type ? `<span class="badge badge-type">${escapeHTML(trip.type)}</span>` : ''}
        </div>
        <div class="trip-detail-quick-stats">
          ${trip.duration_days ? `<span class="trip-quick-stat">📅 <strong>${trip.duration_days} days</strong></span>` : ''}
          ${datesStr            ? `<span class="trip-quick-stat">🗓 <strong>${datesStr}</strong></span>` : ''}
          ${trip.country_region ? `<span class="trip-quick-stat">📍 <strong>${escapeHTML(trip.country_region)}</strong></span>` : ''}
          ${trip.companions     ? `<span class="trip-quick-stat">👥 <strong>${escapeHTML(trip.companions)}</strong></span>` : ''}
          ${trip.season         ? `<span class="trip-quick-stat">🌤 <strong>${escapeHTML(trip.season)}</strong></span>` : ''}
        </div>
      </div>
    </div>
    <div class="trip-detail-body">
      <div class="trip-main" id="tripMain"></div>
      <div class="trip-sidebar" id="tripSidebar"></div>
    </div>`;
}

function renderOverview(trip) {
  const main = document.getElementById('tripMain');
  if (!main) return;

  const fields = [
    { label: 'Type',             value: trip.type },
    { label: 'Country/Region',   value: trip.country_region },
    { label: 'Continent',        value: trip.continent },
    { label: 'Duration',         value: trip.duration_days ? `${trip.duration_days} days` : null },
    { label: 'Estimated Budget', value: formatBudget(trip.estimated_budget) },
    { label: 'Companions',       value: trip.companions },
    { label: 'Season',           value: trip.season },
    { label: 'Priority',         value: trip.priority },
    { label: 'Version',          value: trip.version },
  ].filter(f => f.value);

  const overviewHTML = fields.length ? `
    <div class="overview-grid">
      ${fields.map(f => `
        <div class="overview-item">
          <div class="overview-item-label">${f.label}</div>
          <div class="overview-item-value">${escapeHTML(f.value)}</div>
        </div>`).join('')}
    </div>` : '';

  const notesHTML = trip.notes ? `
    <div class="content-block">
      <div class="content-block-title">Notes</div>
      <p style="color:var(--atlas-text-muted);line-height:1.7">${escapeHTML(trip.notes)}</p>
    </div>` : '';

  main.insertAdjacentHTML('beforeend', `
    <div class="content-block">
      <div class="content-block-title">Overview</div>
      ${overviewHTML}
    </div>
    ${notesHTML}`);
}

function renderItinerary(items) {
  const main = document.getElementById('tripMain');
  if (!main || !items.length) return;

  const byDay = {};
  items.forEach(item => {
    const day = item.day || '?';
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(item);
  });

  // Sort days numerically where possible
  const days = Object.keys(byDay).sort((a, b) => {
    const na = parseInt(a), nb = parseInt(b);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a.localeCompare(b);
  });

  // Sort items within each day by order field
  days.forEach(d => {
    byDay[d].sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99));
  });

  const timelineHTML = days.map(day => `
    <div class="timeline-day">
      <div class="timeline-day-header">
        <div class="timeline-dot"></div>
        <div class="timeline-day-title">Day ${escapeHTML(day)}</div>
      </div>
      <div class="timeline-items">
        ${byDay[day].map(item => `
          <div class="timeline-item">
            <div class="timeline-item-icon">${itemTypeIcon(item.type || item.category)}</div>
            <div class="timeline-item-content">
              <div class="timeline-item-name">${escapeHTML(item.name || 'Untitled')}</div>
              <div class="timeline-item-meta">
                ${item.category     ? `<span class="item-category-badge">${escapeHTML(item.category)}</span>` : ''}
                ${item.city_location? `<span>📍 ${escapeHTML(item.city_location)}</span>` : ''}
                ${item.notes        ? `<span>${escapeHTML(item.notes)}</span>` : ''}
              </div>
              ${item.link ? `<a href="${escapeHTML(item.link)}" target="_blank" rel="noopener" class="item-link">🔗 More info</a>` : ''}
            </div>
            ${item.priority ? `<span class="badge badge-type">${escapeHTML(item.priority)}</span>` : ''}
          </div>`).join('')}
      </div>
    </div>`).join('');

  main.insertAdjacentHTML('beforeend', `
    <div class="content-block">
      <div class="content-block-title">Itinerary — ${items.length} items across ${days.length} days</div>
      <div class="timeline">${timelineHTML}</div>
    </div>`);
}

function renderNotes(notes) {
  const main = document.getElementById('tripMain');
  if (!main || !notes.length) return;

  const notesHTML = notes
    .sort((a, b) => (parseInt(a.priority) || 99) - (parseInt(b.priority) || 99))
    .map(n => `
      <div class="note-card priority-${(n.priority || '').toLowerCase()}">
        ${n.title ? `<div class="note-card-title">${escapeHTML(n.title)}</div>` : ''}
        ${n.note  ? `<div class="note-card-text">${escapeHTML(n.note)}</div>` : ''}
        <div class="note-card-meta">
          ${n.category     ? `<span class="badge badge-type">${escapeHTML(n.category)}</span>` : ''}
          ${n.status       ? `<span class="badge badge-status-${statusClass(n.status)}">${escapeHTML(n.status)}</span>` : ''}
          ${n.date_created ? `<span>${formatDate(n.date_created)}</span>` : ''}
        </div>
      </div>`).join('');

  main.insertAdjacentHTML('beforeend', `
    <div class="content-block">
      <div class="content-block-title">Notes (${notes.length})</div>
      <div class="notes-grid">${notesHTML}</div>
    </div>`);
}

function renderSidebar(trip, items, notes) {
  const sidebar = document.getElementById('tripSidebar');
  if (!sidebar) return;

  const days = [...new Set(items.map(i => i.day).filter(Boolean))].length;

  sidebar.innerHTML = `
    <div class="sidebar-card">
      <div class="sidebar-card-title">Trip Stats</div>
      ${row('Status',   `<span class="badge badge-status-${statusClass(trip.status)}">${statusLabel(trip.status)}</span>`)}
      ${row('Duration', trip.duration_days ? `${trip.duration_days} days` : '—')}
      ${row('Days planned', days || '—')}
      ${row('Activities', items.length || '—')}
      ${row('Notes', notes.length || '—')}
      ${row('Budget', formatBudget(trip.estimated_budget) || '—')}
    </div>
    <div class="sidebar-card">
      <div class="sidebar-card-title">Links</div>
      <a href="itinerary.html?trip=${encodeURIComponent(trip.trip_id)}" class="btn btn-outline btn-sm" style="width:100%;margin-bottom:0.5rem;justify-content:center">📋 Full Itinerary</a>
      <a href="notes.html?trip=${encodeURIComponent(trip.trip_id)}" class="btn btn-outline btn-sm" style="width:100%;justify-content:center">📝 All Notes</a>
    </div>`;
}

function row(label, value) {
  return `<div class="sidebar-stat-row">
    <span class="sidebar-stat-label">${label}</span>
    <span class="sidebar-stat-value">${value}</span>
  </div>`;
}
