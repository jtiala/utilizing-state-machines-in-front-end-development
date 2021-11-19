const states = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  FAILURE: "FAILURE",
  NO_RESULTS: "NO_RESULTS",
  SHOW_RESULTS: "SHOW_RESULTS",
};

const transitions = {
  INITIAL: ["LOADING"],
  LOADING: ["FAILURE", "NO_RESULTS", "SHOW_RESULTS"],
  FAILURE: [],
  NO_RESULTS: [],
  SHOW_RESULTS: [],
};

const validTransition = (before, after) => transitions[before].includes(after);

const SearchForm = () => {
  const [state, setState] = useState(states.INITIAL);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const search = () => {
    if (validTransition(state, states.LOADING)) {
      setState(states.LOADING);

      fetchResults(keyword)
        .then((results) => {
          setResults(results);
          setState(
            results.length > 0 ? states.SHOW_RESULTS : states.NO_RESULTS
          );
        })
        .catch((error) => setState(states.FAILURE));
    }
  };

  return (
    <div>
      <input onChange={(event) => setKeyword(event.target.value)} />
      <button onClick={search} disabled={state === states.LOADING}>
        Search
      </button>

      {state === states.INITIAL && <p>Hi! Enter keyword please.</p>}
      {state === states.LOADING && <p>Searching...</p>}
      {state === states.FAILURE && <p>Oh no!</p>}
      {state === states.NO_RESULTS && <p>Sorry! No results.</p>}
      {state === states.SHOW_RESULTS &&
        results.map((result) => <p>{result}</p>)}
    </div>
  );
};
