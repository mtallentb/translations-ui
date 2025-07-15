/**
 * Translation Data Model
 * Represents a single translation entry with its base text and locale-specific translations
 */

/**
 * Creates a new Translation object
 * @param {string} key - Unique identifier for the translation
 * @param {string} base - Base English translation text
 * @param {Object} locales - Object containing locale-specific translations
 * @param {boolean} modified - Whether this translation has been modified
 * @param {number} created - Unix timestamp when created
 * @param {number} updated - Unix timestamp when last updated
 * @returns {Object} Translation object
 */
export const createTranslation = (
  key,
  base,
  locales = {},
  modified = false,
  created = null,
  updated = null
) => {
  const now = Date.now();

  return {
    key,
    base,
    locales: {
      'en-us': locales['en-us'] || base || '',
      'zh-tw': locales['zh-tw'] || '',
      ...locales,
    },
    modified,
    created: created || now,
    updated: updated || now,
  };
};

/**
 * Validates a translation object
 * @param {Object} translation - Translation object to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateTranslation = translation => {
  if (!translation || typeof translation !== 'object') {
    return false;
  }

  const { key, base, locales, modified, created, updated } = translation;

  // Key must be a non-empty string
  if (!key || typeof key !== 'string' || key.trim() === '') {
    return false;
  }

  // Base must be a string (can be empty)
  if (typeof base !== 'string') {
    return false;
  }

  // Locales must be an object
  if (!locales || typeof locales !== 'object') {
    return false;
  }

  // Modified must be a boolean
  if (typeof modified !== 'boolean') {
    return false;
  }

  // Created and updated must be numbers (unix timestamps)
  if (typeof created !== 'number' || typeof updated !== 'number') {
    return false;
  }

  // Validate locale values are strings
  for (const locale in locales) {
    if (typeof locales[locale] !== 'string') {
      return false;
    }
  }

  return true;
};

/**
 * Updates a translation's locale value
 * @param {Object} translation - Translation object to update
 * @param {string} locale - Locale code (e.g., 'en-us', 'zh-tw')
 * @param {string} value - New translation value
 * @returns {Object} Updated translation object
 */
export const updateTranslationLocale = (translation, locale, value) => {
  if (!validateTranslation(translation)) {
    throw new Error('Invalid translation object');
  }

  if (!locale || typeof locale !== 'string') {
    throw new Error('Invalid locale code');
  }

  if (typeof value !== 'string') {
    throw new Error('Translation value must be a string');
  }

  return {
    ...translation,
    locales: {
      ...translation.locales,
      [locale]: value,
    },
    modified: translation.locales[locale] !== value,
    updated: Date.now(),
  };
};

/**
 * Marks a translation as modified or unmodified
 * @param {Object} translation - Translation object to update
 * @param {boolean} isModified - Whether the translation is modified
 * @returns {Object} Updated translation object
 */
export const markTranslationModified = (translation, isModified = true) => {
  if (!validateTranslation(translation)) {
    throw new Error('Invalid translation object');
  }

  return {
    ...translation,
    modified: isModified,
    updated: Date.now(),
  };
};

/**
 * Gets all available locales from a translation
 * @param {Object} translation - Translation object
 * @returns {Array} Array of locale codes
 */
export const getTranslationLocales = translation => {
  if (!validateTranslation(translation)) {
    return [];
  }

  return Object.keys(translation.locales);
};

/**
 * Checks if a translation has a value for a specific locale
 * @param {Object} translation - Translation object
 * @param {string} locale - Locale code
 * @returns {boolean} True if translation has value for locale
 */
export const hasTranslationForLocale = (translation, locale) => {
  if (!validateTranslation(translation) || !locale) {
    return false;
  }

  return (
    locale in translation.locales && translation.locales[locale].trim() !== ''
  );
};

/**
 * Searches within a translation for a given query
 * @param {Object} translation - Translation object
 * @param {string} query - Search query
 * @returns {boolean} True if query matches key or any locale value
 */
export const searchTranslation = (translation, query) => {
  if (!validateTranslation(translation) || !query) {
    return false;
  }

  const searchTerm = query.toLowerCase().trim();

  // Search in key
  if (translation.key.toLowerCase().includes(searchTerm)) {
    return true;
  }

  // Search in base
  if (translation.base.toLowerCase().includes(searchTerm)) {
    return true;
  }

  // Search in all locale values
  for (const locale in translation.locales) {
    if (translation.locales[locale].toLowerCase().includes(searchTerm)) {
      return true;
    }
  }

  return false;
};

/**
 * Converts API data to Translation object
 * @param {string} key - Translation key from API
 * @param {Object} data - Translation data from API
 * @returns {Object} Translation object
 */
export const fromApiData = (key, data) => {
  if (!key || !data || typeof data !== 'object') {
    throw new Error('Invalid API data');
  }

  const base = data.base || '';
  const locales = { ...data };

  // Remove base from locales object if it exists
  delete locales.base;

  return createTranslation(key, base, locales);
};

/**
 * Converts Translation object to API format
 * @param {Object} translation - Translation object
 * @returns {Object} API-formatted data
 */
export const toApiData = translation => {
  if (!validateTranslation(translation)) {
    throw new Error('Invalid translation object');
  }

  return {
    base: translation.base,
    ...translation.locales,
  };
};

const TranslationModel = {
  createTranslation,
  validateTranslation,
  updateTranslationLocale,
  markTranslationModified,
  getTranslationLocales,
  hasTranslationForLocale,
  searchTranslation,
  fromApiData,
  toApiData,
};

export default TranslationModel;
