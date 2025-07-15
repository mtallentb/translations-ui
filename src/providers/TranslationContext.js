import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Create the Translation Context
const TranslationContext = createContext();

/**
 * Custom hook to use the Translation Context
 * @returns {Object} Context value with state and dispatch
 */
export const useTranslations = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error(
      'useTranslations must be used within a TranslationProvider'
    );
  }

  return context;
};

/**
 * Translation Provider component
 * Wraps the application and provides translation state management
 */
export const TranslationProvider = ({ children, initialState, reducer }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired,
};

export default TranslationContext;
