document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([loadStats(), loadFeaturedTrips(), loadFutureTrips()]);
});

async function loadStats() {
  const el = document.getElementById('statsStrip');
  if (!el) return;
  try {
    const s = await dataService.getStats();
    el.innerHTML = `
      <div class="stat-item">
        <div class="stat-item-number"><em>${s.completedTrips}</em></div>
        <div class="stat-item-label">Trips Completed</div>
      </div>
      <div class="stat-item">
        <div class="stat-item-number"><em>${s.countriesVisited}</em></div>
        <div class="stat-item-label">Countries Visited</div>
      </div>
      <div class="stat-item">
        <div class="stat-item-number"><em>${s.totalDays}</em></div>
        <div class="stat-item-label">Days Traveled</div>
      </div>
      <div class="stat-item">
        <div class="stat-item-number"><em>${s.continentsVisited}</em></div>
        <div class="stat-item-label">Continents</div>
      </div>
      <div class="stat-item">
        <div class="stat-item-number"><em>${s.plannedTrips}</em></div>
        <div class="stat-item-label">Trips Planned</div>
      </div>
      <div class="stat-item">
        <div class="stat-item-number"><em>${s.worldPct}%</em></div>
        <div class="stat-item-label">Of the World</div>
      </div>`;

    animateWorldRing(s.countriesVisited, s.worldPct);
  } catch (e) {
    console.error('[home] stats failed', e);
  }
}

function animateWorldRing(visited, pct) {
  const circumference = 2 * Math.PI * 80;
  const offset = circumference * (1 - pct / 100);

  const ring = document.getElementById('worldRingProgress');
  const numEl = document.getElementById('worldRingNumber');
  const pctEl = document.getElementById('worldRingPct');

  if (numEl) numEl.textContent = visited;
  if (pctEl) pctEl.textContent = pct + '%';
  if (ring) {
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ring.style.strokeDashoffset = offset;
      });
    });
  }
}

async function loadFeaturedTrips() {
  const el = document.getElementById('featuredGrid');
  if (!el) return;
  try {
    const trips = await dataService.getTrips();
    const featured = trips
      .filter(t => (t.status || '').toLowerCase() !== 'cancelled')
      .slice(0, 4);
    if (!featured.length) { el.innerHTML = emptyMsg('No trips found yet.'); return; }
    el.innerHTML = featured.map(buildTripCard).join('');
  } catch (e) {
    el.innerHTML = errorMsg('Could not load trips. Check your data source.');
  }
}

async function loadFutureTrips() {
  const el = document.getElementById('futureList');
  if (!el) return;
  try {
    const trips = await dataService.getTrips();
    const future = trips.filter(t => ['planned', 'booked', 'wishlist']
      .includes((t.status || '').toLowerCase()));
    if (!future.length) { el.innerHTML = emptyMsg('No upcoming trips planned yet.'); return; }
    el.innerHTML = future.map((t, i) => `
      <div class="future-item">
        <div class="future-item-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="future-item-content">
          <div class="future-item-name">${escapeHTML(t.trip_name)}</div>
          <div class="future-item-meta">
            ${t.continent ? `<span>🌍 ${escapeHTML(t.continent)}</span>` : ''}
            ${t.duration_days ? `<span>📅 ${t.duration_days} days</span>` : ''}
            ${t.season ? `<span>🌤 ${escapeHTML(t.season)}</span>` : ''}
            <span class="badge badge-status-${statusClass(t.status)}">${statusLabel(t.status)}</span>
          </div>
        </div>
        <div class="future-item-action"><a href="trip.html?id=${encodeURIComponent(t.trip_id)}">View →</a></div>
      </div>`).join('');
  } catch (e) {
    el.innerHTML = errorMsg();
  }
}
