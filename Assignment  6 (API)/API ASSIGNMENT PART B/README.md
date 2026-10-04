# MongoDB Users API

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set `MONGODB_URI`.
3. Make sure MongoDB is running.
4. Start the API:

   ```bash
   npm start
   ```

   Use `npm run dev` during development.

## Routes

All user IDs are MongoDB ObjectIds.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/` | Health check |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get one user |
| POST | `/api/users` | Create one user |
| PUT | `/api/users/:id` | Replace one user |
| DELETE | `/api/users/:id` | Delete one user |

Example user body:

```json
{
  "name": "Om Pawar",
  "email": "om.pawar@example.com"
}
```
