# GRID LIVE COMMENTARY PLATFORM

2023 GRID DATAJAM

## 🚀 About this project

This platform allow you to make your esports live commentary streaming easy by leveraging the [GRID](https://grid.gg/) realtime esports tournaments data.

**Heroes are players. We center our focus on the players.**

## 👤 Team members

- Weffa
- Ellen
- Taro

## 💻 Tech stack

- React + TypeScript + Vite [https://vitejs.dev/guide/]
- Tailwind CSS [https://tailwindcss.com/docs/guides/vite]
- Headless UI [https://headlessui.com/]
- Heroicons [https://heroicons.com/]
- Neflify [https://docs.netlify.com/integrations/frameworks/vite/]

## ⚙️ Installation

### GRID official mock websocket server

Access to the following site and follow the README.

https://github.com/grid-esports/datajam-2023

### Our web application

1. Clone this repository
1. `cd frontend`
1. `npm install`
1. Make sure your GRID official mock websocket server is running
1. `npm run dev`

## About data from GRID

You can use GRID data anywhere in the project.
`const grid = useGrid()`

The data "grid" has 2 properties,

- **events**: Originally an allay [] as the "events" property in each record from the websocket server. If there are 2 event records in a "events" property of a single websocket message, we make 2 events record.
- **state**: We extract "seriesState" property from event record above, but only keeps the latest status. And we added useful pre-calculated properties, "ongoingGame" and "timer".

### usage

```javascript
const grid = useGrid();
const events = grid.events;
const state = grid.state;

const timerSeconds = state.timer.time; // You can use a extended property that I made.
const game = events[0].seriesState.ongoingGame; // seriesState is also extended!
```

### pre-calculated properties

- ongoingGame
  If game is already started, that entire game information is here.
- timer
  If game is already started, clock is ticking. I simply put the clock to this object so that you can use them easily.
