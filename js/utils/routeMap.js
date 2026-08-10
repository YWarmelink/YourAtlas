/**
 * Shared Leaflet route-line drawing helpers — a dashed line through an ordered list of
 * {lat, lng} stops, starting/ending at a fixed Utrecht home point, with numbered markers.
 *
 * First user: Trips (js/pages/tripDetail.js), see TRIP_ROUTE_MAP.md. Route Builder has its
 * own near-identical copy of this same drawing logic (js/pages/routeBuilder.js —
 * rbRenderRouteLine/rbRenderDetailedRouteLine). Deliberately NOT consolidated yet: that code
 * has been through a full 13-expedition route-logic-review audit, and a refactor of already-
 * verified code deserves a real browser check before touching it — see TRIP_ROUTE_MAP.md's
 * "map UI" section. Once that's done, Route Builder can switch to calling these too.
 */

const ATLAS_HOME_LATLNG = [52.0907, 5.1214]; // Utrecht, NL
const ATLAS_WORLD_TOPOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const ATLAS_STOP_COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#f97316', '#14b8a6'];

let atlasWorldGeoJSON = null;

/** Same antimeridian fix as Route Builder's rbFixAntimeridian — see that function's comment. */
function atlasFixAntimeridian(geojson) {
  const unwrapRing = ring => {
    let offset = 0;
    const out = [ring[0]];
    for (let i = 1; i < ring.length; i++) {
      const [lng, lat] = ring[i];
      let adjusted = lng + offset;
      const prevLng = out[i - 1][0];
      while (adjusted - prevLng > 180) { offset -= 360; adjusted -= 360; }
      while (prevLng - adjusted > 180) { offset += 360; adjusted += 360; }
      out.push([adjusted, lat]);
    }
    return out;
  };

  geojson.features.forEach(f => {
    if (!f.geometry) return;
    if (f.geometry.type === 'Polygon') {
      f.geometry.coordinates = f.geometry.coordinates.map(unwrapRing);
    } else if (f.geometry.type === 'MultiPolygon') {
      f.geometry.coordinates = f.geometry.coordinates.map(poly => poly.map(unwrapRing));
    }
  });
  return geojson;
}

async function atlasGetWorldGeoJSON() {
  if (atlasWorldGeoJSON) return atlasWorldGeoJSON;
  const res = await fetch(ATLAS_WORLD_TOPOJSON_URL);
  const worldData = await res.json();
  const geojson = topojson.feature(worldData, worldData.objects.countries);
  geojson.features = geojson.features.filter(f => parseInt(f.id, 10) !== 10); // drop Antarctica
  atlasFixAntimeridian(geojson);
  atlasWorldGeoJSON = geojson;
  return geojson;
}

function atlasEnsureMiniMap(mapDiv) {
  return L.map(mapDiv, {
    center: [20, 10], zoom: 1.3, minZoom: 1, maxZoom: 9, zoomSnap: 0.5,
    attributionControl: false, scrollWheelZoom: false,
    maxBounds: [[-85, -200], [85, 200]], maxBoundsViscosity: 0.9,
  });
}

/**
 * Draws a dashed line through `stops` ([{lat, lng, label}], already home-to-home excluded —
 * this function adds the Utrecht start/end itself) on `map`, with faint country outlines from
 * `geojson` underneath. Shows an empty-state message in `mapDiv` instead if fewer than 2 stops
 * have valid coordinates. Returns the layerGroup that was added to the map, or null.
 */
function atlasRenderRouteLine(map, mapDiv, geojson, stops, opts = {}) {
  const validStops = (stops || []).filter(s =>
    typeof s.lat === 'number' && typeof s.lng === 'number' && !isNaN(s.lat) && !isNaN(s.lng));

  mapDiv.querySelectorAll('.atlas-map-empty').forEach(el => el.remove());

  if (validStops.length < 2) {
    const empty = document.createElement('div');
    empty.className = 'atlas-map-empty';
    empty.textContent = opts.emptyText || 'Not enough coordinates yet to draw a route line.';
    mapDiv.appendChild(empty);
    return null;
  }

  const layerGroup = L.layerGroup();

  L.geoJSON(geojson, {
    style: { fillColor: '#e2e8f0', fillOpacity: 0.5, color: '#94a3b8', weight: 0.5 },
  }).addTo(layerGroup);

  const stopLatLngs = validStops.map(s => [s.lat, s.lng]);
  const latlngs = [ATLAS_HOME_LATLNG, ...stopLatLngs, ATLAS_HOME_LATLNG];
  L.polyline(latlngs, {
    color: opts.lineColor || '#0ea5e9',
    weight: opts.lineWeight || 3,
    opacity: 0.85,
    dashArray: opts.dashArray || '6 8',
  }).addTo(layerGroup);

  const homeIcon = L.divIcon({
    className: 'atlas-map-stop-icon atlas-map-stop-icon--home',
    html: `<span>🏠</span>`,
    iconSize: [26, 26], iconAnchor: [13, 13],
  });
  L.marker(ATLAS_HOME_LATLNG, { icon: homeIcon })
    .bindTooltip(opts.homeLabel || '🇳🇱 Utrecht — vertrek & aankomst')
    .addTo(layerGroup);

  validStops.forEach((s, i) => {
    const color = ATLAS_STOP_COLORS[i % ATLAS_STOP_COLORS.length];
    const icon = L.divIcon({
      className: 'atlas-map-stop-icon',
      html: `<span style="background:${color}">${i + 1}</span>`,
      iconSize: [22, 22], iconAnchor: [11, 11],
    });
    L.marker([s.lat, s.lng], { icon })
      .bindTooltip(escapeHTML(s.label || ''))
      .addTo(layerGroup);
  });

  layerGroup.addTo(map);
  map.setMaxZoom(9);
  map.fitBounds(L.latLngBounds(latlngs), { padding: [30, 30] });
  return layerGroup;
}
