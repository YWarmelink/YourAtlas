document.addEventListener('DOMContentLoaded', async () => {
  const tripId    = getURLParam('trip');
  const container = document.getElementById('notesContent');
  const selector  = document.getElementById('tripSelector');
  if (!container) return;

  container.innerHTML = spinner();

  try {
    const trips = await dataService.getTrips();

    if (selector) {
      trips.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.trip_id;
        opt.textContent = t.trip_name;
        if (String(t.trip_id) === String(tripId)) opt.selected = true;
        selector.appendChild(opt);
      });

      selector.addEventListener('change', () => {
        window.location.href = `notes.html?trip=${encodeURIComponent(selector.value)}`;
      });
    }

    if (!tripId) {
      container.innerHTML = `<div class="empty-message"><span class="empty-icon">📝</span><p>Select a trip above to view its notes.</p></div>`;
      return;
    }

    const [trip, notes] = await Promise.all([
      dataService.getTripById(tripId),
      dataService.getTripNotes(tripId),
    ]);

    if (!trip)         { container.innerHTML = errorMsg('Trip not found.'); return; }
    if (!notes.length) { container.innerHTML = emptyMsg('No notes for this trip yet.'); return; }

    const headerTitle = document.getElementById('pageHeaderTitle');
    const headerSub   = document.getElementById('pageHeaderSubtitle');
    if (headerTitle) headerTitle.textContent = trip.trip_name;
    if (headerSub)   headerSub.textContent   = `${notes.length} note${notes.length !== 1 ? 's' : ''}`;
    document.title = `Notes: ${trip.trip_name} | Youri's Travel Atlas`;

    renderNotesByCategory(notes, container);
  } catch (e) {
    container.innerHTML = errorMsg('Could not load notes data.');
  }
});

function renderNotesByCategory(notes, container) {
  const byCat = {};
  notes.forEach(n => {
    const cat = n.category || 'General';
    if (!byCat[cat]) byCat[cat] = [];
    byCat[cat].push(n);
  });

  const priorityOrder = (p) => {
    const m = { 'high': 0, 'medium': 1, 'low': 2 };
    return m[(p || '').toLowerCase()] ?? 99;
  };

  const html = Object.entries(byCat).map(([cat, catNotes]) => {
    catNotes.sort((a, b) => priorityOrder(a.priority) - priorityOrder(b.priority));
    return `
      <div class="notes-category-section">
        <div class="notes-category-title">
          ${escapeHTML(cat)}
          <span class="notes-category-count">(${catNotes.length})</span>
        </div>
        <div class="notes-grid">
          ${catNotes.map(n => `
            <div class="note-card priority-${(n.priority || '').toLowerCase()}">
              ${n.title ? `<div class="note-card-title">${escapeHTML(n.title)}</div>` : ''}
              ${n.note  ? `<div class="note-card-text">${escapeHTML(n.note)}</div>` : ''}
              <div class="note-card-meta">
                ${n.priority     ? `<span class="badge badge-type">⭐ ${escapeHTML(n.priority)}</span>` : ''}
                ${n.status       ? `<span class="badge badge-status-${statusClass(n.status)}">${statusLabel(n.status)}</span>` : ''}
                ${n.date_created ? `<span>${formatDate(n.date_created)}</span>` : ''}
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = html;
}
