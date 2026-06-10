document.addEventListener('DOMContentLoaded', async () => {
  const tripId = getURLParam('trip');
  const container = document.getElementById('itineraryContent');
  const selector  = document.getElementById('tripSelector');
  if (!container) return;

  container.innerHTML = spinner();

  try {
    const trips = await dataService.getTrips();

    // Populate selector
    if (selector) {
      trips.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.trip_id;
        opt.textContent = t.trip_name;
        if (String(t.trip_id) === String(tripId)) opt.selected = true;
        selector.appendChild(opt);
      });

      selector.addEventListener('change', () => {
        window.location.href = `itinerary.html?trip=${encodeURIComponent(selector.value)}`;
      });
    }

    if (!tripId) {
      container.innerHTML = `<div class="empty-message"><span class="empty-icon">🗺️</span><p>Select a trip above to view its itinerary.</p></div>`;
      return;
    }

    const [trip, items] = await Promise.all([
      dataService.getTripById(tripId),
      dataService.getTripItems(tripId),
    ]);

    if (!trip)        { container.innerHTML = errorMsg('Trip not found.'); return; }
    if (!items.length){ container.innerHTML = emptyMsg('No itinerary items for this trip yet.'); return; }

    // Update page header dynamically
    const headerTitle = document.getElementById('pageHeaderTitle');
    const headerSub   = document.getElementById('pageHeaderSubtitle');
    if (headerTitle) headerTitle.textContent = trip.trip_name;
    if (headerSub)   headerSub.textContent   = `${items.length} items · ${trip.duration_days || '?'} days`;
    document.title = `Itinerary: ${trip.trip_name} | Youri's Travel Atlas`;

    renderDays(items, container);
  } catch (e) {
    container.innerHTML = errorMsg('Could not load itinerary data.');
  }
});

function renderDays(items, container) {
  const byDay = {};
  items.forEach(item => {
    const day = item.day || 'Unscheduled';
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(item);
  });

  const days = Object.keys(byDay).sort((a, b) => {
    const na = parseInt(a), nb = parseInt(b);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    if (a === 'Unscheduled') return 1;
    if (b === 'Unscheduled') return -1;
    return a.localeCompare(b);
  });

  days.forEach(d => byDay[d].sort((a, b) => (parseInt(a.order) || 99) - (parseInt(b.order) || 99)));

  const html = days.map(day => {
    const dayItems = byDay[day];
    const isNum = !isNaN(parseInt(day));
    const title = isNum ? `Day ${day}` : day;
    return `
      <div class="timeline-day">
        <div class="timeline-day-header">
          <div class="timeline-dot"></div>
          <div class="timeline-day-title">${escapeHTML(title)}</div>
          <div class="itinerary-day-summary">${dayItems.length} item${dayItems.length !== 1 ? 's' : ''}</div>
        </div>
        <div class="timeline-items">
          ${dayItems.map(item => `
            <div class="timeline-item">
              <div class="timeline-item-icon">${itemTypeIcon(item.type || item.category)}</div>
              <div class="timeline-item-content">
                <div class="timeline-item-name">${escapeHTML(item.name || 'Untitled')}</div>
                <div class="timeline-item-meta">
                  ${item.type          ? `<span class="badge badge-type">${escapeHTML(item.type)}</span>` : ''}
                  ${item.category      ? `<span class="item-category-badge">${escapeHTML(item.category)}</span>` : ''}
                  ${item.city_location ? `<span>📍 ${escapeHTML(item.city_location)}</span>` : ''}
                  ${item.priority      ? `<span>⭐ ${escapeHTML(item.priority)}</span>` : ''}
                </div>
                ${item.notes ? `<p style="margin-top:0.5rem;font-size:0.85rem;color:var(--atlas-text-muted)">${escapeHTML(item.notes)}</p>` : ''}
                ${item.link  ? `<a href="${escapeHTML(item.link)}" target="_blank" rel="noopener" class="item-link">🔗 More info</a>` : ''}
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `<div class="timeline">${html}</div>`;
}
