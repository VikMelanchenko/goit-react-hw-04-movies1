import { useState, useEffect } from 'react';
import { fetchSearchMovie } from '../../service/api_movie';
import Spinner from '../Loader/Loader';
import MovieCard from '../MovieCard/MovieCard';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function FetchMovieRequest({ query }) {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus(Status.PENDING);
    fetchMovies();
    setStatus(Status.RESOLVED);
  }, [query]);

  const fetchMovies = () => {
    fetchSearchMovie(query)
      .then(({ results }) => {
        setMovies(results);
        if (!results.length) {
          throw new Error('Hmm...Nothing here. Try another search.');
        }
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  if (status === Status.IDLE) {
    return (
      <div style={{ textAlign: 'left' }}>
        Please enter a search term to begin your search...
      </div>
    );
  }

  if (status === Status.PENDING) {
    return <Spinner />;
  }

  if (status === Status.REJECTED) {
    return <div>{error.message}</div>;
  }

  if (status === Status.RESOLVED) {
    return <>{movies && <MovieCard movies={movies} />}</>;
  }
}

FetchMovieRequest.propTypes = {
  query: PropTypes.string.isRequired,
};
