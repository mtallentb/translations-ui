/**
 * Translation State Reducer
 * Handles all state transitions for the translation management system
 */

// Action types
export const ACTIONS = {
  ADD_TRANSLATION: 'ADD_TRANSLATION',
  UPDATE_TRANSLATION: 'UPDATE_TRANSLATION',
  DELETE_TRANSLATION: 'DELETE_TRANSLATION',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SELECTED_LOCALE: 'SET_SELECTED_LOCALE',
  MARK_MODIFIED: 'MARK_MODIFIED',
  SAVE_CHANGES: 'SAVE_CHANGES',
  CANCEL_CHANGES: 'CANCEL_CHANGES',
  LOAD_TRANSLATIONS: 'LOAD_TRANSLATIONS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

/**
 * Initial state for the translation reducer
 */
export const initialState = {
  translations: [],
  selectedLocale: 'en-us',
  searchQuery: '',
  modifiedKeys: new Set(),
  loading: false,
  error: null,
  lastUpdated: null,
};

/**
 * Helper function to find translation by key
 * @param {Array} translations - Array of translations
 * @param {string} key - Translation key to find
 * @returns {number} Index of translation or -1 if not found
 */
const findTranslationIndex = (translations, key) => {
  return translations.findIndex(translation => translation.key === key);
};

/**
 * Helper function to update modified keys set
 * @param {Set} modifiedKeys - Current set of modified keys
 * @param {string} key - Translation key
 * @param {boolean} isModified - Whether the translation is modified
 * @returns {Set} Updated set of modified keys
 */
const updateModifiedKeys = (modifiedKeys, key, isModified) => {
  const newModifiedKeys = new Set(modifiedKeys);

  if (isModified) {
    newModifiedKeys.add(key);
  } else {
    newModifiedKeys.delete(key);
  }

  return newModifiedKeys;
};

/**
 * Translation reducer function
 * @param {Object} state - Current state
 * @param {Object} action - Action to perform
 * @returns {Object} New state
 */
export const translationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_TRANSLATIONS: {
      const { translations } = action.payload;

      return {
        ...state,
        translations: translations || [],
        modifiedKeys: new Set(),
        loading: false,
        error: null,
        lastUpdated: Date.now(),
      };
    }

    case ACTIONS.ADD_TRANSLATION: {
      const { translation } = action.payload;

      // Check if translation with same key already exists
      const existingIndex = findTranslationIndex(
        state.translations,
        translation.key
      );

      if (existingIndex !== -1) {
        return {
          ...state,
          error: `Translation with key "${translation.key}" already exists`,
        };
      }

      return {
        ...state,
        translations: [...state.translations, translation],
        modifiedKeys: updateModifiedKeys(
          state.modifiedKeys,
          translation.key,
          translation.modified
        ),
        error: null,
        lastUpdated: Date.now(),
      };
    }

    case ACTIONS.UPDATE_TRANSLATION: {
      const { key, updates } = action.payload;
      const translationIndex = findTranslationIndex(state.translations, key);

      if (translationIndex === -1) {
        return {
          ...state,
          error: `Translation with key "${key}" not found`,
        };
      }

      const updatedTranslation = {
        ...state.translations[translationIndex],
        ...updates,
        updated: Date.now(),
      };

      const newTranslations = [...state.translations];
      newTranslations[translationIndex] = updatedTranslation;

      return {
        ...state,
        translations: newTranslations,
        modifiedKeys: updateModifiedKeys(
          state.modifiedKeys,
          key,
          updatedTranslation.modified
        ),
        error: null,
        lastUpdated: Date.now(),
      };
    }

    case ACTIONS.DELETE_TRANSLATION: {
      const { key } = action.payload;
      const translationIndex = findTranslationIndex(state.translations, key);

      if (translationIndex === -1) {
        return {
          ...state,
          error: `Translation with key "${key}" not found`,
        };
      }

      const newTranslations = state.translations.filter(
        (_, index) => index !== translationIndex
      );
      const newModifiedKeys = new Set(state.modifiedKeys);
      newModifiedKeys.delete(key);

      return {
        ...state,
        translations: newTranslations,
        modifiedKeys: newModifiedKeys,
        error: null,
        lastUpdated: Date.now(),
      };
    }

    case ACTIONS.SET_SEARCH_QUERY: {
      const { query } = action.payload;

      return {
        ...state,
        searchQuery: query || '',
        error: null,
      };
    }

    case ACTIONS.SET_SELECTED_LOCALE: {
      const { locale } = action.payload;

      if (!locale || typeof locale !== 'string') {
        return {
          ...state,
          error: 'Invalid locale specified',
        };
      }

      return {
        ...state,
        selectedLocale: locale,
        error: null,
      };
    }

    case ACTIONS.MARK_MODIFIED: {
      const { key, isModified = true } = action.payload;
      const translationIndex = findTranslationIndex(state.translations, key);

      if (translationIndex === -1) {
        return {
          ...state,
          error: `Translation with key "${key}" not found`,
        };
      }

      const updatedTranslation = {
        ...state.translations[translationIndex],
        modified: isModified,
        updated: Date.now(),
      };

      const newTranslations = [...state.translations];
      newTranslations[translationIndex] = updatedTranslation;

      return {
        ...state,
        translations: newTranslations,
        modifiedKeys: updateModifiedKeys(state.modifiedKeys, key, isModified),
        error: null,
        lastUpdated: Date.now(),
      };
    }

    case ACTIONS.SAVE_CHANGES: {
      // Mark all translations as unmodified
      const savedTranslations = state.translations.map(translation => ({
        ...translation,
        modified: false,
        updated: Date.now(),
      }));

      return {
        ...state,
        translations: savedTranslations,
        modifiedKeys: new Set(),
        error: null,
        lastUpdated: Date.now(),
      };
    }

    case ACTIONS.CANCEL_CHANGES: {
      const { originalTranslations } = action.payload;

      return {
        ...state,
        translations: originalTranslations || state.translations,
        modifiedKeys: new Set(),
        error: null,
        lastUpdated: Date.now(),
      };
    }

    case ACTIONS.SET_LOADING: {
      const { loading } = action.payload;

      return {
        ...state,
        loading: Boolean(loading),
      };
    }

    case ACTIONS.SET_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        error,
        loading: false,
      };
    }

    case ACTIONS.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
};

export default translationReducer;
