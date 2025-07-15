/**
 * Tests for translation reducer
 */

import {
  translationReducer,
  initialState,
  ACTIONS,
} from '../providers/translationReducer.js';
import { createTranslation } from '../models/Translation.js';

describe('Translation Reducer', () => {
  const mockTranslation = createTranslation('test-key', 'Test Base', {
    'en-us': 'Test English',
    'zh-tw': '測試中文',
  });

  describe('LOAD_TRANSLATIONS', () => {
    test('loads translations into state', () => {
      const action = {
        type: ACTIONS.LOAD_TRANSLATIONS,
        payload: { translations: [mockTranslation] },
      };

      const newState = translationReducer(initialState, action);

      expect(newState.translations).toHaveLength(1);
      expect(newState.translations[0]).toEqual(mockTranslation);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(null);
    });
  });

  describe('ADD_TRANSLATION', () => {
    test('adds new translation', () => {
      const action = {
        type: ACTIONS.ADD_TRANSLATION,
        payload: { translation: mockTranslation },
      };

      const newState = translationReducer(initialState, action);

      expect(newState.translations).toHaveLength(1);
      expect(newState.translations[0]).toEqual(mockTranslation);
    });

    test('prevents duplicate keys', () => {
      const stateWithTranslation = {
        ...initialState,
        translations: [mockTranslation],
      };

      const action = {
        type: ACTIONS.ADD_TRANSLATION,
        payload: { translation: mockTranslation },
      };

      const newState = translationReducer(stateWithTranslation, action);

      expect(newState.translations).toHaveLength(1);
      expect(newState.error).toContain('already exists');
    });
  });

  describe('UPDATE_TRANSLATION', () => {
    test('updates existing translation', () => {
      const stateWithTranslation = {
        ...initialState,
        translations: [mockTranslation],
      };

      const action = {
        type: ACTIONS.UPDATE_TRANSLATION,
        payload: {
          key: 'test-key',
          updates: { modified: true },
        },
      };

      const newState = translationReducer(stateWithTranslation, action);

      expect(newState.translations[0].modified).toBe(true);
      expect(newState.modifiedKeys.has('test-key')).toBe(true);
    });

    test('handles non-existent translation', () => {
      const action = {
        type: ACTIONS.UPDATE_TRANSLATION,
        payload: {
          key: 'non-existent',
          updates: { modified: true },
        },
      };

      const newState = translationReducer(initialState, action);

      expect(newState.error).toContain('not found');
    });
  });

  describe('SET_SEARCH_QUERY', () => {
    test('sets search query', () => {
      const action = {
        type: ACTIONS.SET_SEARCH_QUERY,
        payload: { query: 'test search' },
      };

      const newState = translationReducer(initialState, action);

      expect(newState.searchQuery).toBe('test search');
    });
  });

  describe('SET_SELECTED_LOCALE', () => {
    test('sets selected locale', () => {
      const action = {
        type: ACTIONS.SET_SELECTED_LOCALE,
        payload: { locale: 'zh-tw' },
      };

      const newState = translationReducer(initialState, action);

      expect(newState.selectedLocale).toBe('zh-tw');
    });

    test('handles invalid locale', () => {
      const action = {
        type: ACTIONS.SET_SELECTED_LOCALE,
        payload: { locale: null },
      };

      const newState = translationReducer(initialState, action);

      expect(newState.error).toContain('Invalid locale');
    });
  });

  describe('SAVE_CHANGES', () => {
    test('marks all translations as unmodified', () => {
      const modifiedTranslation = { ...mockTranslation, modified: true };
      const stateWithModified = {
        ...initialState,
        translations: [modifiedTranslation],
        modifiedKeys: new Set(['test-key']),
      };

      const action = { type: ACTIONS.SAVE_CHANGES, payload: {} };

      const newState = translationReducer(stateWithModified, action);

      expect(newState.translations[0].modified).toBe(false);
      expect(newState.modifiedKeys.size).toBe(0);
    });
  });
});
