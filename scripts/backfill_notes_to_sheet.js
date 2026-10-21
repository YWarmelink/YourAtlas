#!/usr/bin/env node
/**
 * Backfills the destination-notes project's `notes` field (filled in across ~170 batches
 * during the 2026-09-18 destination-notes project) plus `country_code`/`country` onto the
 * EXISTING GrandTripDestinations Sheet rows. Does NOT touch GrandTrips/GrandTripBlocks/
 * GrandTripRegions and does not delete/reinsert anything — targeted UPDATE only, via the
 * `destinations_bulk_update` Apps Script endpoint (handleDestinationsBulkUpdate in
 * GrandTripSync.gs). Also backfills lat/lng onto destinations and (via `blocks_bulk_update`)
 * onto GrandTripBlocks — rows synced before those columns existed came back coordinate-less
 * and blanked every Route Builder map view (2026-10). Each row must already exist in the Sheet (from the original 2026-09-11
 * migration) — rows are matched, never created.
 *
 * Matching key is (grand_trip_id, block_order, name) — NOT destination_id/block_id. Those ids
 * are generated fresh with a timestamp+random suffix at every seed/simulate run and are NOT
 * stable across runs, so a destination_id computed today can never match one written to the
 * Sheet by an earlier run. grand_trip_id (the route id) IS deterministic; block position and
 * destination name are stable as long as blocks/destinations within a route aren't reordered
 * (this project only ever adds notes, never reorders).
 *
 * GrandTripDestinations is one row PER DESTINATION PER ROUTE (the same real place can have
 * several rows across different routes that use it) — this is not deduplication, it enriches
 * every existing row with its notes + country.
 *
 * Usage:
 *   node scripts/backfill_notes_to_sheet.js                  # dry run — shows chunk plan
 *   node scripts/backfill_notes_to_sheet.js --limit 10        # dry run, first 10 destinations only
 *   node scripts/backfill_notes_to_sheet.js --limit 10 --push  # actually push just 10 (test batch)
 *   node scripts/backfill_notes_to_sheet.js --push             # push all destinations
 */

const { execSync } = require('child_process');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvEBxhAUEGfxXU-jRvdE5R1oBNXWPJzP27l20-VPwZlTdij1UeoG4BrkRoi9TWT9p/exec';

const CHUNK_SIZE = 200;       // destinations per POST
const DELAY_MS = 900;         // between requests — Apps Script concurrent-execution quota gotcha (see project memory)
const MAX_RETRIES = 3;
const RETRY_BACKOFF_MS = 2000;

function buildUpdates(routes) {
  const updates = [];
  for (const route of routes) {
    (route.blocks || []).forEach((block, blockOrder) => {
      const country_code = block.country_code || '';
      const country = block.country || '';
      for (const d of block.destinations || []) {
        updates.push({
          grand_trip_id: route.id,
          block_order: blockOrder,
          name: d.name,
          notes: d.notes || '',
          country_code,
          country,
          lat: typeof d.lat === 'number' ? d.lat : '',
          lng: typeof d.lng === 'number' ? d.lng : '',
        });
      }
    });
  }
  return updates;
}

// Block anchor coordinates (Route Line map view) — matched on (grand_trip_id, block_order).
function buildBlockUpdates(routes) {
  const updates = [];
  for (const route of routes) {
    (route.blocks || []).forEach((block, blockOrder) => {
      if (typeof block.lat !== 'number' || typeof block.lng !== 'number') return;
      updates.push({ grand_trip_id: route.id, block_order: blockOrder, lat: block.lat, lng: block.lng });
    });
  }
  return updates;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function pushChunkWithRetry(type, chunkData, chunkIndex, totalChunks) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ type, updates: chunkData }),
        redirect: 'follow',
      });
      const text = await res.text();
      const match = text.match(/^updated: (\d+), unresolved: (\d+)/);
      if (res.status === 200 && match) {
        const updated = parseInt(match[1], 10);
        const notFound = parseInt(match[2], 10);
        console.log(`  chunk ${chunkIndex + 1}/${totalChunks}: updated ${updated}, unresolved ${notFound}${notFound > 0 ? '  -> ' + text.slice(text.indexOf('[')) : ''}`);
        return { ok: true, updated, notFound };
      }
      console.log(`  chunk ${chunkIndex + 1}/${totalChunks}: attempt ${attempt} got unexpected response (status ${res.status}, len ${text.length}) — ${attempt < MAX_RETRIES ? 'retrying...' : 'giving up'}`);
    } catch (err) {
      console.log(`  chunk ${chunkIndex + 1}/${totalChunks}: attempt ${attempt} threw ${err.message} — ${attempt < MAX_RETRIES ? 'retrying...' : 'giving up'}`);
    }
    if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, RETRY_BACKOFF_MS * attempt));
  }
  return { ok: false, updated: 0, notFound: 0 };
}

async function main() {
  const push = process.argv.includes('--push');
  const limitArg = process.argv.indexOf('--limit');
  const limit = limitArg !== -1 ? parseInt(process.argv[limitArg + 1], 10) : null;

  console.log('Running the seed/migration simulation (same as simulate_route_builder.js)...');
  const routesJson = execSync('node scripts/simulate_route_builder.js', { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 50 }).toString('utf8');
  const routes = JSON.parse(routesJson);
  console.log(`Simulated ${routes.length} total routes.`);

  let updates = buildUpdates(routes);
  let blockUpdates = buildBlockUpdates(routes);
  console.log(`Built ${updates.length} destination updates (grand_trip_id + block_order + name -> notes + country_code + country + lat/lng).`);
  console.log(`Built ${blockUpdates.length} block updates (grand_trip_id + block_order -> lat/lng).`);

  if (limit) {
    updates = updates.slice(0, limit);
    blockUpdates = blockUpdates.slice(0, limit);
    console.log(`--limit ${limit}: restricting to first ${updates.length} destination + ${blockUpdates.length} block update(s).`);
  }

  const chunks = [
    ...chunk(updates, CHUNK_SIZE).map(data => ({ type: 'destinations_bulk_update', data })),
    ...chunk(blockUpdates, CHUNK_SIZE).map(data => ({ type: 'blocks_bulk_update', data })),
  ];
  console.log(`\n${chunks.length} chunk(s) of up to ${CHUNK_SIZE} each.`);

  if (!push) {
    console.log('\nDry run only — re-run with --push to actually POST these updates.');
    console.log('Tip: combine with --limit N first to test on a small batch before pushing everything.');
    console.log('\nSample of first 5 updates:');
    updates.slice(0, 5).forEach(u => console.log(`  ${u.grand_trip_id} / block ${u.block_order} / ${u.name}  [${u.country_code}]  notes: ${u.notes ? u.notes.slice(0, 60) + '...' : '(empty)'}`));
    return;
  }

  console.log('\nPushing...');
  let totalUpdated = 0, totalNotFound = 0, totalFailedChunks = 0;
  for (let i = 0; i < chunks.length; i++) {
    const result = await pushChunkWithRetry(chunks[i].type, chunks[i].data, i, chunks.length);
    if (result.ok) {
      totalUpdated += result.updated;
      totalNotFound += result.notFound;
    } else {
      totalFailedChunks++;
    }
    if (i < chunks.length - 1) await new Promise(r => setTimeout(r, DELAY_MS));
  }

  console.log(`\nDone. ${totalUpdated} row(s) updated, ${totalNotFound} not found, ${totalFailedChunks} chunk(s) failed after retries.`);
  if (totalFailedChunks > 0) {
    console.log('Re-run the same command (--push) to retry — updates are idempotent (same (grand_trip_id, block_order, name) row just gets overwritten again).');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
