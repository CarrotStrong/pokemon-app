import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel;
    let isMounted = true;

    setLoading(true);

    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        if (isMounted) {
          setLoading(false);
          setNextPageUrl(res.data.next);
          setPrevPageUrl(res.data.previous);

          const fetchDetails = res.data.results.map((p) =>
            axios.get(p.url).then((detailsRes) => ({
              name: p.name,
              sprite: detailsRes.data.sprites.front_default,
            }))
          );

          Promise.all(fetchDetails).then((details) => {
            if (isMounted) {
              setPokemon(details);
            }
          });
        }
      })
      .catch((error) => {
        if (isMounted && axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        }
      });

    return () => {
      isMounted = false;
      cancel();
    };
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading)
    return (
      <div className="w-full h-screen grid place-items-center select-none">
        Loading...
      </div>
    );

  return (
    <div className="flex">
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
      <PokemonList pokemon={pokemon} />
    </div>
  );
}

export default App;
