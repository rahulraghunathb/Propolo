# Backend

Express placeholder backend for future migration from local SQLite to synced APIs.

## Current Endpoints

- `GET /health`
- `GET /api/rooms`
- `GET /api/rooms/:id/tenants`
- `GET /api/payments?month=YYYY-MM`
- `PATCH /api/payments/:tenantId/mark-paid`
- `GET /api/dashboard?month=YYYY-MM`

## Purpose

This backend is intentionally minimal and does not need to run for the local pilot. It exists so domain concepts and future contracts are already defined.

## Structure

- `src/config` - environment configuration
- `src/routes` - route registration
- `src/controllers` - request handlers
- `src/services` - business logic
- `src/repositories` - data access
- `src/data` - in-memory seed data
- `src/middleware` - not-found and error handling
