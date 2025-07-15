import { render, screen } from '@testing-library/react';
import App from './App';

test('renders translation management ui', () => {
  render(<App />);
  const headerElement = screen.getByText(/translation management ui/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders locale selector', () => {
  render(<App />);
  const localeSelector = screen.getByLabelText(/select locale/i);
  expect(localeSelector).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByLabelText(/search translations/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders translation grid placeholder', () => {
  render(<App />);
  const gridTitle = screen.getByRole('heading', { name: /translation grid/i });
  expect(gridTitle).toBeInTheDocument();
});
