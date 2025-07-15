import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Custom render function with common providers
export const renderWithProviders = (ui, options = {}) => {
  const {
    // Add providers here as they're created (TranslationProvider, ThemeProvider, etc.)
    ...renderOptions
  } = options;

  const Wrapper = ({ children }) => {
    // Wrap with providers as they're added to the project
    return children;
  };

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Helper function to create mock translation data
export const createMockTranslation = (overrides = {}) => ({
  key: 'test-key',
  base: 'Test Base Value',
  locales: {
    'en-us': 'Test English Value',
    'zh-tw': 'Test Chinese Value',
    'ja-jp': 'Test Japanese Value',
  },
  modified: false,
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  ...overrides,
});

// Helper function to create mock translation arrays
export const createMockTranslations = (count = 5) => {
  return Array.from({ length: count }, (_, index) =>
    createMockTranslation({
      key: `test-key-${index + 1}`,
      base: `Test Base Value ${index + 1}`,
      locales: {
        'en-us': `Test English Value ${index + 1}`,
        'zh-tw': `Test Chinese Value ${index + 1}`,
        'ja-jp': `Test Japanese Value ${index + 1}`,
      },
    })
  );
};

// Helper to wait for async operations in tests
export const waitForLoadingToFinish = () =>
  screen
    .findByText(/loading/i)
    .then(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument())
    .catch(() => {
      // If loading text is not found, that's fine
    });

// Custom matcher helpers
export const expectElementToHaveModifiedClass = element => {
  expect(element).toHaveClass(expect.stringMatching(/modified/));
};

export const expectElementToBeAccessible = async element => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
  // Add more accessibility checks as needed
};

// Re-export everything from RTL for convenience
export * from '@testing-library/react';
export { userEvent };
