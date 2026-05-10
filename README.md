# INF653 Final - States REST API

Amir P Deilami

## Project Notes
- The original project requirements pointed to Glitch.com for hosting, but Glitch.com no longer hosts these projects. This project is deployed on Vercel instead. Render or another Node.js host works equivalently.
- All required endpoints, validation messages, and 404 behaviors follow the original requirements.

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

It also creates an empty `funfacts: []` document for `RI` so the single-state endpoint can return the expected empty array for that state.

## API Base Routes

- Root page: `/`
- API root: `/states/`

## Deployment Checklist

- Use a Node.js host (Vercel, Render, etc.). Glitch.com is no longer a viable host for this project.
- Add environment variables in host dashboard:
  - `DATABASE_URI`
  - `PORT` (optional on serverless platforms like Vercel)
- Confirm the host can reach MongoDB Atlas:
  - In Atlas Network Access, allow the host's outbound IPs or use `0.0.0.0/0` for grading and testing.
- Submit repository link, deployed link, one-page PDF, and automated test score.
