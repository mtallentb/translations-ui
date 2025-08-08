import React, { useState, useEffect } from 'react';
import { useTranslations, setSearchQuery } from '../providers';
import { useDebounce } from '../hooks/useDebounce';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  const { state, dispatch } = useTranslations();
  const { searchQuery } = state;
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(localQuery, 300);

  // Update global state when debounced query changes
  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  // Sync local state when global state changes (e.g., clear search)
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = event => {
    const query = event.target.value;
    setLocalQuery(query);
  };

  const handleClearSearch = () => {
    setLocalQuery('');
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
          value={localQuery}
          onChange={handleSearchChange}
        />
        {localQuery && (
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
