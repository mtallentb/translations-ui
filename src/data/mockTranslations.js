/**
 * Mock translation data for development and testing
 * Generated from Alliance Bernstein API with sample translations
 */

import { createTranslation } from '../models/Translation.js';

// Raw API data (sample from the actual endpoint)
const rawApiData = {
  'fundfinderdetails-value-a': {
    base: 'A',
    'en-us': 'A',
  },
  'fundfinderdetails-value-accumulating': {
    base: 'Accumulating',
    'en-us': '',
  },
  'fundfinderdetails-value-alternatives': {
    base: 'Alternatives',
    'en-us': '',
  },
  'fundfinderdetails-value-asia': {
    base: 'Asia',
    'en-us': 'Asia',
  },
  'fundfinderdetails-value-asia-ex-japan': {
    base: 'Asia ex-Japan',
    'en-us': 'Asia ex-Japan',
  },
  'fundfinderdetails-value-base': {
    base: 'Base',
    'en-us': '',
  },
  'fundfinderdetails-value-closed-end-funds': {
    base: 'Closed End Funds',
    'en-us': 'Closed End Funds',
  },
  'fundfinderdetails-value-core': {
    base: 'Core',
    'en-us': 'Core',
  },
  'fundfinderdetails-value-distributing': {
    base: 'Distributing',
    'en-us': '',
  },
  'fundfinderdetails-value-domestic': {
    base: 'Domestic',
    'en-us': 'Domestic',
  },
  'fundfinderdetails-value-emerging-markets': {
    base: 'Emerging Markets',
    'en-us': 'Emerging Markets',
  },
  'fundfinderdetails-value-equities': {
    base: 'Equities',
    'en-us': 'Equities',
  },
  'fundfinderdetails-value-etf': {
    base: 'ETF',
    'en-us': 'ETF',
  },
  'fundfinderdetails-value-europe': {
    base: 'Europe',
    'en-us': 'Europe',
  },
  'fundfinderdetails-value-fixed-income': {
    base: 'Fixed-Income',
    'en-us': 'Fixed-Income',
  },
  'fundfinderdetails-value-global': {
    base: 'Global',
    'en-us': 'Global',
  },
  'fundfinderdetails-value-global-ex-us': {
    base: 'Global ex US',
    'en-us': 'Global ex US',
  },
  'fundfinderdetails-value-growth': {
    base: 'Growth',
    'en-us': 'Growth',
  },
  'fundfinderdetails-value-hedged': {
    base: 'Hedged',
    'en-us': '',
  },
  'fundfinderdetails-value-income': {
    base: 'Income',
    'en-us': 'Income',
  },
  'fundfinderdetails-value-india': {
    base: 'India',
    'en-us': 'India',
  },
  'fundfinderdetails-value-international': {
    base: 'International',
    'en-us': 'International',
  },
  'fundfinderdetails-value-japan': {
    base: 'Japan',
    'en-us': 'Japan',
  },
  'fundfinderdetails-value-large': {
    base: 'Large',
    'en-us': 'Large',
  },
  'fundfinderdetails-value-managed-accounts': {
    base: 'Managed Accounts',
    'en-us': 'Managed Accounts',
  },
  'fundfinderdetails-value-model-portfolio': {
    base: 'Model Portfolio',
    'en-us': 'Model Portfolio',
  },
  'fundfinderdetails-value-money-market': {
    base: 'Money Market',
    'en-us': 'Money Market',
  },
  'fundfinderdetails-value-multi-asset': {
    base: 'Multi-Asset',
    'en-us': 'MULTI-ASSET',
  },
  'fundfinderdetails-value-multi-cap': {
    base: 'Multi Cap',
    'en-us': 'Multi Cap',
  },
  'fundfinderdetails-value-municipal': {
    base: 'Municipal',
    'en-us': 'Municipal',
  },
  'fundfinderdetails-value-mutual-funds': {
    base: 'Mutual Funds',
    'en-us': 'Mutual Funds',
  },
  'fundfinderdetails-value-offshore': {
    base: 'Offshore',
    'en-us': 'Offshore',
  },
  'fundfinderdetails-value-onshore': {
    base: 'Onshore',
    'en-us': 'onshore',
  },
  'fundfinderdetails-value-other': {
    base: 'Other',
    'en-us': 'Other',
  },
  'fundfinderdetails-value-small': {
    base: 'Small',
    'en-us': 'Small',
  },
  'fundfinderdetails-value-taxable': {
    base: 'Taxable',
    'en-us': 'Taxable',
  },
  'fundfinderdetails-value-total-return': {
    base: 'Total Return',
    'en-us': 'Total Return',
  },
  'fundfinderdetails-value-unhedged': {
    base: 'Unhedged',
    'en-us': '',
  },
  'fundfinderdetails-value-unknown': {
    base: 'Unknown',
    'en-us': '',
  },
  'fundfinderdetails-value-us': {
    base: 'US',
    'en-us': 'US',
  },
  'fundfinderdetails-value-value': {
    base: 'Value',
    'en-us': 'Value',
  },
  'fundfinderdetails-value-variable-product': {
    base: 'Variable Product',
    'en-us': 'Variable Product',
  },
};

// Sample Chinese translations for demonstration
const chineseTranslations = {
  'fundfinderdetails-value-a': 'A',
  'fundfinderdetails-value-accumulating': '累積型',
  'fundfinderdetails-value-alternatives': '另類投資',
  'fundfinderdetails-value-asia': '亞洲',
  'fundfinderdetails-value-asia-ex-japan': '亞洲除日本',
  'fundfinderdetails-value-base': '基準',
  'fundfinderdetails-value-closed-end-funds': '封閉式基金',
  'fundfinderdetails-value-core': '核心',
  'fundfinderdetails-value-distributing': '配息型',
  'fundfinderdetails-value-domestic': '國內',
  'fundfinderdetails-value-emerging-markets': '新興市場',
  'fundfinderdetails-value-equities': '股票',
  'fundfinderdetails-value-etf': 'ETF',
  'fundfinderdetails-value-europe': '歐洲',
  'fundfinderdetails-value-fixed-income': '固定收益',
  'fundfinderdetails-value-global': '全球',
  'fundfinderdetails-value-global-ex-us': '全球除美國',
  'fundfinderdetails-value-growth': '成長',
  'fundfinderdetails-value-hedged': '避險',
  'fundfinderdetails-value-income': '收益',
  'fundfinderdetails-value-india': '印度',
  'fundfinderdetails-value-international': '國際',
  'fundfinderdetails-value-japan': '日本',
  'fundfinderdetails-value-large': '大型',
  'fundfinderdetails-value-managed-accounts': '管理帳戶',
  'fundfinderdetails-value-model-portfolio': '模型投資組合',
  'fundfinderdetails-value-money-market': '貨幣市場',
  'fundfinderdetails-value-multi-asset': '多元資產',
  'fundfinderdetails-value-multi-cap': '多元市值',
  'fundfinderdetails-value-municipal': '市政',
  'fundfinderdetails-value-mutual-funds': '共同基金',
  'fundfinderdetails-value-offshore': '境外',
  'fundfinderdetails-value-onshore': '境內',
  'fundfinderdetails-value-other': '其他',
  'fundfinderdetails-value-small': '小型',
  'fundfinderdetails-value-taxable': '應稅',
  'fundfinderdetails-value-total-return': '總回報',
  'fundfinderdetails-value-unhedged': '非避險',
  'fundfinderdetails-value-unknown': '未知',
  'fundfinderdetails-value-us': '美國',
  'fundfinderdetails-value-value': '價值',
  'fundfinderdetails-value-variable-product': '變動產品',
};

/**
 * Creates mock translations with various states for testing
 * @returns {Array} Array of translation objects
 */
export const createMockTranslations = () => {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  const translations = [];

  Object.entries(rawApiData).forEach(([key, data], index) => {
    const hasChineseTranslation = chineseTranslations[key];
    const isModified = index % 4 === 0; // Every 4th translation is modified
    const isEmpty = index % 7 === 0; // Every 7th translation has empty en-us

    const locales = {
      'en-us': isEmpty ? '' : data['en-us'] || data.base,
      'zh-tw': hasChineseTranslation || '',
    };

    // Add some variety in timestamps
    let created, updated;
    if (index % 3 === 0) {
      created = oneDayAgo;
      updated = oneHourAgo;
    } else if (index % 2 === 0) {
      created = oneHourAgo;
      updated = now;
    } else {
      created = now;
      updated = now;
    }

    const translation = createTranslation(
      key,
      data.base,
      locales,
      isModified,
      created,
      updated
    );

    translations.push(translation);
  });

  return translations;
};

/**
 * Creates additional sample translations for testing edge cases
 * @returns {Array} Array of additional translation objects
 */
export const createAdditionalSampleTranslations = () => {
  const now = Date.now();

  return [
    // Translation with special characters
    createTranslation(
      'special-characters-test',
      'Test with "quotes" & ampersands',
      {
        'en-us': 'Test with "quotes" & ampersands',
        'zh-tw': '包含"引號"和&符號的測試',
      },
      false,
      now,
      now
    ),

    // Long translation
    createTranslation(
      'long-text-example',
      'This is a very long translation text that should test how the UI handles lengthy content and word wrapping in various components throughout the application.',
      {
        'en-us':
          'This is a very long translation text that should test how the UI handles lengthy content and word wrapping in various components throughout the application.',
        'zh-tw':
          '這是一個非常長的翻譯文本，應該測試用戶界面如何處理冗長的內容以及在應用程序的各個組件中的換行。',
      },
      true,
      now - 86400000,
      now
    ),

    // Empty base translation
    createTranslation(
      'empty-base-test',
      '',
      {
        'en-us': 'English text for empty base',
        'zh-tw': '空基礎的英文文本',
      },
      true,
      now,
      now
    ),

    // Missing Chinese translation
    createTranslation(
      'missing-chinese-translation',
      'No Chinese translation available',
      {
        'en-us': 'No Chinese translation available',
        'zh-tw': '',
      },
      false,
      now,
      now
    ),

    // Numbers and symbols
    createTranslation(
      'numbers-and-symbols-123',
      '123 Test $100 @ 50%',
      {
        'en-us': '123 Test $100 @ 50%',
        'zh-tw': '123 測試 $100 @ 50%',
      },
      true,
      now,
      now
    ),

    // HTML-like content
    createTranslation(
      'html-like-content',
      'Text with <strong>bold</strong> content',
      {
        'en-us': 'Text with <strong>bold</strong> content',
        'zh-tw': '包含<strong>粗體</strong>內容的文本',
      },
      false,
      now,
      now
    ),
  ];
};

/**
 * Gets the complete set of mock translations
 * @returns {Array} Array of all mock translation objects
 */
export const getMockTranslations = () => {
  const mainTranslations = createMockTranslations();
  const additionalTranslations = createAdditionalSampleTranslations();

  return [...mainTranslations, ...additionalTranslations];
};

/**
 * Gets mock translations with specific characteristics for testing
 * @param {Object} options - Options for filtering mock data
 * @returns {Array} Filtered mock translations
 */
export const getMockTranslationsWithOptions = (options = {}) => {
  const {
    onlyModified = false,
    onlyIncomplete = false,
    maxCount = null,
  } = options;

  let translations = getMockTranslations();

  if (onlyModified) {
    translations = translations.filter(t => t.modified);
  }

  if (onlyIncomplete) {
    translations = translations.filter(
      t =>
        !t.locales['en-us'] ||
        !t.locales['zh-tw'] ||
        t.locales['en-us'].trim() === '' ||
        t.locales['zh-tw'].trim() === ''
    );
  }

  if (maxCount && maxCount > 0) {
    translations = translations.slice(0, maxCount);
  }

  return translations;
};

/**
 * Creates a mock API response format
 * @param {Array} translations - Array of translation objects
 * @returns {Object} API response format
 */
export const createMockApiResponse = (translations = null) => {
  const translationsToUse = translations || getMockTranslations();
  const apiResponse = {};

  translationsToUse.forEach(translation => {
    apiResponse[translation.key] = {
      base: translation.base,
      'en-us': translation.locales['en-us'],
      'zh-tw': translation.locales['zh-tw'],
    };
  });

  return apiResponse;
};

/**
 * Simulates an API fetch with delay
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise} Promise that resolves to mock API data
 */
export const fetchMockTranslations = async (delay = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(createMockApiResponse());
    }, delay);
  });
};

const mockTranslationsAPI = {
  createMockTranslations,
  createAdditionalSampleTranslations,
  getMockTranslations,
  getMockTranslationsWithOptions,
  createMockApiResponse,
  fetchMockTranslations,
  rawApiData,
  chineseTranslations,
};

export default mockTranslationsAPI;
