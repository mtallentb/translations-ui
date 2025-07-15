/**
 * Action creators for translation state management
 * These functions create action objects for the translation reducer
 */

import { ACTIONS } from './translationReducer.js';
import {
  validateTranslation,
  createTranslation,
} from '../models/Translation.js';

/**
 * Action creator to load translations into state
 * @param {Array} translations - Array of translation objects
 * @returns {Object} Action object
 */
export const loadTranslations = translations => ({
  type: ACTIONS.LOAD_TRANSLATIONS,
  payload: { translations },
});

/**
 * Action creator to add a new translation
 * @param {Object} translation - Translation object to add
 * @returns {Object} Action object
 */
export const addTranslation = translation => {
  if (!validateTranslation(translation)) {
    throw new Error('Invalid translation object');
  }

  return {
    type: ACTIONS.ADD_TRANSLATION,
    payload: { translation },
  };
};

/**
 * Action creator to create and add a new translation
 * @param {string} key - Translation key
 * @param {string} base - Base translation text
 * @param {Object} locales - Locale-specific translations
 * @returns {Object} Action object
 */
export const createAndAddTranslation = (key, base, locales = {}) => {
  const translation = createTranslation(key, base, locales, true);
  return addTranslation(translation);
};

/**
 * Action creator to update an existing translation
 * @param {string} key - Translation key
 * @param {Object} updates - Updates to apply
 * @returns {Object} Action object
 */
export const updateTranslation = (key, updates) => {
  if (!key || typeof key !== 'string') {
    throw new Error('Translation key is required');
  }

  return {
    type: ACTIONS.UPDATE_TRANSLATION,
    payload: { key, updates },
  };
};

/**
 * Action creator to update a translation's locale value
 * @param {string} key - Translation key
 * @param {string} locale - Locale code
 * @param {string} value - New translation value
 * @returns {Object} Action object
 */
export const updateTranslationLocale = (key, locale, value) => {
  if (!key || !locale || typeof value !== 'string') {
    throw new Error('Key, locale, and value are required');
  }

  return updateTranslation(key, {
    locales: { [locale]: value },
    modified: true,
  });
};

/**
 * Action creator to delete a translation
 * @param {string} key - Translation key to delete
 * @returns {Object} Action object
 */
export const deleteTranslation = key => {
  if (!key || typeof key !== 'string') {
    throw new Error('Translation key is required');
  }

  return {
    type: ACTIONS.DELETE_TRANSLATION,
    payload: { key },
  };
};

/**
 * Action creator to set search query
 * @param {string} query - Search query
 * @returns {Object} Action object
 */
export const setSearchQuery = query => ({
  type: ACTIONS.SET_SEARCH_QUERY,
  payload: { query },
});

/**
 * Action creator to set selected locale
 * @param {string} locale - Locale code
 * @returns {Object} Action object
 */
export const setSelectedLocale = locale => {
  if (!locale || typeof locale !== 'string') {
    throw new Error('Valid locale is required');
  }

  return {
    type: ACTIONS.SET_SELECTED_LOCALE,
    payload: { locale },
  };
};

/**
 * Action creator to mark a translation as modified
 * @param {string} key - Translation key
 * @param {boolean} isModified - Whether translation is modified
 * @returns {Object} Action object
 */
export const markTranslationModified = (key, isModified = true) => {
  if (!key || typeof key !== 'string') {
    throw new Error('Translation key is required');
  }

  return {
    type: ACTIONS.MARK_MODIFIED,
    payload: { key, isModified },
  };
};

/**
 * Action creator to save all changes
 * @returns {Object} Action object
 */
export const saveChanges = () => ({
  type: ACTIONS.SAVE_CHANGES,
  payload: {},
});

/**
 * Action creator to cancel all changes
 * @param {Array} originalTranslations - Original translations to restore
 * @returns {Object} Action object
 */
export const cancelChanges = originalTranslations => ({
  type: ACTIONS.CANCEL_CHANGES,
  payload: { originalTranslations },
});

/**
 * Action creator to set loading state
 * @param {boolean} loading - Loading state
 * @returns {Object} Action object
 */
export const setLoading = loading => ({
  type: ACTIONS.SET_LOADING,
  payload: { loading },
});

/**
 * Action creator to set error state
 * @param {string|Error} error - Error message or Error object
 * @returns {Object} Action object
 */
export const setError = error => {
  const errorMessage = error instanceof Error ? error.message : error;

  return {
    type: ACTIONS.SET_ERROR,
    payload: { error: errorMessage },
  };
};

/**
 * Action creator to clear error state
 * @returns {Object} Action object
 */
export const clearError = () => ({
  type: ACTIONS.CLEAR_ERROR,
  payload: {},
});

/**
 * Async action creator to batch update multiple translations
 * @param {Array} updates - Array of { key, updates } objects
 * @returns {Function} Thunk function
 */
export const batchUpdateTranslations = updates => {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      updates.forEach(({ key, updates: translationUpdates }) => {
        dispatch(updateTranslation(key, translationUpdates));
      });
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

/**
 * Async action creator to fetch translations from API
 * @param {string} apiUrl - API endpoint URL
 * @returns {Function} Thunk function
 */
export const fetchTranslations = apiUrl => {
  return async dispatch => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch translations: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Convert API data to translation objects
      const translations = Object.entries(data).map(
        ([key, translationData]) => {
          return createTranslation(
            key,
            translationData.base || '',
            translationData
          );
        }
      );

      dispatch(loadTranslations(translations));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// Export all action creators as a collection
export const actions = {
  loadTranslations,
  addTranslation,
  createAndAddTranslation,
  updateTranslation,
  updateTranslationLocale,
  deleteTranslation,
  setSearchQuery,
  setSelectedLocale,
  markTranslationModified,
  saveChanges,
  cancelChanges,
  setLoading,
  setError,
  clearError,
  batchUpdateTranslations,
  fetchTranslations,
};

export default actions;
