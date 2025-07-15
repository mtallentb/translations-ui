import React from 'react';
import { useTranslations, setSelectedLocale } from '../providers';
import styles from './LocaleSelector.module.css';

const LocaleSelector = () => {
  const { state, dispatch } = useTranslations();
  const { selectedLocale } = state;

  // Available locales - keeping only en-us and zh-tw as specified
  const locales = [
    { code: 'en-us', name: 'English (US)' },
    { code: 'zh-tw', name: '中文 (繁體)' },
  ];

  const handleLocaleChange = event => {
    const locale = event.target.value;
    dispatch(setSelectedLocale(locale));
  };

  return (
    <div className={styles.container}>
      <label htmlFor="locale-selector" className={styles.label}>
        Select Locale:
      </label>
      <select
        id="locale-selector"
        className={styles.select}
        value={selectedLocale}
        onChange={handleLocaleChange}
      >
        {locales.map(locale => (
          <option key={locale.code} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSelector;
