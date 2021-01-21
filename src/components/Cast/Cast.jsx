import { useState, useEffect } from 'react';
import { fetchMovieCredits } from '../../service/api_movie';
import Cast from '../CastItem/CastItem';
import Spinner from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function CastView({ movieId }) {
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(Status.PENDING);
    getCharacters();
    setStatus(Status.RESOLVED);
  }, [movieId]);

  const getCharacters = () => {
    fetchMovieCredits(movieId)
      .then((request) => setCharacters(request.cast))
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  if (status === Status.IDLE) {
    return <Cast />;
  }

  if (status === Status.PENDING) {
    return <Spinner />;
  }

  if (status === Status.REJECTED) {
    return <div>{error.message}</div>;
  }

  if (status === Status.RESOLVED) {
    return <Cast characters={characters} />;
  }
}
