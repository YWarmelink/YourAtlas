/**
 * DataService — the single abstraction layer between the UI and any data source.
 *
 * All UI code must call this service.  Never fetch CSV / JSON directly in a page.
 *
 * Current implementation: Google Sheets published CSV → parseCSV()
 * Future: swap the _loadSource() internals without touching any page code.
 */

class DataCache {
  constructor(ttlMs = 5 * 60 * 1000) {
    this.ttl = ttlMs;
    this.mem = {};
  }

  set(key, data) {
    const entry = { data, ts: Date.now() };
    this.mem[key] = entry;
    try { sessionStorage.setItem('atlas_' + key, JSON.stringify(entry)); } catch (_) {}
  }

  get(key) {
    const now = Date.now();
    if (this.mem[key] && now - this.mem[key].ts < this.ttl) return this.mem[key].data;
    try {
      const raw = sessionStorage.getItem('atlas_' + key);
      if (raw) {
        const entry = JSON.parse(raw);
        if (now - entry.ts < this.ttl) { this.mem[key] = entry; return entry.data; }
      }
    } catch (_) {}
    return null;
  }

  clear() {
    this.mem = {};
    try {
      Object.keys(sessionStorage)
        .filter(k => k.startsWith('atlas_'))
        .forEach(k => sessionStorage.removeItem(k));
    } catch (_) {}
  }
}

class DataService {
  constructor(userConfig) {
    this.config = userConfig;
    this.cache = new DataCache();
    this._pending = {};
  }

  // ---- private ----

  async _fetchCSV(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return parseCSV(await res.text());
  }

  async _fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
    return res.json();
  }

  async _load(sourceKey) {
    const cacheKey = this.config.id + '_' + sourceKey;
    const hit = this.cache.get(cacheKey);
    if (hit) return hit;

    // deduplicate concurrent calls
    if (this._pending[cacheKey]) return this._pending[cacheKey];

    const src = this.config.dataSources[sourceKey];

    this._pending[cacheKey] = (async () => {
      let data = null;
      if (src.type === 'google_sheets_csv') {
        try {
          data = await this._fetchCSV(src.url);
        } catch (err) {
          console.warn(`[DataService] ${sourceKey} CSV failed, trying fallback. ${err.message}`);
          try { data = await this._fetchJSON(src.fallback); } catch (_) { data = []; }
        }
      } else if (src.type === 'json') {
        try { data = await this._fetchJSON(src.url); } catch (_) { data = []; }
      } else {
        data = [];
      }
      this.cache.set(cacheKey, data);
      delete this._pending[cacheKey];
      return data;
    })();

    return this._pending[cacheKey];
  }

  // ---- public API ----

  /** Returns all trips */
  async getTrips() {
    return this._load('trips');
  }

  /** Returns one trip by its trip_id, or null */
  async getTripById(id) {
    const trips = await this.getTrips();
    return trips.find(t => String(t.trip_id) === String(id)) ?? null;
  }

  /** Returns trip items, optionally filtered by tripId */
  async getTripItems(tripId = null) {
    const items = await this._load('trip_items');
    if (tripId === null) return items;
    return items.filter(i => String(i.trip_id) === String(tripId));
  }

  /** Returns trip notes, optionally filtered by tripId */
  async getTripNotes(tripId = null) {
    const notes = await this._load('trip_notes');
    if (tripId === null) return notes;
    return notes.filter(n => String(n.trip_id) === String(tripId));
  }

  /**
   * Returns trip destinations (route-map stops), optionally filtered by tripId.
   * Each entry: { trip_id, order, country, country_code, name, lat, lng, notes }.
   * See TRIP_ROUTE_MAP.md — same shape as a Route Builder destination, so a
   * future "graduate a Route Builder expedition into a Trip" flow can copy
   * straight across. Sorted by `order` ascending.
   */
  async getTripDestinations(tripId = null) {
    const dests = await this._load('trip_destinations');
    const filtered = tripId === null ? dests : dests.filter(d => String(d.trip_id) === String(tripId));
    return filtered
      .map(d => ({ ...d, lat: parseFloat(d.lat), lng: parseFloat(d.lng), order: parseInt(d.order, 10) || 0 }))
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Returns countries list from the Countries sheet.
   * Each entry: { country_code, country_name, continent, status }
   * Deduplicates by country_code, keeping the highest-priority status
   * (visited > planned > wishlist).
   */
  async getCountriesVisited() {
    const raw = await this._load('countries');
    const PRIORITY = { visited: 3, planned: 2, wishlist: 1 };
    const map = {};
    raw.forEach(c => {
      const code = (c.country_code || '').toUpperCase().trim();
      if (!code) return;
      const status = (c.status || '').toLowerCase().trim();
      if (!map[code] || (PRIORITY[status] || 0) > (PRIORITY[map[code].status] || 0)) {
        map[code] = { ...c, country_code: code, status };
      }
    });
    return Object.values(map);
  }

  /**
   * Aggregates unique countries from all trips.
   * Returns [{ name, continent, trips[] }]
   */
  async getCountries() {
    const trips = await this.getTrips();
    const map = {};
    trips.forEach(trip => {
      const raw = trip.country_region || '';
      // A trip can span multiple countries separated by " + " or ","
      const names = raw.split(/\s*[+,]\s*/).map(s => s.trim()).filter(Boolean);
      names.forEach(name => {
        if (!map[name]) map[name] = { name, continent: trip.continent, trips: [] };
        map[name].trips.push(trip);
      });
    });
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  }

  /** Computes summary statistics across all trips */
  async getStats() {
    const [trips, items, countriesVisited] = await Promise.all([
      this.getTrips(), this.getTripItems(), this.getCountriesVisited(),
    ]);

    // "Done" is the status text actually used in the sheet for a finished trip — "completed"
    // alone missed every real trip marked this way, so the homepage always showed 0.
    const completed = trips.filter(t => ['completed', 'done'].includes((t.status || '').toLowerCase()));
    const planned   = trips.filter(t => ['planned', 'booked'].includes((t.status || '').toLowerCase()));
    const continents = new Set();

    trips.forEach(t => {
      if (t.continent) continents.add(t.continent.trim());
    });

    const totalDays = completed.reduce((s, t) => s + (parseInt(t.duration_days) || 0), 0);

    const visitedCount = countriesVisited.filter(c => c.status === 'visited').length;
    // Derived from the live Countries sheet (same denominator map.html's World Explorer meter
    // uses) instead of a hardcoded 195 — the two disagreed (27% vs 26%) since the sheet actually
    // carries 197 rows, not 195.
    const worldPct = countriesVisited.length ? Math.round(visitedCount / countriesVisited.length * 100) : 0;

    return {
      totalTrips:        trips.length,
      completedTrips:    completed.length,
      plannedTrips:      planned.length,
      countriesVisited:  visitedCount,
      continentsVisited: continents.size,
      totalDays,
      totalItems:        items.length,
      worldPct,
    };
  }

  // ---- Route Builder Sheet sync (see ROUTE_BUILDER_SYNC.md) ----

  async getGrandTrips() { return this._load('grand_trips'); }
  async getGrandTripRegions() { return this._load('grand_trip_regions'); }
  async getGrandTripBlocks() { return this._load('grand_trip_blocks'); }
  async getGrandTripDestinations() { return this._load('grand_trip_destinations'); }

  /**
   * Joins the 4 flat GrandTrip* sheet tables back into the nested shape Route Builder
   * keeps in memory (rbRoutes) — the reverse of rbBuildGrandTripPayload() in
   * routeBuilderCore.js. Returns [] while the sheet has no rows yet (nothing synced
   * there so far, or unreachable) — callers treat that as "nothing to merge in".
   */
  async getGrandTripsFull() {
    const [trips, regions, blocks, destinations] = await Promise.all([
      this.getGrandTrips(), this.getGrandTripRegions(), this.getGrandTripBlocks(), this.getGrandTripDestinations(),
    ]);
    const byOrder = (a, b) => (parseInt(a.order, 10) || 0) - (parseInt(b.order, 10) || 0);
    const toNum = v => (v === '' || v === undefined || v === null) ? '' : parseFloat(v);

    return trips.map(t => {
      const tripRegions = regions
        .filter(r => r.grand_trip_id === t.grand_trip_id)
        .sort(byOrder)
        .map(r => ({
          id: r.region_id, name: r.name, season: r.season, budget: toNum(r.budget),
          notes: r.notes, collapsed: String(r.collapsed).toUpperCase() === 'TRUE',
        }));

      const tripBlocks = blocks
        .filter(b => b.grand_trip_id === t.grand_trip_id)
        .sort(byOrder)
        .map(b => ({
          id: b.block_id, country: b.country_name, country_code: b.country_code,
          region_id: b.region_id || '', days: b.days === '' ? '' : (parseInt(b.days, 10) || 0),
          budget: toNum(b.budget), notes: b.notes, transport_to_next: b.transport_to_next || '',
          destinations: destinations
            .filter(d => d.block_id === b.block_id)
            .sort(byOrder)
            .map(d => ({ id: d.destination_id, name: d.name, notes: d.notes || '' })),
        }));

      return {
        id: t.grand_trip_id, name: t.name, status: t.status, start_date: t.start_date,
        description: t.description, travel_style: t.travel_style, climate_summary: t.climate_summary,
        best_starting_month: t.best_starting_month, notes: t.notes, created_at: t.created_at,
        regions: tripRegions, blocks: tripBlocks,
      };
    });
  }

  clearCache() { this.cache.clear(); }
}

// Singleton — pages import this one instance
const dataService = new DataService(getCurrentUser());
