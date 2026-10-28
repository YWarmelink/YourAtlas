/**
 * YourAtlas — Route Builder <-> Google Sheet sync handlers (GrandTripSync.gs).
 *
 * Source of truth for this file is the repo: apps-script/GrandTripSync.gs. Always paste the
 * WHOLE file over the one in the Apps Script editor — never just one function, or the
 * helpers below get wiped (`_sheet is not defined`).
 *
 * Called from doPost in Code.gs (which holds the script lock). Tabs:
 *   GrandTrips             grand_trip_id | name | status | start_date | description | travel_style |
 *                          climate_summary | best_starting_month | notes | created_at |
 *                          flight_in_cost | flight_out_cost | trip_costs
 *   GrandTripRegions       region_id | grand_trip_id | order | name | season | budget | notes | collapsed
 *   GrandTripBlocks        block_id | grand_trip_id | region_id | order | country_code | country_name |
 *                          days | budget | notes | transport_to_next | lat | lng |
 *                          transport_cost | transport_cost_to | local_transport_cost | extras | costs_checked
 *   GrandTripDestinations  destination_id | block_id | order | name | notes | country_code | country |
 *                          lat | lng
 *
 * The cost columns (2026-10, ROUTE_BUILDER_BUDGET_PLAN.md) hold numbers, except trip_costs and
 * extras, which are a JSON string in one cell. Empty = "not estimated yet", not 0.
 *
 * Every read/write goes by header name, so column order in the Sheet doesn't matter.
 * Missing headers that a handler needs (e.g. country_code/country) are appended automatically.
 */

const GT_TABS = {
  trips: 'GrandTrips',
  regions: 'GrandTripRegions',
  blocks: 'GrandTripBlocks',
  destinations: 'GrandTripDestinations',
};

// ---- helpers ----

function _sheet(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) throw new Error('no ' + name + ' tab found');
  return sheet;
}

function _headers(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
}

// Appends any of `needed` that aren't headers yet; returns the (possibly extended) header row.
function _ensureHeaders(sheet, needed) {
  const headers = _headers(sheet);
  const missing = needed.filter(h => headers.indexOf(h) === -1);
  if (missing.length) {
    sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
    return headers.concat(missing);
  }
  return headers;
}

// Columns added after the original 2026-09-11 migration — created on first write if missing,
// otherwise _rowFromObject would silently drop them (it only writes existing headers).
const GT_EXTRA_HEADERS = {
  trips: ['flight_in_cost', 'flight_out_cost', 'trip_costs'],
  blocks: ['lat', 'lng', 'transport_cost', 'transport_cost_to', 'local_transport_cost', 'extras', 'costs_checked'],
  destinations: ['notes', 'country_code', 'country', 'lat', 'lng'],
};

function _ensureExtraHeaders() {
  _ensureHeaders(_sheet(GT_TABS.trips), GT_EXTRA_HEADERS.trips);
  _ensureHeaders(_sheet(GT_TABS.blocks), GT_EXTRA_HEADERS.blocks);
  _ensureHeaders(_sheet(GT_TABS.destinations), GT_EXTRA_HEADERS.destinations);
}

// Strings starting with "=" would be evaluated as formulas by setValues — force them to text.
function _cell(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string' && v.charAt(0) === '=') return "'" + v;
  return v;
}

function _rowFromObject(headers, obj) {
  return headers.map(h => _cell(obj[h]));
}

function _appendObjectRows(sheet, objects) {
  if (!objects || !objects.length) return 0;
  const headers = _headers(sheet);
  const rows = objects.map(o => _rowFromObject(headers, o));
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, headers.length).setValues(rows);
  return rows.length;
}

// Deletes every data row whose `column` value is in `values` (array or Set).
// Groups matches into contiguous runs and deletes bottom-up, so row numbers stay valid
// and a route's rows (normally appended together) go in one deleteRows call.
function _deleteRowsWhereIn(sheet, column, values) {
  const set = values instanceof Set ? values : new Set(values.map(String));
  if (!set.size) return 0;
  const headers = _headers(sheet);
  const col = headers.indexOf(column);
  if (col === -1) throw new Error(sheet.getName() + ' has no ' + column + ' header');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;

  const colValues = sheet.getRange(2, col + 1, lastRow - 1, 1).getValues();
  const rowNums = [];
  colValues.forEach((r, i) => { if (set.has(String(r[0]))) rowNums.push(i + 2); });
  if (!rowNums.length) return 0;

  const runs = [];
  let start = rowNums[0], prev = rowNums[0];
  for (let i = 1; i < rowNums.length; i++) {
    if (rowNums[i] === prev + 1) { prev = rowNums[i]; continue; }
    runs.push([start, prev - start + 1]);
    start = prev = rowNums[i];
  }
  runs.push([start, prev - start + 1]);
  for (let i = runs.length - 1; i >= 0; i--) sheet.deleteRows(runs[i][0], runs[i][1]);
  return rowNums.length;
}

function _blockIdsForTrip(grandTripId) {
  const sheet = _sheet(GT_TABS.blocks);
  const headers = _headers(sheet);
  const idCol = headers.indexOf('block_id');
  const tripCol = headers.indexOf('grand_trip_id');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, headers.length).getValues()
    .filter(r => String(r[tripCol]) === String(grandTripId))
    .map(r => String(r[idCol]));
}

// Removes a route's regions/blocks/destinations (not the GrandTrips row itself).
function _deleteTripChildren(grandTripId) {
  const blockIds = _blockIdsForTrip(grandTripId);
  _deleteRowsWhereIn(_sheet(GT_TABS.destinations), 'block_id', blockIds);
  _deleteRowsWhereIn(_sheet(GT_TABS.blocks), 'grand_trip_id', [grandTripId]);
  _deleteRowsWhereIn(_sheet(GT_TABS.regions), 'grand_trip_id', [grandTripId]);
}

// ---- handlers ----

/**
 * `grand_trip`: upsert one route. The GrandTrips row is updated in place (or appended);
 * its regions/blocks/destinations are fully replaced — simplest correct approach, routes
 * are small and full-replace avoids diffing across four tabs.
 */
function handleGrandTripUpsert(data) {
  const trip = data.grand_trip;
  if (!trip || !trip.grand_trip_id) return 'error: missing grand_trip.grand_trip_id';
  const id = String(trip.grand_trip_id);

  // Before the GrandTrips header row is read, or its new cost columns get dropped on first write.
  _ensureExtraHeaders();
  const tripsSheet = _sheet(GT_TABS.trips);
  const headers = _headers(tripsSheet);
  const idCol = headers.indexOf('grand_trip_id');
  const lastRow = tripsSheet.getLastRow();
  let rowNum = -1;
  if (lastRow > 1) {
    const ids = tripsSheet.getRange(2, idCol + 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === id) { rowNum = i + 2; break; }
    }
  }
  const row = _rowFromObject(headers, trip);
  if (rowNum === -1) tripsSheet.appendRow(row);
  else tripsSheet.getRange(rowNum, 1, 1, headers.length).setValues([row]);

  _deleteTripChildren(id);
  const r = _appendObjectRows(_sheet(GT_TABS.regions), data.regions);
  const b = _appendObjectRows(_sheet(GT_TABS.blocks), data.blocks);
  const d = _appendObjectRows(_sheet(GT_TABS.destinations), data.destinations);
  return 'ok: ' + (rowNum === -1 ? 'inserted ' : 'updated ') + id +
    ' (' + r + ' regions, ' + b + ' blocks, ' + d + ' destinations)';
}

/** `grand_trip_delete`: remove a route and everything linked to it. */
function handleGrandTripDelete(data) {
  const id = String(data.grand_trip_id || '');
  if (!id) return 'error: missing grand_trip_id';
  _deleteTripChildren(id);
  const n = _deleteRowsWhereIn(_sheet(GT_TABS.trips), 'grand_trip_id', [id]);
  return 'ok: deleted ' + id + (n ? '' : ' (was not in the Sheet)');
}

/**
 * `grand_trip_bulk_import`: append many routes at once (one-time migration, chunked by the
 * caller). Replaces any routes in the chunk that already exist, so re-running a chunk
 * never creates duplicates. Accepts the "Export JSON" keys (grandTrips, grandTripRegions,
 * grandTripBlocks, grandTripDestinations).
 */
function handleGrandTripBulkImport(data) {
  const trips = data.grandTrips || [];
  const regions = data.grandTripRegions || [];
  const blocks = data.grandTripBlocks || [];
  const destinations = data.grandTripDestinations || [];
  const tripIds = trips.map(t => String(t.grand_trip_id));

  if (tripIds.length) {
    const idSet = new Set(tripIds);
    const blockSheet = _sheet(GT_TABS.blocks);
    const bHeaders = _headers(blockSheet);
    const bLast = blockSheet.getLastRow();
    const oldBlockIds = bLast < 2 ? [] : blockSheet.getRange(2, 1, bLast - 1, bHeaders.length).getValues()
      .filter(r => idSet.has(String(r[bHeaders.indexOf('grand_trip_id')])))
      .map(r => String(r[bHeaders.indexOf('block_id')]));
    _deleteRowsWhereIn(_sheet(GT_TABS.destinations), 'block_id', oldBlockIds);
    _deleteRowsWhereIn(blockSheet, 'grand_trip_id', idSet);
    _deleteRowsWhereIn(_sheet(GT_TABS.regions), 'grand_trip_id', idSet);
    _deleteRowsWhereIn(_sheet(GT_TABS.trips), 'grand_trip_id', idSet);
  }

  _ensureExtraHeaders();
  const t = _appendObjectRows(_sheet(GT_TABS.trips), trips);
  const r = _appendObjectRows(_sheet(GT_TABS.regions), regions);
  const b = _appendObjectRows(_sheet(GT_TABS.blocks), blocks);
  const d = _appendObjectRows(_sheet(GT_TABS.destinations), destinations);
  return 'ok: imported ' + t + ' trips, ' + r + ' regions, ' + b + ' blocks, ' + d + ' destinations';
}

/**
 * `destinations_bulk_update`: set notes/country_code/country (and lat/lng, when the update has
 * them) on EXISTING GrandTripDestinations rows. Never creates or deletes rows.
 *
 * Matches on (grand_trip_id, block_order, name) — NOT destination_id/block_id, which are
 * regenerated with a random suffix on every seed run and never match the ids already in the
 * Sheet. grand_trip_id is deterministic (rbSeedRouteId), block order and destination name
 * are stable. A name that resolves to 0 or 2+ rows is reported back, never guessed at.
 *
 * Response text: "updated: N, unresolved: M" followed by a JSON array of the unresolved
 * items when M > 0 (scripts/backfill_notes_to_sheet.js parses this prefix).
 */
function handleDestinationsBulkUpdate(data) {
  const updates = data.updates || [];
  if (!updates.length) return 'updated: 0, unresolved: 0';

  // grand_trip_id -> { order -> block_id }
  const blockSheet = _sheet(GT_TABS.blocks);
  const bHeaders = _headers(blockSheet);
  const bId = bHeaders.indexOf('block_id');
  const bTrip = bHeaders.indexOf('grand_trip_id');
  const bOrder = bHeaders.indexOf('order');
  const bLast = blockSheet.getLastRow();
  const blockByTripOrder = {};
  if (bLast > 1) {
    blockSheet.getRange(2, 1, bLast - 1, bHeaders.length).getValues().forEach(r => {
      const trip = String(r[bTrip]);
      (blockByTripOrder[trip] = blockByTripOrder[trip] || {})[String(Number(r[bOrder]))] = String(r[bId]);
    });
  }

  // block_id -> { name -> [rowIndex (0-based within data rows), ...] }
  const destSheet = _sheet(GT_TABS.destinations);
  const dHeaders = _ensureHeaders(destSheet, GT_EXTRA_HEADERS.destinations);
  const dBlock = dHeaders.indexOf('block_id');
  const dName = dHeaders.indexOf('name');
  const dNotes = dHeaders.indexOf('notes');
  const dCode = dHeaders.indexOf('country_code');
  const dCountry = dHeaders.indexOf('country');
  const dLat = dHeaders.indexOf('lat');
  const dLng = dHeaders.indexOf('lng');
  const dLast = destSheet.getLastRow();
  if (dLast < 2) return 'updated: 0, unresolved: ' + updates.length;
  const values = destSheet.getRange(2, 1, dLast - 1, dHeaders.length).getValues();
  const rowsByBlockName = {};
  values.forEach((r, i) => {
    const blk = String(r[dBlock]);
    const nm = String(r[dName]).trim();
    const byName = (rowsByBlockName[blk] = rowsByBlockName[blk] || {});
    (byName[nm] = byName[nm] || []).push(i);
  });

  let updated = 0;
  const unresolved = [];
  updates.forEach(u => {
    const blockId = (blockByTripOrder[String(u.grand_trip_id)] || {})[String(Number(u.block_order))];
    if (!blockId) {
      unresolved.push({ grand_trip_id: u.grand_trip_id, block_order: u.block_order, name: u.name, reason: 'no block' });
      return;
    }
    const matches = ((rowsByBlockName[blockId] || {})[String(u.name).trim()]) || [];
    if (matches.length !== 1) {
      unresolved.push({ grand_trip_id: u.grand_trip_id, block_order: u.block_order, name: u.name,
        reason: matches.length ? 'ambiguous (' + matches.length + ' rows)' : 'no destination' });
      return;
    }
    const row = values[matches[0]];
    row[dNotes] = _cell(u.notes || '');
    row[dCode] = _cell(u.country_code || '');
    row[dCountry] = _cell(u.country || '');
    if ('lat' in u) row[dLat] = _cell(u.lat);
    if ('lng' in u) row[dLng] = _cell(u.lng);
    updated++;
  });

  // Write only the touched columns back, one setValues each.
  [dNotes, dCode, dCountry, dLat, dLng].forEach(c => {
    destSheet.getRange(2, c + 1, values.length, 1).setValues(values.map(r => [_cell(r[c])]));
  });

  return 'updated: ' + updated + ', unresolved: ' + unresolved.length +
    (unresolved.length ? ' ' + JSON.stringify(unresolved) : '');
}

/**
 * Writes `updates` onto EXISTING rows of `sheet`. `keyOf(row)` / `updateKey(u)` build the match
 * key; of the `allowed` fields, only those actually present on an update are written, so a
 * partial update (e.g. only lat/lng) leaves every other column alone. Never creates or deletes
 * rows. A key that resolves to 0 or 2+ rows is reported back, never guessed at.
 */
function _bulkUpdateRows(sheet, headers, allowed, updates, keyOf, updateKey, describe) {
  const last = sheet.getLastRow();
  if (last < 2) return { updated: 0, unresolved: updates.map(u => describe(u, 'no row')) };
  const values = sheet.getRange(2, 1, last - 1, headers.length).getValues();
  const rowsByKey = {};
  values.forEach((r, i) => { const k = keyOf(r); (rowsByKey[k] = rowsByKey[k] || []).push(i); });

  let updated = 0;
  const unresolved = [];
  const touched = new Set();
  updates.forEach(u => {
    const matches = rowsByKey[updateKey(u)] || [];
    if (matches.length !== 1) {
      unresolved.push(describe(u, matches.length ? 'ambiguous (' + matches.length + ' rows)' : 'no row'));
      return;
    }
    allowed.forEach(f => {
      if (!(f in u)) return;
      const c = headers.indexOf(f);
      values[matches[0]][c] = _cell(u[f]);
      touched.add(c);
    });
    updated++;
  });

  // Write only the touched columns back, one setValues each.
  touched.forEach(c => {
    sheet.getRange(2, c + 1, values.length, 1).setValues(values.map(r => [_cell(r[c])]));
  });
  return { updated: updated, unresolved: unresolved };
}

function _bulkResult(res) {
  return 'updated: ' + res.updated + ', unresolved: ' + res.unresolved.length +
    (res.unresolved.length ? ' ' + JSON.stringify(res.unresolved) : '');
}

/**
 * `blocks_bulk_update`: set lat/lng, `budget` and/or the cost columns on EXISTING GrandTripBlocks
 * rows (any field in GT_EXTRA_HEADERS.blocks, plus `budget`: a core column, so it's never added as
 * an extra header, only allowed here — used by scripts/fix_style_budgets_in_sheet.js). Matches on (grand_trip_id, order) for the same reason
 * handleDestinationsBulkUpdate does — block_id isn't stable across seed runs. Values are written
 * as given, so `extras` must arrive JSON-encoded (rbBlockCostCells() in routeBuilderCore.js).
 *
 * Response text: "updated: N, unresolved: M" (+ JSON array of unresolved items when M > 0).
 */
function handleBlocksBulkUpdate(data) {
  const updates = data.updates || [];
  if (!updates.length) return 'updated: 0, unresolved: 0';

  const sheet = _sheet(GT_TABS.blocks);
  const headers = _ensureHeaders(sheet, GT_EXTRA_HEADERS.blocks);
  const cTrip = headers.indexOf('grand_trip_id');
  const cOrder = headers.indexOf('order');
  return _bulkResult(_bulkUpdateRows(sheet, headers, GT_EXTRA_HEADERS.blocks.concat(['budget']), updates,
    r => String(r[cTrip]) + '|' + String(Number(r[cOrder])),
    u => String(u.grand_trip_id) + '|' + String(Number(u.block_order)),
    (u, reason) => ({ grand_trip_id: u.grand_trip_id, block_order: u.block_order, reason: reason })));
}

/**
 * `grand_trips_bulk_update`: set the route-level cost columns (GT_EXTRA_HEADERS.trips) on
 * EXISTING GrandTrips rows, matched on grand_trip_id. `trip_costs` must arrive JSON-encoded
 * (rbRouteCostCells() in routeBuilderCore.js). Response text: same format as blocks_bulk_update.
 */
function handleGrandTripsBulkUpdate(data) {
  const updates = data.updates || [];
  if (!updates.length) return 'updated: 0, unresolved: 0';

  const sheet = _sheet(GT_TABS.trips);
  const headers = _ensureHeaders(sheet, GT_EXTRA_HEADERS.trips);
  const cId = headers.indexOf('grand_trip_id');
  return _bulkResult(_bulkUpdateRows(sheet, headers, GT_EXTRA_HEADERS.trips, updates,
    r => String(r[cId]),
    u => String(u.grand_trip_id),
    (u, reason) => ({ grand_trip_id: u.grand_trip_id, reason: reason })));
}
