# Recipe App Frontend

A Vite + React + TypeScript frontend to browse, search, and view recipes with the Ocean Professional theme.

## Quick Start

- Install dependencies
  - npm install
- Run dev server
  - npm run dev
- Open the app at http://localhost:3000 (port is configured in vite.config.js)

## Environment variables

This app reads the following env variables (Vite style: VITE_*):
- VITE_API_BASE: Preferred base URL for the backend API (e.g., https://api.example.com)
- VITE_BACKEND_URL: Fallback base URL if VITE_API_BASE is not set
- VITE_FEATURE_FLAGS: Comma-separated list of feature flags. Include "mockData" to force mock mode.

Examples:
- VITE_API_BASE=https://api.example.com
- VITE_FEATURE_FLAGS=mockData

Create a .env (not committed) or pass via your hosting platform.

## Mock vs Real API

- Real API
  - Set VITE_API_BASE to your backend base URL (or VITE_BACKEND_URL).
  - Do not include "mockData" in VITE_FEATURE_FLAGS.
  - The app calls GET /recipes and GET /recipes/:id on that base URL.

- Mock Mode
  - Set VITE_FEATURE_FLAGS=mockData OR leave API base empty.
  - The app will serve data from src/lib/mock/recipes.json but still wire filters and details.

## Structure

- src/lib/api/client.ts — API client reading env configuration.
- src/lib/api/recipes.ts — Recipes service with mock fallback.
- src/context/FeatureFlagsContext.tsx — Feature flags provider and hook.
- src/components/ui/* — Reusable UI components (Button, Card, Badge, Modal).
- src/components/RecipeCard.tsx — Recipe preview card for the grid.
- src/components/SearchFilters.tsx — Search input and filter controls.
- src/routes/index.tsx — Home route (grid and modal detail).
- src/routes/RecipeDetail.tsx — Standalone detail page (optional).
- src/lib/theme.css — Ocean Professional theme styles (global CSS imported in src/main.tsx).

## Accessibility & Design

- Colors align with Ocean Professional: primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827.
- Subtle shadows, rounded corners, and smooth transitions applied.
- Focus-visible shadows ensure keyboard accessibility.

## Notes

- No authentication or write flows included.
- Pagination and infinite scroll are out of scope per requirements.
