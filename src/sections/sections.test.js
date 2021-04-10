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
  it('should contain a button saying Generate Blueprint', () => {
    render(<Main />);
    const buttonContents = screen.getAllByRole('button').map(({ textContent }) => textContent);
    expect(buttonContents.indexOf('Generate Blueprint')).not.toBe(-1);
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