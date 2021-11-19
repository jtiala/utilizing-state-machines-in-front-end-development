// https://stately.ai/viz/f55d5714-f108-4230-86e9-6f85a3cdd370
// https://stately.ai/viz/46947d72-4552-4ede-803b-d63a13b0b91e

import { createMachine, assign } from "xstate";

const searchFormMachine = createMachine(
  {
    id: "Search Form",
    initial: "initial",
    context: {
      keyword: "",
      results: [],
    },
    states: {
      initial: {
        on: {
          SEARCH: "loading",
          SET_KEYWORD: {
            actions: assign({
              keyword: (context, event) => event.keyword,
            }),
          },
        },
      },
      loading: {
        on: {
          SUCCESS: [
            {
              cond: "hasResults",
              target: "showResults",
              actions: assign({
                results: (context, event) => event.results,
              }),
            },
            {
              cond: "hasNoResults",
              target: "noResults",
              actions: assign({
                results: (context, event) => [],
              }),
            },
          ],
          ERROR: "failure",
        },
      },
      failure: {
        type: "final",
      },
      noResults: {
        type: "final",
      },
      showResults: {
        type: "final",
      },
    },
  },
  {
    guards: {
      hasResults: (context, event) => event.results.length > 0,
      hasNoResults: (context, event) => event.results.length === 0,
    },
  }
);
