import React from 'react';
import styles from './SearchInput.module.css';

const SearchInput = () => {
  return (
    <div className={styles.container}>
      <label htmlFor="search-input" className={styles.label}>
        Search Translations:
      </label>
      <input
        type="text"
        id="search-input"
        className={styles.input}
        placeholder="Search by key, base value, or translation..."
      />
    </div>
  );
};

export default SearchInput;
