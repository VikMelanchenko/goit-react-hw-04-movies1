import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../service/api_movie';
import FetchMovieRequest from '../../components/FetchMovieRequest/FetchMovieRequest';
import Spinner from '../../components/Loader/Loader';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import styles from '../../css/styles.module.css';

import defaultImg from '../../images/defaul_img.png';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomeView() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { url } = useRouteMatch();

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchTrends();
    setStatus(Status.RESOLVED);
  }, []);

  const fetchTrends = () => {
    fetchTrendingMovies()
      .then((request) => setMovies(request.results))
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  if (status === Status.IDLE) {
    return <FetchMovieRequest />;
  }

  if (status === Status.PENDING) {
    return <Spinner />;
  }

  if (status === Status.REJECTED) {
    return <div>{error.message}</div>;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {movies && (
          <ul className={styles.cards_wrap}>
            {movies.map((movie) => (
              <li key={movie.id} className={styles.card_box}>
                <img
                  className={styles.card_poster}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : defaultImg
                  }
                  alt={movie.original_name}
                />
                <div>
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: `${url}movies/${movie.id}`,
                      state: { from: location },
                    }}
                  >
                    <h5>{movie.title}</h5>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
