This is a fork of https://github.com/leia-uwu/survev, but with more bug fixes and features.

# Open sourced surviv.io
Survev.io is an open source recreation of a hit web game "surviv.io" that has been permanently shut down.

Our goal is to immortalize it by getting the recreation as close as possible to the last canonical version of the game.

We do not consider any updates after the Kongregate acquisition canonical, so those will not be a part of the project.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20.0.0
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Project structure

```
├── client/          # Browser client (Vite + pixi.js-legacy)
│   ├── css/         # Stylesheets (app, game, deathmatch)
│   ├── img/         # Sprite atlases and UI images
│   ├── audio/       # Sound effects and music
│   └── src/         # Client TypeScript source
├── server/          # Game server (uWebSockets.js)
│   └── src/
│       ├── game/    # Game logic (map, objects, physics)
│       └── utils/   # Server utilities
├── shared/          # Shared code between client and server
│   ├── defs/        # Game object definitions and map configs
│   ├── net/         # Binary network protocol
│   └── utils/       # Shared utilities (math, vectors, etc.)
└── survivio-config.json  # Server and game mode configuration
```

## Running locally

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the client development server:
   ```sh
   npm run dev:client
   ```

3. Start the game server (in a separate terminal):
   ```sh
   npm run dev:server
   ```

4. Open your browser to the URL shown by the client dev server (typically `http://localhost:3000`).

For multiplayer testing, open multiple browser tabs to the same URL.

## Production builds
See [HOSTING.md](./HOSTING.md).

## Bugs/exploits list
See [BUGS.md](./BUGS.md).
