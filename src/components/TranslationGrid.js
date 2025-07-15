import React from 'react';
import styles from './TranslationGrid.module.css';

const TranslationGrid = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Translation Grid</h2>
      <p className={styles.placeholder}>
        Translation grid component will be implemented here. This will display
        translations in a table format with inline editing capabilities.
      </p>
    </div>
  );
};

export default TranslationGrid;
