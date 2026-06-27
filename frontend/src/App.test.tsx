import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chatbot header', () => {
  render(<App />);
  expect(screen.getByText(/Deggendorf ChatBot/i)).toBeInTheDocument();
});