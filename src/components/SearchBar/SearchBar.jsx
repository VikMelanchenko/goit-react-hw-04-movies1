import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import styles from '../../css/styles.module.css';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a valid query search');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search_form}>
      <input
        className={styles.search_form_input}
        type="text"
        autoComplete="off"
        autoFocus
        value={query}
        onChange={handleChange}
      />
      <button className={styles.search_form_button} type="submit">
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
