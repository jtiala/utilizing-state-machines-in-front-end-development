// https://stately.ai/viz/026e3a1c-57e5-4fc3-85d1-1bd4e6380d3a

import { createMachine, assign } from "xstate";

const lightMachine = createMachine({
  id: "Dimmable Light Switch",
  initial: "off",
  states: {
    off: {
      entry: ["setBrightness(0)"],
      on: {
        TOGGLE_POWER: "on",
      },
    },
    on: {
      entry: ["setBrightness(100)"],
      on: {
        TOGGLE_POWER: "off",
        ADD_BRIGHTNESS: "brighten",
        REDUCE_BRIGHTNESS: "dim",
      },
    },
    brighten: {
      entry: ["setBrightness(+10)"],
      on: {
        "": {
          target: "on",
        },
      },
    },
    dim: {
      entry: ["setBrightness(-10)"],
      on: {
        "": {
          target: "on",
        },
      },
    },
  },
});
