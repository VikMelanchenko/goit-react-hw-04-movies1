import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../../service/api_movie';
import ReviewsList from '../ReviewsList/ReviewsList';

import Spinner from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus(Status.PENDING);
    getReviews();
    setStatus(Status.RESOLVED);
  }, [movieId]);

  const getReviews = () => {
    fetchMovieReviews(movieId)
      .then((request) => setReviews(request.results))
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  if (status === Status.IDLE) {
    return <ReviewsList />;
  }

  if (status === Status.PENDING) {
    return <Spinner />;
  }

  if (status === Status.REJECTED) {
    return <div>{error.message}</div>;
  }

  if (status === Status.RESOLVED) {
    return <ReviewsList reviews={reviews} />;
  }
}
