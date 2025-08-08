import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HighlightedText from './HighlightedText';

describe('HighlightedText Component', () => {
  it('should render plain text when no search query', () => {
    render(<HighlightedText text="Hello World" searchQuery="" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should render plain text when search query is null', () => {
    render(<HighlightedText text="Hello World" searchQuery={null} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should highlight matching text', () => {
    render(<HighlightedText text="Hello World" searchQuery="World" />);

    const highlightedElement = screen.getByText('World');
    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement.tagName).toBe('MARK');
  });

  it('should be case insensitive', () => {
    render(<HighlightedText text="Hello World" searchQuery="world" />);

    const highlightedElement = screen.getByText('World');
    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement.tagName).toBe('MARK');
  });

  it('should handle multiple matches', () => {
    render(<HighlightedText text="Hello Hello World" searchQuery="Hello" />);

    const highlightedElements = screen.getAllByText('Hello');
    expect(highlightedElements).toHaveLength(2);
    highlightedElements.forEach(element => {
      expect(element.tagName).toBe('MARK');
    });
  });

  it('should handle partial matches', () => {
    render(<HighlightedText text="Hello World" searchQuery="Wor" />);

    const highlightedElement = screen.getByText('Wor');
    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement.tagName).toBe('MARK');
  });

  it('should handle empty text', () => {
    const { container } = render(
      <HighlightedText text="" searchQuery="test" />
    );
    // For empty text, check that a span is rendered with no content
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild.tagName).toBe('SPAN');
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveTextContent('');
  });

  it('should handle null text', () => {
    const { container } = render(
      <HighlightedText text={null} searchQuery="test" />
    );
    // For null text, check that a span is rendered with no content
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild.tagName).toBe('SPAN');
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveTextContent('');
  });

  it('should apply additional className', () => {
    render(
      <HighlightedText
        text="Hello World"
        searchQuery=""
        className="custom-class"
      />
    );

    expect(screen.getByText('Hello World')).toHaveClass('custom-class');
  });

  it('should not highlight when no matches found', () => {
    render(<HighlightedText text="Hello World" searchQuery="xyz" />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    // No mark elements should exist for non-matching searches
    expect(screen.queryByText('xyz')).not.toBeInTheDocument();
  });
});
