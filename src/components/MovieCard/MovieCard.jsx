import PropTypes from 'prop-types';
import defaultImg from '../../images/defaul_img.png';

import { Link, useLocation } from 'react-router-dom';

import styles from '../../css/styles.module.css';

export default function MovieCard({ movies }) {
  const location = useLocation();

  return (
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
          <div className={styles.card_body}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
              style={{ textDecoration: 'none' }}
            >
              <h5 className={styles.card_title}>{movie.title}</h5>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

// to={{
//   pathname: `${url}movies/${movie.id}`,
//   state: { from: { location, label: 'back to home-page' } },
// }}

MovieCard.propTypes = {
  movies: PropTypes.array.isRequired,
};
