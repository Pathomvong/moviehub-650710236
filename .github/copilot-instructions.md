# Copilot / AI Agent Instructions — MovieHub Starter

Short, actionable guidance to help an AI coding agent be productive in this repo.

## Big picture
- React single-page app (React 19 + React Router 6) used for an educational lab.
- Client talks to TMDB via a thin API layer in [src/api/tmdb.js](src/api/tmdb.js). A local cache layer is in [src/api/cache.js](src/api/cache.js).
- A small mock backend is available at [mock/server.js](mock/server.js) (dev script: `npm run mock`).
- Production build lives in `build/` and this app is designed to be deployed on Vercel ([vercel.json](vercel.json)).

## Key files & patterns (do these first)
- [src/api/tmdb.js](src/api/tmdb.js): central place for network code. TODOs: `getJSON`, `toMovie` — match shape in [src/data/data.js](src/data/data.js).
- [src/api/cache.js](src/api/cache.js): localStorage "once a day" cache pattern used by API helpers.
- [src/components/*](src/components): UI components follow simple presentational patterns. Examples: [src/components/MovieCard.jsx](src/components/MovieCard.jsx) and [src/components/MovieGrid.jsx](src/components/MovieGrid.jsx) implement loading / error / success UI states consistently.
- [src/components/ReviewForm.jsx](src/components/ReviewForm.jsx): simple controlled form (note: 3 state variables mentioned in README).
- [src/pages/*](src/pages): page-level data fetching uses the API helpers (e.g., `getMovies()` and `getMovie()` called from useEffect).
- [docs/api-wishlist.md](docs/api-wishlist.md): canonical backend API expectations; use when drafting backend-related changes.

## Developer workflows & commands
- Start dev server: `npm start` (reads `.env` for `REACT_APP_TMDB_KEY`). If you change `.env`, stop and restart `npm start`.
- Run tests: `npm test` (uses react-scripts + Testing Library). Test helpers in [src/setupTests.js](src/setupTests.js).
- Run mock backend: `npm run mock` (starts [mock/server.js](mock/server.js)). `package.json` sets a dev `proxy: "http://localhost:4000"` so client API calls go to mock.
- Build for production: `npm run build` → output in `build/` (used by Vercel). Ensure no local `.env` leaked into Git history before deploy.

## Conventions specific to this repo
- Environment variable: `REACT_APP_TMDB_KEY` (see [.env.example](.env.example)). UI shows a yellow banner when the key is missing.
- API shape: the project expects TMDB data converted into the local movie shape (see [src/data/data.js](src/data/data.js)). Implement `toMovie()` to match fields used by components.
- Caching: use `src/api/cache.js` helpers rather than ad-hoc localStorage access to keep one-day semantics.
- Tests: use Testing Library patterns already present in `src/*/*.test.*` and `src/setupTests.js`.

## Integration points & external dependencies
- TMDB: network calls implemented in [src/api/tmdb.js](src/api/tmdb.js). Keep requests centralized.
- Mock server: [mock/server.js](mock/server.js) exposes endpoints used by the app in development. Use it when offline or for predictable responses.
- Vercel: set `REACT_APP_TMDB_KEY` in project settings when deploying. See [vercel.json](vercel.json).

## Examples to follow when changing code
- When adding a new API helper, mirror `getMovies()` and use `cache.js` for storing daily results.
- When adding UI for async data, follow `MovieCard`/`MovieGrid` pattern: explicit `loading` | `error` | `success` rendering paths.
- When converting TMDB payloads, reference `data/data.js` to ensure IDs and fields match front-end expectations.

## Safety notes for AI edits
- Do not commit real secret keys; `.env` should be in `.gitignore` (verify before committing).
- Keep changes minimal and focused. Preserve existing component props and public APIs unless the change is intentionally breaking.

If anything here is unclear or you want me to expand examples (e.g., concrete `toMovie()` implementation), tell me which area to iterate on.
