import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('application shell', () => {
  it('identifies the application and makes its development status clear', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Recipe Extractor' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Recipe extraction is not available yet.'),
    ).toBeVisible();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
