# PG Rent Collection MVP

Local-first PG rent collection pilot with a real mobile MVP flow and future-ready backend scaffold.

## Workspace Structure

- `frontend/` - Expo React Native app scaffold with modular architecture for SQLite-based rent tracking
- `backend/` - Node.js + Express placeholder API scaffold for future sync and cloud migration

## Current Status

This setup includes:

- Root workspace docs and ignore rules
- Expo app with Dashboard and Payments flows, reusable components, hooks, repositories, services, and SQLite setup modules
- Express backend with modular routes, controllers, services, repositories, and seed-backed endpoints

This setup is ready for iterative UI refinement and later API integration.

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run start
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Notes

- SQLite is wired as the local persistence direction via `expo-sqlite`
- The backend is scaffolded only for future API readiness and is not required for the pilot app flow
- Seed data, schema, and service layers are organized for easy iteration once designs are provided
