import React from "react";
import { useState } from "react";

import "./App.css";
import MoviesList from "./components/MoviesList";
import Modal from "./components/Modal";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);
  const url = "https://swapi.dev/api/filmys/";
  // const url = "https://swapi.dev/api/films/";

  async function fetchMoviesHandler() {
    setIsLoading(!isLoading);
    setIsError(null);
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        setIsLoading(false);
        throw new Error(`Sth went wrong...${res.status}`);
      }
      const data = await res.json();
      const transformedDataMovies = data.results.map((transformedMovie) => ({
        id: transformedMovie.episode_id,
        title: transformedMovie.title,
        releaseDate: transformedMovie.release_date,
        openingText: transformedMovie.opening_crawl,
      }));
      setMovies(transformedDataMovies);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }

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
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <Modal>{modalInfo}</Modal>
      </section>
    </React.Fragment>
  );
}

export default App;
