# EON

A developer journaling and knowledge platform — document what you build, capture what you learn, remember how far you've come.

> Two contributors. Zero specifications. Unexpected compatibility.

## Requirements

- [Node.js](https://nodejs.org/) (LTS) and npm
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose (for Postgres)

## Getting started

```bash
npm install
docker compose up -d   # starts Postgres on localhost:5432
cp source/backend/.env.example source/backend/.env
npm run db:push -w backend
npm run dev
```

Useful scripts from the repo root:

| Command       | Description                |
| ------------- | -------------------------- |
| `npm run lint`  | Run Biome across the monorepo |
| `npm run dev`   | Start workspace apps in watch mode |
| `npm run build` | Build all workspaces         |

## Project structure

```
.
├── source/
│   ├── frontend/   # UI (React / Vite)
│   └── backend/    # API and server logic
├── docker-compose.yml
├── biome.json
└── package.json    # npm workspaces root
```

| Path                 | Belongs here                                      |
| -------------------- | ------------------------------------------------- |
| `source/frontend/`   | Client app: pages, components, styles, client state |
| `source/backend/`    | Server: routes, services, DB access, auth           |
| `docker-compose.yml` | Local infra (Postgres)                              |
| Root `package.json`  | Shared tooling and workspace scripts                |

Add app code under `source/frontend` or `source/backend`. Shared lint/format lives at the root via Biome.

## License

ISC
