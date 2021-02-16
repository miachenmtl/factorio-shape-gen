import { h } from 'preact';
import { render, screen } from '@testing-library/preact';

import Header from './Header';
import Main from "./Main";
import Footer from './Footer';

describe('The Header section', () => {
  it('should contain the title of the app', () => {
    const { container } = render(<Header />);
    expect(container.textContent).toContain('Factorio Shape Generator');
  });
});

describe('The Main section', () => {
  it('should for now just contain lorem ipsum', () => {
    const { container } = render(<Main />);
    expect(container.textContent).toContain('lorem ipsum');
  });
});

describe('The Footer section', () => {
  it('should contain a link to the Github site for the app', () => {
    render(<Footer />);
    expect(screen.getByText('Github')).toHaveAttribute('href', 'https://github.com/miachenmtl/factorio-shape-gen');
  });
  it('should contain an About button', () => {
    render(<Footer />);
    expect(screen.getByRole('button').textContent).toBe('About');
  });
});