#!/usr/bin/env python3
"""
Scans the TRUE final in-app Route Builder content (as a fresh browser would actually see it,
after every seed/migration runs) for leftover Dutch text.

Why this exists, and why it's different from find_dutch_text.py: grepping the raw JS source
also matches code comments, migration `oldName:` matching keys (deliberately-kept old Dutch
names used only so a migration can find and rename a stale browser's data), and old data tables
that a LATER migration overwrites before anything ever reaches the UI. None of that is a real
bug, but a blind source grep can't tell the difference and buries genuine hits in noise. This
script instead scans the actual simulated output of scripts/simulate_route_builder.js - the
literal `rbRoutes` array a brand-new browser ends up with - so every hit here is a real, live,
user-visible piece of Dutch text somewhere in the app.

Usage:
    node scripts/simulate_route_builder.js > /tmp/live_routes.json
    python3 scripts/find_dutch_in_live_content.py /tmp/live_routes.json
    python3 scripts/find_dutch_in_live_content.py /tmp/live_routes.json --detail
"""

import argparse
import json
import re
import sys

# Same curated wordlist as find_dutch_text.py - kept as a separate literal (not imported) so
# each script stays a single, self-contained file; update both if the list changes.
DUTCH_WORDS = [
    "het", "een", "voor", "deze", "wordt", "worden", "niet", "moet", "moeten",
    "naar", "bij", "uit", "nog", "ook", "echter", "terwijl", "omdat",
    "zoals", "tijdens", "vanaf", "sinds", "altijd", "nooit", "misschien", "eigenlijk",
    "erg", "veel", "weinig", "elke", "iedere", "waar", "wanneer", "waarom",
    "hoe", "dus", "maar", "toch", "zelfs", "alleen", "samen", "andere",
    "nieuwe", "oude", "grote", "kleine", "goede", "eerste", "volgende",
    "vorige", "huidige", "welke", "iets", "niets", "alles", "iemand", "niemand",
    "geen", "zich", "jouw", "jullie", "kunnen", "haar", "zijn",
    "instap", "einde", "prijsindicatie", "webonderzoek", "momentopname", "gebouwd",
    "verzoek", "onderzocht", "veiligheid", "reisadvies", "vlucht", "trein",
    "veerboot", "huurauto", "grensovergang", "aankomst", "vertrek", "deeltaxi",
    "dagtrip", "dagtour", "dagtocht", "retour", "kloof", "eiland", "eilanden",
    "regenseizoen", "droogseizoen", "hoogseizoen", "moesson", "regentijd",
    "kruist", "uur", "uren", "dagen", "reis", "reizen", "reiziger",
    "overdag", "avonds", "ochtend", "schemer", "let op", "bewust",
    "gefocuste", "toerisme", "voorzichtig", "zwemmen", "voeren", "afstand",
    "januari", "februari", "maart", "mei", "juni", "juli", "augustus", "oktober",
]
WORD_RE = re.compile(r"\b(" + "|".join(re.escape(w) for w in DUTCH_WORDS) + r")\b", re.IGNORECASE)


def walk_strings(obj, path=""):
    """Yields (path, string_value) for every string found anywhere in the JSON structure."""
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            yield from walk_strings(item, f"{path}[{i}]")
    elif isinstance(obj, dict):
        for k, v in obj.items():
            yield from walk_strings(v, f"{path}.{k}" if path else k)


def route_label(route):
    return route.get("name", "(unnamed route)")


def main():
    # Route names carry emoji; Windows consoles often default to a non-UTF-8 codepage that can't
    # print them, so force UTF-8 output instead of crashing after the summary's already useful.
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("json_file", help="path to simulate_route_builder.js's JSON output")
    parser.add_argument("--detail", action="store_true", help="print every matching string, not just per-route counts")
    args = parser.parse_args()

    with open(args.json_file, encoding="utf-8") as f:
        routes = json.load(f)

    hits_by_route = {}
    for route in routes:
        label = route_label(route)
        for path, s in walk_strings(route):
            matches = sorted(set(m.group(0).lower() for m in WORD_RE.finditer(s)))
            if matches:
                hits_by_route.setdefault(label, []).append((path, matches, s))

    total = sum(len(h) for h in hits_by_route.values())
    print(f"Scanned {len(routes)} live routes (simulated fresh-browser state).")
    print(f"Routes with Dutch text: {len(hits_by_route)}  |  Total matching strings: {total}\n")

    for label in sorted(hits_by_route, key=lambda r: -len(hits_by_route[r])):
        print(f"{len(hits_by_route[label]):>4}  {label}")

    if args.detail:
        for label in sorted(hits_by_route, key=lambda r: -len(hits_by_route[r])):
            print(f"\n=== {label} ===")
            for path, matches, s in hits_by_route[label]:
                snippet = s if len(s) <= 200 else s[:200] + "..."
                print(f"  {path} [{', '.join(matches)}]: {snippet}")

    sys.exit(1 if hits_by_route else 0)


if __name__ == "__main__":
    main()
