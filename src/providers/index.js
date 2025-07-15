/**
 * Providers index file
 * Exports all provider-related components and utilities
 */

export { useTranslations, TranslationProvider } from './TranslationContext.js';
export {
  translationReducer,
  initialState,
  ACTIONS,
} from './translationReducer.js';
export { actions } from './actions.js';
export { default as MainTranslationProvider } from './MainTranslationProvider.js';

// Individual action creators for convenience
export {
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
} from './actions.js';
