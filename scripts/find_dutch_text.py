#!/usr/bin/env python3
"""
Scans every text file in the repo for leftover Dutch words/phrases.

Why this exists: Route Builder's content has gone through many Dutch->English
translation batches (see ROUTE_BUILDER_TRANSLATION_GLOSSARY.md), but at least twice
routes were found still fully in Dutch because they were seeded via a function the
earlier batch-by-batch sweeps never enumerated (see CHANGELOG.md's "Standalone country
routes" and "Draft Route Verification, Tier 1" entries). This script is a blunt,
repeatable safety net so that doesn't happen silently again: it doesn't understand
Dutch, it just flags every line containing a word from a curated list of Dutch words
that essentially never appear in this repo's English content, so a human can review
the hits.

Usage:
    python3 scripts/find_dutch_text.py                       # scan app-facing files, print a summary
    python3 scripts/find_dutch_text.py --detail               # also print every matching line
    python3 scripts/find_dutch_text.py --detail --out FILE    # write full detail to FILE instead
    python3 scripts/find_dutch_text.py --include-docs         # also scan the *.md planning docs

By default this only scans files an actual site visitor could see (js/, css/, the root
*.html pages, TRIP_DATABASE.csv). It deliberately EXCLUDES the *.md files, because
several of them (EUROPA_TRIP_IDEAS.md, ROADMAP.md, TRIP_TAXONOMY.md, ROUTE_LOGIC_REVIEW.md,
ROUTE_BUILDER_MODULES.md, ROUTE_SIMILARITY_REVIEW.md, TRIP_OVERVIEW.md, CHANGELOG.md, ...) are
Youri's own internal Dutch/mixed-language working notes and history, not app content - flagging
those would bury every real hit in noise. Pass --include-docs to scan them too if you ever want
that (e.g. to sanity-check a specific doc), but the default scope is "what ships in the app."

This will always have some false positives (short function words can coincide with English
substrings, e.g. inside identifiers, or with names/proper nouns) - it's a finder, not a verdict.
Review the hits; a single hit on a borderline word isn't proof, but a cluster of hits in one
route's notes almost certainly means the whole thing is still (or reverted to) Dutch.
"""

import argparse
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# App-facing extensions/paths only, by default - see the module docstring for why *.md is
# excluded by default. --include-docs adds .md back in.
APP_EXTENSIONS = {".js", ".css", ".html", ".json"}
DOC_EXTENSIONS = {".md"}
# TRIP_DATABASE.csv feeds the live Trip Taxonomy filters in the app, so it's in scope even
# though it's a .csv; no other .csv in this repo is app-facing.
EXTRA_APP_FILES = {"TRIP_DATABASE.csv"}

# Directories never worth scanning.
SKIP_DIRS = {".git", "node_modules", ".claude"}

# Curated Dutch words/phrases, grouped by where they came from. Word-boundary matched,
# case-insensitive. Deliberately EXCLUDES short/common words that collide with real English
# words or names and would drown real hits in noise: "route", "auto", "van", "want", "heel",
# "dan", "hun", "je" are all either valid English words or common proper-noun fragments.
DUTCH_WORDS = [
    # Core function words - the strongest, most reliable signal. A route with even one
    # of these in a sentence is almost certainly (still) Dutch prose.
    "het", "een", "voor", "deze", "wordt", "worden", "niet", "moet", "moeten",
    "naar", "bij", "uit", "nog", "ook", "echter", "terwijl", "omdat",
    "zoals", "tijdens", "vanaf", "sinds", "altijd", "nooit", "misschien", "eigenlijk",
    "erg", "veel", "weinig", "elke", "iedere", "waar", "wanneer", "waarom",
    "hoe", "dus", "maar", "toch", "zelfs", "alleen", "samen", "andere",
    "nieuwe", "oude", "grote", "kleine", "goede", "eerste", "volgende",
    "vorige", "huidige", "welke", "iets", "niets", "alles", "iemand", "niemand",
    "geen", "zich", "jouw", "jullie", "kunnen", "haar", "zijn",
    # Route-content vocabulary, drawn from ROUTE_BUILDER_TRANSLATION_GLOSSARY.md
    # (actual Dutch terms used in this repo's own translation history) plus terms
    # observed directly in the Hawaii/Florida routes that were missed by that project.
    "instap", "einde", "prijsindicatie", "webonderzoek", "momentopname", "gebouwd",
    "verzoek", "onderzocht", "veiligheid", "reisadvies", "vlucht", "trein",
    "veerboot", "huurauto", "grensovergang", "aankomst", "vertrek", "deeltaxi",
    "dagtrip", "dagtour", "dagtocht", "retour", "kloof", "eiland", "eilanden",
    "regenseizoen", "droogseizoen", "hoogseizoen", "moesson", "regentijd",
    "kruist", "uur", "uren", "dagen", "reis", "reizen", "reiziger",
    "overdag", "avonds", "ochtend", "schemer", "let op", "bewust",
    "gefocuste", "toerisme", "voorzichtig", "zwemmen", "voeren", "afstand",
    # Dutch month names not identical to English.
    "januari", "februari", "maart", "mei", "juni", "juli", "augustus", "oktober",
]

WORD_RE = re.compile(
    r"\b(" + "|".join(re.escape(w) for w in DUTCH_WORDS) + r")\b",
    re.IGNORECASE,
)


def iter_text_files(include_docs):
    for dirpath, dirnames, filenames in os.walk(REPO_ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            ext = os.path.splitext(name)[1].lower()
            if ext in APP_EXTENSIONS or name in EXTRA_APP_FILES:
                yield os.path.join(dirpath, name)
            elif include_docs and ext in DOC_EXTENSIONS:
                yield os.path.join(dirpath, name)


def scan_file(path):
    hits = []
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            for lineno, line in enumerate(f, start=1):
                matches = sorted(set(m.group(0).lower() for m in WORD_RE.finditer(line)))
                if matches:
                    hits.append((lineno, matches, line.strip()))
    except (UnicodeDecodeError, OSError):
        pass
    return hits


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--detail", action="store_true", help="print every matching line, not just per-file counts")
    parser.add_argument("--out", help="write full detail to this file instead of stdout")
    parser.add_argument("--include-docs", action="store_true", help="also scan *.md planning docs (off by default, see module docstring)")
    args = parser.parse_args()

    files = list(iter_text_files(args.include_docs))
    results = {}
    for path in files:
        hits = scan_file(path)
        if hits:
            rel = os.path.relpath(path, REPO_ROOT)
            results[rel] = hits

    total_lines = sum(len(hits) for hits in results.values())
    scope = "app files + *.md docs" if args.include_docs else "app-facing files only (pass --include-docs to also scan *.md)"
    print(f"Scanned for Dutch words across {len(files)} files ({scope}).")
    print(f"Files with hits: {len(results)}  |  Total matching lines: {total_lines}\n")

    for rel in sorted(results, key=lambda r: -len(results[r])):
        print(f"{len(results[rel]):>5}  {rel}")

    if args.detail or args.out:
        out = open(args.out, "w", encoding="utf-8") if args.out else sys.stdout
        try:
            for rel in sorted(results, key=lambda r: -len(results[r])):
                out.write(f"\n=== {rel} ({len(results[rel])} lines) ===\n")
                for lineno, matches, text in results[rel]:
                    snippet = text if len(text) <= 200 else text[:200] + "..."
                    out.write(f"  L{lineno} [{', '.join(matches)}]: {snippet}\n")
        finally:
            if args.out:
                out.close()
                print(f"\nFull detail written to {args.out}")


if __name__ == "__main__":
    main()
