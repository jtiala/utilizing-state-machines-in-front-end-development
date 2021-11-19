// https://stately.ai/viz/18750c57-c736-4f1d-bb3f-12e716c0c1ff
import { createMachine } from "xstate";

const trafficLightMachine = createMachine({
  id: "Traffic Light",
  initial: "offline",
  states: {
    offline: {
      on: {
        TURN_ON: "red",
      },
    },
    red: {
      initial: "pedestrianRed",
      states: {
        pedestrianRed: {
          after: {
            2000: "pedestrianGreen",
          },
        },
        pedestrianGreen: {
          after: {
            4000: "pedestrianRed",
          },
        },
      },
      after: {
        6000: "redAndYellow",
      },
    },
    redAndYellow: {
      after: {
        3000: "green",
      },
    },
    green: {
      after: {
        6000: "yellow",
      },
    },
    yellow: {
      after: {
        3000: "red",
      },
    },
  },
  on: {
    TURN_OFF: "offline",
  },
});
