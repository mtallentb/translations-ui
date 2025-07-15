import React from 'react';
import PropTypes from 'prop-types';
import { highlightMatchesReact } from '../utils/searchUtils';
import styles from './HighlightedText.module.css';

/**
 * Component that highlights search matches in text
 * @param {string} text - Text to display
 * @param {string} searchQuery - Search query to highlight
 * @param {string} className - Additional CSS class
 */
const HighlightedText = ({ text, searchQuery, className = '' }) => {
  if (!text) {
    return <span className={className}>{text}</span>;
  }

  if (!searchQuery || !searchQuery.trim()) {
    return <span className={className}>{text}</span>;
  }

  const parts = highlightMatchesReact(text, searchQuery);

  return (
    <span className={className}>
      {parts.map(part => {
        if (part.type === 'highlight') {
          return (
            <mark key={part.key} className={styles.highlight}>
              {part.text}
            </mark>
          );
        }
        return <span key={part.key}>{part.text}</span>;
      })}
    </span>
  );
};

HighlightedText.propTypes = {
  text: PropTypes.string,
  searchQuery: PropTypes.string,
  className: PropTypes.string,
};

HighlightedText.defaultProps = {
  text: '',
  searchQuery: '',
  className: '',
};

export default HighlightedText;
