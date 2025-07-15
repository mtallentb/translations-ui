import React from 'react';
import styles from './LocaleSelector.module.css';

const LocaleSelector = () => {
  const locales = [
    { code: 'en-us', name: 'English (US)' },
    { code: 'zh-tw', name: '中文 (繁體)' },
    { code: 'ja-jp', name: '日本語' },
    { code: 'ko-kr', name: '한국어' },
    { code: 'es-es', name: 'Español' },
    { code: 'fr-fr', name: 'Français' },
    { code: 'de-de', name: 'Deutsch' },
  ];

  return (
    <div className={styles.container}>
      <label htmlFor="locale-selector" className={styles.label}>
        Select Locale:
      </label>
      <select id="locale-selector" className={styles.select}>
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
