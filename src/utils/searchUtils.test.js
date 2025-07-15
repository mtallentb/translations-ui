import {
  highlightMatches,
  highlightMatchesReact,
  advancedSearchTranslations,
  memoizedSearchTranslations,
  getSearchStats,
  clearSearchCache,
  escapeHtml,
} from './searchUtils';

describe('Search Utils', () => {
  const mockTranslations = [
    {
      key: 'greeting-hello',
      base: 'Hello World',
      locales: {
        'en-us': 'Hello World',
        'zh-tw': '你好世界',
      },
    },
    {
      key: 'button-submit',
      base: 'Submit Form',
      locales: {
        'en-us': 'Submit Form',
        'zh-tw': '提交表單',
      },
    },
    {
      key: 'error-message',
      base: 'An error occurred',
      locales: {
        'en-us': 'An error occurred',
        'zh-tw': '發生錯誤',
      },
    },
  ];

  beforeEach(() => {
    clearSearchCache();
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert("xss")&lt;/script&gt;'
      );
      expect(escapeHtml('Hello & "World"')).toBe('Hello &amp; "World"');
    });

    it('should handle empty and null values', () => {
      expect(escapeHtml('')).toBe('');
      expect(escapeHtml(null)).toBe('');
      expect(escapeHtml(undefined)).toBe('');
    });
  });

  describe('highlightMatches', () => {
    it('should highlight search matches', () => {
      const result = highlightMatches('Hello World', 'World');
      expect(result).toContain('<mark class="search-highlight">World</mark>');
    });

    it('should be case insensitive', () => {
      const result = highlightMatches('Hello World', 'world');
      expect(result).toContain('<mark class="search-highlight">World</mark>');
    });

    it('should handle empty query', () => {
      const result = highlightMatches('Hello World', '');
      expect(result).toBe('Hello World');
    });

    it('should escape HTML in input', () => {
      const result = highlightMatches('<script>test</script>', 'test');
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('<mark class="search-highlight">test</mark>');
    });
  });

  describe('highlightMatchesReact', () => {
    it('should return array of parts for React rendering', () => {
      const result = highlightMatchesReact('Hello World', 'World');
      expect(Array.isArray(result)).toBe(true);
      expect(result.some(part => part.type === 'highlight')).toBe(true);
      expect(result.some(part => part.type === 'text')).toBe(true);
    });

    it('should handle no matches', () => {
      const result = highlightMatchesReact('Hello World', 'xyz');
      expect(result).toEqual([{ type: 'text', text: 'Hello World', key: 0 }]);
    });

    it('should handle empty query', () => {
      const result = highlightMatchesReact('Hello World', '');
      expect(result).toEqual(['Hello World']);
    });
  });

  describe('advancedSearchTranslations', () => {
    it('should search across all fields by default', () => {
      const results = advancedSearchTranslations(mockTranslations, 'hello');
      expect(results).toHaveLength(1);
      expect(results[0].key).toBe('greeting-hello');
    });

    it('should search in specific fields only', () => {
      const results = advancedSearchTranslations(mockTranslations, 'submit', {
        fields: ['key'],
      });
      expect(results).toHaveLength(1);
      expect(results[0].key).toBe('button-submit');
    });

    it('should return empty array for no matches', () => {
      const results = advancedSearchTranslations(mockTranslations, 'xyz123');
      expect(results).toHaveLength(0);
    });

    it('should include search metadata when requested', () => {
      const results = advancedSearchTranslations(mockTranslations, 'hello', {
        includeMetadata: true,
      });
      expect(results[0]).toHaveProperty('translation');
      expect(results[0]).toHaveProperty('matches');
      expect(Array.isArray(results[0].matches)).toBe(true);
    });

    it('should handle case sensitivity option', () => {
      const sensitiveResults = advancedSearchTranslations(
        mockTranslations,
        'Hello',
        {
          caseSensitive: true,
        }
      );
      const insensitiveResults = advancedSearchTranslations(
        mockTranslations,
        'hello',
        {
          caseSensitive: false,
        }
      );

      expect(sensitiveResults).toHaveLength(1);
      expect(insensitiveResults).toHaveLength(1);
    });

    it('should handle exact match option', () => {
      const exactResults = advancedSearchTranslations(
        mockTranslations,
        'Hello World',
        {
          exactMatch: true,
        }
      );
      const partialResults = advancedSearchTranslations(
        mockTranslations,
        'Hello',
        {
          exactMatch: false,
        }
      );

      expect(exactResults).toHaveLength(1);
      expect(partialResults).toHaveLength(1);
    });
  });

  describe('memoizedSearchTranslations', () => {
    it('should return same results as advanced search', () => {
      const query = 'hello';
      const advancedResults = advancedSearchTranslations(
        mockTranslations,
        query
      );
      const memoizedResults = memoizedSearchTranslations(
        mockTranslations,
        query
      );

      expect(memoizedResults).toEqual(advancedResults);
    });

    it('should cache results for identical queries', () => {
      const query = 'submit';

      // First call
      const result1 = memoizedSearchTranslations(mockTranslations, query);

      // Second call should use cache
      const result2 = memoizedSearchTranslations(mockTranslations, query);

      expect(result1).toEqual(result2);
    });
  });

  describe('getSearchStats', () => {
    it('should calculate correct statistics', () => {
      const filteredTranslations = [mockTranslations[0]];
      const stats = getSearchStats(
        mockTranslations,
        filteredTranslations,
        'hello'
      );

      expect(stats).toEqual({
        total: 3,
        filtered: 1,
        hasQuery: true,
        query: 'hello',
        percentage: 33,
      });
    });

    it('should handle empty query', () => {
      const stats = getSearchStats(mockTranslations, mockTranslations, '');

      expect(stats).toEqual({
        total: 3,
        filtered: 3,
        hasQuery: false,
        query: '',
        percentage: 100,
      });
    });

    it('should handle empty results', () => {
      const stats = getSearchStats(mockTranslations, [], 'xyz');

      expect(stats).toEqual({
        total: 3,
        filtered: 0,
        hasQuery: true,
        query: 'xyz',
        percentage: 0,
      });
    });
  });
});
