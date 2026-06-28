# Mundial 2026 — Context for Claude

## What this project is
Fan bracket app for FIFA World Cup 2026. Vanilla JS + CSS + HTML, no build step.
Deployed on GitHub Pages from `main` branch of `https://github.com/jsuzxx/Mundial2026.git`.

## Key files

| File | Purpose |
|------|---------|
| `index.html` | Single page shell |
| `js/app.js` | All logic (data + rendering) |
| `results.json` | Live scores `{mXX:{home,away}, _updated}` — synced via GitHub API |
| `css/style.css` | Styles |

## Admin mode
URL param `?key=colombia2026` or `sessionStorage('wc2026_admin')`.

## Data model — app.js structure

### Constants (top of file)
- `TEAMS` — 48 team codes → `{name, flag, group}`
- `GROUPS_DEF` — `{A:[...], B:[...], ..., L:[...]}` — 12 groups × 4 teams
- `MATCHES` (lines ~76–166) — 72 group stage matches `{id, date, time, home, away, venue}`
- `R32_BRACKET` — 16 R32 matches, slot types:
  - `{g:'A', pos:1}` — 1st/2nd/3rd from a specific group
  - `{best3:'CEFHI'}` — best 3rd-place team from one of the named groups (5 of these)
- `KO_ROUNDS` — k01–k16 (r16→QF→SF→Final), slots reference previous match winners

### Core functions
- `calcStandings()` — computes pts/GD/GF from `results` object
- `sortGroup(members, st)` — returns group members sorted by standing
- `getBest3rds()` — all 12 3rd-place teams sorted pts→GD→GF
- `getBest3Assignments()` — greedy assignment of 5 `best3` R32 slots; excludes groups B/D/F (already in fixed slots r03/r06/r10)
- `resolveSlot(slot, matchId)` — resolves a slot to a team code
- `getAllMatchTeams(id)` — returns `{home, away}` for any match id
- `resolveKOSlot(slot)` — resolves a KO slot based on previous result

## Group stage — 72 matches, IDs m01–m72
Last group stage matches played June 27, 2026.
Results stored in `results.json` (all 72 complete as of 2026-06-27).

## Final group standings (R32 reference)
| # | Group | 1st | 2nd | 3rd (best3 pool) |
|---|-------|-----|-----|-----------------|
| A | A | MEX | RSA | KOR |
| B | B | SUI | CAN | BIH |
| C | C | BRA | MAR | SCO |
| D | D | USA | AUS | PAR |
| E | E | GER | CIV | ECU |
| F | F | NED | JPN | SWE |
| G | G | BEL | EGY | IRN |
| H | H | ESP | CPV | URU |
| I | I | FRA | NOR | SEN |
| J | J | ARG | AUT | ALG |
| K | K | COL | POR | COD |
| L | L | ENG | CRO | GHA |

Best 3rd qualifying (top 8 by pts→GD→GF): COD, SWE, GHA, ECU, BIH, ALG, PAR, SEN.
Fixed 3rds (BIH→r10, PAR→r03, SWE→r06). Dynamic 5: ECU→r07, COD→r08, ALG→r09, SEN→r13, GHA→r16.

## R32 official bracket (FIFA 2026)
| ID | Matchup | Date |
|----|---------|------|
| r01 | 2A vs 2B | 28 jun |
| r02 | 1C vs 2F | 29 jun |
| r03 | 1E vs 3D | 29 jun |
| r04 | 1F vs 2C | 29 jun |
| r05 | 2E vs 2I | 30 jun |
| r06 | 1I vs 3F | 30 jun |
| r07 | 1A vs best3(CEFHI) | 30 jun |
| r08 | 1L vs best3(EHIJK) | 1 jul |
| r09 | 1G vs best3(AEHIJ) | 1 jul |
| r10 | 1D vs 3B | 1 jul |
| r11 | 1H vs 2J | 2 jul |
| r12 | 2K vs 2L | 2 jul |
| r13 | 1B vs best3(EFGIJ) | 2 jul |
| r14 | 2D vs 2G | 3 jul |
| r15 | 1J vs 2H | 3 jul |
| r16 | 1K vs best3(DEIJL) | 3 jul |

## GitHub push
```
git add -A
git commit -m "..."
git push origin main
```
Remote: `https://github.com/jsuzxx/Mundial2026.git`

## Match ID reference (group stage)
Groups J/K/L last matches (June 27):
- m67: PAN vs ENG (0-2) | m68: CRO vs GHA (2-1) | m69: COL vs POR (0-0)
- m70: COD vs UZB (3-1) | m71: ALG vs AUT (1-1) | m72: JOR vs ARG (0-2)
