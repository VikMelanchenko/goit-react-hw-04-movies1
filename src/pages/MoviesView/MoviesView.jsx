import SearchBar from '../../components/SearchBar/SearchBar';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import FetchMovieRequest from '../../components/FetchMovieRequest/FetchMovieRequest';
import 'react-toastify/dist/ReactToastify.css';

export default function MoviesView() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = (query) => {
    setQuery(query);
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} />
      <FetchMovieRequest query={query} />
    </>
  );
}
