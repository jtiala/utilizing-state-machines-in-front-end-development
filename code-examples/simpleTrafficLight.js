// https://stately.ai/viz/bb6c213d-d3d0-4a0f-98a5-7acb9985311e
import { createMachine } from "xstate";

const lightMachine = createMachine({
  id: "Traffic Light",
  initial: "green",
  states: {
    green: {
      on: {
        TIMER: "yellow",
      },
    },
    yellow: {
      on: {
        TIMER: "red",
      },
    },
    red: {
      on: {
        TIMER: "green",
      },
    },
  },
});
