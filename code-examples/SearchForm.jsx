const SearchForm = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const search = () => {
    setIsLoading(true);
    setHasError(false);

    fetchResults(keyword)
      .then((results) => setResults(results))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <input onChange={(event) => setKeyword(event.target.value)} />
      <button onClick={search} disabled={isLoading}>
        Search
      </button>

      {isLoading && <p>Searching...</p>}
      {hasError && <p>Oh no!</p>}
      {results.length > 0 && results.map((result) => <p>{result}</p>)}
      {results.length === 0 && <p>Sorry! No results.</p>}
    </div>
  );
};
