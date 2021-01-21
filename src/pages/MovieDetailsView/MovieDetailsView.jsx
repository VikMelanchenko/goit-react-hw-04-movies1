import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  Link,
  useRouteMatch,
  useLocation,
  useHistory,
  Switch,
} from 'react-router-dom';
import * as API from '../../service/api_movie';
import defaultImg from '../../images/defaul_img.png';
import styles from '../../css/styles.module.css';

const Cast = lazy(() =>
  import(`../../components/Cast/Cast` /* webpackChunkName: "cast-subview"*/)
);
const Reviews = lazy(() =>
  import(
    `../../components/Reviews/Reviews` /* webpackChunkName: "cast-subview"*/
  )
);

export default function MovieDetailsView() {
  const location = useLocation();
  console.log('MovieDetailsView: ', location);
  const history = useHistory();
  const { path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    API.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    if (location && location.state && location.state.from) {
      history.push(location.state.from);
      return;
    }
    history.push('/');
  };

  return (
    <>
      <hr />
      <button type="button" onClick={onGoBack} className={styles.button_back}>
        {location?.state?.from?.label ?? 'Go Back'}
      </button>

      {movie && (
        <>
          <div className={styles.card_wrap}>
            {movie.poster_path && (
              <div className={styles.card_left}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : defaultImg
                  }
                  alt={movie.original_title}
                />
              </div>
            )}
            <div className={styles.card_right}>
              <h2>{movie.title}</h2>
              <h3>User Score:</h3>
              <span>{movie.vote_average * 10}%</span>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              {movie.genres && (
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <hr />

            <nav>
              <Link
                to={{
                  pathname: `/movies/${movieId}/cast`,
                  state: {
                    from: location,
                  },
                }}
                className={styles.link}
              >
                Cast
              </Link>
              <Link
                to={{
                  pathname: `/movies/${movieId}/reviews`,
                  state: {
                    from: location,
                  },
                }}
                className={styles.link}
              >
                Reviews
              </Link>
            </nav>

            <Suspense>
              <Switch>
                <Route exact path={`${path}/cast`}>
                  <Cast movieId={movieId} />
                </Route>

                <Route exact path={`${path}/reviews`}>
                  <Reviews movieId={movieId} />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
