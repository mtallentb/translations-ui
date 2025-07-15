import React from 'react';
import { useTranslations, setSearchQuery } from '../providers';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  const { state, dispatch } = useTranslations();
  const { searchQuery } = state;

  const handleSearchChange = event => {
    const query = event.target.value;
    dispatch(setSearchQuery(query));
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(''));
  };

  return (
    <div className={styles.container}>
      <label htmlFor="search-input" className={styles.label}>
        Search Translations:
      </label>
      <div className={styles.inputContainer}>
        <input
          type="text"
          id="search-input"
          className={styles.input}
          placeholder="Search by key, base value, or translation..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
