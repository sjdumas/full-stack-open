# Bloglist

This is a full-stack blog application containing [Part 7](https://fullstackopen.com/en/part7) exercises of the [Full Stack Open](https://fullstackopen.com/en/).

The bloglist is an application that allows users browse blogs, create an account, log in, add blogs, like blogs, and delete blogs they created. The frontend is a React single-page application, and the backend provides an Express REST API backed by MongoDB.

## Tech Stack

- React and React Router
- Vite
- Material UI
- Node.js and Express
- MongoDB with Mongoose
- JWT authentication
- Node's built-in test runner and Supertest

## Project Structure

```text
bloglist/
├── backend/     Express API, MongoDB models, authentication, and tests
└── frontend/    React/Vite user interface and frontend tests
```

## Getting Started

### 1. Install Dependencies

Run the install command in both backend and frontend project folders:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure the Backend

Create `backend/.env` with values for your MongoDB databases and JWT secret:

```env
PORT=3003
MONGODB_URI=mongodb://127.0.0.1:27017/bloglist
TEST_MONGODB_URI=mongodb://127.0.0.1:27017/bloglist_test
SECRET=replace-with-a-long-random-secret
```

Use a separate database for `TEST_MONGODB_URI`. The `.env` file is ignored by Git and should not contain credentials that are committed to the repository.

### 3. Start the Development Servers

You will use two terminal windows for this project.

Start the backend in terminal 1:

```bash
cd backend
npm run dev
```

Start the frontend in terminal 2:

```bash
cd frontend
npm run dev
```

The Vite development server proxies `/api` requests to `http://localhost:3003`. Open the URL printed by Vite, normally `http://localhost:5173`.

## Available Scripts

### Backend

Run these commands from `backend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the API with Node's watch mode |
| `npm start` | Start the API in production mode |
| `npm test` | Run backend tests against the test database |
| `npm run lint` | Check backend JavaScript with ESLint |
| `npm run build` | Build the frontend and copy it into `backend/dist` |

### Frontend

Run these commands from `frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production frontend build |
| `npm test` | Run frontend tests with Vitest |
| `npm run lint` | Check frontend JavaScript with ESLint |
| `npm run preview` | Preview the production build locally |

## Production Build

The backend serves the compiled frontend from `backend/dist`. Build both parts from the backend directory:

```bash
cd backend
npm run build
npm start
```

Make sure `PORT`, `MONGODB_URI`, and `SECRET` are set in the production environment.

## Main API Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/blogs` | List blogs |
| `POST` | `/api/blogs` | Create a blog; requires authentication |
| `PUT` | `/api/blogs/:id` | Update a blog, including likes |
| `DELETE` | `/api/blogs/:id` | Delete a blog created by the authenticated user |
| `POST` | `/api/users` | Create a user |
| `POST` | `/api/login` | Authenticate a user and return a JWT |

Authenticated requests use an `Authorization: Bearer <token>` header.

## Full Stack Open Exercises

This project extends the Part 4 bloglist application through the Part 7 exercises, including:

- React frontend integration
- React Router navigation
- User accounts and JWT-based login
- Associating blogs with their creators
- Protected create and delete operations
- Frontend and backend testing
- Serving the frontend from the backend production build
