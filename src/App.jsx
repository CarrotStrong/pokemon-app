import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import Footer from "./Footer";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [prevPageAvailable, setPrevPageAvailable] = useState(true);

  const calculateLimit = (width) => {
    // return the number of pokemon to fetch based on screen width
    if (width >= 1440) return 16;
    if (width >= 768) return 12;
    return 10;
  };

  const updateUrlBasedOnScreenSize = () => {
    const screenWidth = window.innerWidth;
    const limit = calculateLimit(screenWidth);
    setCurrentPageUrl(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`
    );
  };

  useEffect(() => {
    updateUrlBasedOnScreenSize();

    const handleResize = () => {
      updateUrlBasedOnScreenSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    let isMounted = true;

    setLoading(true);

    fetch(currentPageUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (isMounted) {
          setLoading(false);
          setNextPageUrl(data.next);
          setPrevPageUrl(data.previous);
          if (data.previous === null) {
            setPrevPageAvailable(false);
          }
          const fetchDetails = data.results.map((p) =>
            fetch(p.url)
              .then((detailsResponse) => {
                if (!detailsResponse.ok) {
                  throw new Error(
                    `HTTP error! status: ${detailsResponse.status}`
                  );
                }
                return detailsResponse.json();
              })
              .then((detailsData) => ({
                name: p.name,
                sprite: detailsData.sprites.front_default,
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
        if (isMounted) {
          if (error.name === "AbortError") {
            console.log("Request canceled", error.message);
          } else {
            console.error("Fetch error:", error);
          }
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setPrevPageAvailable(true);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading)
    return (
      <div className="w-full h-dvh grid place-items-center select-none text-3xl text-white bg-200">
        Loading...
      </div>
    );

  return (
    <div>
      <Navbar />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={gotoPrevPage}
        prevPageAvailable={prevPageAvailable}
      />
      <PokemonList pokemon={pokemon} />
      <Footer />
    </div>
  );
}

export default App;
