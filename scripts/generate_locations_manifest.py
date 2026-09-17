#!/usr/bin/env python3
"""
Builds LOCATIONS_MANIFEST.csv — a deduplicated name -> {country_code, country, lat, lng, notes}
table extracted from the live simulated Route Builder state (every destination that already has
a researched `notes` field, across all 452 routes).

Why this exists: the per-destination-notes batch project (see DESTINATION_NOTES_PLAN.md,
CHANGELOG.md's "Per-destination notes, batch N" entries) has been filling in `notes` per
destination directly in js/pages/routeBuilderContent.js, duplicated once per route that reuses
that destination name. This script is the "ready to paste into a canonical Google Sheet
Locations tab" extraction Youri asked for (2026-09-17 brainstorm) — since destination/block IDs
are deterministic and country_code already lives on the block, no workflow change was needed at
insertion time; this just walks the existing data and dedupes by exact destination name.

Usage:
  node scripts/simulate_route_builder.js --pretty > /tmp/live_routes.json
  python3 scripts/generate_locations_manifest.py /tmp/live_routes.json

Regenerate this after every future per-destination-notes batch, same as
scripts/generate_destination_notes_plan.py — both are derived artifacts, never hand-edited.
"""
import csv
import json
import sys

OUTPUT_PATH = "LOCATIONS_MANIFEST.csv"


def main():
    if len(sys.argv) != 2:
        print("Usage: python3 scripts/generate_locations_manifest.py <live_routes.json>")
        sys.exit(1)

    with open(sys.argv[1], encoding="utf-8") as f:
        routes = json.load(f)

    # (name, country_code) -> {country, lat, lng, notes, routes: set()}
    # Keyed by name+country, NOT name alone — some names collide across countries for genuinely
    # different real places (e.g. "Granada" in Spain vs. Nicaragua, "Valle de la Luna" in Chile
    # vs. Bolivia), which name-only dedup would silently merge into one wrong row.
    locations = {}
    conflicts = []

    for route in routes:
        for block in route.get("blocks", []):
            country_code = block.get("country_code", "")
            country = block.get("country", "")
            for dest in block.get("destinations", []):
                notes = dest.get("notes") or ""
                if not notes:
                    continue
                name = dest["name"]
                lat = dest.get("lat", "")
                lng = dest.get("lng", "")
                key = (name, country_code)
                existing = locations.get(key)
                if existing is None:
                    locations[key] = {
                        "country": country,
                        "lat": lat,
                        "lng": lng,
                        "notes": notes,
                        "routes": {route["name"]},
                    }
                else:
                    existing["routes"].add(route["name"])
                    # Flag (don't crash on) a genuine data inconsistency: same name+country, but
                    # different coordinates or note text across occurrences — a real duplicate
                    # authored twice with drifted content (seen for a few Balkan pre-session
                    # entries: Sarajevo/Budva/Trebinje), not a different-place false match.
                    if existing["lat"] != lat or existing["lng"] != lng:
                        conflicts.append((key, "lat/lng", existing["lat"], existing["lng"], lat, lng))
                    if existing["notes"] != notes:
                        conflicts.append((key, "notes", existing["notes"][:40], "...", notes[:40], "..."))

    rows = sorted(locations.items(), key=lambda kv: (kv[0][1], kv[0][0]))

    with open(OUTPUT_PATH, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["name", "country_code", "country", "lat", "lng", "notes", "route_count"])
        for (name, country_code), info in rows:
            writer.writerow([
                name, country_code, info["country"], info["lat"], info["lng"],
                info["notes"], len(info["routes"]),
            ])

    print(f"Wrote {OUTPUT_PATH}: {len(rows)} unique researched locations "
          f"across {len(routes)} routes.")
    if conflicts:
        print(f"\n⚠️  {len(conflicts)} conflict(s) found (same name, different data) — investigate:")
        for c in conflicts[:20]:
            print("  ", c)
    else:
        print("No name collisions with conflicting data — every name maps to one consistent place.")


if __name__ == "__main__":
    main()
