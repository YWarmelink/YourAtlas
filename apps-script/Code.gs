/**
 * YourAtlas — Apps Script Web App entry point (Code.gs).
 *
 * Source of truth for this file is the repo: apps-script/Code.gs. When changing it, paste
 * the WHOLE file over the one in the Apps Script editor, then Deploy → Manage deployments →
 * edit the existing deployment → Version: "New version" → Deploy (keeps the same /exec URL).
 *
 * Apps Script allows only ONE doPost per project (across all files), so this is just the
 * dispatcher. Grand Trip (Route Builder) handlers live in GrandTripSync.gs.
 *
 * Payloads (all POSTed as text/plain JSON):
 *   { country_code, status }                          -> map.js country status (no `type`)
 *   { type: 'grand_trip', grand_trip, regions, blocks, destinations }
 *   { type: 'grand_trip_delete', grand_trip_id }
 *   { type: 'grand_trip_bulk_import', grandTrips, grandTripRegions, grandTripBlocks, grandTripDestinations }
 *   { type: 'destinations_bulk_update', updates: [{ grand_trip_id, block_order, name, notes, country_code, country, lat?, lng? }] }
 *   { type: 'blocks_bulk_update', updates: [{ grand_trip_id, block_order, lat?, lng?, <block cost fields>? }] }
 *   { type: 'grand_trips_bulk_update', updates: [{ grand_trip_id, flight_in_cost?, flight_out_cost?, trip_costs? }] }
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // serialize writes — concurrent executions otherwise clobber each other's row numbers
  } catch (err) {
    return _text('error: busy, try again');
  }
  try {
    const data = JSON.parse(e.postData.contents);
    switch (data.type) {
      case 'grand_trip':               return _text(handleGrandTripUpsert(data));
      case 'grand_trip_delete':        return _text(handleGrandTripDelete(data));
      case 'grand_trip_bulk_import':   return _text(handleGrandTripBulkImport(data));
      case 'destinations_bulk_update': return _text(handleDestinationsBulkUpdate(data));
      case 'blocks_bulk_update':       return _text(handleBlocksBulkUpdate(data));
      case 'grand_trips_bulk_update':  return _text(handleGrandTripsBulkUpdate(data));
      case undefined:
      case 'country_status':           return _text(handleCountryStatusUpdate(data));
      default:                         return _text('error: unknown type ' + data.type);
    }
  } catch (err) {
    return _text('error: ' + err.message);
  } finally {
    lock.releaseLock();
  }
}

// Health check — also gives a clean response if a POST redirect ever lands here as a GET.
function doGet() {
  return _text('ok');
}

/**
 * Map country status: upsert `status` on the Countries tab row for `country_code`.
 * Empty status = "Remove" in the map's picker — the cell is cleared, the row stays.
 * Columns are found by header name (country_code, status), not position.
 */
function handleCountryStatusUpdate(data) {
  const code = String(data.country_code || '').trim().toUpperCase();
  if (!code) return 'error: missing country_code';
  const status = data.status == null ? '' : String(data.status);

  const sheet = _countriesSheet();
  const headers = _headers(sheet);
  const codeCol = headers.indexOf('country_code');
  const statusCol = headers.indexOf('status');
  if (codeCol === -1 || statusCol === -1) {
    return 'error: Countries tab needs country_code and status headers';
  }

  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const codes = sheet.getRange(2, codeCol + 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < codes.length; i++) {
      if (String(codes[i][0]).trim().toUpperCase() === code) {
        sheet.getRange(i + 2, statusCol + 1).setValue(status);
        return 'ok: updated ' + code;
      }
    }
  }

  if (!status) return 'ok: nothing to clear for ' + code;
  const row = headers.map(h => (h === 'country_code' ? code : h === 'status' ? status : ''));
  sheet.appendRow(row);
  return 'ok: added ' + code;
}

function _countriesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets().find(s => s.getName().trim().toLowerCase() === 'countries');
  if (!sheet) throw new Error('no Countries tab found');
  return sheet;
}

function _text(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.TEXT);
}
