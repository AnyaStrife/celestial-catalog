# Celestial Catalog

A full-stack CRUD application built with TypeScript to manage a catalog of celestial objects, including stars, planets, galaxies, nebulae and black holes. A small project inspired by my interest in astrophysics.

## Tech Stack

- **Backend:** Node.js, Express 5, SQLite, Zod
- **Frontend:** React, Vite, Material UI, TanStack Query, Axios
- **Testing & tooling:** Vitest, React Testing Library, Storybook, TypeScript

## Getting Started

**Prerequisites:** Node.js 22 or later. No database setup required.

Install the dependencies and start both the client and server:

```bash
npm install
npm run dev
```

The application will be available at:

| Service  | URL                                                                                        |
| -------- | ------------------------------------------------------------------------------------------ |
| Frontend | [http://localhost:5173](http://localhost:5173)                                             |
| API      | [http://localhost:3001/api/celestial-objects](http://localhost:3001/api/celestial-objects) |

Running `npm install` from the project root also installs the dependencies for `client/` and `server/`.

The SQLite database (`server/celestial.db`) is created automatically on startup and seeded with five sample objects.

## Available Scripts

Run all commands from the project root.

| Command             | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `npm run dev`       | Starts the frontend and backend concurrently                       |
| `npm test`          | Runs the frontend tests with Vitest and React Testing Library      |
| `npm run storybook` | Starts Storybook at [http://localhost:6006](http://localhost:6006) |
| `npm run typecheck` | Checks the server types and builds the frontend                    |

## API

| Method | Endpoint                     | Description         | Success |
| ------ | ---------------------------- | ------------------- | ------- |
| GET    | `/api/celestial-objects`     | Get all objects     | 200     |
| GET    | `/api/celestial-objects/:id` | Get an object by ID | 200     |
| POST   | `/api/celestial-objects`     | Create an object    | 201     |
| PUT    | `/api/celestial-objects/:id` | Update an object    | 200     |
| DELETE | `/api/celestial-objects/:id` | Delete an object    | 204     |

Example requests for all CRUD operations are available in [`requests.http`](./requests.http).

## Recommended VS Code Extensions

The project includes a `.vscode/extensions.json` file with recommended extensions for development.

- **ESLint** — Identifies potential code issues
- **Prettier** — Formats code consistently
- **REST Client** — Runs the requests in `requests.http` directly from VS Code
- **SQLite Viewer** — Lets you inspect the contents of `server/celestial.db`

## Possible Improvements

- Add French and English translations with `react-i18next`, including API error messages.
- Organize the frontend by feature as the project grows, grouping related components, hooks, API calls and types.
- Share domain types between the frontend and backend to avoid maintaining the same object types in two places.
- Add Docker Compose to start the frontend and backend with a single command.
- Consider PostgreSQL and Prisma for a production deployment.
- Add search, filtering by object type and pagination.
