import React from "react";
import { useState, useEffect, useCallback } from "react";

import "./App.css";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie.js/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);
  // Star Wars API
  // const url = "https://swapi.dev/api/films/";
  const url =
    "https://filmsearcher-http-default-rtdb.firebaseio.com/movies.json";

  const fetchMoviesHandler = useCallback(async function () {
    setIsLoading(true);
    setIsError(null);
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        setIsLoading(false);
        throw new Error(`Sth went wrong...${res.status}`);
      }
      const data = await res.json();

      const loadedMovies = [];

      for (const [value, key] of Object.entries(data)) {
        console.log(key);
        loadedMovies.push({
          id: value,
          title: key.title,
          releaseDate: key.releaseDate,
          openingText: key.openingText
        })
      }

      setMovies(loadedMovies);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  const addMovieHandler = useCallback(async function (movie) {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      })
      if(res.status !== 200) {
        throw new Error(`Nie udało się przesłać danych, błąd ${res.status}`)
      }
      const data = await res.json();
      fetchMoviesHandler();
    } catch (error) {
      setIsError(error.message)
    }
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let modalInfo = <p>Anything to show...</p>;
  if (movies.length > 0) {
    modalInfo = <MoviesList movies={movies} />;
  }
  if (error) {
    modalInfo = <p>{error}</p>;
  }
  if (isLoading) {
    modalInfo = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{modalInfo}</section>
    </React.Fragment>
  );
}

export default App;
