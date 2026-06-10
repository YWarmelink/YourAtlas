/**
 * Normalises a CSV header string into a valid JS property key.
 * "Duration (days)" → "duration_days"
 * "Country/Region"  → "country_region"
 */
function normalizeHeader(raw) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s*\(.*?\)/g, '')   // strip parenthetical suffixes
    .replace(/[^a-z0-9]+/g, '_')  // non-alnum → underscore
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Parses one CSV line respecting RFC 4180 quoting.
 * Returns an array of raw string values.
 */
function parseLine(line) {
  const fields = [];
  let cur = '';
  let inQ = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (ch === ',' && !inQ) {
      fields.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields;
}

/**
 * Splits raw CSV text into logical records, handling quoted newlines.
 */
function splitRecords(text) {
  const records = [];
  let cur = '';
  let inQ = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQ && text[i + 1] === '"') { cur += '""'; i++; }
      else { inQ = !inQ; cur += ch; }
    } else if ((ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) && !inQ) {
      if (ch === '\r') i++;
      if (cur.trim()) records.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) records.push(cur);
  return records;
}

/**
 * Full CSV → array-of-objects parser.
 * Strips BOM, normalises headers, skips blank rows.
 */
function parseCSV(text) {
  const cleaned = text.replace(/^﻿/, '');
  const records = splitRecords(cleaned);
  if (records.length === 0) return [];

  const headers = parseLine(records[0]).map(normalizeHeader);

  return records.slice(1)
    .map(line => {
      const values = parseLine(line);
      const obj = {};
      headers.forEach((h, i) => {
        if (!h) return;
        const raw = values[i] ?? '';
        // strip surrounding quotes left by parseLine passthrough
        obj[h] = raw.replace(/^"|"$/g, '').trim();
      });
      return obj;
    })
    .filter(obj => Object.values(obj).some(v => v !== ''));
}
