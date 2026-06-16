document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([loadStats(), loadFeaturedTrips(), loadFutureTrips()]);
});

async function loadStats() {
  const el = document.getElementById('statsStrip');
  if (!el) return;
  try {
    const s = await dataService.getStats();
    const items = [
      { value: s.completedTrips,    suffix: '',  label: 'Trips Completed'  },
      { value: s.countriesVisited,  suffix: '',  label: 'Countries Visited' },
      { value: s.totalDays,         suffix: '',  label: 'Days Traveled'     },
      { value: s.continentsVisited, suffix: '',  label: 'Continents'        },
      { value: s.plannedTrips,      suffix: '',  label: 'Trips Planned'     },
      { value: s.worldPct,          suffix: '%', label: 'Of the World'      },
    ];
    el.innerHTML = items.map(item => `
      <div class="stat-item">
        <div class="stat-item-number"><em data-target="${item.value}" data-suffix="${item.suffix}">0${item.suffix}</em></div>
        <div class="stat-item-label">${item.label}</div>
      </div>`).join('');

    el.querySelectorAll('em[data-target]').forEach(numEl => {
      countUp(numEl, parseInt(numEl.dataset.target), 1400, numEl.dataset.suffix);
    });

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

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };
const PRIORITY_META  = {
  high:   { label: 'High priority',   color: 'var(--atlas-gold)',       dot: '#f59e0b' },
  medium: { label: 'Medium priority', color: 'var(--atlas-blue)',       dot: '#0ea5e9' },
  low:    { label: 'Low priority',    color: 'var(--atlas-text-light)', dot: '#94a3b8' },
};

async function loadFutureTrips() {
  const el = document.getElementById('futureList');
  if (!el) return;
  try {
    const trips = await dataService.getTrips();
    const future = trips
      .filter(t => ['planned', 'booked', 'wishlist'].includes((t.status || '').toLowerCase()))
      .sort((a, b) => {
        const pa = PRIORITY_ORDER[(a.priority || '').toLowerCase()] ?? 99;
        const pb = PRIORITY_ORDER[(b.priority || '').toLowerCase()] ?? 99;
        return pa - pb;
      });

    if (!future.length) { el.innerHTML = emptyMsg('No upcoming trips planned yet.'); return; }

    el.innerHTML = future.map(t => {
      const p    = (t.priority || '').toLowerCase();
      const meta = PRIORITY_META[p];
      const flag = getTripFlag(t);
      return `
        <div class="future-item">
          <div class="future-item-flag">${flag}</div>
          <div class="future-item-content">
            <div class="future-item-name">${escapeHTML(t.trip_name)}</div>
            <div class="future-item-meta">
              ${t.continent    ? `<span>🌍 ${escapeHTML(t.continent)}</span>` : ''}
              ${t.duration_days ? `<span>📅 ${t.duration_days} days</span>` : ''}
              ${t.season       ? `<span>🌤 ${escapeHTML(t.season)}</span>` : ''}
              <span class="badge badge-status-${statusClass(t.status)}">${statusLabel(t.status)}</span>
            </div>
          </div>
          <div class="future-item-right">
            ${meta ? `<span class="priority-dot" style="background:${meta.dot}" title="${meta.label}"></span>` : ''}
            <a href="trip.html?id=${encodeURIComponent(t.trip_id)}" class="future-item-link">View →</a>
          </div>
        </div>`;
    }).join('');
  } catch (e) {
    el.innerHTML = errorMsg();
  }
}
