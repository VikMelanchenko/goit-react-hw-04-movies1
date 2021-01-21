import PropTypes from 'prop-types';
import defaultImg from '../../images/defaul_img.png';

import styles from '../../css/styles.module.css';

export default function Cast({ characters }) {
  return (
    <>
      {characters && (
        <ul className={styles.cards_wrap}>
          {characters.map((character) => (
            <li key={character.id} className={styles.card_box_item}>
              <img
                src={
                  character.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${character.profile_path}`
                    : defaultImg
                }
                alt={character.original_name}
                width={185}
              />
              <h3>{character.name}</h3>
              <p>Character: {character.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Cast.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      character: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired
  ),
};
