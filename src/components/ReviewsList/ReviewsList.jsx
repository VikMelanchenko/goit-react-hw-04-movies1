import PropTypes from 'prop-types';
import styles from '../../css/styles.module.css';

export default function ReviewsList({ reviews }) {
  return (
    <>
      {reviews && (
        <>
          {reviews.length > 0 ? (
            <ul className={styles.card_right_description}>
              {reviews.map((review) => (
                <li key={review.id}>
                  <h3>Author: {review.author}</h3>
                  <p>"{review.content}"</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>There are no reviews for this movie.</p>
          )}
        </>
      )}
    </>
  );
}

ReviewsList.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      review: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ),
};
