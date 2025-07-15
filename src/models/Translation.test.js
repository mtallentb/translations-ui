/**
 * Tests for Translation model
 */

import {
  createTranslation,
  validateTranslation,
  updateTranslationLocale,
  searchTranslation,
  fromApiData,
  toApiData,
} from '../models/Translation.js';

describe('Translation Model', () => {
  describe('createTranslation', () => {
    test('creates a valid translation object', () => {
      const translation = createTranslation('test-key', 'Test Base', {
        'en-us': 'Test English',
        'zh-tw': '測試中文',
      });

      expect(translation.key).toBe('test-key');
      expect(translation.base).toBe('Test Base');
      expect(translation.locales['en-us']).toBe('Test English');
      expect(translation.locales['zh-tw']).toBe('測試中文');
      expect(translation.modified).toBe(false);
      expect(typeof translation.created).toBe('number');
      expect(typeof translation.updated).toBe('number');
    });

    test('sets default values correctly', () => {
      const translation = createTranslation('test-key', 'Test Base');

      expect(translation.locales['en-us']).toBe('Test Base');
      expect(translation.locales['zh-tw']).toBe('');
      expect(translation.modified).toBe(false);
    });
  });

  describe('validateTranslation', () => {
    test('validates a correct translation', () => {
      const translation = createTranslation('test-key', 'Test Base');
      expect(validateTranslation(translation)).toBe(true);
    });

    test('rejects invalid translations', () => {
      expect(validateTranslation(null)).toBe(false);
      expect(validateTranslation({})).toBe(false);
      expect(validateTranslation({ key: '', base: 'test' })).toBe(false);
      expect(validateTranslation({ key: 'test', base: 123 })).toBe(false);
    });
  });

  describe('updateTranslationLocale', () => {
    test('updates locale value correctly', () => {
      const original = createTranslation('test-key', 'Test Base');
      // Add a small delay to ensure different timestamps
      const updated = updateTranslationLocale(original, 'zh-tw', '新值');

      expect(updated.locales['zh-tw']).toBe('新值');
      expect(updated.modified).toBe(true);
      expect(updated.updated).toBeGreaterThanOrEqual(original.updated);
    });

    test('throws error for invalid inputs', () => {
      const translation = createTranslation('test-key', 'Test Base');

      expect(() => updateTranslationLocale(null, 'en-us', 'test')).toThrow();
      expect(() => updateTranslationLocale(translation, '', 'test')).toThrow();
      expect(() =>
        updateTranslationLocale(translation, 'en-us', 123)
      ).toThrow();
    });
  });

  describe('searchTranslation', () => {
    test('finds matches in key', () => {
      const translation = createTranslation('fund-name-test', 'Fund Name');
      expect(searchTranslation(translation, 'fund')).toBe(true);
      expect(searchTranslation(translation, 'name')).toBe(true);
      expect(searchTranslation(translation, 'xyz')).toBe(false);
    });

    test('finds matches in locale values', () => {
      const translation = createTranslation('test-key', 'Base Value', {
        'en-us': 'English Test',
        'zh-tw': '中文測試',
      });

      expect(searchTranslation(translation, 'english')).toBe(true);
      expect(searchTranslation(translation, '中文')).toBe(true);
      expect(searchTranslation(translation, 'french')).toBe(false);
    });
  });

  describe('API conversion', () => {
    test('converts from API data correctly', () => {
      const apiData = {
        base: 'Test Base',
        'en-us': 'Test English',
        'zh-tw': '測試中文',
      };

      const translation = fromApiData('test-key', apiData);

      expect(translation.key).toBe('test-key');
      expect(translation.base).toBe('Test Base');
      expect(translation.locales['en-us']).toBe('Test English');
      expect(translation.locales['zh-tw']).toBe('測試中文');
    });

    test('converts to API data correctly', () => {
      const translation = createTranslation('test-key', 'Test Base', {
        'en-us': 'Test English',
        'zh-tw': '測試中文',
      });

      const apiData = toApiData(translation);

      expect(apiData.base).toBe('Test Base');
      expect(apiData['en-us']).toBe('Test English');
      expect(apiData['zh-tw']).toBe('測試中文');
      expect(apiData.key).toBeUndefined(); // Should not include internal fields
    });
  });
});
