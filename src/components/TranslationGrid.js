import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslations, updateTranslationLocale } from '../providers';
import { filterTranslationsBySearch } from '../utils/stateUtils';
import { getSearchStats } from '../utils/searchUtils';
import HighlightedText from './HighlightedText';
import styles from './TranslationGrid.module.css';

const TranslationGrid = () => {
  const { state, dispatch } = useTranslations();
  const { translations, searchQuery, selectedLocale, loading, error } = state;

  // Filter translations based on search query
  const filteredTranslations = useMemo(() => {
    return filterTranslationsBySearch(translations, searchQuery);
  }, [translations, searchQuery]);

  // Get search statistics
  const searchStats = useMemo(() => {
    return getSearchStats(translations, filteredTranslations, searchQuery);
  }, [translations, filteredTranslations, searchQuery]);

  const handleTranslationChange = (key, locale, value) => {
    dispatch(updateTranslationLocale(key, locale, value));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading translations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Translations</h2>
        <div className={styles.stats}>
          {searchStats.hasQuery ? (
            <span>
              Showing {searchStats.filtered} of {searchStats.total} translations
              <span className={styles.searchQuery}>
                {' '}
                for "{searchStats.query}"
              </span>
              <span className={styles.percentage}>
                {' '}
                ({searchStats.percentage}%)
              </span>
            </span>
          ) : (
            <span>{searchStats.total} translations</span>
          )}
        </div>
      </div>

      {filteredTranslations.length === 0 ? (
        <div className={styles.empty}>
          {searchStats.hasQuery
            ? `No translations match "${searchStats.query}".`
            : 'No translations found.'}
        </div>
      ) : (
        <div className={styles.gridContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.keyColumn}>Key</th>
                <th className={styles.baseColumn}>Base</th>
                <th className={styles.localeColumn}>English (US)</th>
                <th className={styles.localeColumn}>中文 (繁體)</th>
                <th className={styles.statusColumn}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTranslations.map(translation => (
                <TranslationRow
                  key={translation.key}
                  translation={translation}
                  selectedLocale={selectedLocale}
                  searchQuery={searchQuery}
                  onTranslationChange={handleTranslationChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const TranslationRow = ({
  translation,
  selectedLocale,
  searchQuery,
  onTranslationChange,
}) => {
  const { key, base, locales } = translation;

  const handleInputChange = (locale, value) => {
    onTranslationChange(key, locale, value);
  };

  const isComplete =
    locales['en-us'] &&
    locales['zh-tw'] &&
    locales['en-us'].trim() !== '' &&
    locales['zh-tw'].trim() !== '';

  return (
    <tr className={styles.row}>
      <td className={styles.keyCell}>
        <div className={styles.keyText} title={key}>
          <HighlightedText text={key} searchQuery={searchQuery} />
        </div>
      </td>
      <td className={styles.baseCell}>
        <div className={styles.baseText} title={base}>
          <HighlightedText text={base} searchQuery={searchQuery} />
        </div>
      </td>
      <td className={styles.localeCell}>
        <input
          type="text"
          className={`${styles.localeInput} ${selectedLocale === 'en-us' ? styles.selected : ''}`}
          value={locales['en-us'] || ''}
          onChange={e => handleInputChange('en-us', e.target.value)}
          placeholder="Enter English translation..."
        />
      </td>
      <td className={styles.localeCell}>
        <input
          type="text"
          className={`${styles.localeInput} ${selectedLocale === 'zh-tw' ? styles.selected : ''}`}
          value={locales['zh-tw'] || ''}
          onChange={e => handleInputChange('zh-tw', e.target.value)}
          placeholder="Enter Chinese translation..."
        />
      </td>
      <td className={styles.statusCell}>
        <div className={styles.statusIndicators}>
          {!isComplete && (
            <span className={styles.incompleteBadge}>Incomplete</span>
          )}
          {isComplete && <span className={styles.completeBadge}>Complete</span>}
        </div>
      </td>
    </tr>
  );
};

TranslationRow.propTypes = {
  translation: PropTypes.shape({
    key: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
    locales: PropTypes.shape({
      'en-us': PropTypes.string,
      'zh-tw': PropTypes.string,
    }).isRequired,
    modified: PropTypes.bool.isRequired,
  }).isRequired,
  selectedLocale: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
  onTranslationChange: PropTypes.func.isRequired,
};

export default TranslationGrid;
