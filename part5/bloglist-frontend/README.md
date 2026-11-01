# Bloglist Frontend

React frontend for the Bloglist app (Full Stack Open, part 5). Users can browse blogs, log in, add new blogs, like blogs, and delete blogs they created.

Built with React, Vite, React Router, Material UI, and Axios.

## Requirements

The app talks to the bloglist backend at `/api`. In development, Vite proxies these requests to `http://localhost:3003`, so start the backend there first.

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the development server      |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview the production build      |
| `npm test`        | Run unit tests with Vitest        |
| `npm run lint`    | Lint the code with ESLint         |

## Project Structure

```text
src/
  App.jsx          # Routes, app state, and handlers
  components/      # Blog, BlogForm, LoginForm, Notification, etc.
  services/        # API calls for blogs and login
```
