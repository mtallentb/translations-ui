/**
 * Search utility functions for highlighting and advanced search operations
 */

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export const escapeHtml = text => {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Highlights search matches in text
 * @param {string} text - Original text
 * @param {string} query - Search query to highlight
 * @returns {string} HTML string with highlighted matches
 */
export const highlightMatches = (text, query) => {
  if (!text || !query) {
    return escapeHtml(text || '');
  }

  const escapedText = escapeHtml(text);
  const escapedQuery = escapeHtml(query.trim());

  if (!escapedQuery) {
    return escapedText;
  }

  // Create case-insensitive regex for global replacement
  const regex = new RegExp(
    `(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );

  return escapedText.replace(regex, '<mark class="search-highlight">$1</mark>');
};

/**
 * Highlights search matches in React component format
 * @param {string} text - Original text
 * @param {string} query - Search query to highlight
 * @returns {Array} Array of React elements and strings
 */
export const highlightMatchesReact = (text, query) => {
  if (!text || !query) {
    return [text || ''];
  }

  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [text];
  }

  // Create case-insensitive regex
  const regex = new RegExp(
    `(${trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return { type: 'highlight', text: part, key: index };
    }
    return { type: 'text', text: part, key: index };
  });
};

/**
 * Advanced search function with multiple criteria
 * @param {Array} translations - Array of translation objects
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Array} Filtered translations with search metadata
 */
export const advancedSearchTranslations = (
  translations,
  query,
  options = {}
) => {
  const {
    fields = ['key', 'base', 'locales'],
    caseSensitive = false,
    exactMatch = false,
    includeMetadata = false,
  } = options;

  if (!query || !query.trim()) {
    return includeMetadata
      ? translations.map(t => ({ translation: t, matches: [] }))
      : translations;
  }

  const searchTerm = caseSensitive ? query.trim() : query.trim().toLowerCase();
  const results = [];

  for (const translation of translations) {
    const matches = [];
    let hasMatch = false;

    // Search in key
    if (fields.includes('key')) {
      const keyText = caseSensitive
        ? translation.key
        : translation.key.toLowerCase();
      const matchFound = exactMatch
        ? keyText === searchTerm
        : keyText.includes(searchTerm);
      if (matchFound) {
        hasMatch = true;
        matches.push({ field: 'key', value: translation.key });
      }
    }

    // Search in base
    if (fields.includes('base')) {
      const baseText = caseSensitive
        ? translation.base
        : translation.base.toLowerCase();
      const matchFound = exactMatch
        ? baseText === searchTerm
        : baseText.includes(searchTerm);
      if (matchFound) {
        hasMatch = true;
        matches.push({ field: 'base', value: translation.base });
      }
    }

    // Search in locales
    if (fields.includes('locales')) {
      for (const [locale, value] of Object.entries(translation.locales)) {
        if (value) {
          const localeText = caseSensitive ? value : value.toLowerCase();
          const matchFound = exactMatch
            ? localeText === searchTerm
            : localeText.includes(searchTerm);
          if (matchFound) {
            hasMatch = true;
            matches.push({ field: 'locales', locale, value });
          }
        }
      }
    }

    if (hasMatch) {
      results.push(includeMetadata ? { translation, matches } : translation);
    }
  }

  return results;
};

/**
 * Memoized search function for performance optimization
 */
let searchCache = new Map();
const MAX_CACHE_SIZE = 100;

export const memoizedSearchTranslations = (
  translations,
  query,
  options = {}
) => {
  const cacheKey = `${JSON.stringify(translations.map(t => t.key))}-${query}-${JSON.stringify(options)}`;

  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  const results = advancedSearchTranslations(translations, query, options);

  // Manage cache size
  if (searchCache.size >= MAX_CACHE_SIZE) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
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

/**
 * Gets search statistics
 * @param {Array} allTranslations - All translations
 * @param {Array} filteredTranslations - Filtered translations
 * @param {string} query - Search query
 * @returns {Object} Search statistics
 */
export const getSearchStats = (
  allTranslations,
  filteredTranslations,
  query
) => {
  return {
    total: allTranslations.length,
    filtered: filteredTranslations.length,
    hasQuery: Boolean(query && query.trim()),
    query: query || '',
    percentage:
      allTranslations.length > 0
        ? Math.round(
            (filteredTranslations.length / allTranslations.length) * 100
          )
        : 0,
  };
};

/**
 * Default export with all search utilities
 */
const searchUtilities = {
  escapeHtml,
  highlightMatches,
  highlightMatchesReact,
  advancedSearchTranslations,
  memoizedSearchTranslations,
  clearSearchCache,
  getSearchStats,
};

export default searchUtilities;
