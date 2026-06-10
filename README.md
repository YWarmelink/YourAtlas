# Youri's Travel Atlas

**Live website:** [https://ywarmelink.github.io/YourAtlas/](https://ywarmelink.github.io/YourAtlas/)

A personal travel dashboard built with vanilla HTML, CSS and JavaScript. Part of the YourIntineryPlan ecosystem.

## Pages

| Page | URL |
|------|-----|
| Home | [/](https://ywarmelink.github.io/YourAtlas/) |
| All Trips | [/trips.html](https://ywarmelink.github.io/YourAtlas/trips.html) |
| Countries | [/countries.html](https://ywarmelink.github.io/YourAtlas/countries.html) |
| Map | [/map.html](https://ywarmelink.github.io/YourAtlas/map.html) |

## Data

Live data is pulled from a public Google Sheets spreadsheet (CSV). Fallback JSON files are in `data/youri/` when the sheet is unreachable.

## Architecture

```
js/config/users.js      ← User configuration (multi-user ready)
js/data/dataService.js  ← Single data abstraction layer
js/data/csvParser.js    ← CSV parser
js/components/          ← Navbar + footer
js/pages/               ← Per-page logic
```

## Repository

[github.com/YWarmelink/YourAtlas](https://github.com/YWarmelink/YourAtlas)
