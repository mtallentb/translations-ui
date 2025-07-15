/**
 * Main Translation Provider
 * Combines the context, reducer, and initial data loading
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TranslationProvider, useTranslations } from './TranslationContext.js';
import translationReducer, { initialState } from './translationReducer.js';
import { loadTranslations, setLoading, setError } from './actions.js';
import { getMockTranslations } from '../data/mockTranslations.js';

/**
 * Inner component that handles data loading
 */
const TranslationDataLoader = ({
  children,
  loadData = true,
  apiUrl = 'https://webapi.alliancebernstein.com/v2/translations/en-us',
}) => {
  const { dispatch } = useTranslations();

  useEffect(() => {
    if (!loadData) return;

    const loadInitialData = async () => {
      dispatch(setLoading(true));

      try {
        let translations;

        if (apiUrl) {
          // Load from API
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }

          const data = await response.json();
          translations = Object.entries(data).map(([key, translationData]) => ({
            key,
            base: translationData.base || '',
            locales: {
              'en-us': translationData['en-us'] || translationData.base || '',
              'zh-tw': translationData['zh-tw'] || '',
              ...translationData,
            },
            modified: false,
            created: Date.now(),
            updated: Date.now(),
          }));
        } else {
          // Load mock data as fallback
          translations = getMockTranslations();
        }

        dispatch(loadTranslations(translations));
      } catch (error) {
        console.error(
          'Failed to load translations, falling back to mock data:',
          error
        );
        // Fallback to mock data if API fails
        try {
          const translations = getMockTranslations();
          dispatch(loadTranslations(translations));
        } catch (fallbackError) {
          console.error('Failed to load mock data:', fallbackError);
          dispatch(setError(fallbackError.message));
        }
      }
    };

    loadInitialData();
  }, [dispatch, loadData, apiUrl]);

  return children;
};

/**
 * Main Translation Provider Component
 * Wraps the application with translation state management
 */
export const MainTranslationProvider = ({
  children,
  loadData = true,
  apiUrl = 'https://webapi.alliancebernstein.com/v2/translations/en-us',
  customInitialState = null,
}) => {
  const providerInitialState = customInitialState || initialState;

  return (
    <TranslationProvider
      initialState={providerInitialState}
      reducer={translationReducer}
    >
      <TranslationDataLoader loadData={loadData} apiUrl={apiUrl}>
        {children}
      </TranslationDataLoader>
    </TranslationProvider>
  );
};

MainTranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  loadData: PropTypes.bool,
  apiUrl: PropTypes.string,
  customInitialState: PropTypes.object,
};

export default MainTranslationProvider;
