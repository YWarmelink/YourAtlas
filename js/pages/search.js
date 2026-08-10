/**
 * Universal Search — client-side text search over data that's already loaded:
 * Trips + trip items + trip notes (via dataService) and Route Builder
 * expeditions + Block Library (read directly from localStorage, same as
 * routeBuilder.js — this page doesn't run routeBuilder.js so it only sees
 * whatever's already been seeded into this browser by a prior visit to
 * route-builder.html).
 */

const SEARCH_GROUP_LABELS = {
  trips: 'Trips',
  expeditions: 'Route Builder',
  notes: 'Notes',
  items: 'Itinerary items',
};
const SEARCH_GROUP_ORDER = ['trips', 'expeditions', 'notes', 'items'];

document.addEventListener('DOMContentLoaded', async () => {
  const input = document.getElementById('searchInput');
  const resultsEl = document.getElementById('searchResults');
  const countEl = document.getElementById('searchResultsCount');

  const initialQuery = getURLParam('q') || '';
  input.value = initialQuery;

  resultsEl.innerHTML = spinner();
  let index = [];
  try {
    index = await buildSearchIndex();
  } catch (err) {
    resultsEl.innerHTML = errorMsg('Could not load search data.');
    return;
  }

  renderSearch(index, initialQuery, resultsEl, countEl);
  input.addEventListener('input', () => renderSearch(index, input.value, resultsEl, countEl));
});

function renderSearch(index, query, resultsEl, countEl) {
  const q = query.trim().toLowerCase();

  if (!q) {
    countEl.textContent = '';
    resultsEl.innerHTML = emptyMsg('Start typing to search across everything.');
    return;
  }

  const matches = index.filter(entry => entry.haystack.includes(q));
  countEl.textContent = `${matches.length} result${matches.length !== 1 ? 's' : ''} for "${query.trim()}"`;

  if (!matches.length) {
    resultsEl.innerHTML = emptyMsg(`Nothing found for "${escapeHTML(query.trim())}".`);
    return;
  }

  resultsEl.innerHTML = SEARCH_GROUP_ORDER
    .filter(group => matches.some(m => m.group === group))
    .map(group => renderSearchGroup(group, matches.filter(m => m.group === group)))
    .join('');
}

function renderSearchGroup(group, entries) {
  return `
    <div class="search-group-title">${SEARCH_GROUP_LABELS[group]} (${entries.length})</div>
    <div class="timeline-items">
      ${entries.map(renderSearchResult).join('')}
    </div>`;
}

function renderSearchResult(entry) {
  return `
    <a href="${entry.href}" class="timeline-item search-result-item">
      <div class="timeline-item-icon">${entry.icon}</div>
      <div class="timeline-item-content">
        <div class="timeline-item-name">${escapeHTML(entry.title)}</div>
        ${entry.meta ? `<div class="timeline-item-meta">${escapeHTML(entry.meta)}</div>` : ''}
        ${entry.snippet ? `<p class="search-snippet">${escapeHTML(entry.snippet)}</p>` : ''}
      </div>
    </a>`;
}

function searchSnippet(text, maxLen = 140) {
  if (!text) return '';
  const trimmed = String(text).trim();
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen).trim() + '…' : trimmed;
}

async function buildSearchIndex() {
  const entries = [];

  const [trips, tripItems, tripNotes] = await Promise.all([
    dataService.getTrips(),
    dataService.getTripItems(),
    dataService.getTripNotes(),
  ]);

  const tripsById = {};
  trips.forEach(t => { tripsById[t.trip_id] = t; });

  trips.forEach(t => {
    entries.push({
      group: 'trips',
      icon: getTripFlag(t),
      title: t.trip_name || 'Untitled Trip',
      meta: [t.country_region, t.continent, t.status].filter(Boolean).join(' · '),
      snippet: searchSnippet(t.notes),
      href: `trip.html?id=${encodeURIComponent(t.trip_id)}`,
      haystack: [t.trip_name, t.country_region, t.continent, t.type, t.season, t.status, t.notes]
        .filter(Boolean).join(' ').toLowerCase(),
    });
  });

  tripItems.forEach(i => {
    const trip = tripsById[i.trip_id];
    entries.push({
      group: 'items',
      icon: itemTypeIcon(i.type || i.category),
      title: i.name || 'Untitled item',
      meta: [trip && trip.trip_name, i.type || i.category, i.day ? `Day ${i.day}` : null].filter(Boolean).join(' · '),
      snippet: searchSnippet(i.notes),
      href: `itinerary.html?trip=${encodeURIComponent(i.trip_id)}`,
      haystack: [i.name, i.type, i.category, i.notes, trip && trip.trip_name]
        .filter(Boolean).join(' ').toLowerCase(),
    });
  });

  tripNotes.forEach(n => {
    const trip = tripsById[n.trip_id];
    entries.push({
      group: 'notes',
      icon: '📝',
      title: n.title || n.category || 'Note',
      meta: [trip && trip.trip_name, n.category, n.priority].filter(Boolean).join(' · '),
      snippet: searchSnippet(n.note),
      href: `notes.html?trip=${encodeURIComponent(n.trip_id)}`,
      haystack: [n.title, n.note, n.category, n.priority, trip && trip.trip_name]
        .filter(Boolean).join(' ').toLowerCase(),
    });
  });

  addRouteBuilderEntries(entries);

  return entries;
}

/** Route Builder isn't on dataService yet (see CLAUDE.md) — read its localStorage directly. */
function addRouteBuilderEntries(entries) {
  let routes = [];
  try { routes = JSON.parse(localStorage.getItem('atlas_grand_trips')) || []; } catch (_) { routes = []; }

  routes.forEach(route => {
    entries.push({
      group: 'expeditions',
      icon: '🧭',
      title: route.name || 'Untitled expedition',
      meta: [route.status, route.travel_style, route.best_starting_month].filter(Boolean).join(' · '),
      snippet: searchSnippet(route.description || route.notes),
      href: `route-builder.html?open=${encodeURIComponent(route.id)}`,
      haystack: [route.name, route.description, route.notes, route.travel_style, route.climate_summary]
        .filter(Boolean).join(' ').toLowerCase(),
    });

    (route.blocks || []).forEach(block => {
      entries.push({
        group: 'expeditions',
        icon: '🌍',
        title: `${block.country || 'Country'} — ${route.name || ''}`.trim(),
        meta: route.name || '',
        snippet: searchSnippet(block.notes),
        href: `route-builder.html?open=${encodeURIComponent(route.id)}`,
        haystack: [block.country, block.notes, block.transport_to_next]
          .filter(Boolean).join(' ').toLowerCase(),
      });

      (block.destinations || []).forEach(dest => {
        if (!dest || (!dest.name && !dest.notes)) return;
        entries.push({
          group: 'expeditions',
          icon: '📍',
          title: `${dest.name || 'Destination'} (${block.country || ''})`.trim(),
          meta: route.name || '',
          snippet: searchSnippet(dest.notes),
          href: `route-builder.html?open=${encodeURIComponent(route.id)}`,
          haystack: [dest.name, dest.notes, block.country]
            .filter(Boolean).join(' ').toLowerCase(),
        });
      });
    });
  });

  let library = [];
  try { library = JSON.parse(localStorage.getItem('atlas_route_blocks_library')) || []; } catch (_) { library = []; }

  library.forEach(lib => {
    const blockText = (lib.blocks || []).map(b => [b.country, b.notes].filter(Boolean).join(' ')).join(' ');
    entries.push({
      group: 'expeditions',
      icon: '📚',
      title: lib.name || 'Untitled block',
      meta: 'Block Library',
      snippet: searchSnippet(blockText),
      href: 'route-builder.html',
      haystack: [lib.name, blockText].filter(Boolean).join(' ').toLowerCase(),
    });
  });
}
