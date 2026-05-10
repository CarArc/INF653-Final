# INF653 Final - States REST API

## Setup
1. Install dependencies:
   - `npm install`
2. Set your real MongoDB Atlas URI in `.env`:
   - `DATABASE_URI=<your_connection_string>`
   - `PORT=3500`
3. Start server:
   - `npm start`

## Seed Required Fun Facts
Run this once after `.env` is configured:

- `npm run seed`

This seeds at least 3 fun facts each for:
- `KS`
- `MO`
- `OK`
- `NE`
- `CO`

## API Base Routes
- Root page: `/`
- API root: `/states/`

## Deployment Checklist
- Add environment variables in host dashboard (`DATABASE_URI`, `PORT`)
- Ensure root page is reachable
- Ensure `/states/` routes are reachable
- Submit repository link, deployed link, one-page PDF, and automated test score
