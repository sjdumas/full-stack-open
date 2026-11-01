# Zustand Anecdotes

Anecdote app for Full Stack Open, part 6, with state managed in Zustand. Users can view anecdotes sorted by votes, filter them, vote for them, add new ones, and remove ones that have no votes.

Built with React, Vite, and Zustand. Data comes from a local JSON Server.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the JSON Server backend on `http://localhost:3001`. It uses `db.json` as its data file:

```bash
npm run server
```

In a second terminal, start the development server:

```bash
npm run dev
```

## Scripts

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the development server                |
| `npm run server`  | Start JSON Server on port 3001              |
| `npm run build`   | Build for production                        |
| `npm run preview` | Preview the production build                |
| `npm run lint`    | Lint the code with ESLint                   |
| `npx vitest run`  | Run the store tests with Vitest             |

## Project Structure

```text
src/
  App.jsx               # Loads anecdotes and renders the app
  store.js              # Zustand store for anecdotes and the filter
  notificationStore.js  # Zustand store for notifications
  components/           # AnecdoteForm, AnecdoteList, Filter, Notification
  services/             # API calls to JSON Server
```
