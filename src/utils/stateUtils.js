/**
 * State utility functions for translation management
 * Provides helper functions for filtering, searching, and manipulating translation state
 */

import { searchTranslation } from '../models/Translation.js';

/**
 * Filters translations based on search query
 * @param {Array} translations - Array of translation objects
 * @  clearSearchCache,
};

const stateUtilities = {
  filterTranslationsBySearch,
  filterTranslationsByModified,
  filterTranslationsByEmptyLocale,
  sortTranslationsByKey,
  sortTranslationsByUpdated,
  groupTranslationsByFirstChar,
  getTranslationStats,
  findIncompleteTranslations,
  validateTranslations,
  mergeTranslationUpdates,
  createTranslationsBackup,
  memoizedSearch,
  clearSearchCache,
};

export default stateUtilities;rchQuery - Search query string
 * @returns {Array} Filtered translations
 */
export const filterTranslationsBySearch = (translations, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) {
    return translations;
  }

  return translations.filter(translation =>
    searchTranslation(translation, searchQuery.trim())
  );
};

/**
 * Filters translations by modified status
 * @param {Array} translations - Array of translation objects
 * @param {boolean} onlyModified - If true, return only modified translations
 * @returns {Array} Filtered translations
 */
export const filterTranslationsByModified = (
  translations,
  onlyModified = false
) => {
  if (!onlyModified) {
    return translations;
  }

  return translations.filter(translation => translation.modified);
};

/**
 * Filters translations that have empty values for a specific locale
 * @param {Array} translations - Array of translation objects
 * @param {string} locale - Locale code to check
 * @returns {Array} Translations with empty values for the locale
 */
export const filterTranslationsByEmptyLocale = (translations, locale) => {
  if (!locale) {
    return [];
  }

  return translations.filter(
    translation =>
      !translation.locales[locale] || translation.locales[locale].trim() === ''
  );
};

/**
 * Sorts translations by key alphabetically
 * @param {Array} translations - Array of translation objects
 * @param {boolean} ascending - Sort order (true for A-Z, false for Z-A)
 * @returns {Array} Sorted translations
 */
export const sortTranslationsByKey = (translations, ascending = true) => {
  return [...translations].sort((a, b) => {
    const comparison = a.key.localeCompare(b.key);
    return ascending ? comparison : -comparison;
  });
};

/**
 * Sorts translations by last updated timestamp
 * @param {Array} translations - Array of translation objects
 * @param {boolean} ascending - Sort order (true for oldest first, false for newest first)
 * @returns {Array} Sorted translations
 */
export const sortTranslationsByUpdated = (translations, ascending = false) => {
  return [...translations].sort((a, b) => {
    const comparison = a.updated - b.updated;
    return ascending ? comparison : -comparison;
  });
};

/**
 * Groups translations by their first character
 * @param {Array} translations - Array of translation objects
 * @returns {Object} Grouped translations with first character as key
 */
export const groupTranslationsByFirstChar = translations => {
  return translations.reduce((groups, translation) => {
    const firstChar = translation.key.charAt(0).toUpperCase();
    const key = /[A-Z]/.test(firstChar) ? firstChar : '#';

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(translation);
    return groups;
  }, {});
};

/**
 * Gets statistics about translations
 * @param {Array} translations - Array of translation objects
 * @param {Array} supportedLocales - Array of supported locale codes
 * @returns {Object} Translation statistics
 */
export const getTranslationStats = (
  translations,
  supportedLocales = ['en-us', 'zh-tw']
) => {
  const stats = {
    total: translations.length,
    modified: 0,
    complete: 0,
    incomplete: 0,
    localeStats: {},
  };

  // Initialize locale stats
  supportedLocales.forEach(locale => {
    stats.localeStats[locale] = {
      total: 0,
      complete: 0,
      incomplete: 0,
      percentage: 0,
    };
  });

  translations.forEach(translation => {
    // Count modified
    if (translation.modified) {
      stats.modified++;
    }

    // Check completeness
    let isComplete = true;
    supportedLocales.forEach(locale => {
      const hasValue =
        translation.locales[locale] &&
        translation.locales[locale].trim() !== '';

      if (hasValue) {
        stats.localeStats[locale].complete++;
      } else {
        stats.localeStats[locale].incomplete++;
        isComplete = false;
      }

      stats.localeStats[locale].total++;
    });

    if (isComplete) {
      stats.complete++;
    } else {
      stats.incomplete++;
    }
  });

  // Calculate percentages
  supportedLocales.forEach(locale => {
    const localeData = stats.localeStats[locale];
    localeData.percentage =
      localeData.total > 0
        ? Math.round((localeData.complete / localeData.total) * 100)
        : 0;
  });

  return stats;
};

/**
 * Finds translations that are missing values for specific locales
 * @param {Array} translations - Array of translation objects
 * @param {Array} requiredLocales - Array of required locale codes
 * @returns {Array} Translations missing required locale values
 */
export const findIncompleteTranslations = (
  translations,
  requiredLocales = ['en-us', 'zh-tw']
) => {
  return translations.filter(translation => {
    return requiredLocales.some(
      locale =>
        !translation.locales[locale] ||
        translation.locales[locale].trim() === ''
    );
  });
};

/**
 * Validates all translations in the array
 * @param {Array} translations - Array of translation objects
 * @returns {Object} Validation results
 */
export const validateTranslations = translations => {
  const results = {
    valid: [],
    invalid: [],
    duplicateKeys: [],
    errors: [],
  };

  const seenKeys = new Set();

  translations.forEach((translation, index) => {
    try {
      // Check for duplicate keys
      if (seenKeys.has(translation.key)) {
        results.duplicateKeys.push({
          key: translation.key,
          index,
          error: 'Duplicate translation key',
        });
      } else {
        seenKeys.add(translation.key);
      }

      // Validate translation structure
      if (!translation.key || typeof translation.key !== 'string') {
        results.invalid.push({ index, error: 'Invalid or missing key' });
        return;
      }

      if (typeof translation.base !== 'string') {
        results.invalid.push({ index, error: 'Invalid base value' });
        return;
      }

      if (!translation.locales || typeof translation.locales !== 'object') {
        results.invalid.push({ index, error: 'Invalid locales object' });
        return;
      }

      results.valid.push({ index, key: translation.key });
    } catch (error) {
      results.errors.push({
        index,
        key: translation.key || `index_${index}`,
        error: error.message,
      });
    }
  });

  return results;
};

/**
 * Merges translation updates with existing translations
 * @param {Array} existingTranslations - Current translations
 * @param {Array} updates - Translation updates
 * @returns {Array} Merged translations
 */
export const mergeTranslationUpdates = (existingTranslations, updates) => {
  const translationMap = new Map();

  // Add existing translations to map
  existingTranslations.forEach(translation => {
    translationMap.set(translation.key, { ...translation });
  });

  // Apply updates
  updates.forEach(update => {
    const existing = translationMap.get(update.key);

    if (existing) {
      // Merge with existing
      translationMap.set(update.key, {
        ...existing,
        ...update,
        locales: {
          ...existing.locales,
          ...update.locales,
        },
        updated: Date.now(),
      });
    } else {
      // Add new translation
      translationMap.set(update.key, {
        ...update,
        created: update.created || Date.now(),
        updated: Date.now(),
      });
    }
  });

  return Array.from(translationMap.values());
};

/**
 * Creates a backup of current translations state
 * @param {Array} translations - Current translations
 * @returns {Object} Backup object with metadata
 */
export const createTranslationsBackup = translations => {
  return {
    timestamp: Date.now(),
    count: translations.length,
    translations: translations.map(translation => ({ ...translation })),
  };
};

/**
 * Optimized search with memoization for large datasets
 * Uses a simple cache to avoid re-filtering identical queries
 */
const searchCache = new Map();
const CACHE_SIZE_LIMIT = 50;

export const memoizedSearch = (translations, searchQuery) => {
  const cacheKey = `${translations.length}_${searchQuery}`;

  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  const results = filterTranslationsBySearch(translations, searchQuery);

  // Clear cache if it gets too large
  if (searchCache.size >= CACHE_SIZE_LIMIT) {
    searchCache.clear();
  }

  searchCache.set(cacheKey, results);
  return results;
};

/**
 * Clears the search cache
 */
export const clearSearchCache = () => {
  searchCache.clear();
};

const stateUtilities = {
  filterTranslationsBySearch,
  filterTranslationsByModified,
  filterTranslationsByEmptyLocale,
  sortTranslationsByKey,
  sortTranslationsByUpdated,
  groupTranslationsByFirstChar,
  getTranslationStats,
  findIncompleteTranslations,
  validateTranslations,
  mergeTranslationUpdates,
  createTranslationsBackup,
  memoizedSearch,
  clearSearchCache,
};

export default stateUtilities;
