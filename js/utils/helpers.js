function getURLParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d)) return str;
  return d.toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d)) return str;
  return d.toLocaleDateString('nl-NL', { year: 'numeric', month: 'short' });
}

function formatBudget(raw) {
  if (!raw) return '';
  const n = parseFloat(String(raw).replace(/[^0-9.,]/g, '').replace(',', '.'));
  if (isNaN(n)) return raw;
  return '€' + n.toLocaleString('nl-NL');
}

function statusClass(status) {
  const s = (status || '').toLowerCase().replace(/\s+/g, '-');
  const map = {
    'completed': 'status-completed',
    'planned':   'status-planned',
    'booked':    'status-booked',
    'wishlist':  'status-wishlist',
    'cancelled': 'status-cancelled',
    'in-progress':'status-in-progress',
  };
  return map[s] || 'status-planned';
}

function statusLabel(status) {
  if (!status) return 'Planned';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function continentBannerClass(continent) {
  const c = (continent || '').toLowerCase();
  if (c.includes('asia') || c.includes('east'))        return 'trip-card-banner-asia';
  if (c.includes('europe'))                             return 'trip-card-banner-europe';
  if (c.includes('america') || c.includes('caribb'))   return 'trip-card-banner-americas';
  if (c.includes('africa'))                             return 'trip-card-banner-africa';
  if (c.includes('ocean') || c.includes('australia'))  return 'trip-card-banner-oceania';
  return 'trip-card-banner-other';
}

function continentDotClass(continent) {
  const c = (continent || '').toLowerCase();
  if (c.includes('asia'))     return 'continent-dot-asia';
  if (c.includes('europe'))   return 'continent-dot-europe';
  if (c.includes('america'))  return 'continent-dot-americas';
  if (c.includes('africa'))   return 'continent-dot-africa';
  if (c.includes('ocean') || c.includes('australia')) return 'continent-dot-oceania';
  return 'continent-dot-other';
}

function itemTypeIcon(type) {
  const t = (type || '').toLowerCase();
  const icons = {
    'accommodation': '🏨', 'hotel': '🏨', 'hostel': '🏨', 'airbnb': '🏠',
    'flight': '✈️', 'transport': '🚌', 'train': '🚆', 'bus': '🚌', 'ferry': '⛴️',
    'food': '🍽️', 'restaurant': '🍽️', 'street food': '🥘',
    'attraction': '🏛️', 'temple': '⛩️', 'museum': '🏛️', 'nature': '🌿',
    'activity': '🎯', 'tour': '🗺️', 'hiking': '🥾', 'beach': '🏖️',
    'shopping': '🛍️', 'market': '🛒',
    'arrival': '🛬', 'departure': '🛫',
    'note': '📝',
  };
  for (const [key, icon] of Object.entries(icons)) {
    if (t.includes(key)) return icon;
  }
  return '📍';
}

function buildTripCard(trip) {
  const bannerClass = continentBannerClass(trip.continent);
  const sc = statusClass(trip.status);
  const sl = statusLabel(trip.status);
  const datesStr = [trip.start_date && formatDateShort(trip.start_date), trip.end_date && formatDateShort(trip.end_date)]
    .filter(Boolean).join(' – ');

  return `
    <a href="trip.html?id=${encodeURIComponent(trip.trip_id)}" class="trip-card">
      <div class="trip-card-banner ${bannerClass}">
        <span class="badge badge-status-${sc} trip-card-status">${sl}</span>
      </div>
      <div class="trip-card-body">
        <div class="trip-card-continent">${trip.continent || ''}</div>
        <div class="trip-card-name">${trip.trip_name || 'Untitled Trip'}</div>
        <div class="trip-card-meta">
          ${trip.duration_days ? `<span class="trip-meta-item"><span class="trip-meta-icon">📅</span>${trip.duration_days} days</span>` : ''}
          ${trip.type          ? `<span class="trip-meta-item"><span class="trip-meta-icon">🏷️</span>${trip.type}</span>` : ''}
          ${trip.season        ? `<span class="trip-meta-item"><span class="trip-meta-icon">🌤</span>${trip.season}</span>` : ''}
        </div>
      </div>
      ${datesStr ? `<div class="trip-card-footer"><span class="trip-card-dates">📅 ${datesStr}</span></div>` : ''}
    </a>`;
}

function spinner() {
  return `<div class="loading-spinner"><div class="spinner"></div><p>Loading data…</p></div>`;
}

function errorMsg(msg) {
  return `<div class="error-message"><span class="error-icon">⚠️</span><p>${msg || 'Could not load data.'}</p></div>`;
}

function emptyMsg(msg) {
  return `<div class="empty-message"><span class="empty-icon">📭</span><p>${msg || 'Nothing found.'}</p></div>`;
}

function escapeHTML(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
