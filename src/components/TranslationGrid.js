import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslations, updateTranslationLocale } from '../providers';
import { filterTranslationsBySearch } from '../utils/stateUtils';
import styles from './TranslationGrid.module.css';

const TranslationGrid = () => {
  const { state, dispatch } = useTranslations();
  const { translations, searchQuery, selectedLocale, loading, error } = state;

  // Filter translations based on search query
  const filteredTranslations = useMemo(() => {
    return filterTranslationsBySearch(translations, searchQuery);
  }, [translations, searchQuery]);

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
          {searchQuery ? (
            <span>
              Showing {filteredTranslations.length} of {translations.length}{' '}
              translations
            </span>
          ) : (
            <span>{translations.length} translations</span>
          )}
        </div>
      </div>

      {filteredTranslations.length === 0 ? (
        <div className={styles.empty}>
          {searchQuery
            ? 'No translations match your search.'
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
  onTranslationChange,
}) => {
  const { key, base, locales, modified } = translation;

  const handleInputChange = (locale, value) => {
    onTranslationChange(key, locale, value);
  };

  const isComplete =
    locales['en-us'] &&
    locales['zh-tw'] &&
    locales['en-us'].trim() !== '' &&
    locales['zh-tw'].trim() !== '';

  return (
    <tr className={`${styles.row} ${modified ? styles.modified : ''}`}>
      <td className={styles.keyCell}>
        <div className={styles.keyText} title={key}>
          {key}
        </div>
      </td>
      <td className={styles.baseCell}>
        <div className={styles.baseText} title={base}>
          {base}
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
          {modified && <span className={styles.modifiedBadge}>Modified</span>}
          {!isComplete && (
            <span className={styles.incompleteBadge}>Incomplete</span>
          )}
          {isComplete && !modified && (
            <span className={styles.completeBadge}>Complete</span>
          )}
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
  onTranslationChange: PropTypes.func.isRequired,
};

export default TranslationGrid;
