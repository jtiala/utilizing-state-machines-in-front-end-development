import { useMachine } from "@xstate/react";
import { searchFormMachine } from "...";

const SearchForm = () => {
  const [state, send] = useMachine(searchFormMachine);

  const search = () => {
    send("SEARCH");

    fetchResults(state.context.keyword)
      .then((results) => {
        send({ type: "SUCCESS", data: results });
      })
      .catch((error) => send("ERROR"));
  };

  return (
    <div>
      <input
        onChange={(event) =>
          send({ type: "SET_KEYWORD", data: event.target.value })
        }
      />
      <button onClick={search} disabled={state.value === "loading"}>
        Search
      </button>

      {state.value === "initial" && <p>Hi! Enter keyword please.</p>}
      {state.value === "loading" && <p>Searching...</p>}
      {state.value === "failure" && <p>Oh no!</p>}
      {state.value === "noResults" && <p>Sorry! No results.</p>}
      {state.value === "showResults" &&
        state.context.results.map((result) => <p>{result}</p>)}
    </div>
  );
};
