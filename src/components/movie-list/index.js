import React, {useState}  from "react";
import fetch from 'node-fetch';
import "./index.css";

const moviesApi = `https://jsonmock.hackerrank.com/api/movies`;

function MovieList() {
  const [search, setSearch]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,  setError]    = useState(null);
  const [movies, setMovies]   = useState(null);

  const handleOnSearchClick = async() => {
    setLoading(true);
    fetch(`${moviesApi}?Year=${search}`).then(
      res => res.json()
    ).then(result => {
      setMovies(result.data);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      setError(err.message);
    });
  };

  const renderMovies = () => {
    if(!movies) {
      return '';
    }
    if(!movies.length) {
     return <div data-testid="no-result">No Results Found</div>
    }

    return movies.map((movie, index) => <li key={movie.imdbID}>{movie.Title}</li>);
  };

  const renderContent = () => {
    if(loading) {
      return <div className='loader' />
    }
    if(error) {
      return <div data-testid="error">Error getting the result: {error}</div>;
    }
    return (
    <ul className="mt-50 styled" data-testid="movieList">
      {renderMovies()}
    </ul>
    )
  };

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="number" className="large" onChange={e => setSearch(e.target.value)} placeholder="Enter Year eg 2015" data-testid="app-input"/>
        <button className="" data-testid="submit-button" onClick={handleOnSearchClick}>Search</button>
      </section>
      {renderContent()}
    </div>
  );
}

export default MovieList