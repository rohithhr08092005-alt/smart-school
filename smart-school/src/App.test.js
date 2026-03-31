import { render, screen } from '@testing-library/react';
import App from './App';

test('renders smart school navbar brand', () => {
  render(<App />);
  const brandElement = screen.getByRole('link', { name: 'Smart School Donation' });
  expect(brandElement).toBeInTheDocument();
});
